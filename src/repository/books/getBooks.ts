import { HttpResponse, http } from '@/lib/http';
import {useQuery} from '@tanstack/react-query';
import {Books, GetBooksRequest} from "@/model/books";

export const getBooks = async (request: GetBooksRequest) => {
    const response =
        await http.get<HttpResponse<Books[]>>(
            `/books/${request.genre}`, {
                params: {
                    limit: request.limit,
                    page: request.page,
                }
            }
        );

    return response.data.data;
};

export const useGetBooksQuery = (request: GetBooksRequest) => {
    return useQuery({
        queryKey: ['getBooks', request],
        queryFn: () => getBooks(request)
    });
};
