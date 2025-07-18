import { SignUp } from "@clerk/nextjs";
import React from "react";

export default function SignUpPage(){
    return (
        <section className="flex justify-center mt-10">
            <SignUp
            />
        </section>
    )
}