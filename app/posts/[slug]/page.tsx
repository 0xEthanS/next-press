"use cache"

import { ArrowLeftIcon } from '@/components/icons'
import Image from 'next/image';
import { EmailForm1 } from "@/components/email-form";
import Link from 'next/link';
import { ArticlePostPreviewCard } from '@/app/posts/components/article-post-preview-card';

import {
	getPostBySlug, 
	getThreePosts, 
	getFeaturedMediaById, 
	getAuthorById, 
	getCategoryById
} from "@/lib/wordpress";

import { getPostImageUrl } from '@/components/wp/posts-thumbnail-image-handler';
import { Metadata } from "next";
import Balancer from "react-wrap-balancer";
import { ArticlePreview } from '@/components/wp/article-preview'
import { Article } from '@/components/wp/article';
import { config } from "../../../wp.config.mjs"
import { SocialCluster } from "@/components/socials-cluster";




const emailSlogan = config.footerData.emailSlogan





type Params = Promise<{ slug: string }>





export async function generateMetadata(props: { params: Params }): Promise<Metadata> {


	const params = await props.params
	const slug = params.slug


	const post = await getPostBySlug(slug);


	return {
		title: post.title.rendered,
		description: post.excerpt.rendered,
	};


}




type SearchParams = Promise<{ [key: string]: string | undefined }>




export default async function Page(
	props: {
		params: Params, 
		searchParams: SearchParams
	}
) {


	const searchParams = await props.searchParams
	const params = await props.params
	const slug = params.slug
	const author = searchParams.author
	const tag = searchParams.tag
	const category = searchParams.category






	const post = await getPostBySlug(slug);
	const posts = await getThreePosts({ author, tag, category });	






	const imageUrl = await getPostImageUrl(post);
	const categoryName = post?._embedded?.['wp:term']?.[0]?.[0]?.name || null
	const categoryId = post?._embedded?.['wp:term']?.[0]?.[0]?.id || null
	const authorName = post?._embedded?.['author']?.[0]?.name || null;
	const authorId = post?._embedded?.['author']?.[0]?.id || null;
	//const authorMain = await getAuthorById(post.author);
	const date = new Date(post.date).toLocaleDateString(
		"en-US", 
		{ 
			month: "long", 
			day: "numeric", 
			year: "numeric", 
		}
	);








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
							<Link 
								href='/posts'
								className="group inline-flex cursor-pointer items-center justify-center rounded-full font-mono text-sm uppercase tracking-[0.01em] transition-colors delay-75 flex-row-reverse h-auto gap-2 p-0 hover:underline 
									border-article-border
									bg-transparent 
									text-article-text 
									hover:text-article-text/30 
								"
							>
								Back to Blog
								<ArrowLeftIcon width={25} height={25} />
							</Link>
						</div>
						<div className='grid gap-8 sm:grid-cols-[max-content_1fr] sm:gap-y-20'>
							<div className='flex shrink-0'>
								<div className='flex h-8 w-fit shrink-0 items-center rounded-xl px-2.5 
										bg-article-accent
									'
								>
									<Link
                                        href={`/posts/?category=${categoryId}`}
                                        className="tracking-[0.01em] font-mono text-sm uppercase leading-[1.1] font-medium
											text-article-text
										"
									>
										{categoryName}
									</Link>
								</div>
							</div>
							<div className='flex flex-col gap-4 sm:border-l sm:pl-9
									sm:border-black 
								'
							>
								<h1 className='font-sans tracking-[-0.01em] text-3xl leading-[1.2] sm:text-[2.5rem] sm:leading-[1.1] 
										text-article-text
									'
								>
									<Balancer>
										<span
											dangerouslySetInnerHTML={{ __html: post.title.rendered }}
										></span>
									</Balancer>
								</h1>
								<p className='text-base leading-tight tracking-normal sm:text-[1.25rem] sm:leading-normal 
										text-article-text
									'
								>
									Published {date} by{" "}
									{authorName && (
										<span>
											<a className='hover:underline' href={`/posts/?author=${authorId}`}>
												{authorName}
											</a>{" "}
										</span>
									)}
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


			
							{post.featured_media !== 0 && imageUrl ? (
								<div className='h-96 md:h-[560px] overflow-hidden rounded-lg bg-accent/25 mb-6 flex items-center justify-center sm:mb-8'>
									<img
										src={imageUrl}
										alt={post.title.rendered}
										className="rounded-lg w-full" 
									/>
								</div>
							) : (
								<div></div>
							)}
					








							<Article
								dangerouslySetInnerHTML={{ __html: post.content.rendered }} 
								className='
									*:mb-6 
									sm:*:mb-8 
									text-article-text
								'
							/>













							{/*<div className='relative my-12 aspect-video w-full'>
								<Image
									src="/Hermitage-600x400.jpg" 
									alt="Hermitage" 
									className="absolute inset-0 size-full" 
									width={600}
									height={400}
								/>
								Video Player
							</div>*/}




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
					href='/posts'
				>
					{posts.length > 0 ? (
						<div className='grid grid-rows-3 gap-x-6 gap-y-20 sm:grid-rows-1 sm:grid-cols-3 sm:gap-x-8 xl:gap-x-10'>
							{posts.map((i:any) => (
								<ArticlePostPreviewCard
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



