"use client"

import React, {useState} from 'react'
import { Label, CustomLabel } from '../ui/Label'
import { Input } from '@/components/ui/Input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup'
import { Textarea } from '../ui/TextArea'
import { addComment } from '@/db/actions/commentActions'
// import { db } from '@/db/db'
// import { comments } from '@/db/schema'




export default function CommentForm ({blogId} : {blogId: number}){
    const [isAnonymous, setIsAnonymous] = useState("yes")

    const handledSelectRadioButton = (value: string) => {
        setIsAnonymous(value)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        formData.append("blogId", blogId.toString());

        await addComment(formData);
    }

    return (
        <section>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className='flex flex-row'>
                    <CustomLabel
                        htmlFor='set-anononymity'
                        label='Stay Anonymous'
                        required={true}
                        className='mr-2'
                    />
                    <RadioGroup
                        onValueChange={handledSelectRadioButton}
                        value={isAnonymous}
                        className='flex flex-row'>
                        <div className="flex items-center gap-x-1">
                            <RadioGroupItem value="yes" id="yes" />
                            <Label htmlFor="Yes">Yes</Label>
                        </div>
                        <div className="flex items-center gap-x-1">
                            <RadioGroupItem value="no" id="no" />
                            <Label htmlFor="No">No</Label>
                        </div>
                    </RadioGroup>
                </div>
                
                <div>
                    <CustomLabel
                        htmlFor='name'
                        label='Name'
                        required={isAnonymous==='yes'? false: true}
                        className={isAnonymous==='yes'?  'text-gray-300': ""}
                    />
                    <Input
                        name='name'
                        type='text'
                        placeholder='Write your name'
                        disabled={isAnonymous==='yes'?true: false}
                    ></Input>
                </div>
                <div>
                    <CustomLabel
                        htmlFor='message'
                        label='Message'
                        required={true}
                    />
                    <Textarea
                        name='message'
                        placeholder='Share your thoughts about the blog'                    
                    >
                    </Textarea>
                </div>
              <div><button type="submit" className='border border-black w-fit p-2 rounded-2xl font-bold'>Comment</button></div>
            </form>
        </section>
    )
}

