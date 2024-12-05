"use client";
import React, {useEffect} from 'react';
import {useParams, usePathname, useRouter} from "next/navigation";
import {useSelector} from "react-redux";
import {getTicketById} from "@/entities/Ticket";
import {useTicketById} from "@/features/TicketForm/api/ticketApi";
import Link from "next/link";
import EditIcon from "@/shared/assets/edit.svg";
import Image from "next/image";

export const TicketPage = () => {
    const { id } = useParams<{id: string}>()
    const { isLoading, data: ticket, error } = useTicketById(id);

    if (error) {
        return <div>No ticket</div>
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!ticket) {
        return <div>No Ticket</div>
    }

    return (
        <div className="flex flex-col gap-4 relative">
            <div className="flex flex-col">
                <p className="text-gray-400 text-sm">First name</p>
                <p>{ticket.firstName}</p>
            </div>
            <div>
                <p className="text-gray-400 text-sm">Last name</p>
                <p>{ticket.lastName}</p>
            </div>
            <div>
                <p className="text-gray-400 text-sm">Description</p>
                <p>{ticket.description}</p>
            </div>
            <div>
                <p className="text-gray-400 text-sm">Email</p>
                <p>{ticket.email}</p>
            </div>
            <div>
                <p className="text-gray-400 text-sm">Resolved</p>
                <p>{ticket.resolved}</p>
            </div>
            <Link className="absolute right-4" href={`/update/${ticket._id}`}>
                <Image src={EditIcon} alt={"edit"}></Image>
            </Link>
        </div>
    );
};

