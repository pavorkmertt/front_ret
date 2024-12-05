"use client";
import React, {ChangeEvent, FormEvent, useEffect} from 'react';
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch";
import {useSelector} from "react-redux";
import {getForm} from "@/features/TicketForm/model/selectors/selectors";
import {ticketFormActions} from "@/features/TicketForm/model/slice/ticketFormSlice";
import {useCreateTicket, useUpdateTicket} from "@/features/TicketForm/api/ticketFormApi";
import {TicketFormType} from "@/features/TicketForm/model/const/ticketFormType";
import {ticketActions} from "@/entities/Ticket";
import {useRouter} from "next/navigation";
import {fetchTicketById} from "@/features/TicketForm/service/fetchTicketById";

interface TicketFormProps {
    ticketId?: string;
    type: TicketFormType;
}

export const TicketForm = ({ ticketId, type }: TicketFormProps) => {
    const dispatch = useAppDispatch();
    const { firstName, lastName, email, resolved, description, symptom } = useSelector(getForm);
    const router = useRouter();
    const [updateTicketMutation, { isLoading: isUpdateLoading, error: isUpdateError }] = useUpdateTicket();
    const [createTicketMutation, { isLoading: isCreateLoading, error: isCreateError }] = useCreateTicket();
    const submitText = type === TicketFormType.CREATE ? "Create" : "Edit";

    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(ticketFormActions.setForm({ firstName: e.target.value }));
    };
    const onChangeLastName = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(ticketFormActions.setForm({ lastName: e.target.value }));
    };
    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(ticketFormActions.setForm({ email: e.target.value }));
    };
    const onChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(ticketFormActions.setForm({ description: e.target.value }));
    };
    const onChangeSymptom = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(ticketFormActions.setForm({ symptom: e.target.value }));
    };
    const onChangeResolved = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(ticketFormActions.setForm({ resolved: e.target.value }));
    };

    useEffect(() => {
        if (ticketId) {
            dispatch(fetchTicketById(ticketId));
        }
    }, [dispatch, ticketId])



    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (type === TicketFormType.EDIT && ticketId) {
                await updateTicketMutation({
                    _id: ticketId,
                    firstName,
                    lastName,
                    email,
                    description,
                    symptom,
                    resolved
                });
            } else {
                await createTicketMutation({
                    firstName,
                    lastName,
                    email,
                    description,
                    symptom,
                    resolved
                });
            }
            if (!isCreateError || !isUpdateError) {
                router.push("/list");
                dispatch(ticketFormActions.setForm({ promptText: "", tag: "" }));
            }
        } catch (e) {
            console.log(e);
        } finally {
        }
    };

    return (
        <section>
            <form className="flex flex-col gap-2" onSubmit={onSubmit}>
                <label className="flex flex-col" htmlFor="">
                    <span className="text-gray-400 text-sm">First name</span>
                    <input value={firstName} className="p-1 rounded" required onChange={onChangeName} type="text"/>
                </label>
                <label className="flex flex-col" htmlFor="">
                    <span className="text-gray-400 text-sm">Last name</span>
                    <input value={lastName} className="p-1 rounded" required onChange={onChangeLastName} type="text"/>
                </label>
                <label className="flex flex-col" htmlFor="">
                    <span className="text-gray-400 text-sm">Email</span>
                    <input value={email} className="p-1 rounded" required onChange={onChangeEmail} type="email"/>
                </label>
                <label className="flex flex-col" htmlFor="">
                    <span className="text-gray-400 text-sm">Description</span>
                    <textarea value={description} className="p-1 rounded" required
                              onChange={onChangeDescription}></textarea>
                </label>
                <label className="flex flex-col" htmlFor="">
                    <span className="text-gray-400 text-sm">Symptom</span>
                    <select className="p-2" value={symptom} onChange={onChangeSymptom}>
                        <option value="Issues with email">Issues with email</option>
                        <option value="Issues with website">Issues with website</option>
                        <option value="Error">Error</option>
                    </select>
                </label>
                <label className="flex flex-col" htmlFor="">
                    <span className="text-gray-400 text-sm">Resolved</span>
                    <span className="text-gray-400 text-sm">False/True</span>
                    <span className="flex flex-row gap-2">
                        <input value={0} onChange={onChangeResolved} required checked={Number(resolved) === 0}
                               type="radio"/>
                        <input value={1} onChange={onChangeResolved} required checked={Number(resolved) === 1}
                               type="radio"/>
                    </span>
                </label>
                <button
                    type={"submit"}
                    className={
                        "px-5 py-1.5 self-end text-white bg-black rounded"
                    }
                >{(isUpdateLoading || isCreateLoading) ? "Loading..." : submitText}</button>
            </form>
        </section>
    );
};
