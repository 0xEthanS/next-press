import Image from 'next/image';
import { cn } from "@/lib/utils";
import { getPostBySlug } from "@/lib/wordpress";
import { getPostImageUrl } from '@/components/wp/posts-thumbnail-image-handler';
import { Metadata } from "next";

import Balancer from "react-wrap-balancer";

import { config } from "../../../wp.config.mjs"

import { SocialClusterV2, SocialClusterV3 } from "@/components/socials-cluster";
import { 
	hanken, 
	cormorant, 
	jetbrains
} from "@/components/ui/fonts";








type Params = Promise<{ slug: string }>


export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
	const params = await props?.params
	const slug = params?.slug
	const post = await getPostBySlug(slug);
	return {
		title: post?.title?.rendered,
		description: post?.excerpt?.rendered,
	};
}














export default async function Page(props: {
	params: Params
}) {

	const params = await props?.params
	const slug = params?.slug



	const post = await getPostBySlug(slug);





	const contentRendered = post?.content?.rendered;


	const imageUrl = await getPostImageUrl(post);

	const title = post?.title?.rendered

	const authorName = post?._embedded?.['author']?.[0]?.name || null;

	const authorId = post?._embedded?.['author']?.[0]?.id || null;
	//const authorMain = await getAuthorById(post.author);
	const date = new Date(post?.date).toLocaleDateString(
		"en-US", 
		{ 
			month: "short", 
			day: "numeric", 
			year: "numeric", 
		}
	);







	let writtenBy: string | null;
	let publishDate: string | undefined;
	let imageData: any



	




	publishDate = date;
	writtenBy = authorName;


	//imageData = { src: '/whale.avif', height: 1632, width: 2912 }







	return (
		<div className="flex flex-col items-start md:items-center content-start md:content-center justify-center flex-grow-0 flex-shrink-0 basis-auto flex-nowrap overflow-x-hidden overflow-y-hidden px-[24px] md:px-[40px] pt-0 xl:pt-[40px] pb-[56px] md:pb-[64px] xl:pb-[90px] gap-y-[39px] md:gap-y-0 relative
				mt-[90px]
				bg-[rgb(251,250,244)] 
			"
		>


			{/* Image */}


			{imageData &&
				<div className="flex items-start md:items-center content-start md:content-center justify-center flex-row flex-nowrap flex-grow-0 flex-shrink-0 rounded-[16px gap-x-[15px] gap-y-[15px] h-[288px] md:h-[558px] order-1 md:order-none max-w-[1440px] overflow-x-hidden overflow-y-hidden p-[24px] md:p-[40px] relative w-full">
					<div className="rounded-[16px] bottom-0 left-0 right-0 top-0 absolute text-[12px] h-[558px]">


						<Image
							src={imageData?.src}
							height={imageData?.height}
							width={imageData?.width}
							alt=""
							className="aspect-auto rounded-[16px] block h-[288px] md:h-[558px] object-cover object-center box-border overflow-x-clip overflow-y-clip w-full"
						/>

				
					</div>
				</div>
			}




			{/* Text Content + Title */}
			<div className="flex content-center items-center gap-y-[5px] md:gap-y-[29px] gap-x-[5px] md:gap-x-[29px] flex-auto flex-col grow-0 shrink-0 flex-nowrap justify-center overflow-x-hidden overflow-y-hidden px-0 pt-0 md:pt-[24px] xl:pt-0 pb-[24px] xl:pb-0 relative order-1 md:order-none w-full">




				{/* Header Sections */}
				<div className="flex content-center items-center box-border gap-x-[10px] md:gap-x-0 xl:gap-x-[10] gap-y-[10px] md:gap-y-0 xl:gap-y-[10px] basis-auto flex-col grow-0 shrink-0 flex-nowrap h-[128px] md:h-[96px] xl:h-[143px] justify-center overflow-x-hidden overflow-y-hidden relative w-full
					"
				>

					{/* Author/Date Content */}
					<div className="flex content-start items-start box-border gap-x-[80px] md:gap-x-0 gap-y-[80px] md:gap-y-0 basis-auto flex-col md:flex-row grow-0 shrink-0 flex-nowrap h-[71px] md:h-[61px] xl:h-[86px] justify-start md:justify-between max-w-9/10 xl:max-w-[905px] pt-0 xl:pt-[25px] relative w-full">

						{/* Article Info */}
						<div className="flex content-start md:content-center items-start md:items-center box-border gap-x-[13px] md:gap-x-[59px] gap-y-[13px] md:gap-y-[59px] basis-auto flex-col md:flex-row grow-0 shrink-0 flex-nowrap justify-start order-1 md:order-none overflow-x-hidden overflow-y-hidden relative max-w-none md:max-w-[438px] xl:max-w-[718px] 
								h-[71px] 
								md:h-[61px] 
								w-full 
							"
						>

							{/* Author */}
							{writtenBy && 
								<div className="flex flex-col flex-none shrink-0 basis-auto items-start justify-start gap-0 box-border overflow-x-hidden overflow-y-hidden relative max-h-fit max-w-fit">
									<div className="flex basis-auto flex-col grow-0 shrink-0 justify-start relative max-h-fit max-w-fit">
										<p className="antialiased font-normal block text-[8px] md:text-[10px] xl:text-[12px] 
												font-mono 
												text-[rgb(19,52,59)]
											"
										>
											Written by
										</p>
									</div>
									
									<div className="flex basis-auto flex-col grow-0 shrink-0 justify-start relative max-h-fit max-w-fit ">
										<p className="text-left font-normal whitespace-nowrap antialiased block  text-[12px] md:text-[11px] xl:text-[15px] 
												font-mono 
												text-[rgb(19,52,59)]
											"
										>
											{writtenBy}
										</p>
									</div>
								</div>
							}


							{/* Date */}
							{publishDate && 
								<div className="flex flex-col flex-none shrink-0 basis-auto items-start justify-start gap-0 box-border overflow-x-hidden overflow-y-hidden relative max-h-fit max-w-fit">
									<div className="flex basis-auto flex-col grow-0 shrink-0 justify-start relative max-h-fit max-w-fit">
										<p className="antialiased font-normal block text-[8px] md:text-[10px] xl:text-[12px] 
												font-mono 
												text-[rgb(19,52,59)]
											"
										>
											Published on
										</p>
									</div>
									
									<div className="flex basis-auto flex-col grow-0 shrink-0 justify-start relative max-h-fit max-w-fit ">
										<p className="text-left font-normal whitespace-nowrap antialiased block text-[12px] md:text-[11px] xl:text-[15px] 
												font-mono 
												text-[rgb(19,52,59)] 
											"
										>
											{publishDate}
										</p>
									</div>
								</div>
							}
						


						</div>


						{/* Soicals */}
						<SocialClusterV2 />


					</div>

					{/* Separator Bar */}
					<div className="block basis-auto relative h-fit max-w-[960px] w-full">
						<div className="flex content-center items-center flex-row flex-nowrap justify-start max-w-full opacity-100 relative h-fit w-full px-[24px] pt-[22px] md:pt-[16px] xl:pt-[22px] pb-[21px] md:pb-[7px] xl:pb-[9px]">
							<div className="block basis-[0px] grow shrink-0 h-[3px] opacity-100 relative w-full 
									bg-[rgb(9,23,23)] 
								"
							></div>
						</div>
					</div>

				</div>




				{/* Title Section */}
				<div className="flex basis-auto flex-col content-start items-start justify-start relative h-fit max-w-9/10 md:max-w-8/10 xl:max-w-[740px] w-full ">
					<div className="pb-[7px] md:pb-[10px] xl:pb-[11px] mb-[32px] md:mb-[22px] xl:mb-[25px] pl-[5px] pr-[40px] border-b bordder-b-[1.5px] border-b-[rgb(19,52,59)]">
						{/* (PP Editorial New Height)/(Cormorant Height) = 1.27 */}
						{/* Original: text-[32px] md:text-[46px] xl:text-[58px] */}
						<h1 className={`
								block 
								text-[41px] 
								md:text-[58px] 
								xl:text-[74px] 
								break-words antialiased 
								font-light 
								${cormorant.variable} 
								font-cormorant 
								text-[rgb(19,52,59)] 
								tracking-tight 
								leading-[75px] 

								w-fit
							`}
						>
							{title}
						</h1>
					</div>
				</div>
				




				{/* Body Section */}
				<div className="flex basis-auto flex-col grow-0 shrink-0 justify-start relative h-fit max-w-9/10 md:max-w-8/10 xl:max-w-[740px] w-full">
					<article
						dangerouslySetInnerHTML={{ __html: contentRendered || '' }}
						className={cn(
							`
								
								max-w-full 
								prose-neutral 
								prose:font-sans 
								dark:prose-invert 
								xl:prose-lg 









								prose-p:font-hanken 

								prose-p:mt-[20px] 
								prose-p:text-[18px] 
								prose-p:tracking-[-0.18]
								md:prose-p:tracking-normal 
								prose-p:leading-[27px] 


								prose-h1:font-libre 

								prose-h1:mt-[28px] 
								prose-h1:text-[36px] 
								md:prose-h1:text-[46px] 
								prose-h1:font-normal 
								prose-h1:tracking-[-0.96] 
								md:prose-h1:tracking-[-1.38] 
								prose-h1:leading-[38.4px] 
								md:prose-h1:leading-[55.2px] 


								prose-h2:font-hanken 

								prose-h2:mt-[28px] 
								prose-h2:text-[28px] 
								md:prose-h2:text-[35px] 
								prose-h2:font-normal 
								prose-h2:tracking-[-0.28] 
								md:prose-h2:tracking-[-1.4] 
								prose-h2:leading-[33.6px] 
								md:prose-h2:leading-[42px] 


								prose-h3:font-libre 

								prose-h3:mt-[40px] 
								prose-h3:text-[24px] 
								prose-h3:font-normal 
								prose-h3:tracking-[-0.48] 
								prose-h3:leading-[31.2px] 
								md:prose-h3:leading-[26.4px] 


								prose-h4:font-hanken 

								prose-h4:mt-[40px] 
								prose-h4:text-[16px] 
								md:prose-h4:text-[20px] 
								prose-h4:font-normal 
								prose-h4:tracking-[-0.48] 
								md:prose-h4:tracking-[-0.6] 
								prose-h4:leading-[24px] 
								md:prose-h4:leading-[30px] 


								prose-h6:font-jetbrains 

								prose-h6:mt-[40px] 
								prose-h6:text-[6px] 
								md:prose-h6:text-[8px] 
								prose-h6:font-normal 
								prose-h6:tracking-[-0.12] 
								md:prose-h6:tracking-[-0.16] 
								prose-h6:leading-[9.6px] 
								md:prose-h6:leading-[12.8px] 







								prose-strong:font-bold 


								prose-a:text-[#20808d] 
								prose-a:hover:underline	


								prose-hr:mt-[28px] 
								prose-hr:border-slate-800










								prose-li:font-hanken 
								prose-li:text-[18px] 
								prose-li:tracking-[-0.18] 
								md:prose-li:tracking-normal 
								prose-li:leading-[27px] 
								prose-li:list-outside 
								prose-li:list-none 
								prose-li:pl-0 
								prose-li:before:content-['•'] 
								prose-li:before:block 
								prose-li:before:absolute 
								prose-li:before:left-0 

								prose-li:before:font-[sans-serif] 

								prose-li:before:text-[45px] 
								prose-li:before:text-start 
								prose-li:before:text-[rgba(19,51,59,0.8)] 
								prose-li:before:pl-0 

								prose-ul:relative
								prose-ul:mt-[24px] 
								prose-ul:pl-[30px] 
								prose-ul:text-[16px] 	

								prose-ol:ps-[2.5ch] 
								prose-ol:text-base 
								[&_>li]:prose-ol:list-decimal 
								[&_>ol]:prose-ol:mb-[0.85em] 
								prose-ol:mt-0 














								prose-blockquote:not-italic 


								prose-pre:border 
								prose-pre:bg-muted/25 


								prose-img:rounded-lg 
								prose-img:border 
								prose-img:overflow-hidden 





							`,
							`
								*:mb-6 
								sm:*:mb-8 
								text-article-text
							`
						)}
						
					></article>
				</div>




			</div>




			{/* Conditional Socials */}
			<div className="md:hidden flex flex-col items-start content-start justify-center flex-nowrap grow-0 shrink-0 basis-auto gap-x-[10px] gap-y-[10px] overflow-x-hidden overflow-y-hidden order-2 relative h-[82px] w-full ">


				<div className="flex basis-auto flex-col grow-0 shrink-0 h-[18px] justify-start relative w-full ">
					<p className="text-[#13343b] block font-mono text-[12px] font-normal antialiased w-full h-[18px]">
						Share this article
					</p>
				</div>


				<SocialClusterV3 />


			</div>




		</div>	
	);
}

