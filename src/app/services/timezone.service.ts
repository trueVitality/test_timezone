import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TimezoneInterface } from '../interfaces/timezone.interface';

@Injectable({
  providedIn: 'root',
})
export class TimezoneService {

  private apiUrl = 'https://timeapi.io/api/timezone';

  constructor(private http: HttpClient) { }

  getTimezones(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/availabletimezones`);
  }

  getTimezoneInfo(term: string): Observable<TimezoneInterface> {
    const options = term ? { params: new HttpParams().set('timeZone', term) } : {};
    return this.http.get<TimezoneInterface>(`${this.apiUrl}/zone`, options);
  }

  getLocalTimeZone(): Observable<TimezoneInterface> {
    return this.http.get<TimezoneInterface>(`${this.apiUrl}/zone?timeZone=Europe%2FKyiv`)
  }
}
