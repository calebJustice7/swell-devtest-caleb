import { useQueryClient } from '@tanstack/react-query';
import QueryClientWrapper from '../queries/query-client-wrapper';

interface ProviderWrapperProps {
	children: React.ReactNode;
	hasReviews: boolean;
}

const Wrapper = ({ children, hasReviews }: ProviderWrapperProps) => {
	const queryClient = useQueryClient();
	if (hasReviews) {
		queryClient.setQueryData(['reviews', 1, 'desc'], {
			reviews: [
				{
					company: {
						id: '1',
						name: 'Test',
					},
					companyId: '1',
					createdOn: new Date().toString(),
					id: '1',
					rating: 4,
					reviewerId: '1',
					reviewText: 'Test',
					user: {
						email: 'Test',
						firstName: 'Test',
						id: '1',
						lastName: 'Test',
					},
				},
			],
			reviewCount: 0,
		});
	}

	return children;
};

const ProviderWrapper = ({ children, hasReviews }: ProviderWrapperProps) => {
	return (
		<QueryClientWrapper>
			<Wrapper hasReviews={hasReviews}>{children}</Wrapper>
		</QueryClientWrapper>
	);
};

export default ProviderWrapper;
