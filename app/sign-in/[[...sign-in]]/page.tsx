import { SignIn } from "@clerk/nextjs";
import React from "react";

export default function SignInPage(){
    return (
        <section className="flex justify-center mt-10">
            <SignIn
            />
        </section>
    )
}