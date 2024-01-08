import { render, screen } from '@testing-library/react';
import ReviewsList from './reviews-list';
import ProviderWrapper from '../../../test/providerWrapper';

describe('ReviewsList', () => {
	it('should render successfully', async () => {
		const { baseElement } = render(
			<ProviderWrapper hasReviews={true}>
				<ReviewsList />
			</ProviderWrapper>,
		);

		expect(baseElement).toBeInTheDocument();
	});

	it('should display a message if no reviews are found', async () => {
		render(
			<ProviderWrapper hasReviews={true}>
				<ReviewsList />
			</ProviderWrapper>,
		);

		expect(await screen.findByText('There are no reviews')).toBeInTheDocument();
	});
});
