import { 
	getAllPosts, 
	getAllAuthors, 
	getAllTags, 
	getAllCategories 
} from "@/lib/wordpress";

import { 
	Post, 
	Author, 
	Tag, 
	Category
} from "@/lib/types"

import { 
	Pagination, 
	PaginationContent, 
	PaginationItem, 
	PaginationLink, 
	PaginationNext, 
	PaginationPrevious 
} from "@/components/ui/pagination";
import { PostCard } from "@/app/posts/components/post-cards";
import { Filter } from "@/app/posts/components/filter";
import { EmailForm0 } from "@/components/email-form";
import clsx from "clsx";
import { HeroSubPostCard } from "@/app/posts/components/hero-sub-post-cards"
import { HeroMainPostCard } from "@/app/posts/components/hero-main-post-card"
import { config } from "../../wp.config.mjs"
import { SocialCluster } from "@/components/socials-cluster";




const emailSlogan = config.footerData.emailSlogan


type SearchParams = Promise<{ [key: string]: string | undefined }>




export const revalidate = 3600;
export const dynamicParams = true;

//export const dynamic = 'force-static';
//export const fetchCache = 'force-cache';


export async function generateStaticParams() {
	const paths = [
		{}, // Main posts page
		{ page: "1" },
		{ page: "2" }
	];
	return paths;
}






export default async function Page(
	props: {
		searchParams: SearchParams
	}
) {


	const searchParams = await props.searchParams

	const author = searchParams.author
	const tag = searchParams.tag
	const category = searchParams.category
	const pageParam = searchParams.page




	const posts = await getAllPosts({ author, tag, category });
	const authors = await getAllAuthors();
	const tags = await getAllTags();
	const categories = await getAllCategories();
		




























	console.log("---------- @/app/post functions ran ----------")






	

	const heroMainPost = posts[0]
	const heroSubPosts = posts.slice(1,4)


	const page = pageParam ? parseInt(pageParam, 10) : 1;
	const postsPerPage = 9;
	const totalPages = Math.ceil(posts.length / postsPerPage);


	const paginatedPosts = posts.slice(
		(page - 1) * postsPerPage,
		page * postsPerPage
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


							{paginatedPosts.length > 0 ? (							
								<HeroMainPostCard 
									key={posts[0].id} 
									post={posts[0]} 
								/>
							) : (
								<div className="h-24 w-full border rounded-lg bg-accent/25 flex items-center justify-center
										text-articles-text
									"
								>
									<p>No Results Found</p>
								</div>
							)}


							{paginatedPosts.length > 0 ? (
								<div className="hidden justify-between gap-7 sm:grid sm:grid-cols-3 xl:flex xl:flex-col xl:gap-10">
									{heroSubPosts.map((post: any) => (
										<HeroSubPostCard 
											key={post.id} 
											post={post} 
										/>
									))}
								</div>
							) : (
								<div className="h-24 w-full border rounded-lg bg-accent/25 flex items-center justify-center
										text-articles-text
									"
								>
									<p>No Results Found</p>
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




				<div className="
						mx-auto 
						w-full 
						max-w-(--breakpoint-xl) 
						px-5 
						sm:px-10 
						py-14 
						sm:py-28
					"
				>
					<div className="
							grid 
							gap-y-14 
							lg:grid-cols-[21rem_1fr] 
							lg:items-start 
							lg:gap-x-24
						"
					>
						{/* Sidebar */}
						<div className="
								top-[113px] 
								flex 
								flex-col 
								gap-7 
								lg:sticky 
								lg:max-h-[calc(100vh-121px)] 
								lg:overflow-y-auto 
							"
						>




							{/* Card Filter */}
							<div className="flex flex-col gap-3">
								<Filter 
									authors={authors}
									tags={tags}
									categories={categories}
									selectedAuthor={author}
									selectedTag={tag}
									selectedCategory={category}
								/>
							</div>


							{/* Email Form */}
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


							{/* Social Cluster */}
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




						{/* Paginated Posts */}
						{paginatedPosts.length > 0 ? (
							<div className="grid gap-x-7 gap-y-12 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-16 xl:grid-cols-3 z-0">
								{paginatedPosts.map((post: any) => (
									<PostCard 
										key={post.id} 
										post={post} 
									/>
								))}
							</div>
						) : (
							<div className="h-24 w-full border rounded-lg bg-accent/25 flex items-center justify-center
									text-articles-text
								"
							>
								<p>No Results Found</p>
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

										href={`/posts?page=${Math.max(page - 1, 1)}${
											category ? `&category=${category}` : ""
										}${author ? `&author=${author}` : ""}${
											tag ? `&tag=${tag}` : ""
										}`}

									/>
								</PaginationItem>


								<PaginationItem>
									<PaginationLink 
										className="border-b rounded-none mr-2 ml-2
											border-articles-border
										"
										href={`/posts?page=${page}`}
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
									<PaginationNext

										className={
											page === totalPages ? "pointer-events-none text-muted opacity-0" : ""
										}

										href={`/posts?page=${Math.min(page + 1, totalPages)}${
											category ? `&category=${category}` : ""
										}${author ? `&author=${author}` : ""}${
											tag ? `&tag=${tag}` : ""
										}`}

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



