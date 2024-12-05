export interface Ticket {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    description: string;
    resolved: boolean;
    symptom: string;
}

export interface TicketSchema {
    tickets: Ticket[];
}