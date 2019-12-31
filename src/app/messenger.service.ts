import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {
  private searchKeyWordSubject: BehaviorSubject<string> = new BehaviorSubject(''); 
    public searchKeyWordObservable = this.searchKeyWordSubject.asObservable();
    public spreadNewSearchKeyWord(newKeyword: string) {
        this.searchKeyWordSubject.next(newKeyword);
    }
}
