import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { AppSettings } from '../config/settings';

@Injectable({
  providedIn: 'root',
})
export class GameService {

  constructor(private http: HttpClient) {}

  getTasks(): Observable<string[]> {
    return this.http.get<{ values: string[] }>(`${AppSettings.API_ENDPOINT}/tasks`).pipe(
      tap((tasks) => console.log(tasks)),
      map((tasks) => tasks.values)
    );
  }
}
