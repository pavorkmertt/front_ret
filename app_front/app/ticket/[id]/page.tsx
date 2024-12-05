import React from 'react';
import {TicketCard} from "@/features/TicketForm";

type tParams = Promise<{ id: string }>;


export async function generateMetadata(props: { params: tParams }) {
    const { id } = await props.params;

    return {
        title: `Ticket: ${id}`,
        description: `Description ticket: ${id}`,
    };
}


const Page = async (props: { params: tParams }) => {
    const { id } = await props.params;


    return (
        <div>
            <TicketCard ticketId={id}/>
        </div>
    );
};

export default Page;