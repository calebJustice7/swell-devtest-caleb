import { useReviewsQuery } from '../../../queries/reviews/reviews';
import { Box, Grid } from '@mui/material';
import { useMemo, useState } from 'react';
import { ReviewCard } from '../review-card/review-card';
import { ReviewCardSkeleton } from '../review-card-skeleton/review-card-skeleton';
import ReviewListPagination from '../review-list-pagination/review-list-pagination';

/* eslint-disable-next-line */
export interface ReviewsListProps {}

export function ReviewsList(props: ReviewsListProps) {
	const PAGE_LIMIT = 10;
	const [page, setPage] = useState(1);
	const [sortOrder] = useState<'asc' | 'desc'>('desc');

	const query = useReviewsQuery(page, PAGE_LIMIT, sortOrder);

	const reviews = useMemo(() => {
		return query.data?.reviews || [];
	}, [query.data]);

	const pages = useMemo(() => {
		return (query.data?.reviewsCount || 0) / PAGE_LIMIT;
	}, [query.data]);

	return (
		<Box sx={{ pt: 5 }}>
			{query.isLoading && <ReviewCardSkeleton />}

			{query.isSuccess && <ReviewListPagination page={page} pages={pages} onPageChange={setPage} />}
			<Grid container spacing={2}>
				{reviews.map((review) => (
					<ReviewCard key={review.id} data={review} />
				))}
			</Grid>
			{query.isSuccess && <ReviewListPagination page={page} pages={pages} onPageChange={setPage} />}
		</Box>
	);
}

export default ReviewsList;
