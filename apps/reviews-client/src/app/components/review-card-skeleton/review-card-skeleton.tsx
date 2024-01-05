import { Grid } from '@mui/material';
import Skeleton from 'react-loading-skeleton';

export interface ReviewCardSkeletonProps {}

export function ReviewCardSkeleton(props: ReviewCardSkeletonProps) {
	const WIDTH = window.innerWidth / 4;
	return (
		<Grid container display="flex" justifyContent="center" spacing={2}>
			<Grid item>
				<Skeleton height={50} width={WIDTH} />
				<Skeleton height={150} width={WIDTH} />
				<Skeleton height={50} width={WIDTH} />
			</Grid>
			<Grid item>
				<Skeleton height={50} width={WIDTH} />
				<Skeleton height={150} width={WIDTH} />
				<Skeleton height={50} width={WIDTH} />
			</Grid>
		</Grid>
	);
}
