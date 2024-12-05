import React from 'react';
import Link from "next/link";

export const Navbar = () => {
    return (
        <nav className="flex flex-row justify-center w-full mb-16 p-3">
            <div className="flex items-center justify-between gap-10">
                <Link href={"/"}>Home</Link>
                <Link href={"/about"}>About</Link>
                <Link href={"/list"}>List</Link>
            </div>
        </nav>
    );
};

