import { Review, Company, User } from '@prisma/client';

export interface ReviewExt extends Review {
	company: Company;
	user: User;
}

export interface ReviewsCountResponse {
	reviewsCount: number;
}

export interface ReviewsResponse extends ReviewsCountResponse {
	reviews: ReviewExt[];
}
