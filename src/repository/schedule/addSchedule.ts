import { HttpResponse, http } from '@/lib/http';
import { Books } from '@/model/books';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {ScheduleSchema} from "@/model/schedule";

export const addSchedule = async (request: ScheduleSchema) => {
    await http.post<HttpResponse<Books>>(
        '/schedule',
        request
    );
};

export const useAddScheduleMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (request: ScheduleSchema) => addSchedule(request),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getAdminBookingSummary'] });
        }
    });
};