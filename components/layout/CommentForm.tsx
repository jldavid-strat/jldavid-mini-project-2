"use client"

import React, {useState} from 'react'
import { Label, CustomLabel } from '../ui/Label'
import { Input } from '@/components/ui/Input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup'
import { Textarea } from '../ui/TextArea'

export default function CommentForm (){
    const [isAnonymous, setIsAnonymous] = useState("")

    const handledSelectRadioButton = (value: string) => {
        setIsAnonymous(value)
    }
    return (
        <section>
            <form action="" className="flex flex-col gap-3">
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
                    <Textarea>
                    </Textarea>
                </div>
              <div><button type="submit" className='border border-black w-fit p-1 rounded-2xl font-bold'>Comment</button></div>
            </form>
        </section>
    )
}

