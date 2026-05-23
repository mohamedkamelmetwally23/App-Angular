import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../models/icategory';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Categories {
  httpClient = inject(HttpClient);

  getAllCategories(): Observable<{ success: boolean; data: ICategory[] }> {
    return this.httpClient.get<{ success: boolean; data: ICategory[] }>(
      `${environment.baseAPIURL}/categories`,
    );
  }
}
