import React from 'react';
import {TicketForm, TicketFormType} from "@/features/TicketForm";

type tParams = Promise<{ id: string }>;

const Page = async (props: { params: tParams }) => {
    const { id } = await props.params;
    return (
        <div>
            <h1>Update ticket</h1>
            <TicketForm type={TicketFormType.EDIT} ticketId={id}/>
        </div>
    );
};

export default Page;