import {StateSchema} from "@/shared/providers/StoreProvider";

export const getTickets = (state: StateSchema) => state.ticket.tickets;
export const getTicketById = (state: StateSchema) => (id: string) => state.ticket.tickets.find(ticket => ticket._id === id);