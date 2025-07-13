"use server"

import React from 'react'
import CustomSelect from '@/components/ui/MultiSelect'
import { createOptionList } from '@/helpers/helper';
import { db } from '@/db/db';
import { tags } from '@/db/schema';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];


const test_options:string[] = ["value", "strawberry","Vanilla","chocolate"]

export default async function Page() {
  
  const tagList = await db.select({
    name:tags.name
  }).from(tags)
  const tagNames = tagList.map(tag => tag.name);
  const tagListObject = createOptionList(tagNames, tagNames.length)
  console.log(tagList)

  return (
    <>
      <CustomSelect 
        options={tagListObject} 
        isMulti={false}

      />
      {
        Object.values(tagListObject).map((option, index)=>(
          <div
            key={index}
          >
            {option.value}
            {option.label}
          </div>
        ))
      }
    </>
  );
}

