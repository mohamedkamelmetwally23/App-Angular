import { Component, inject, OnInit, signal } from '@angular/core';
import { CourseForm } from '../course-form/course-form';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CoursesService } from '../../services/courses';
import { ICourseModel } from '../../models/icourse.model';

@Component({
  selector: 'app-edit-course',
  imports: [CourseForm, RouterLink],
  templateUrl: './edit-course.html',
  styleUrl: './edit-course.css',
})
export class EditCourse implements OnInit {
  courseId: string | null = null;
  courseService = inject(CoursesService);

  course!: ICourseModel;
  loading = signal(false);

  constructor(private activatedRoute: ActivatedRoute) {
    this.courseId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this.courseId) {
      this.loading.set(true);

      this.courseService.getCourseByID(this.courseId).subscribe((res) => {
        this.course = res.data;
        this.loading.set(false);
      });
    }
  }
}
