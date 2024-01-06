import { render, screen } from '@testing-library/react';
import { ReviewCard } from './review-card';
import ProviderWrapper from '../../../test/providerWrapper';
import { ReviewExt } from '../../../queries/reviews/reviews-types';

describe('ReviewCard', () => {
	const review: ReviewExt = {
		company: {
			id: '',
			name: '',
		},
		companyId: '',
		createdOn: new Date().toString(),
		id: '',
		rating: 4,
		reviewerId: '',
		reviewText: '',
		user: {
			email: '',
			firstName: '',
			id: '',
			lastName: '',
		},
	};

	it('should render successfully', () => {
		const { baseElement } = render(
			<ProviderWrapper hasReviews={true}>
				<ReviewCard data={review} />
			</ProviderWrapper>,
		);
		expect(baseElement).toBeTruthy();
	});

	it('should display nothing for the review text', async () => {
		render(
			<ProviderWrapper hasReviews={true}>
				<ReviewCard data={review} />
			</ProviderWrapper>,
		);
		expect(await screen.findByTestId('review-text')).toBeInTheDocument();
	});

	it('should have a review text', async () => {
		render(
			<ProviderWrapper hasReviews={true}>
				<ReviewCard data={{ ...review, reviewText: 'Text' }} />
			</ProviderWrapper>,
		);
		expect(await screen.findByText('Text')).toBeInTheDocument();
	});
});
