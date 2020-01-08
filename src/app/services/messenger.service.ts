import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {
  public searchKeyWordSubject: BehaviorSubject<string> = new BehaviorSubject(''); 
  public spreadNewSearchKeyWord(newKeyword: string) {
      this.searchKeyWordSubject.next(newKeyword);
  }

  public getNewSearchKeyWord(): Observable<string> {
    return this.searchKeyWordSubject.asObservable();
  }
}
