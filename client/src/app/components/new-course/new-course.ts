import { Component } from '@angular/core';
import { CourseForm } from "../course-form/course-form";

@Component({
  selector: 'app-new-course',
  imports: [CourseForm],
  templateUrl: './new-course.html',
  styleUrl: './new-course.css',
})
export class NewCourse {}
