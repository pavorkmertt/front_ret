import React from 'react';
import {Ticket} from "@/entities/Ticket/model/types/types";
import Link from "next/link";

interface TicketRowProps {
    ticket: Ticket;
}

const TicketRow = ({ ticket }: TicketRowProps) => {
    return (
        <Link href={`/ticket/${ticket._id}`} className="flex flex-row gap-2 p-4 border-b ticket align-items-center">
            <div>{ ticket.firstName }</div>
            <div>{ ticket.lastName }</div>
            <div>{ ticket.email }</div>
            <div className="max-w-40 text-ellipsis overflow-hidden">{ ticket.description }</div>
            <div>{ ticket.resolved ? "True" : "False" }</div>
        </Link>
    );
};

export default TicketRow;