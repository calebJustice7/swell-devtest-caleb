import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ReviewsService {
	constructor(private prisma: DatabaseService) {}

	getReviews(page: number, limit: number, sort: 'asc' | 'desc') {
		return this.prisma.review.findMany({
			include: {
				user: true,
				company: true,
			},
			orderBy: {
				createdOn: sort,
			},
			skip: page * limit - limit,
			take: limit,
		});
	}

	getReviewsCount() {
		return this.prisma.review.count();
	}
}
