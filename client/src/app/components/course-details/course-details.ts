import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ICourseModel } from '../../models/icourse.model';
import { CoursesService } from '../../services/courses';
import { CurrencyPipe, SlicePipe, UpperCasePipe } from '@angular/common';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-course-details',
  imports: [SlicePipe, UpperCasePipe, CurrencyPipe, RouterLink],
  templateUrl: './course-details.html',
  styleUrl: './course-details.css',
})
export class CourseDetails {
  deleteModal = viewChild<ElementRef>('deleteModal');

  course = signal<ICourseModel | null>(null);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private router: Router,
    private toastService: ToastService,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.loading.set(true);
    this.error.set(null);

    this.coursesService.getCourseByID(id).subscribe({
      next: (res) => {
        this.course.set(res.data);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.message);
      },
    });
  }

  openDeleteModal() {
    this.deleteModal()!.nativeElement.showModal();
  }

  deleteCourse(id: string) {
    this.loading.set(true);
    this.error.set(null);
    this.coursesService.deleteCourse(id).subscribe({
      next: (res) => {
        this.loading.set(false);
        this.toastService.success('Course deleted successfully');
        this.router.navigate(['/order']);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.message);
        this.toastService.error('Something went wrong');
      },
    });
  }
}
