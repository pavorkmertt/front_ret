import React from 'react';
import {Ticket} from "@/entities/Ticket/model/types/types";
import TicketRow from "@/entities/Ticket/ui/TicketRow";

interface TicketListProps {
    tickets?: Ticket[];
    isLoading: boolean;
}

export const TicketList = ({ tickets, isLoading }: TicketListProps) => {

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            {tickets?.length ? (tickets.map((ticket) => (
                <TicketRow ticket={ticket} key={ticket._id}/>
            )))
                :
            <p>There is no tickets</p>
            }
        </div>
    );
};

