import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createReview, getProductReviews } from './reviewApi.js';

export const useReviews = (productId) => {
  return useQuery({
    queryKey: ['reviews', productId],
    queryFn: () => getProductReviews(productId),
    enabled: !!productId,
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, comment, rating }) =>
      createReview({ productId, comment, rating }),
    onSuccess: (_data, variables) => {
      // IMPORTANT: use the instance, not the class
      queryClient.invalidateQueries(['reviews', variables.productId]);
    },
  });
};
