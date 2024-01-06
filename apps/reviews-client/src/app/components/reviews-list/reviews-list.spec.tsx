import { render, screen } from '@testing-library/react';
import ReviewsList from './reviews-list';
import ProviderWrapper from '../../../test/providerWrapper';

const timeout = () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, 1000);
	});
};

describe('ReviewsList', () => {
	it('should render successfully', async () => {
		await timeout();

		const { baseElement } = render(
			<ProviderWrapper hasReviews={true}>
				<ReviewsList />
			</ProviderWrapper>,
		);
		expect(baseElement).toBeTruthy();
	});

	it('should display a message if no reviews are found', async () => {
		await timeout();

		render(
			<ProviderWrapper hasReviews={false}>
				<ReviewsList />
			</ProviderWrapper>,
		);
		expect(await screen.findByText('There are no reviews')).toBeInTheDocument();
	});
});
