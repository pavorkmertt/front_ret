"use client";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import {createReduxStore} from "@/shared/providers/StoreProvider/config/store";

export const StoreProvider = ({ children }: { children: ReactNode }) => {
    const store = createReduxStore();
    return <Provider store={store}>{children}</Provider>;
};