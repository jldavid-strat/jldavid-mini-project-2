import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/helpers/helper";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps extends Blog {
    className?: string;
}


export function FeatureCard({
    id,
    author,
    className,
    title,
    description,
    img_link,
    category,
    created_at,
    }: BlogCardProps){

    const [formattedDate] = formatDate(created_at)
    return (
        <Link 
            className={className}
            href={`/blog/${id}`}>
                <div className='h-auto ring-0 hover:ring hover:rounded-xl'>
                    <div className='h-[400px] relative rounded-t-xl overflow-hidden'>
                        <Image
                            src={`/assets/images/${img_link}`}
                            alt="blog image example"
                            className='object-cover'
                            fill
                        >
                        </Image>
                    </div>
                    <div className='flex flex-col mt-2 gap-2 p-2'>
                        <p className='text-xs text-gray-500'> {author} <span className='font-bold'>·</span> {formattedDate} </p>
                        <h3 className='font-bold text-4xl'>{title}</h3>
                        <p className='text-xs line-clamp-3 mb-2'>{description}</p>
                        <Badge>{category}</Badge>
                    </div>
                </div>
        </Link>
    )
}
export function FeatureHorizontalCard({
    id,
    author,
    className,
    title,
    description,
    category,
    created_at,
    }: Omit<BlogCardProps, 'img_link'>){

    const [formattedDate] = formatDate(created_at)
    return (
        <Link 
            className={className}
            href={`/blog/${id}`}>
                <div className='ring-0 hover:ring rounded-xs'>
                    <div className='p-2 flex flex-col gap-2'>
                        <p className='text-xs text-gray-500'> {author} <span className='font-bold'>·</span> {formattedDate} </p>
                        <h3 className='font-bold text-2xl'>{title}</h3>
                        <p className='text-xs line-clamp-3 mb-2'>{description}</p>
                        <Badge>{category}</Badge>
                    </div>
                </div>
        </Link>
    )
}