import React from 'react';
import Link from 'next/link';
import Image from "next/image";
import { 
	MainContainer, 
	ContentSectionButton, 
	ImageContainer, 
	TextContainer 
} from "@/components/pages/content-section";


//import Hero from '@/components/home/hero';
import { Hero0 } from '@/components/home/hero0';


import { Playfair_Display, Noto_Sans_SC } from "next/font/google";

const playfair = Playfair_Display({ subsets: ['latin'] });
const notoSans = Noto_Sans_SC({ subsets: ['latin'] });




//import { Philanthropy } from '@/components/home/philanthropy';
//import { Philanthropy } from '@/components/home/philanthropy2';

//import { About } from '@/components/home/about';
import Exhibits from '@/components/home/exhibits';
import { ArticlePreview } from '@/components/wp/article-preview'

//import { ArticleEventPreviewCard } from '@/app/events/components/article-post-preview-card';
import { ArticlePostPreviewCard } from '@/app/posts/components/article-post-preview-card';

//import {  getAllEvents } from "@/app/events/lib/actions";
import { getThreePosts } from "@/lib/wordpress";




type SearchParams = Promise<{ [key: string]: string | undefined }>
type Params = Promise<{ slug: string }>







export default async function CAMOC(
	// props: { searchParams: SearchParams, params: Params }
) {
	// const searchParams = await props.searchParams
	// const params = await props.params
	// const from = new Date()
	// const fromString = from.toISOString().split('T')[0];
	// const toDate = new Date();
	// toDate.setMonth(toDate.getMonth() + 3);
	// const toString = toDate.toISOString().split('T')[0];
	// Feeds data into ArticlePreview
	// const events = await getAllEvents({ 
	//		per_page: 3, 
	//		start_date: fromString,
	//		starts_before: toString
	// })


	const posts = await getThreePosts();




	return (
		<main>


			<Hero0 />
		 

			<Philanthropy />
			



			{/* Article Preview */}
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
							text-home-text
						"
					>
						<p>No Results Found</p>
					</div>
				)}
			</ArticlePreview>

			



			<About />


			<Shop />


			{/*<Exhibits />*/}


		</main>
	);
}




function Hero9() {
	return(
		<div></div>
	);
}














function Philanthropy() {
	return(
		<div>
			{/* Philanthropy */}
			<div>
				<MainContainer
					background="bg-home-background"
					border="border-b border-home-border"
				>
					<ImageContainer 
						href="/donate" 
						order="md:order-1" 
						src="/camoc1.webp" 
						alt="Oldham County History Center Campus" 
						width={1500} 
						height={1000}
						
					/>
					<TextContainer order="md:order-2">
						<div className="flex h-8 w-fit shrink-0 items-center rounded-xl px-2.5 
								bg-home-accent
							"
						>
							<span className="tracking-[0.01em] font-mono text-sm uppercase leading-[1.1] font-medium 
								"
							>
								Welcome
							</span>
						</div>
						{/*<h1 className="font-sans tracking-[-0.01em] text-2xl sm:text-[2rem] sm:leading-[1.2] 
								text-home-text
							"
						>
							<a href="/donate">
								HOW CAN YOU GIVE BACK?
							</a>
						</h1>*/}
						<p className="tracking-[0.01em] text-base line-clamp-6 
								text-home-text
							"
						>
							We invite Chicago to discover the unique local Chinese American history through 
							showcasing and celebrating current Chinese American art, culture, and innovation.
						</p>
						<p className="tracking-[0.01em] text-base line-clamp-6 
								text-home-text
							"
						>
							Chicago’s Chinatown is a site of rich historical importance. CAMOC not only 
							invites visitors to discover it, but is a home for Chicagoans to gather, 
							support, and create an expansive and evolving narrative of the Chinese American 
							story.
						</p>
						<p className="tracking-[0.01em] text-base line-clamp-6 
								text-home-text
							"
						>
							To learn more about what goes on at CAMOC, follow us on Instagram and Facebook <strong>@camochicago</strong>
						</p>
						{/*<ContentSectionButton href="/donate">
							Read More
						</ContentSectionButton>*/}
					</TextContainer>
				</MainContainer>
			</div>
		</div>
	);
}




