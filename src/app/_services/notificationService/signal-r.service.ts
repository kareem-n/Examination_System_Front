import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import * as SignalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { IGlobalResponse } from '../../interfaces/globalResponse';
import { INotification } from '../../interfaces/INotifcations';
@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  baseUrl = 'https://localhost:7109';
  hubConnection!: SignalR.HubConnection;
  // $messages = new BehaviorSubject<{ label: string }[]>([]);
  // messagesContainer = this.$messages.asObservable();

  GetNotifcations() {
    return this.http.get<IGlobalResponse<INotification[]>>(this.baseUrl + '/api/Notification/notifcations', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  startConnection() {
    this.hubConnection = new SignalR.HubConnectionBuilder()
      .withUrl(this.baseUrl + '/hub/not', {
        accessTokenFactory: () => localStorage.getItem('token')!,
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('test');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onReceiveNotification(callback: (message: INotification) => void) {
    this.hubConnection.on('ReceiveMessage', callback);
  }

  stopConnection() {
    if (this.hubConnection) {
      this.hubConnection.stop();
    }
  }

  constructor(private http: HttpClient) {}
}
