import {StateSchema} from "@/shared/providers/StoreProvider";

export const getForm = (state: StateSchema) => state.ticketForm.form;
export const getTicket = (state: StateSchema) => state.ticketForm.ticket;