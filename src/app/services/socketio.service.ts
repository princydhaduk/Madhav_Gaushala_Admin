import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  private socket: any;

  constructor() {
    this.socket = io(environment.SOCKET_ENDPOINT);
   }

   listenEventOrChannelId(channelId: any): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.on(channelId, (message: any) => {
        observer.next(message);
      });
    });
  }
}
