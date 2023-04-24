import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, Observable, tap, throwError} from 'rxjs';
import {NikeData} from './nike-data';

@Injectable({
  providedIn: 'root',
})
export class NikerundataService {
  private productUrl = 'http://localhost:8080/api/nike/';

  constructor(private http: HttpClient) {
  }

  getProducts(pageNumber: number, pageSize: number): Observable<NikeData> {
    let finalUrl = this.productUrl + pageNumber + '/' + pageSize;
    return this.http.get<NikeData>(finalUrl).pipe(
      tap((data) => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