function About() {
	return(
		<div>
			{/* About */}
			<div>
				<MainContainer
					background="bg-home-background"
					border="border-b border-home-border"
				>

					
					<ImageContainer  
						order="md:order-2" 
						src="/photo-10-396x512.webp" 
						alt="Chinese American Museum of CHicago Benefits Dinner" 
						width={396} 
						height={512} 
					/>	


					<TextContainer order="md:order-1">
						<div className="flex h-8 w-fit shrink-0 items-center rounded-xl px-2.5 
								bg-home-accent
							"
						>
							<span className="tracking-[0.01em] font-mono text-sm uppercase leading-[1.1] font-medium
								"
							>
								Our Events
							</span>
						</div>
						<h1 className="font-sans tracking-[-0.01em] text-2xl sm:text-[2rem] sm:leading-[1.2] 
								text-home-text
							"
						>
							CAMOC – 24th Benefit Dinner: Celebrating 20 Years Strong, Building 20 Years More!
						</h1>
						<p className="tracking-[0.01em] text-base line-clamp-6 
								text-home-text
							"
						>
							The Chinese American Museum of Chicago (CAMOC) invites you to attend the 24th 
							Benefit Dinner: Celebrating 20 Years Strong, Building 20 Years More! We are 
							hosting our annual fundraising dinner on <strong>Saturday, April 5th, 2025 </strong>at <strong>New Furama Restaurant</strong> from <strong>6:00 to 10:00 PM</strong>, with doors opening at 5:00 PM.
						</p>
						<p className="tracking-[0.01em] text-base line-clamp-6 
								text-home-text
							"
						>
							This year marks our 20th year, so join us as we celebrate together and raise 
							critical funds necessary to continue to do the work we do. We look forward 
							to seeing you and the CAMOC community over a traditional full-course Chinese 
							banquet dinner, live performances, raffle prizes, silent auction, dessert bar, 
							live DJ, dancing, and more.
						</p>
						<p className="tracking-[0.01em] text-base line-clamp-6 
								text-home-text
							"
						>
							Tickets for the event can be purchased 
							<a 
								className='hover:underline text-home-text/50'
								href='https://www.zeffy.com/en-US/ticketing/2025-camoc-benefit-dinner'
							> here.</a>
						</p>
						<p className="tracking-[0.01em] text-base line-clamp-6 
								text-home-text
							"
						>
							Become a sponsor or place a color print ad – explore package options 
							<a 
								className='hover:underline text-home-text/50'
								href='https://ccamuseum.org/wp-content/uploads/2025/01/Sponsorship-Ad-Form_24th-Benefit-Dinner-Final.pdf'
							> here.</a>
						</p>
						<p className="tracking-[0.01em] text-base line-clamp-6 
								text-home-text
							"
						>
							Thank you for supporting the museum and Chinese American stories!
						</p>
					</TextContainer>
				</MainContainer>
			</div>
		</div>
	);
}




function Shop() {
	return (
		<div>
			{/* Shop */}
			<div>
				<MainContainer
					background="bg-home-background"
					border="border-b border-home-border"
				>

					
					<ImageContainer  
						order="md:order-1" 
						src="/Seasonal-sale-post-.webp" 
						alt="Chinese American Museum of CHicago Benefits Dinner" 
						width={396} 
						height={512} 
					/>	


					<TextContainer order="md:order-2">
						<div className="flex h-8 w-fit shrink-0 items-center rounded-xl px-2.5 
								bg-home-accent
							"
						>
							<span className="tracking-[0.01em] font-mono text-sm uppercase leading-[1.1] font-medium
								"
							>
								Shop
							</span>
						</div>
						<h1 className="font-sans tracking-[-0.01em] text-2xl sm:text-[2rem] sm:leading-[1.2] 
								text-home-text
							"
						>
							Online Shop
						</h1>
						<p className="tracking-[0.01em] text-base line-clamp-6 
								text-home-text
							"
						>
							From cyanotype-dyed shirts to greeting cards, shop CAMOC’s gift shop for items under $50. Order online and pick up at the museum
							! Visit
							<a 
								className='hover:underline text-home-text/50'
								href='camochicago.org'
							> camochicago.org </a>
							to learn more.
						</p>
						<p className="tracking-[0.01em] text-base line-clamp-6 
								text-home-text
							"
						>
						</p>
						<ContentSectionButton href="https://www.camochicago.org/">
							Shop
						</ContentSectionButton>
					</TextContainer>
				</MainContainer>
			</div>
		</div>
	);
}







