import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

interface ProviderWrapperProps {
	children: React.ReactNode;
	hasReviews: boolean;
}

const Wrapper = ({ children, hasReviews }: ProviderWrapperProps) => {
	useQuery(['reviews'], {
		queryFn: () => {
			return {
				reviewCount: hasReviews ? 1 : 0,
				reviews: hasReviews
					? [
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
						]
					: [],
			};
		},
		retry: false,
	});

	return children;
};

const ProviderWrapper = ({ children, hasReviews }: ProviderWrapperProps) => {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<Wrapper hasReviews={hasReviews}>{children}</Wrapper>
		</QueryClientProvider>
	);
};

export default ProviderWrapper;
