import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import axios from 'axios';

export const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error) => {
            if (axios.isAxiosError(error) && error.response?.status === 400) {
                toast.error(error.response.data.error.details.map((err: never) => err).join('\n'));
            }

            return;
        }
    }),
    mutationCache: new MutationCache({
        onError: (error, _var, _context, mutation) => {
            if (axios.isAxiosError(error) && error.response?.status === 400) {
                toast.error(error.response.data.error.details.map((err: any) => err).join('\n'));
            }

            return;
        }
    })
});