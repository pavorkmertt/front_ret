import { ReducersMapObject } from "redux";
import { rtkApi } from "@/shared/api/rtkApi";
import { configureStore } from "@reduxjs/toolkit";
import {StateSchema, ThunkExtraArgs} from "./StateSchema";
import {ticketFormReducer} from "@/features/TicketForm/model/slice/ticketFormSlice";
import {ticketReducer} from "@/entities/Ticket/model/slice/ticketSlice";
import {$api} from "@/shared/api/api";

export function createReduxStore() {
    const rootReducer: ReducersMapObject<StateSchema> = {
        [rtkApi.reducerPath]: rtkApi.reducer,
        ticketForm: ticketFormReducer,
        ticket: ticketReducer
    };

    const extraArg: ThunkExtraArgs = {
        api: $api,
    };

    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: extraArg,
                },
            }).concat(rtkApi.middleware),
    });
}

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];