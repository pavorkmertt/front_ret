import { createAsyncThunk } from '@reduxjs/toolkit';
import {ThunkConfig} from "@/shared/providers/StoreProvider/config/StateSchema";
import {Ticket} from "@/entities/Ticket";

export const fetchTicketById = createAsyncThunk<Ticket, string, ThunkConfig<string>>(
    'ticket/fetchTicketById',
    async (ticketId, thunkAPI) => {
        const { rejectWithValue, extra } = thunkAPI;
        try {
            const response = await extra.api.get<Ticket>('/get-task/' + ticketId);

            if (!response.data) {
                throw new Error();
            }
            return response.data;
        } catch (e) {
            return rejectWithValue('error');
        }
    }
);
