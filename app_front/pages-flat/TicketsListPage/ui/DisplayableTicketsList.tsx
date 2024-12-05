"use client";
import React from 'react';
import {useTicketsList} from "@/pages-flat/TicketsListPage/api/ticketApi";
import {TicketList} from "@/entities/Ticket";
import Link from "next/link";

export const DisplayableTicketsList = () => {
    const { isLoading, data: tickets, error } = useTicketsList();
    // const tickets = useSelector((state: StateSchema) => state.ticket.tickets)

    if (error) {
        return <div>Error while getting tickets</div>;
    }

    return (
        <div className="relative">
            <TicketList tickets={tickets} isLoading={isLoading}></TicketList>
            <Link href={"/create"} className="absolute right-0 mt-4">Create</Link>
        </div>
    );
};
