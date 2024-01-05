import { Card, Grid, CardContent, Typography, Box, Divider, Rating } from '@mui/material';
import { ReviewExt } from '../../../queries/reviews/reviews-types';
import moment from 'moment';

export interface ReviewCardProps {
	data: ReviewExt;
}

export function ReviewCard({ data }: ReviewCardProps) {
	return (
		<Grid item xs={12} sm={6}>
			<Card sx={{ backgroundColor: '#202124' }}>
				<CardContent>
					<Box display="flex" alignItems="center" justifyContent="space-between">
						<Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
							{data.user.firstName} {data.user.lastName}
						</Typography>
						<Typography variant="caption" color="white">
							{moment(new Date(data.createdOn)).fromNow()}
						</Typography>
					</Box>
					<Divider sx={{ my: 1 }} />
					<Typography color="white" sx={{ fontWeight: 600 }}>
						{data.company.name}
					</Typography>
					<Typography sx={{ fontSize: 12, fontWeight: 300, mt: 1 }} color="#dadfea" gutterBottom>
						{data.reviewText}
					</Typography>
					{data.reviewText && <Divider sx={{ my: 1 }} />}

					<Rating value={data.rating} readOnly />
				</CardContent>
			</Card>
		</Grid>
	);
}
