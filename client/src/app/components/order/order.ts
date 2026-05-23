import { CurrencyPipe } from '@angular/common';
import { Component, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICategory } from '../../models/icategory';
import { Categories } from '../../services/categories';
import { CoursesService } from '../../services/courses';
import { Courses } from '../courses/courses';

@Component({
  selector: 'app-order',
  imports: [Courses, FormsModule, CurrencyPipe, RouterLink],
  templateUrl: './order.html',
  styleUrl: './order.css',
})
export class Order implements OnInit, OnDestroy {
  private categoriesService = inject(Categories);
  coursesService = inject(CoursesService);

  private subscription!: Subscription;

  selectedCateforyId: string = '0';
  orderPrice: number = 0;
  categories = signal<ICategory[]>([]);

  constructor() {
    effect(() => {
      this.orderPrice = this.coursesService.totalOrderPrice();
    });
  }

  ngOnInit(): void {
    this.subscription = this.categoriesService.getAllCategories().subscribe(({ data }) => {
      this.categories.set(data);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
