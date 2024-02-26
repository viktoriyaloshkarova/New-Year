import {QueryClient} from 'react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 3,
            retryDelay: 1000000,
        }
    }
})