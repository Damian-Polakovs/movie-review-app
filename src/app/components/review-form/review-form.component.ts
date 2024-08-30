import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent {
  @Input() movieId!: number;
  review = {
    reviewer: '',
    comment: '',
    rating: 0
  };

  constructor(private http: HttpClient) {}

  submitReview(): void {
    const reviewData = { ...this.review, movieId: this.movieId };
    this.http.post('http://YOUR_EC2_INSTANCE_IP:3000/reviews', reviewData).subscribe(
      response => {
        console.log('Review submitted', response);
      },
      error => {
        console.error('Error submitting review', error);
      }
    );
  }
}
