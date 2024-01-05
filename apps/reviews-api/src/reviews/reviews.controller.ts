import { Controller, Get, Query } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsCountResponse, ReviewsQuery, ReviewsResponse } from './reviews.types';

@Controller('reviews')
export class ReviewsController {
	constructor(private reviewsService: ReviewsService) {}

	@Get('/')
	async getReviews(@Query() query: ReviewsQuery): Promise<ReviewsResponse> {
		const reviews = await this.reviewsService.getReviews(
			Number(query.page),
			Number(query.limit),
			query.sort,
		);
		const reviewsCount = await this.reviewsService.getReviewsCount();
		return { reviews, reviewsCount };
	}

	@Get('/count')
	async getReviewsCount(): Promise<ReviewsCountResponse> {
		const reviewsCount = await this.reviewsService.getReviewsCount();
		return { reviewsCount };
	}
}
