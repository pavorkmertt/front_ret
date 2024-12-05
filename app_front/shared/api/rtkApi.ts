import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const url =  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002";

export const rtkApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: url,
    }),
    tagTypes: ["Ticket"],
    endpoints: () => ({}),
});