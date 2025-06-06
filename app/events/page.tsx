import { getAllEvents } from "@/app/events/lib/actions";
import { HeroSubPostCard } from "@/app/events/components/hero-sub-post-cards"
import { HeroMainPostCard } from "@/app/events/components/hero-main-post-card"
import { PostCard } from "@/app/events/components/post-cards"
import { Filter } from "@/app/events/components/filter";
import { 
	Pagination, 
	PaginationContent, 
	PaginationItem, 
	PaginationLink, 
	PaginationNext, 
	PaginationPrevious 
} from "@/components/ui/pagination";
import { EmailForm0 } from "@/components/email-form";
import clsx from "clsx";
import { config } from "../../wp.config.mjs"
import { SocialCluster } from "@/components/socials-cluster";




const emailSlogan = config.footerData.emailSlogan





type SearchParams = Promise<{ [key: string]: string | undefined }>




export default async function Page(
	props: {
		searchParams: SearchParams
	}
) {


	let from = new Date()
	let fromString = from.toISOString().split('T')[0];

	const toDate = new Date();
	toDate.setMonth(toDate.getMonth() + 3);  // modify the existing Date object
	let toString = toDate.toISOString().split('T')[0];




	const searchParams = await props.searchParams




	if (searchParams.to && searchParams.from) {
		fromString = searchParams.from;
		toString = searchParams.to
	}


	const pageParam = searchParams.page









    const events = await getAllEvents(
		{ 
			per_page: 10, 
			start_date: fromString,
			starts_before: toString
		}
	)
	// 2024-05-08








	const heroSubEvents = events.slice(1,4)


	const page = pageParam ? parseInt(pageParam, 10) : 1;
	const eventsPerPage = 9;
	const totalPages = Math.ceil(events.length / eventsPerPage);


	const paginatedEvents = events.slice(
		(page - 1) * eventsPerPage,
		page * eventsPerPage
	);




	return (
		<div>
			{/* Hero Section */}
			<div className="

					bg-articles-background

				"
			>
				<div className="mx-auto w-full max-w-(--breakpoint-xl) px-5 sm:px-10 pt-16 sm:pt-28 text-custom-bl">
					<div className=" pb-14 pt-8 sm:pb-24 border-b 

							border-articles-border
							
						"
					>
						<div className="grid gap-16 xl:grid-cols-[2.2fr_1fr]">
							{paginatedEvents.length > 0 ? (		                      
								<HeroMainPostCard 
									key={events[0].id} 
									post={events[0]} 
								/>
							) : (
								<div className="h-24 w-full border rounded-lg bg-accent/25 flex items-center justify-center">
									<p className="
											text-articles-text
										"
									>
										No Results Found
									</p>
								</div>
							)}
							{paginatedEvents.length > 0 ? (
								<div className="hidden justify-between gap-7 sm:grid sm:grid-cols-3 xl:flex xl:flex-col xl:gap-10">
									{heroSubEvents.map((i: any) => (
										<HeroSubPostCard 
											key={i.id} 
											post={i} 
										/>
									))}
								</div>
							) : (
								<div className="h-24 w-full border rounded-lg bg-accent/25 flex items-center justify-center">
									<p className="
											text-articles-text
										"
									>
										No Results Found
									</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			{/* Blog Content */}
			<div className="
					bg-articles-background
				"
			>
				<div className="mx-auto w-full max-w-(--breakpoint-xl) px-5 sm:px-10 py-14 sm:py-28">
					<div className="grid gap-y-14 lg:grid-cols-[21rem_1fr] lg:items-start lg:gap-x-24">
						<div className="top-[113px] flex flex-col gap-7 lg:sticky lg:max-h-[calc(100vh-121px)] lg:overflow-y-auto">
							<div className="flex flex-col gap-3">
								<Filter />
							</div>
							<div className="flex flex-col gap-3">
								<p className="font-sans text-lg font-bold tracking-[0.01em] uppercase 
										text-articles-text
									"
								>
									Subscribe
								</p>
								<div>
									<p className="tracking-[0.01em] text-sm 
											text-articles-text
										"
									>
										{emailSlogan}
									</p>
									<EmailForm0 />
								</div>
							</div>
							<div className="flex flex-col gap-3">
								<p className="font-sans text-lg font-bold tracking-[0.01em] uppercase 
										text-articles-text
									"
								>
									Follow Us
								</p>
								<SocialCluster />
							</div>
						</div>
						{paginatedEvents.length > 0 ? (
							<div className="grid gap-x-7 gap-y-12 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-16 xl:grid-cols-3 z-0">
								{paginatedEvents.map((i: any) => (
									<PostCard 
										key={i.id} 
										post={i} 
									/>
								))}
							</div>
						) : (
							<div className="h-24 w-full border rounded-lg bg-accent/25 flex items-center justify-center">
								<p className="
										text-articles-text
									"
								>
									No Results Found
								</p>
							</div>
						)}
					</div>   
					<div className="mt-14 pt-14 not-prose border-t 
							border-articles-border
						"
					>
						<Pagination>
							<PaginationContent>
								<PaginationItem className={clsx(`hover:underline 
											bg-articles-background 
											text-articles-text
										`
									)}
								>
									<PaginationPrevious 
										className={page === 1 ? "pointer-events-none text-muted opacity-0" : ""}
										href={searchParams.to && searchParams.from 
											? `/events?page=${Math.max(page - 1, 1)}&start_date=${searchParams.from}&starts_before=${searchParams.to}`
											: `/events?page=${Math.max(page - 1, 1)}`
										}
									/>
								</PaginationItem>
								<PaginationItem>
									<PaginationLink 
										className="border-b rounded-none mr-2 ml-2 
											border-articles-border
										"
										href={searchParams.to && searchParams.from 
											? `/events?page=${page}&start_date=${searchParams.from}&starts_before=${searchParams.to}`
											: `/events?page=${page}`	
										}
									>
										{page}
									</PaginationLink>
								</PaginationItem>
								<PaginationItem className={clsx(`hover:underline 
											bg-articles-background
											text-articles-text 
										`
									)}
								>
									<PaginationNext className={page === totalPages ? "pointer-events-none text-muted opacity-0" : ""}

										href={searchParams.to && searchParams.from 
											? `/events?page=${Math.min(page + 1, totalPages)}&start_date=${searchParams.from}&starts_before=${searchParams.to}`
											: `/events?page=${Math.min(page + 1, totalPages)}`
										
										}

									/>
								</PaginationItem>
							</PaginationContent>
						</Pagination>
					</div>
				</div>
			</div>
		</div>
	);
}



