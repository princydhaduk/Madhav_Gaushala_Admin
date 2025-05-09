import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalculatorComponent } from './calculator/calculator.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from './content.service';
import { GlobalFunctions } from '../common/global-function';
import { CONSTANTS } from '../common/constants';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  //styleUrls: [: './content.component.scss'
})
export class ContentComponent implements OnInit {

  mainMenuList: any = [
    {
      menuName: 'Members',
      routerLink: '',
      isOpen: false,
      heightConfig: 'h-[100px] active',
      isView: false,
      icon: 'icon-member_fill',
    },
    {
      menuName: 'Inquiry',
      routerLink: '',
      isOpen: false,
      heightConfig: 'h-[100px] active',
      isView: false,
      icon: 'icon-enquiry_fill',
    },
    {
      menuName: 'Master',
      routerLink: '',
      isOpen: false,
      heightConfig: 'h-[100px] active',
      isView: false,
      icon: 'icon-user_master_fill',
    },
    {
      menuName: 'Role & Permissions',
      routerLink: '',
      isOpen: false,
      heightConfig: 'h-[100px] active',
      isView: false,
      icon: 'icon-role_fill',
    },
  ]

  preDefinedMenuList: any = [
    {
      displayName: 'Rooms',
      routerLink: 'rooms',
      isView: false,
      menuName: 'Hotels',
    },
    {
      displayName: 'Settings',
      routerLink: 'settings',
      isView: false,
      menuName: 'Master',
    },
    {
      displayName: 'Create Admins',
      routerLink: 'admin-user',
      isView: false,
      menuName: 'Role & Permissions',
    },
    {
      displayName: 'Create Roles',
      routerLink: 'role-permission',
      isView: false,
      menuName: 'Role & Permissions',
    }
  ];

  displayMenu: any = [];
  displayMainMenu: any = [];
  pageTitle: any;
  isActive: boolean = false;
  roleData: any = [];
  menuListByPermission: any = [];
  userData: any;
  constants: any = CONSTANTS;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private _contentService: ContentService,
    private _globalFunctions: GlobalFunctions
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      let route: ActivatedRoute = this.router.routerState.root;
      let routerTitle = '';
      while (route!.firstChild) {
        route = route.firstChild;
      }
      if (route.snapshot.data['title']) {
        routerTitle = route!.snapshot.data['title'];
      }
      this.pageTitle = routerTitle;
    })
    this.onResize();

    //Dynamic menu based on permission
    this.getUserProfileData();
  }

  getUserProfileData() {
    this._contentService.getProfile().subscribe((result: any) => {
      if (result && result.IsSuccess) {
        this.userData = result?.Data;
        localStorage.setItem('rolePermission', window.btoa(JSON.stringify(result?.Data?.roleid)));
        this.roleData = localStorage.getItem('rolePermission')
          ? JSON.parse(window.atob(localStorage.getItem('rolePermission') || ''))
          : null;
        this.menuListByPermission = this.roleData.permissions;
        this.mapMenuByPermission(this.menuListByPermission);
      } else {
        this._globalFunctions.successErrorHandling(result, this, true);
      }
    }, (error: any) => {
      this._globalFunctions.errorHanding(error, this, true);
    });
  }

  onResize(event: any = '') {
    if (window.innerWidth <= 1440) {
      this.isActive = false;
    } else {
      this.isActive = true;
    }
  }

  calculateHeight(menu: any): string {
    // Count the number of inner menus for the current menu
    const count = this.preDefinedMenuList.filter((inmenu: any) => inmenu.menuName === menu.menuName).length;

    // Each inner menu has a height of 40px, so multiply by 40
    return `h-[${count * 80}px]`;
  }

  collapseOtherMenu(e: any) {
    this.mainMenuList.map((i: any) => {
      if (e.menuName == i.menuName) {
        i.isOpen = !i.isOpen;
      } else {
        i.isOpen = false;
      }
    });
  }

  mapMenuByPermission(menuList: any) {
    if (menuList) {
      menuList.map((i: any) => {
        this.preDefinedMenuList.map((item: any) => {
          if (i.displayname === item.displayName && i.view) {
            item.isView = true;
          }
        });
      });
      this.displayMenu = this.preDefinedMenuList.filter(
        (item: any) => item.isView === true
      );

      this.mainMenuList.map((i: any) => {
        this.displayMenu.map((item: any) => {
          if (i.menuName === item.menuName) {
            i.isView = true;
          }
        });
      });
      this.displayMainMenu = this.mainMenuList.filter(
        (item: any) => item.isView === true
      );

      this.mainMenuList.map((i: any) => {
        let standAloneMenu = menuList?.find(
          (item: any) => item?.displayname === i?.menuName && item?.view
        );
        if (standAloneMenu) {
          this.displayMainMenu.push(i);
        }
      });
      this.displayMainMenu = this.displayMainMenu.filter(
        (item: any) => item != undefined
      );
    }
  }

  toggleMenu(menu: any) {
    // Close all other menus before opening the selected one
    this.mainMenuList.forEach((m: any) => {
      if (m !== menu) {
        m.isOpen = false;
      }
    });
    menu.isOpen = !menu.isOpen;
  }

  isLogout() {
    localStorage.removeItem("accessToken");
    localStorage.clear();
    this.toastr.success("Logout Successfully..", 'Success')
    this.router.navigate(['/login']);
  }

  openCalculator() {
    this.dialog.open(CalculatorComponent, {
      width: '385px',
    });
  }
}
