import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { DashboardService } from './dashboard.service';
import { RoomService } from '../room/room.service';
import { ToastrService } from 'ngx-toastr';
import { GlobalFunctions } from '../../common/global-function';
import { Chart, ChartData } from 'chart.js';
declare var $:any;
import moment from 'moment';
import { MatSort } from '@angular/material/sort';

export interface RoomBookElement {
  member_guest_name: any;
  membership_code: any;
  createdAt: any;
  mobile: any;
  check_in_date: any;
  check_out_date: any;
  room_name: any;
  no_of_guest: any;
  no_of_rooms: any;
  booking_status: any;
  status: any;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  // styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit,AfterViewInit {

  isTableLoading: boolean = false;
  selmembers: any = "Total Members";
  selInquires: any = "Total Inquiries";
  selBookings: any = "Total Bookings";
  selRoom: any = "All Rooms";
  selAmenity: any = "All Amenities";
  roomList: any = [];
  amenityList: any = [];
  dashboardCount: any;
  @ViewChild('salesIncomeThisMonth') salesIncomeThisMonth!: ElementRef;
  @ViewChild('todaysBookingStatus') todaysBookingStatus!: ElementRef;
  @ViewChild('bookingChart') bookingChart!: ElementRef;
  @ViewChild('memberChart', { static: false }) memberChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('inquiryChart', { static: false }) inquiryChart!: ElementRef<HTMLCanvasElement>;

  bookingChartContext!: CanvasRenderingContext2D;
  salesChartContext!: CanvasRenderingContext2D;
  earningsData: number[] = []; // Stores earnings for chart
  roomLabels: string[] = []; // Stores room names for chart labels
  userSalesIncomeChart: any;
  totalSaleEarnings: number = 0;
  chartColors: string[] = [];
  salesIncomeData: any;
  todaysBookingData: any;
  userBookingStatusChart: any;

  chartInstance!: Chart;
  noDataMessage: string = '';
  chartMemberInstance!: Chart | null;
  noDataMessageForMember = '';
  chartInquiryInstance!: Chart | null;
  noDataMessageForInquiry = '';

