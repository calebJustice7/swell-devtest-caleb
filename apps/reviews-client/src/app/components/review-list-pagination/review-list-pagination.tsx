import { Box, Pagination } from '@mui/material';
import { ChangeEvent } from 'react';

interface ReviewListPaginationProps {
	onPageChange: (page: number) => void;
	page: number;
	pages: number;
}

export default function ReviewListPagination({
	onPageChange,
	page,
	pages,
}: ReviewListPaginationProps) {
	const handlePageChange = (_e: ChangeEvent<unknown>, page: number) => {
		onPageChange(page);
	};

	return (
		<Box display="flex" justifyContent="center" sx={{ my: 2 }}>
			<Pagination page={page} count={pages} color="primary" onChange={handlePageChange} />
		</Box>
	);
}
