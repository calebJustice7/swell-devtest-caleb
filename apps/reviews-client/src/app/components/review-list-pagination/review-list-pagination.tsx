import { Box, CircularProgress, Pagination } from '@mui/material';
import { ChangeEvent } from 'react';

interface ReviewListPaginationProps {
	onPageChange: (page: number) => void;
	page: number;
	pages: number;
	isFetching: boolean;
	hide: boolean;
}

export default function ReviewListPagination({
	onPageChange,
	page,
	pages,
	isFetching,
	hide,
}: ReviewListPaginationProps) {
	const handlePageChange = (_e: ChangeEvent<unknown>, page: number) => {
		onPageChange(page);
	};

	if (hide) return null;

	return (
		<Box display="flex" justifyContent="center" sx={{ my: 2 }} alignItems="center">
			<Pagination page={page} count={pages} color="primary" onChange={handlePageChange} />
			<CircularProgress color="primary" sx={{ opacity: isFetching ? '100%' : '0' }} />
		</Box>
	);
}
