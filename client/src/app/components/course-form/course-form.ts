import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { ICategory } from '../../models/icategory';
import { ICourseModel } from '../../models/icourse.model';
import { Categories } from '../../services/categories';
import { CoursesService } from '../../services/courses';

@Component({
  selector: 'app-course-form',
  imports: [FormsModule],
  templateUrl: './course-form.html',
  styleUrl: './course-form.css',
})
export class CourseForm implements OnInit {
  categoriesService = inject(Categories);
  courseService = inject(CoursesService);
  router = inject(Router);
  toastService = inject(ToastService);

  recievedCourse = input<ICourseModel>({} as ICourseModel);

  categories = signal<ICategory[]>([]);
  loading = signal<boolean>(false);

  course: ICourseModel = {} as ICourseModel;

  ngOnInit(): void {
    // Load Categories
    this.categoriesService.getAllCategories().subscribe((res) => {
      this.categories.set(res.data);
    });

    if (this.recievedCourse().id) {
      this.course = { ...this.recievedCourse() };
      this.course.catId = this.recievedCourse().catId.id;
    }
  }

  onSubmit(): void {
    this.loading.set(true);

    if (this.course.id) {
      this.courseService.updateCourse(this.course.id, this.course).subscribe({
        next: () => {
          this.toastService.success('Course updated successfully');
          this.loading.set(false);
          this.router.navigate(['/course/', this.course.id]);
        },

        error: (err) => {
          this.toastService.error('Something went wrong!');
          this.loading.set(false);
          console.log(err);
        },
      });
    } else {
      this.courseService.createCourse(this.course).subscribe({
        next: (res) => {
          this.toastService.success('Course added successfully');
          this.loading.set(false);
          this.router.navigate(['/order']);
        },

        error: (err) => {
          this.toastService.error('Something went wrong!');
          this.loading.set(false);
          console.log(err);
        },
      });
    }
  }
}
