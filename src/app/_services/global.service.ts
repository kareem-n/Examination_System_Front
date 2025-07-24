import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  registerDialogVisible = new BehaviorSubject<boolean>(false) ;
  sender = this.registerDialogVisible.asObservable();

  setRegisterVisible(state:boolean){
    this.registerDialogVisible.next(state) ;
  }

  constructor() { }
}
