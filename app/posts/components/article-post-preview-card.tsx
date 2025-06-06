import { ArrowRightIcon } from '@/components/icons'
import Image from 'next/image';
import Link from "next/link";
import { Post } from "@/lib/types";
//import {getFeaturedMediaById, getCategoryById,} from "@/lib/wordpress";
import { PostExcerpt } from "@/components/wp/post-excerpt"
import { getPostImageUrl } from '@/components/wp/posts-thumbnail-image-handler';
import { config } from "../../../wp.config.mjs"


const fallbackImage = config.wp.thumbnailFallback
const fallbackVenue = config.wp.fallbackVenue




async function ArticlePostPreviewCard(
	{ 
		post 
	}: { 
		post: Post 
	}
) {


	const imageUrl = await getPostImageUrl(post);
	const categoryName = post?._embedded?.['wp:term']?.[0]?.[0]?.name || null


	//const category = await getCategoryById(post.categories[0]);
	//const media = await getFeaturedMediaById(post.featured_media);
	//const author = await getAuthorById(post.author);
	//const author = post?._embedded?.['author']?.[0]?.name || null;








	const date = new Date(post.date).toLocaleDateString(
		"en-US", {
			month: "long",
			day: "numeric",
			year: "numeric",
		}
	); 
	const linkHref = `/posts/${post.slug}`; 
	const excerpt = await post?.excerpt.rendered; 
	const imageSrc = imageUrl || fallbackImage; 




	return (
        <div className='flex flex-col gap-5'>
            <div className='group relative overflow-hidden rounded-lg pb-[60%]'>
				<Image 
					src={imageSrc} 
					alt={post.title.rendered}
					width={400}
					height={200}
					className="rounded-lg absolute size-full object-cover transition-all duration-300 group-focus-within:scale-105 group-focus-within:blur-xs group-hover:scale-105 group-hover:blur-xs"
				/>
				<div className='absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100'>
					<Link
                        href={`/posts/${post.slug}`}
                        className='group inline-flex cursor-pointer items-center justify-center rounded-full font-mono text-sm uppercase tracking-[0.01em] transition-colors delay-75 border h-14 gap-4 px-6 py-2.5 group 
                                border-[#FBFAF4] 
                                bg-[#FBFAF4] 
                                text-[#091717] 
                                hover:border-[#E4E3D4] 
                                hover:bg-[#E4E3D4] 
                                active:border-[#E4E3D4] 
                                active:bg-[#E4E3D4] 
                            '
					>
						View Article
						<ArrowRightIcon width={25} height={25} />
					</Link>
				</div>
			</div>
            <div className="flex justify-between items-center text-xs">
				<div className="flex h-8 items-center rounded-xl px-2.5 
						shrink-0 
						w-fit 
						bg-articles-accent
					"
				>
					<span className="tracking-[0.01em] font-mono uppercase leading-[1.1] font-medium 
							text-articles-text
						"
					>
						{categoryName}
					</span>

				</div>
				<p className='tracking-[0.01em] !font-normal 
						!text-articles-text
					'
				>
					{date}
				</p>
			</div>
            <p className='tracking-[0.01em] text-base font-medium line-clamp-2 pb-1
					text-articles-text
				'
			>
				<Link
                    href={`/posts/${post.slug}`}
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
				></Link>
			</p>
            <PostExcerpt 
				excerpt={excerpt} 
				sliceSize={24}
				linkHref={linkHref}
			/>
            <div>
				<a className='group inline-flex cursor-pointer items-center justify-center rounded-full font-mono text-sm uppercase tracking-[0.01em] transition-colors delay-75 h-auto gap-2 p-0 hover:underline 
						border-articles-border 
						bg-transparent 
						text-articles-text
						hover:text-articles-text 
					'
				>
					Read More
					<span className='relative shrink-0 overflow-hidden'>
						<ArrowRightIcon width={25} height={25} />
					</span>
				</a>
			</div>
        </div>
    );
}








export { ArticlePostPreviewCard }



