import { render } from '@testing-library/react';
import ReviewListPagination from './review-list-pagination';
import ProviderWrapper from '../../../test/providerWrapper';

describe('ReviewListPagination', () => {
	it('should render successfully', () => {
		const { baseElement } = render(
			<ProviderWrapper hasReviews={true}>
				<ReviewListPagination
					hide={false}
					isFetching={false}
					onPageChange={(num: number) => {}}
					page={1}
					pages={10}
				/>
			</ProviderWrapper>,
		);
		expect(baseElement).toBeTruthy();
	});
});
