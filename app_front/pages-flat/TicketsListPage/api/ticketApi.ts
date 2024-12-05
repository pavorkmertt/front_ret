import { rtkApi } from "@/shared/api/rtkApi";
import {Ticket} from "@/entities/Ticket";

const ticketApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getTickets: build.query<Ticket[], void>({
            query: () => ({
                url: "tasks",
            }),
            providesTags: ["Ticket"],
        }),
    }),
});

export const useTicketsList = ticketApi.useGetTicketsQuery;