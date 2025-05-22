import Image from "next/image";
import { 
	hanken, 
	cormorant, 
	jetbrains
} from "@/components/ui/fonts";
import { 
	SocialClusterV2, 
	SocialClusterV3 
} from "@/components/socials-cluster";




// breakpoints:
// md 
// xl 






export function PageFrame({ 
	children, 
	title, 
	date 
}: { 
	children: React.ReactNode,
	title?: string, 
	date?: string 
}) {
	let writtenBy: string | undefined;
	let publishDate: string | undefined;
	let imageData: any



	const dateString = "2023-07-06T08:54:46";
	const dateNew = new Date(dateString);
	const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
	const formattedDate = dateNew.toLocaleDateString('en-US', options);



	//publishDate = formattedDate



	//writtenBy = "AI Team"


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
						<div className="flex content-start md:content-center items-start md:items-end box-border gap-x-[13px] md:gap-x-[59px] gap-y-[13px] md:gap-y-[59px] basis-auto flex-col md:flex-row grow-0 shrink-0 flex-nowrap justify-start order-1 md:order-none overflow-x-hidden overflow-y-hidden relative max-w-none md:max-w-[438px] xl:max-w-[718px] 
								h-[71px] 
								md:h-[61px] 
								w-full 

							
							"
						>

					
							{/*writtenBy && 
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
							*/}




					
							{/*publishDate && 
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
							*/}


							<div className="flex flex-col flex-none shrink-0 basis-auto items-start justify-start gap-0 box-border overflow-x-hidden overflow-y-hidden relative max-h-fit max-w-fit">
								<div className="flex basis-auto flex-col grow-0 shrink-0 justify-start relative max-h-fit max-w-fit ">
									<p className="text-left font-normal whitespace-nowrap antialiased block text-[12px] md:text-[11px] xl:text-[15px] 
											font-mono 
											text-[rgb(19,52,59)] 
										"
									>
										Raymond B. & Jean T. Lee Center
									</p>
								</div>
							</div>
						


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
					{children}
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





