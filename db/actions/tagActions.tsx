import { db } from "@/db/db";
import { tags } from "@/db/schema";

export default async function getAllTagNames() : Promise<string[]>{
    const tagList = await db.select({
        name:tags.name
      }).from(tags)

    const tagNames = tagList.map(tag => tag.name);
    return tagNames
}