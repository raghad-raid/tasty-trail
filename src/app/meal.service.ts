import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class MealService {
  private API_URL = 'https://www.themealdb.com/api/json/v1/1';

  constructor(private http: HttpClient) {}

  getAllMeals(): Observable<any> {
  return this.http.get(`${this.API_URL}/search.php?s=`);
  }

  searchMeals(query: string): Observable<any> {
    return this.http.get(`${this.API_URL}/search.php?s=${query}`);
  }

  getMealById(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/lookup.php?i=${id}`);
  }


}
