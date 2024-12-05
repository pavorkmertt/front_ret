import { rtkApi } from "@/shared/api/rtkApi";
import {Ticket} from "@/entities/Ticket";

const ticketApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getTicketById: build.query<Ticket, string>({
            query: (id) => ({
                url: `/get-task/${id}`,
            }),
            providesTags: ["Ticket"],
        }),
    }),
});

export const useTicketById = ticketApi.useGetTicketByIdQuery;