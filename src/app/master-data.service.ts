import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {
  constructor(private http: HttpClient) {}

  getMasterProjects(): Observable<any[]> {
    return this.http.get<any[]>('api/master-projects'); // Replace with your API endpoint
  }

  getMasterActivities(): Observable<any[]> {
    return this.http.get<any[]>('api/master-activities'); // Replace with your API endpoint
  }
}

