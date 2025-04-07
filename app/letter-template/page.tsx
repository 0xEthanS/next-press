import { 
    MainContainer, 
    ContentSectionButton, 
    ImageContainer, 
    TextContainer 
} from "@/components/pages/content-section";
import Image from "next/image";


// Testing File. Not used in production




export default function Page() {
	return (
		<div>




			<div className="bg-custom-white">
				<div className="mx-auto w-full max-w-(--breakpoint-xl) px-5 sm:px-10 pt-16 sm:pt-28">
					<div className="border-b border-custom-black pb-14 pt-8 xl:py-24">
						<div className='grid gap-8 sm:grid-cols-[max-content_1fr] sm:gap-y-20'>  
							
							
							<div className='flex shrink-0'>
								<div className='flex h-8 w-fit shrink-0 items-center rounded-xl px-2.5 bg-orange-300'>
									<p className="tracking-[0.01em] font-mono text-sm uppercase leading-[1.1] font-medium">
										Letters
									</p>
								</div>
							</div> 


							<div className='flex flex-col gap-4 sm:border-l sm:border-black sm:pl-9'>
								<h1 className='font-sans tracking-[-0.01em] text-3xl leading-[1.2] sm:text-[2.5rem] sm:leading-[1.1]'>
									Earl D. Bennett Letter
								</h1>
								<p className='text-base leading-tight tracking-normal sm:text-[1.25rem] sm:leading-normal italic text-custom-black'>
									Letter Subheader
								</p>
							</div>


						</div>
					</div>
				</div>
			</div>




			


			<div className="bg-custom-white">
            	<div className="mx-auto w-full px-6 md:px-16 pt-16 md:pt-28">
                	<div className="pb-14 pt-8 md:pb-24 border-b border-custom-black">
                    	<div className="flex flex-col gap-5 md:grid md:grid-cols-4 relative">




							<a 
								href="#"
								className="
									md:relative 
									md:col-span-2 
									md:order-2
								"
							>
								<div className="
										md:sticky 
										md:top-[113px]
									"
								>

									<Image 
										src="https://oldhamkyhistory.com/wp-content/uploads/2023/12/5-19-43-Mom-Addendum-pt.1-scaled.jpg" 
										alt="" 
										width={1704} 
										height={2560} 
										className="
											rounded-lg
										"
									/>

									{/*
									<Image 
										src="https://oldhamkyhistory.com/wp-content/uploads/2023/12/5-19-43-Mom-Addendum-pt.2-scaled.jpg" 
										alt="" 
										width={1629} 
										height={2560} 
										className="
											rounded-lg
										"
									/>

									<Image 
										src="https://oldhamkyhistory.com/wp-content/uploads/2023/12/5-19-43-Mom-Addendum-pt.3-scaled.jpg" 
										alt="" 
										width={1532} 
										height={2560} 
										className="
											rounded-lg
										"
									/>

									<Image 
										src="https://oldhamkyhistory.com/wp-content/uploads/2023/12/5-19-43-Mom-Addendum-pt.4-scaled.jpg" 
										alt="" 
										width={1550} 
										height={2560} 
										className="
											rounded-lg
										"
									/>
									*/}

								</div>
							</a>




							<div className="
									flex 
									flex-1 
									flex-col 
									justify-start
									gap-5 
									md:col-span-2 
									md:order-1
								"
							>


								<h1 className="font-sans tracking-[-0.01em] text-2xl sm:text-[2rem] sm:leading-[1.2]">
									Earl D. Bennett Letter – 5-19-43 To Mom
								</h1>


								<p className="tracking-[0.01em] text-base line-clamp-6">
									TRANSCRIPT
								</p>

								<p className="tracking-[0.01em] text-base line-clamp-6">
									ARMY AIR BASE – LINCOLN, NEBRASKA
								</p>

								<p className="tracking-[0.01em] text-base line-clamp-6">
									POSTMARKED: 5-19-43
								</p>

								<p className="tracking-[0.01em] text-base line-clamp-6">
									Dear mom,
								</p>

								<p className="tracking-[0.01em] text-base line-clamp-6">
									Hope this will find everyone allright. I am feeling pretty bad tonite so instead of going to school I am going on sick call and get some thing for my cold. I guess it is because I didn’t have any sleep over the weekend. Golly I’d rather die than go to the darn old hospital here. They keep you in 14 days before they let you out. I am trying my best to stay out. I only have 9 days of school left to go and boy am I glad. I don’t know where I’ll go from here. Maybe another school. Maybe a specialist school. Maybe not. I am tired of schools for a while. I would like to get in a squadron for about 2 or 3 months.
								</p>

								<p className="tracking-[0.01em] text-base line-clamp-6">
									I recd. the money you sent and thanks a million until I pay it back. I had enough until I bought an engagement ring, $92.87, for my girl. Golly I wish I had never seen Lincoln, Nebraska. My girl wants to get married before I leave but I told her she’d have to meet my mom first. I guess I’ve really found the girl I love but I am not going to get hitched till I’m sure.
								</p>

								<p className="tracking-[0.01em] text-base line-clamp-6">
									Did I tell you that am about to be busted to a Pvt. again because I was caught walking on the grass. Ha! Ha! These guys are crazy enough to do it too. I told my C.O. that if they did that I was going to write my C.O. of my old outfit & have him put in a complaint at Washington D.C. about these guys being so strict here and he’ll possibly do it for me.
								</p>

								<p className="tracking-[0.01em] text-base line-clamp-6">
									Well mom will close for now. Hoping to hear from you soon.
								</p>

								<p className="tracking-[0.01em] text-base line-clamp-6">
									Lots of love,
								</p>

								<p className="tracking-[0.01em] text-base line-clamp-6">
									Earl D.
								</p>

								<p className="tracking-[0.01em] text-base line-clamp-6">
									P.S. Am enclosing a letter from miss Leola Brinkhoff’s dad. She wrote him & told him about me & here’s his answer. It’s a nice letter isn’t it.
								</p>

								
							</div>




						</div>
					</div>
				</div>
			</div>




		</div>
	);
}