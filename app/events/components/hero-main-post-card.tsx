import { ArrowRightIcon } from '@/components/icons'
import Image from 'next/image';
import Link from "next/link";
import { getEventImageUrl } from '@/components/wp/events-thumbnail-image-handler';
import { PostExcerpt } from "@/components/wp/post-excerpt"
import { config } from "../../../wp.config.mjs"


const fallbackImage = config.wp.thumbnailFallback
const fallbackVenue = config.wp.fallbackVenue




async function HeroMainPostCard({ post }: { post: any }) {


	const date = new Date(post.start_date).toLocaleDateString(
		"en-US", {
			month: "long",
			day: "numeric",
			year: "numeric",
		}
	);




	const imageUrl = getEventImageUrl(post);
	

	
	// https://oldhamkyhistory.com/wp-content/uploads/2024/03/Antique-iron-club-3.png
	// https://oldhamkyhistory.com/wp-content/uploads/2024/03/Antique-iron-club-3.png


	const imageSrc = imageUrl || fallbackImage







    const imageAlt = post.title
    const linkHref = `/events/${post.slug}` 


    var he = require('he');
	const uncleanedTitle = post.title
    const postTitle = he.decode(uncleanedTitle);


    const postCategory = post.venue.venue || fallbackVenue
	const excerpt = post.description




	return (
		<div className="flex flex-col gap-5 sm:flex-row xl:items-end">


			<div className="group flex w-full shrink-0 sm:w-1/2 xl:w-3/5">
				<div className="relative size-full overflow-hidden rounded-lg pb-[100%]">
					
					
					
					
					<Image 
						src={imageSrc}
						alt={imageAlt}
						width={400}
						height={200}
						className="rounded-lg absolute size-full object-cover transition-all duration-300 group-focus-within:scale-105 group-focus-within:blur-xs group-hover:scale-105 group-hover:blur-xs"
						//unoptimized={true}
					/>




					<div className='absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100'>
						<Link 
							href={linkHref} 
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
			</div>


			<div className="flex flex-1 flex-col justify-end gap-5">
				







				


				<div className="w-full flex flex-wrap gap-2 items-start text-xs">

					<div className="flex h-8 items-center rounded-xl px-2.5 shrink-0 w-fit 
							bg-articles-accent
						"
					>
						<span className="tracking-[0.01em] font-mono uppercase leading-[1.1] font-medium 
								text-articles-text
							"
						>
							{postCategory}
						</span>
					</div>

					<p className='tracking-[0.01em] !font-normal ml-auto 
							!text-articles-text
						'
					>
						{date}
					</p>
				</div>








				<h1 className="font-medium pb-1 line-clamp-2 !leading-snug
						font-sans tracking-[-0.01em] text-2xl sm:text-[2rem] sm:leading-[1.2]
						text-articles-text
					"
				>
					<Link href={linkHref} >
						{postTitle}
					</Link>
				</h1>


				<PostExcerpt 
					excerpt={excerpt} 
					sliceSize={12}
					linkHref={linkHref}
				/>
				

				<div>
					<Link href={linkHref} className="group inline-flex cursor-pointer items-center justify-center rounded-full font-mono text-sm uppercase tracking-[0.01em] transition-colors delay-75 bg-transparent h-auto gap-2 p-0 hover:underline
							text-articles-text 
						"
					>
						Read More 
						<ArrowRightIcon width={25} height={25} />
					</Link>
				</div>


			</div>


		</div>
	);
}




export { HeroMainPostCard }