  ranges: any = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  }
  invalidDates: moment.Moment[] = [moment().add(2, 'days'), moment().add(3, 'days'), moment().add(5, 'days')];

  isInvalidDate = (m: moment.Moment) => {
    return this.invalidDates.some(d => d.isSame(m, 'day'))
  }
  roomBookingStartDate:any;
  roomBookingEndDate:any;
  memberStartDate:any;
  memberEndDate:any;
  inquiryStartDate:any;
  inquiryEndDate:any;


  ROOMBOOK_DATA: RoomBookElement[] = [];
  displayedColumns: string[] = ['member_guest_name', 'membership_code', 'createdAt', 'mobile', 'check_in_date', 'check_out_date', 'room_name', 'no_of_guest', 'no_of_rooms','booking_status', 'status'];
  roomBookData = new MatTableDataSource<RoomBookElement>(this.ROOMBOOK_DATA);
  selection = new SelectionModel<RoomBookElement>(true, []);
  pageNo: any;
  limit: any;
  totalRoomBook:any;
  @ViewChild(MatSort, { static: false }) roomBookSort!: MatSort;

  constructor(
    private _dashboardService: DashboardService,
    private _roomService: RoomService,
    private _toastr: ToastrService,
    private _globalFunctions: GlobalFunctions,
  ) { }

  ngOnInit(): void {
    // this.getRoomBookingList();
    // this.roomBookData.sort = this.roomBookSort;
    // this.getRoomsList();
    // this.getAmenityForBookingList();
    // this.getCounts();
    // this.getSalesThisMonth();
    // this.getTodaysBookingStatus();
    // this.getRoomBookingStatistics();
    // this.getMemberStatistics();
    // this.getInquiryStatistics();
  }

  onRoomBookingDateChange(event: any) {
    $('#bookingChart').empty();
    this.roomBookingStartDate = moment(new Date(event?.startDate?.$d.setHours(0, 0, 0, 0)).getTime()).format('DD-MM-yyyy');
    this.roomBookingEndDate = moment(new Date(new Date(event?.endDate?.$d.setHours(23, 59, 59, 999)).setDate(new Date(event?.endDate?.$d.setHours(23, 59, 59, 999)).getDate() - 1)).getTime()).format('DD-MM-yyyy');
    this.getRoomBookingStatistics();
  }

  onMemberDateChange(event: any) {
    $('#memberChart').empty();
    this.memberStartDate = moment(new Date(event?.startDate?.$d.setHours(0, 0, 0, 0)).getTime()).format('DD-MM-yyyy');
    this.memberEndDate = moment(new Date(new Date(event?.endDate?.$d.setHours(23, 59, 59, 999)).setDate(new Date(event?.endDate?.$d.setHours(23, 59, 59, 999)).getDate() - 1)).getTime()).format('DD-MM-yyyy');
    this.getMemberStatistics();
  }

  onInquiryDateChange(event: any) {
    $('#inquiryChart').empty();
    this.inquiryStartDate = moment(new Date(event?.startDate?.$d.setHours(0, 0, 0, 0)).getTime()).format('DD-MM-yyyy');
    this.inquiryEndDate = moment(new Date(new Date(event?.endDate?.$d.setHours(23, 59, 59, 999)).setDate(new Date(event?.endDate?.$d.setHours(23, 59, 59, 999)).getDate() - 1)).getTime()).format('DD-MM-yyyy');
    this.getInquiryStatistics();
  }


  getRoomBookingStatistics(): void {
    const payload = {
      startDate: this.roomBookingStartDate == 'Invalid date' ? '' : this.roomBookingStartDate || '',
      endDate: this.roomBookingEndDate == 'Invalid date' ? '' : this.roomBookingEndDate || '',
    };

    this._dashboardService.getRoomBookingEarning(payload).subscribe(
      (response: any) => {
        if (response.IsSuccess && response.Data.length > 0) {
          const chartData = this.transformDataForChart(response.Data);
          this.createChart(chartData);
        } else {
          this.noDataMessage = 'No earnings data available for the selected date range.';
        }
      },
      (error: any) => {
        console.error('Error fetching data:', error);
        this.noDataMessage = 'Failed to load data. Please try again.';
      }
    );
  }

  transformDataForChart(data: any[]): ChartData<'line'> {
    if (!data || data.length === 0) return { labels: [], datasets: [] };
  
    const colors = this.generateDynamicColors(data.length); // ✅ Generate colors once
  
    return {
      labels: data[0]?.roombookingearning.map((entry: any) => entry.date) || [],
      datasets: data.map((room, index) => ({
        label: room.room_name,
        data: room.roombookingearning.map((entry: any) => entry.earning),
        backgroundColor: colors[index], // ✅ Use pre-generated colors
        borderColor: colors[index], // ✅ Ensure border color is set
        pointBackgroundColor: colors[index], // ✅ Ensures points are visible
        pointBorderColor: colors[index], 
        borderWidth: 2, // ✅ Make the line more visible
        fill: false,
        tension: 0.4
      }))
    };
  }
  
  

  createChart(chartData: ChartData<'line'>): void {
    if (this.chartInstance) {
      this.chartInstance.destroy(); // Destroy previous chart instance if exists
    }

    this.chartInstance = new Chart(this.bookingChart.nativeElement, {
      type: 'line',
      data: chartData,
      options: {
        responsive: true,
        plugins: {
          legend: { display: true }
        },
        scales: {
          x: { title: { display: true, text: 'Dates' } },
          y: { title: { display: true, text: 'Earnings (₹)' }, beginAtZero: true }
        }
      }
    });
  }

  getMemberStatistics(): void {
    const payload = {
      startDate: this.memberStartDate == 'Invalid date' ? '' : this.memberStartDate || '',
      endDate: this.memberEndDate == 'Invalid date' ? '' : this.memberEndDate || '',
    };
  
    this._dashboardService.getMemberCounts(payload).subscribe(
      (response: any) => {
        if (response.IsSuccess && response.Data) {
          const chartData = this.transformMemberDataForChart(response.Data);
  
          setTimeout(() => {
            if (this.memberChart && this.memberChart.nativeElement) {
              this.updateOrCreateChart(chartData);
            } else {
              console.warn('Canvas element still not available, retrying...');
              setTimeout(() => this.updateOrCreateChart(chartData), 200);
            }
          }, 200);
        } else {
          this.noDataMessageForMember = 'No member data available.';
        }
      },
      (error: any) => {
        console.error('Error fetching data:', error);
        this.noDataMessageForMember = 'Failed to load data.';
      }
    );
  }
  
  

  transformMemberDataForChart(data: any): ChartData<'bar'> {
    if (!data || Object.keys(data).length === 0) return { labels: [], datasets: [] };
  
    const categories = Object.keys(data); // Get dynamic keys: ['primarymember', 'comember', 'gymmembers']
    const labels = data[categories[0]].map((entry: any) => entry.date); // Extract dates dynamically
  
    const colors = this.generateDynamicColors(categories.length); // Generate colors dynamically
  
    return {
      labels: labels,
      datasets: categories.map((category, index) => ({
        label: this.formatLabel(category), // Dynamically format labels
        data: data[category].map((entry: any) => entry.count ?? 0), // ✅ Ensure count defaults to 0
        backgroundColor: colors[index],
        borderColor: colors[index],
        borderWidth: 1
      }))
    };
  }
  
  
  formatLabel(key: string): string {
    const labelMap: { [key: string]: string } = {
      primarymember: 'Club Members',
      comember: 'Swim Members',
      gymmembers: 'GYM Members'
    };
    return labelMap[key] || key.charAt(0).toUpperCase() + key.slice(1);
  }
  
  updateOrCreateChart(chartData: ChartData<'bar'>): void {
    if (!this.memberChart || !this.memberChart.nativeElement) {
      console.warn('Canvas element is not yet initialized, retrying...');
      setTimeout(() => this.updateOrCreateChart(chartData), 200); // Retry after 200ms
      return;
    }
  
    if (this.chartMemberInstance) {
      this.chartMemberInstance.data = chartData;
      this.chartMemberInstance.update();
    } else {
      this.chartMemberInstance = new Chart(this.memberChart.nativeElement, {
        type: 'bar',
        data: chartData,
        options: {
          responsive: true,
          plugins: { legend: { display: true } },
          scales: {
            x: { title: { display: true, text: 'Dates' } },
            y: { title: { display: true, text: 'Member Count' }, beginAtZero: true }
          }
        }
      });
    }
  }

  getInquiryStatistics(): void {
    const payload = {
      startDate: this.inquiryStartDate == 'Invalid date' ? '' : this.inquiryStartDate || '',
      endDate: this.inquiryEndDate == 'Invalid date' ? '' : this.inquiryEndDate || '',
    };
  
    this._dashboardService.getInquiriesCount(payload).subscribe(
      (response: any) => {
        if (response.IsSuccess && response.Data) {
          const chartData = this.transformInquiryDataForChart(response.Data);
  
          setTimeout(() => {
            if (this.inquiryChart && this.inquiryChart.nativeElement) {
              this.updateOrCreateForInquiryChart(chartData);
            } else {
              console.warn('Canvas element still not available, retrying...');
              setTimeout(() => this.updateOrCreateForInquiryChart(chartData), 200);
            }
          }, 200);
        } else {
          this.noDataMessageForInquiry = 'No member data available.';
        }
      },
      (error: any) => {
        console.error('Error fetching data:', error);
        this.noDataMessageForInquiry = 'Failed to load data.';
      }
    );
  }
  
  

  transformInquiryDataForChart(data: any): ChartData<'bar'> {
    if (!data || Object.keys(data).length === 0) return { labels: [], datasets: [] };
  
    const categories = Object.keys(data); // Get dynamic keys: ['primarymember', 'comember', 'gymmembers']
    const labels = data[categories[0]].map((entry: any) => entry.date); // Extract dates dynamically
  
    const colors = this.generateDynamicColors(categories.length); // Generate colors dynamically
  
    return {
      labels: labels,
      datasets: categories.map((category, index) => ({
        label: this.formatLabelForInquiry(category), // Dynamically format labels
        data: data[category].map((entry: any) => entry.count ?? 0), // ✅ Ensure count defaults to 0
        backgroundColor: colors[index],
        borderColor: colors[index],
        borderWidth: 1
      }))
    };
  }
  
  
  formatLabelForInquiry(key: string): string {
    const labelMap: { [key: string]: string } = {
      clubinquiries: 'Club Inquiries',
      bookinginquiries: 'Booking Inquiries',
      eventinquiries: 'Event Inquiries'
    };
    return labelMap[key] || key.charAt(0).toUpperCase() + key.slice(1);
  }
  
  updateOrCreateForInquiryChart(chartData: ChartData<'bar'>): void {
    if (!this.inquiryChart || !this.inquiryChart.nativeElement) {
      console.warn('Canvas element is not yet initialized, retrying...');
      setTimeout(() => this.updateOrCreateChart(chartData), 200); // Retry after 200ms
      return;
    }
  
    if (this.chartInquiryInstance) {
      this.chartInquiryInstance.data = chartData;
      this.chartInquiryInstance.update();
    } else {
      this.chartInquiryInstance = new Chart(this.inquiryChart.nativeElement, {
        type: 'bar',
        data: chartData,
        options: {
          responsive: true,
          plugins: { legend: { display: true } },
          scales: {
            x: { title: { display: true, text: 'Dates' } },
            y: { title: { display: true, text: 'Inquiries Count' }, beginAtZero: true }
          }
        }
      });
    }
  }
  
  
  ngAfterViewInit(): void {
    this.getMemberStatistics(); // Call API after view initialization
    this.getInquiryStatistics();
    this.roomBookData.sort = this.roomBookSort;
  }

  getSalesThisMonthChart(): void {
    if (!this.salesIncomeThisMonth) return;

    // ✅ Use a separate context for this chart
    if (!this.salesChartContext) {
        this.salesChartContext = this.salesIncomeThisMonth.nativeElement.getContext('2d');
    }

    if (this.userSalesIncomeChart) {
        this.userSalesIncomeChart.destroy(); // ✅ Destroy the existing chart
    }

    // ✅ Create a new chart
    this.userSalesIncomeChart = new Chart(this.salesChartContext, {
        type: 'doughnut',
        data: {
            labels: this.roomLabels,
            datasets: [{
                data: this.earningsData,
                backgroundColor: this.chartColors // Apply dynamic colors
            }]
        }
    });
}




  getSalesThisMonth(): void {
    this._dashboardService.getCurrentMonthIncome({}).subscribe(
      (result: any) => {
        if (result && result.IsSuccess) {
          this.salesIncomeData = result.Data || [];

          // ✅ Extract room names & earnings with default values
          this.roomLabels = this.salesIncomeData.map((room: any) => room.room_name || 'Unknown');
          this.earningsData = this.salesIncomeData.map((room: any) => room.earning ?? 0); // Use `??` for safety

          // ✅ Calculate total earnings
          this.totalSaleEarnings = this.earningsData.reduce((acc, val) => acc + val, 0);

          // ✅ Generate dynamic colors
          this.chartColors = this.generateDynamicColors(this.salesIncomeData.length);

          // ✅ Generate / update chart
          this.getSalesThisMonthChart();
        } else {
          this._globalFunctions.successErrorHandling(result, this, true);
        }
      },
      (error: any) => {
        this._globalFunctions.errorHanding(error, this, true);
      }
    );
  }

  getTodaysBookingStatusChart(): void {
    if (!this.todaysBookingStatus) return;

    // ✅ Use a separate context for this chart
    if (!this.bookingChartContext) {
        this.bookingChartContext = this.todaysBookingStatus.nativeElement.getContext('2d'); 
    }

    const labels = ["Amenities Bookings", "Room Bookings", "Total Bookings"];
    const dataValues = [
        this.todaysBookingData?.todaysamenitiesbookings || 0,
        this.todaysBookingData?.todaysroomsbookings || 0,
        this.todaysBookingData?.totalbooking || 0
    ];

    if (this.userBookingStatusChart) {
        this.userBookingStatusChart.destroy(); // ✅ Destroy the existing chart
    }

    // ✅ Create a new chart
    this.userBookingStatusChart = new Chart(this.bookingChartContext, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: dataValues,
                backgroundColor: this.chartColors
            }]
        }
    });
}



  getTodaysBookingStatus(): void {
    this._dashboardService.getTodaysBookingCount({}).subscribe(
      (result: any) => {
        if (result && result.IsSuccess) {
          this.todaysBookingData = result.Data || {};

          // ✅ Generate dynamic colors
          this.chartColors = this.generateDynamicColors(3); // Fixed 3 categories

          // ✅ Generate / update chart
          this.getTodaysBookingStatusChart();
        } else {
          this._globalFunctions.successErrorHandling(result, this, true);
        }
      },
      (error: any) => {
        this._globalFunctions.errorHanding(error, this, true);
      }
    );
  }

  getBookingValue(index: number): number {
    if (!this.todaysBookingData) return 0;

    const values = [
      this.todaysBookingData?.todaysamenitiesbookings || 0,
      this.todaysBookingData?.todaysroomsbookings || 0,
      this.todaysBookingData?.totalbooking || 0
    ];

    return values[index];
  }


  // ✅ Function to generate random colors
  generateDynamicColors(length: number): string[] {
    const baseColors = ['#FFEBC2', '#C59D5F', '#5B3A29']; // Theme Colors
    const colors: string[] = [];

    for (let i = 0; i < length; i++) {
      colors.push(baseColors[i % baseColors.length]); // Reuse colors in a loop
    }

    return colors;
  }


  getRoomsList() {
    this._roomService.getRoomsWithoutPagination().subscribe((result: any) => {
      if (result && result.IsSuccess) {
        this.roomList = result?.Data;
      } else {
        this._globalFunctions.successErrorHandling(result, this, true);
      }
    }, (error: any) => {
      this._globalFunctions.errorHanding(error, this, true);
    });
  }

  getAmenityForBookingList() {
    // this._amenitiesServicesService.getAmenitiesServicesWTPGBooking().subscribe((result: any) => {
    //   if (result && result.IsSuccess) {
    //     this.amenityList = result?.Data;
    //   } else {
    //     this._globalFunctions.successErrorHandling(result, this, true);
    //   }
    // }, (error: any) => {
    //   this._globalFunctions.errorHanding(error, this, true);
    // });
  }

  filterData() {
    this.getCounts();
  }

  getCounts() {
    let obj: any = {
      members: this.selmembers || "", // pass Total Members Club Members Gym/Swim Members
      inquiries: this.selInquires || "", // pass Total Inquiries Club Inquiries Event Inquiries Booking Inquiries
      bookings: this.selBookings || "", // pass Total Bookings Room Bookings Amenities Bookings,
      room: this.selRoom || "", // pass All Rooms or roomid
      amenity: this.selAmenity || "" // pass All Amenities or mongoid
    }
    this._dashboardService.getAllCounts(obj).subscribe((result: any) => {
      if (result && result.IsSuccess) {
        this.dashboardCount = result?.Data;
      } else {
        this._globalFunctions.successErrorHandling(result, this, true);
      }
    }, (error: any) => {
      this._globalFunctions.errorHanding(error, this, true);
    });
  }

  getRoomBookingList(event: any = ''): void {
      // this.isTableLoading = true;
      // this.pageNo = event ? (event.page + 1) : 1;
      // this.limit = event.rows || 10;
      // let filter = {
      //   page: this.pageNo || '1',
      //   limit: this.limit || '10',
      //   search:  "",
      //   room_name:  "",
      //   status: "",
      //   startDate: "",
      //   endDate: "",
      // };
  
      // this._roomBookingService.getRoomBookWithPagination(filter).subscribe((result: any) => {
      //   if (result && result.IsSuccess) {
      //     this.totalRoomBook = result.Data.totalDocs;
      //     this.ROOMBOOK_DATA = result.Data.docs;
      //     this.roomBookData = new MatTableDataSource<RoomBookElement>(this.ROOMBOOK_DATA);
      //     this.roomBookData.sort = this.roomBookSort;
      //     this.isTableLoading = false;
      //   } else {
      //     this.isTableLoading = false;
      //     this._globalFunctions.successErrorHandling(result, this, true);
      //   }
      // }, (error: any) => {
      //   this.isTableLoading = false;
      //   this._globalFunctions.errorHanding(error, this, true);
      // });
    }

}
