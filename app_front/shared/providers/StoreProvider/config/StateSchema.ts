import { rtkApi } from "@/shared/api/rtkApi";
import {TicketFormSchema} from "@/features/TicketForm";
import {TicketSchema} from "@/entities/Ticket/model/types/types";
import {AxiosInstance} from "axios";


export interface StateSchema {
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
    ticketForm: TicketFormSchema;
    ticket: TicketSchema;
}

export interface ThunkExtraArgs {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArgs;
    state: StateSchema;
}