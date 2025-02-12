import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

interface Data {
  id: number;
  slno: number;
  project: string;
  activity: number;
  starttime: string;
  endtime: string;
  status: string;
  priority: number;
  remarks: string;
  important: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:8080/tasktracker';

  constructor(private http: HttpClient) {}

  getCategorizedTasks(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/categorized`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getData(): Observable<Data[]> {
    return this.http.get<Data[]>(this.apiUrl).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getSingleData(id: number): Observable<Data> {
    return this.http.get<Data>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  updateTask(task: Data): Observable<any> {
    return this.http.put(`${this.apiUrl}/${task.id}`, task).pipe(
      catchError(this.handleError)
    );
  }

  createTask(task: Data): Observable<any> {
    return this.http.post(this.apiUrl, task).pipe(
      catchError(this.handleError)
    );
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
