import { inject, Injectable, signal } from '@angular/core';
import { ICourseModel } from '../models/icourse.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  httpClient = inject(HttpClient);

  totalOrderPrice = signal<number>(0);

  getCourses(): Observable<{ data: ICourseModel[]; success: boolean }> {
    return this.httpClient.get<{ data: ICourseModel[]; success: boolean }>(
      `${environment.baseAPIURL}/courses`,
    );
  }

  getCoursesByCatID(catId: string): Observable<{ data: ICourseModel[]; success: boolean }> {
    if (catId === '0') return this.getCourses();

    return this.httpClient.get<{ data: ICourseModel[]; success: boolean }>(
      `${environment.baseAPIURL}/courses/category/${catId}`,
    );
  }

  getCourseByID(id: string): Observable<{ data: ICourseModel; success: boolean }> {
    return this.httpClient.get<{ data: ICourseModel; success: boolean }>(
      `${environment.baseAPIURL}/courses/${id}`,
    );
  }

  createCourse(newCourse: ICourseModel): Observable<{ data: ICourseModel; success: boolean }> {
    return this.httpClient.post<{ data: ICourseModel; success: boolean }>(
      `${environment.baseAPIURL}/courses`,
      newCourse,
    );
  }

  updateCourse(id: string, updatedCourse: ICourseModel): Observable<ICourseModel> {
    return this.httpClient.patch<ICourseModel>(
      `${environment.baseAPIURL}/courses/${id}`,
      updatedCourse,
    );
  }

  updateCourseSeats(id: string, seats: number): Observable<ICourseModel> {
    return this.httpClient.patch<ICourseModel>(`${environment.baseAPIURL}/courses/${id}`, {
      seats,
    });
  }

  deleteCourse(id: string): Observable<{ success: boolean }> {
    return this.httpClient.delete<{ success: boolean }>(`${environment.baseAPIURL}/courses/${id}`);
  }
}
