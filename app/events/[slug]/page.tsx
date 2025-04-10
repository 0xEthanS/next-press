import { ArrowLeftIcon } from '@/components/icons'
import { EmailForm1 } from "@/components/email-form";
import { getEventImageUrl } from '@/components/wp/events-thumbnail-image-handler';
import { getAllEvents } from "@/app/events/lib/actions";
import { SocialCluster } from "@/components/socials-cluster";



import { 
	ArticleEventPreviewCard 
} from '@/app/events/components/article-post-preview-card';


import { getEventBySlug } from "@/app/events/lib/actions"


import Balancer from "react-wrap-balancer";
import { ArticlePreview } from '@/components/wp/article-preview'
import { Article } from '@/components/wp/article';
import parse from 'html-react-parser';




import { config } from "../../../wp.config.mjs"




const fallbackImage = config.wp.thumbnailFallback
const fallbackVenue = config.wp.fallbackVenue
const socials = config.contact.socials
const emailSlogan = config.footerData.emailSlogan




type Params = Promise<{ slug: string }>
type SearchParams = Promise<{ [key: string]: string | undefined }>






export default async function Page(
	props: {
		params: Params, 
	}
) {
	const params = await props.params
	const slug = params.slug
	const post = await getEventBySlug(slug)




	const from = new Date()
	const fromString = from.toISOString().split('T')[0];

	const toDate = new Date();
	toDate.setMonth(toDate.getMonth() + 3);  // modify the existing Date object
	const toString = toDate.toISOString().split('T')[0];




	const events = await getAllEvents(
		{ 
			per_page: 3, 
			start_date: fromString,
			starts_before: toString
		}
	)




	const start_date = new Date(post.start_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
	const date = new Date(post.start_date).toLocaleDateString("en-US", { month: "long", day: "numeric" });
	const start_time = new Date(post.start_date).toLocaleTimeString("en-US", { hour: "numeric" });
	const start_time_long = new Date(post.start_date).toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric" });
	const end_time = new Date(post.end_date).toLocaleTimeString("en-US", { hour: "numeric" });
	const end_time_long = new Date(post.end_date).toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric" });


	const organizer = post?.organizer[0]?.organizer
	const organizer_phone = post?.organizer[0]?.phone
	const organizer_email = post?.organizer[0]?.email
	const organizer_website = "https://" + post?.organizer[0]?.website


	const venue = post.venue.venue || fallbackVenue
	const venue_address = post.venue.address + post.venue.city + ", " + post.venue.state + " " + post.venue.zip
	const venue_phone = post.venue.phone
	const venue_website = "https://" + post.venue.website || "#"


	const imageUrl = getEventImageUrl(post);
	const imageSrc = imageUrl || fallbackImage
	const imageAlt = post.title


	
	var he = require('he');
	const uncleanedTitle = post.title
    const postTitle = he.decode(uncleanedTitle);


	const post_description = post.description;
	const options = {
		replace: ({ attribs, name }: any) => 
			name === 'img' && <></> // or could check for specific attribs if needed
	};
	const parsed_description = parse(post_description, options);


	return (
		<div>


			<div className="
					bg-article-background 
				"
			>
				<div className="mx-auto w-full max-w-(--breakpoint-xl) px-5 sm:px-10 pt-16 sm:pt-28">
					<div className="border-b pb-14 pt-8 xl:py-24 
							border-article-border 
						"
					>
						<div className="mb-8 flex sm:mb-12">
							<a 
								href='/events'
								className="group inline-flex cursor-pointer items-center justify-center rounded-full font-mono text-sm uppercase tracking-[0.01em] transition-colors delay-75 flex-row-reverse h-auto gap-2 p-0 hover:underline 
									border-article-border
									bg-transparent 
									text-article-text 
									hover:text-article-text/30 
								"
							>
								Back to Blog
								<ArrowLeftIcon width={25} height={25} />
							</a>
						</div>
						<div className='grid gap-8 sm:grid-cols-[max-content_1fr] sm:gap-y-20'>
							<div className='flex shrink-0'>
								<div className='flex h-8 w-fit shrink-0 items-center rounded-xl px-2.5 
										bg-article-accent 
									'
								>
									<p className="tracking-[0.01em] font-mono text-sm uppercase leading-[1.1] font-medium 
											text-article-text
										"
									>
										{venue}
									</p>
								</div>
							</div>
							<div className='flex flex-col gap-4 sm:border-l sm:pl-9 
									sm:border-article-border 
								'
							>
								<h1 className='font-sans tracking-[-0.01em] text-3xl leading-[1.2] sm:text-[2.5rem] sm:leading-[1.1]
										text-article-text
									'
								>
									<Balancer>
										<span>
											{postTitle}
										</span>
									</Balancer>
								</h1>
								<p className='text-base leading-tight tracking-normal sm:text-[1.25rem] sm:leading-normal 
										text-article-text 
									'
								>
									{start_date} {start_time} to {end_time}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>


			<div className="
					bg-article-background
				"
			>
				<div className='mx-auto w-full max-w-(--breakpoint-xl) px-5 sm:px-10 py-14 sm:py-24'>
					<div className='grid items-start gap-x-28 xl:grid-cols-[3.2fr_1fr]'>
						<div className='overflow-hidden'>




							<div className='h-96 md:h-[560px] overflow-hidden rounded-lg bg-accent/25 mb-6 flex items-center justify-center sm:mb-8'>
								<img
									src={imageSrc}
									alt={imageAlt}
									className="rounded-lg w-full" 
								/>
							</div>




							<Article className='
									*:mb-6 
									sm:*:mb-8 
									text-article-text
								'
							>
								{parsed_description}
							</Article>



							
							<article className='mb-8 prose max-w-full prose-neutral prose:font-sans dark:prose-invert xl:prose-lg prose-headings:font-normal prose-headings:font-sans prose-headings:tracking-[-0.01em] prose-headings:text-2xl sm:prose-headings:text-[2rem] sm:prose-headings:leading-[1.2] prose-headings:mt-0 prose-p:tracking-[0.01em] prose-p:text-base 
									text-article-text
								'
							>
								<h1>Details</h1>
								<p>Date: {date}</p>
								<p>Time: {start_time_long} - {end_time_long}</p>
							</article>



							{ organizer &&
								<article className='mb-8 prose max-w-full prose-neutral prose:font-sans dark:prose-invert xl:prose-lg prose-headings:font-normal prose-headings:font-sans prose-headings:tracking-[-0.01em] prose-headings:text-2xl sm:prose-headings:text-[2rem] sm:prose-headings:leading-[1.2] prose-headings:mt-0 prose-p:tracking-[0.01em] prose-p:text-base hover:prose-a:underline prose-a:no-underline
										text-article-text
									'
								>
									<h1>Organizer</h1>
									<p>{organizer}</p>
									<p>Phone: {organizer_phone}</p>
									<p>Email: {organizer_email}</p>
									<a href={organizer_website} target="_blank" rel="noopener noreferrer">
										Organizer Website
									</a>
								</article>
							}


							{venue &&
								<article className='prose max-w-full prose-neutral prose:font-sans dark:prose-invert xl:prose-lg prose-headings:font-normal prose-headings:font-sans prose-headings:tracking-[-0.01em] prose-headings:text-2xl sm:prose-headings:text-[2rem] sm:prose-headings:leading-[1.2] prose-headings:mt-0 prose-p:tracking-[0.01em] prose-p:text-base prose-a:underline 
										text-article-text
									'
								>
									<h1>Venue</h1>
									<p>{venue}</p>
									{venue_address && <p>{venue_address}</p>}
									{venue_phone && <p>Phone: {venue_phone}</p>}
									{venue_website && <a href={venue_website} target="_blank" rel="noopener noreferrer">Venue Website</a>}
								</article>
							}


						</div>




						<div className='top-32 mt-8 w-fit rounded-3xl border p-7 xl:sticky xl:mt-0'>
							<div className='flex flex-col gap-3'>
								<p className="font-sans text-lg font-bold tracking-[0.01em] uppercase 
										text-article-text
									"
								>
									Subscribe
								</p>
								<div>
									<p className="tracking-[0.01em] text-sm 
											text-article-text
										"
									>
										{emailSlogan}
									</p>
									<EmailForm1 />
								</div>
							</div>
							<div className='flex flex-col gap-3'>
								<p className='font-sans text-lg font-bold tracking-[0.01em] uppercase 
										text-article-text
									'
								>
									Share article
								</p>




								<SocialCluster />




							</div>
						</div>




					</div>
				</div>
			</div>



			<div className='max-w-(--breakpoint-xl) xl:px-28'>


				<ArticlePreview 
					href='/events'
				>
					{events.length > 0 ? (
						<div className='grid grid-rows-3 gap-x-6 gap-y-20 sm:grid-rows-1 sm:grid-cols-3 sm:gap-x-8 xl:gap-x-10'>
							{events.map((i:any) => (
								<ArticleEventPreviewCard
									key={i.id} 
									post={i} 
								/>							
							))}
						</div>
					) : (
						<div className="h-24 w-full border rounded-lg bg-accent/25 flex items-center justify-center
								text-article-text
							"
						>
							<p>No Results Found</p>
						</div>
					)}
				</ArticlePreview>


			</div>




		</div>
	);
}



