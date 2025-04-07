import React from 'react';
import { Space_Grotesk } from "next/font/google";
import Image from "next/image";
import Link from 'next/link';
import { Button } from "@/components/buttons";




const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });




const Hero = () => {
	return (
		<section className="relative min-h-screen overflow-hidden bg-custom-dark-green">

			{/* Main content */}
			<div className="relative z-10 pt-24 lg:pt-28 px-6 lg:px-16 max-w-[1400px] mx-auto">
				<div className="max-w-3xl">

					{/* Main heading with refined typography */}
					<h1 className={`${spaceGrotesk.className} text-5xl lg:text-7xl font-medium mb-6 leading-[1.1] tracking-[-0.02em] 
							text-custom-white 
						`}
					>
						Discover Oldham <br />
						County's Rich <br />
						Heritage
					</h1>

					{/* Description with improved contrast */}
					<p className="text-lg lg:text-xl mb-8 max-w-xl leading-relaxed backdrop-blur-xs p-4 rounded-lg
							text-custom-white 
							bg-custom-black/20 
						"
					>
						Experience centuries of history through our unique 
						collection of artifacts, photographs, and stories that bring 
						our community's past to life.
					</p>
					
					{/* Refined CTA buttons */}
					<div className="flex flex-wrap gap-4">
						<Button className='transition-all duration-300 h-12 
								bg-custom-white 
								text-custom-black 
								hover:bg-custom-white/90 
							'
						>
							<Link href="/visit/hours&admission">
								Plan Your Visit
							</Link>
						</Button>
						<Button className='transition-all duration-300 h-12
								bg-custom-tan 
								border-custom-tan 
								text-custom-black 
								hover:bg-custom-tan/90 
							'
						>
							<Link href="/donate">
								Support Us
							</Link>
						</Button>
					</div>

				</div>
			</div>

			{/* Refined image gallery */}
			<div className="absolute inset-0 w-full h-full pointer-events-none">

				<div className="absolute inset-0 bg-linear-to-r to-transparent z-2
						from-custom-dark-green
						via-custom-dark-green/80 
					" 
				/>

				{/* Large background image */}
				<div className="absolute right-0 bottom-0 w-[calc(80vw)] h-4/5 z-1">
					<Image
						src="/1953DerbyWinner-Dark-Star.jpg"
						alt="1953 Derby Winner Dark Star"
						className="rounded-tl-3xl object-cover" 
						fill
					/>
				</div>
				



				{/* Floating image card 1 */}
				<div className="block absolute w-72 h-48 z-3 transform rotate-2 right-[5%] top-[55%]">
					<div className="absolute inset-0 rounded-lg shadow-2xl">
						<Image
							src="/Hermitage-600x400.jpg" 
							alt="Hermitage" 
							className="rounded-lg" 
							width={600}
							height={400}
						/>
					</div>
				</div>
				



				{/* Floating image card 2 */}
				<div className="block absolute w-64 h-fit z-3 transform -rotate-3 right-[35%] bottom-[25%] md:bottom-[30%]">
					<div className="absolute inset-0 rounded-lg shadow-2xl">
						<Image
							src="/DW-Griffith-Groucho-Marx-400.jpg"
							alt="Historical Figure" 
							className="rounded-lg" 
							width={400}
							height={220}
						/>
					</div>
				</div>




			</div>

		</section>
	);
};




export default Hero;



