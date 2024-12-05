import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { TicketFormSchema } from "../types/ticketFormSchema";
import {fetchTicketById} from "@/features/TicketForm/service/fetchTicketById";
import {Ticket} from "@/entities/Ticket";

const initialState: TicketFormSchema = {
    form: {
        firstName: "",
        lastName: "",
        email: "",
        description: "",
        symptom: "Issues with email",
        resolved: false
    },
    ticket: null,
    isLoading: false,
    error: undefined
};

export const ticketFormSlice = createSlice({
    name: "ticketForm",
    initialState,
    reducers: {
        setForm(state, action) {
            state.form = {
                ...state.form,
                ...action.payload,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTicketById.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchTicketById.fulfilled, (state, action: PayloadAction<Ticket>) => {
                state.isLoading = false;
                state.form = action.payload;
                state.ticket = action.payload;
            })
            .addCase(fetchTicketById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});

export const { actions: ticketFormActions } = ticketFormSlice;
export const { reducer: ticketFormReducer } = ticketFormSlice;