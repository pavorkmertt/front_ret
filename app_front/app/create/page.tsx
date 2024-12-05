import React from 'react';
import {TicketForm, TicketFormType} from "@/features/TicketForm";

const Page = () => {
    return (
        <div>
            <h1>Create a new ticket</h1>
            <TicketForm type={TicketFormType.CREATE}/>
        </div>
    );
};

export default Page;