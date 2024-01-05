import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { DatabaseModule } from '../database/database.module';
import { DatabaseService } from '../database/database.service';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';

describe('ReviewsController', () => {
	const user1Id = 'user-1';
	const user2Id = 'user-2';
	const company1Id = 'company-1';
	const company2Id = 'company-2';

	let app: INestApplication;
	let prisma: DatabaseService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [DatabaseModule],
			controllers: [ReviewsController],
			providers: [ReviewsService],
		}).compile();

		app = module.createNestApplication();
		prisma = module.get<DatabaseService>(DatabaseService);
		await app.init();

		await prisma.$transaction([
			prisma.user.create({
				data: { id: user1Id, email: 'user1@example.com' },
			}),
			prisma.user.create({
				data: { id: user2Id, email: 'user2@example.com' },
			}),
			prisma.company.create({
				data: { id: company1Id, name: 'Test Company' },
			}),
			prisma.company.create({
				data: { id: company2Id, name: 'Test Company 2' },
			}),
			prisma.review.create({
				data: {
					id: '1',
					reviewerId: user1Id,
					companyId: company1Id,
					createdOn: '2020-01-01T00:00:00.000Z',
				},
			}),
			prisma.review.create({
				data: {
					id: '3',
					reviewerId: user2Id,
					companyId: company1Id,
					createdOn: '2022-01-01T00:00:00.000Z',
				},
			}),
			prisma.review.create({
				data: {
					id: '2',
					reviewerId: user2Id,
					companyId: company2Id,
					createdOn: '2021-01-01T00:00:00.000Z',
				},
			}),
		]);
	});

	afterEach(async () => {
		await prisma.review.deleteMany({ where: {} });
		await prisma.user.deleteMany({ where: {} });
		await prisma.company.deleteMany({ where: {} });
	});

	describe('getReviewsCount()', () => {
		it('should return number of reviews', async () => {
			const response = await request(app.getHttpServer()).get('/reviews/count');
			expect(response.status).toBe(200);
			expect(response.body.reviewsCount).toBe(3);
		});
	});

	describe('getReviews()', () => {
		it('should fetch first page of reviews', async () => {
			const response = await request(app.getHttpServer()).get('/reviews?limit=10&page=1&sort=desc');
			expect(response.status).toBe(200);
			expect(response.body.reviews).toHaveLength(3);
		});

		it('should fetch reviews in asc order by createdOn', async () => {
			const response = await request(app.getHttpServer()).get('/reviews?limit=10&page=1&sort=asc');
			expect(response.status).toBe(200);
			expect(new Date(response.body.reviews[0].createdOn).getTime()).toBeLessThan(
				new Date(response.body.reviews[2].createdOn).getTime(),
			);
			expect(new Date(response.body.reviews[2].createdOn).getTime()).toBeGreaterThan(
				new Date(response.body.reviews[1].createdOn).getTime(),
			);
		});

		it('should fetch reviews in desc order by createdOn', async () => {
			const response = await request(app.getHttpServer()).get('/reviews?limit=10&page=1&sort=desc');
			expect(response.status).toBe(200);
			expect(new Date(response.body.reviews[2].createdOn).getTime()).toBeLessThan(
				new Date(response.body.reviews[0].createdOn).getTime(),
			);
			expect(new Date(response.body.reviews[1].createdOn).getTime()).toBeGreaterThan(
				new Date(response.body.reviews[2].createdOn).getTime(),
			);
		});

		it('should join company onto review', async () => {
			const response = await request(app.getHttpServer()).get('/reviews?limit=10&page=1&sort=desc');
			expect(response.status).toBe(200);
			expect(response.body.reviews[0].company.id).toBeDefined();
			expect(response.body.reviews[1].company.id).toBeDefined();
		});

		it('should join user onto review', async () => {
			const response = await request(app.getHttpServer()).get('/reviews?limit=10&page=1&sort=desc');
			expect(response.status).toBe(200);
			expect(response.body.reviews[0].user.id).toBeDefined();
			expect(response.body.reviews[1].user.id).toBeDefined();
		});
	});
});
