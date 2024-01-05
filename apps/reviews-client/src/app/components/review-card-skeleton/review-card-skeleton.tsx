import { Grid } from '@mui/material';
import Skeleton from 'react-loading-skeleton';

export interface ReviewCardSkeletonProps {}

export function ReviewCardSkeleton(props: ReviewCardSkeletonProps) {
	return (
		<Grid display="flex" container justifyContent="space-between" spacing={2}>
			<Skeleton height={250} width={300} count={1} />
			<Skeleton height={250} width={300} count={1} />
			<Skeleton height={250} width={300} count={1} />
		</Grid>
	);
}
