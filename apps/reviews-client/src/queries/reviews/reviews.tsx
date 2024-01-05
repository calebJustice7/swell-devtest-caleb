import { useQuery } from '@tanstack/react-query';
import api from '../../api/api';
import { ReviewsResponse } from './reviews-types';

export const useReviewsQuery = (page: number, limit: number, sort: 'asc' | 'desc') => {
	const QUERY_KEY = ['reviews', page, sort];

	const getReviews = async (): Promise<ReviewsResponse> => {
		return api.get('/reviews', { params: { page, limit, sort } }).then((res) => res.data);
	};

	return useQuery([QUERY_KEY], { queryFn: getReviews, keepPreviousData: true });
};
