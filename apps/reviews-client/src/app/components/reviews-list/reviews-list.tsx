import { useReviewsQuery } from '../../../queries/reviews/reviews';
import {
	Alert,
	Box,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	Typography,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { ReviewCard } from '../review-card/review-card';
import { ReviewCardSkeleton } from '../review-card-skeleton/review-card-skeleton';
import ReviewListPagination from '../review-list-pagination/review-list-pagination';

/* eslint-disable-next-line */
export interface ReviewsListProps {}

export function ReviewsList(props: ReviewsListProps) {
	const PAGE_LIMIT = 10;
	const [page, setPage] = useState(1);
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

	const query = useReviewsQuery(page, PAGE_LIMIT, sortOrder);

	const reviews = useMemo(() => {
		return query.data?.reviews || [];
	}, [query.data]);

	const pages = useMemo(() => {
		return (query.data?.reviewsCount || 0) / PAGE_LIMIT;
	}, [query.data]);

	const onSortChange = (event: SelectChangeEvent<'asc' | 'desc'>) => {
		setSortOrder(event.target.value as 'asc' | 'desc');
	};

	return (
		<Box sx={{ pt: 5 }}>
			{query.isLoading && <ReviewCardSkeleton />}
			{!query.isLoading && reviews.length === 0 && <Typography>There are no reviews</Typography>}
			{query.isError && (
				<Alert severity="error">An unknown error occured, please refresh and try again</Alert>
			)}

			<FormControl fullWidth>
				<InputLabel id="sort-select">Sort Order</InputLabel>
				<Select labelId="sort-select" value={sortOrder} label="Sort Select" onChange={onSortChange}>
					<MenuItem value="asc">Ascending</MenuItem>
					<MenuItem value="desc">Descending</MenuItem>
				</Select>
			</FormControl>
			<ReviewListPagination
				isFetching={query.isLoading || query.isFetching}
				page={page}
				pages={pages}
				onPageChange={setPage}
				hide={!query.isSuccess}
			/>

			<Grid container spacing={2}>
				{reviews.map((review) => (
					<ReviewCard key={review.id} data={review} />
				))}
			</Grid>
			<ReviewListPagination
				isFetching={query.isLoading || query.isFetching}
				page={page}
				pages={pages}
				onPageChange={setPage}
				hide={!query.isSuccess}
			/>
		</Box>
	);
}

export default ReviewsList;
