import { render } from '@testing-library/react';
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
});
