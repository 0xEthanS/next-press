import React from 'react';
import Image from 'next/image';




export const Hero0 = () => {
	return (
		<div className="relative w-full h-screen overflow-hidden bg-teal-600 pt-[105px]">


			{/* Optimized background with proper z-index stacking */}
			<div 
				className="absolute inset-0 z-0" 
				aria-hidden="true"
				style={{ 
					background: 'radial-gradient(circle at 70% 50%, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 70%)',
				}}
			/>

			
			{/* CAMOC watermark with hardware-accelerated transform and reduced repaints */}
			<div 
				className="absolute inset-0 overflow-hidden pointer-events-none z-0 pt-[105px]" 
				aria-hidden="true"
			>
				<div 
					className="absolute left-1/2 top-10 opacity-5 transform-gpu -translate-x-1/2"
					style={{ willChange: 'transform' }}
				>
					<p className="text-[25rem] font-black text-cream tracking-tighter leading-none select-none">
						CAMOC
					</p>
				</div>
			</div>
			

			{/* Performance-optimized responsive layout container */}
			<div className="relative z-10 flex flex-col lg:flex-row h-full max-w-screen-2xl mx-auto">

				
				{/* Text column with responsive padding */}
				<div className="w-full lg:w-3/5 flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-10 lg:py-0">

					{/* Semantic heading structure */}
					<header className="mb-10">
						<h1 className="m-0 p-0">
							<span className="block text-6xl md:text-7xl lg:text-8xl font-black text-black tracking-tight leading-none mb-2">
								CHINESE
							</span>
							<span className="block -mt-2 md:-mt-3 text-5xl md:text-6xl lg:text-7xl font-black text-black tracking-tight leading-none">
								AMERICAN
							</span>
							<span className="block -mt-1 md:-mt-2 ml-16 md:ml-24 text-4xl md:text-5xl lg:text-6xl font-bold text-black tracking-tight">
								MUSEUM
							</span>


							{/* "of Chicago" with explicit hardware acceleration */}
							<span 
								className="block -mt-1 md:-mt-2 ml-32 md:ml-48 font-serif italic text-4xl md:text-5xl text-yellow-400 inline-block select-none" 
								style={{
									fontFamily: "'Georgia', serif",
									fontStyle: "italic",
									fontWeight: "bold",
									textShadow: "2px 2px 0px rgba(0,0,0,0.2)",
									transform: "rotate(-2deg)",
									transformOrigin: "left center",
									willChange: "transform"
								}}
							>
								of CHICAGO
							</span>

							
						</h1>
					</header>
					
					{/* Tagline with accessible semantic structure */}
					<div className="flex mb-10 lg:mb-12">
						<div className="w-1 flex-shrink-0 bg-yellow-400 mr-6"></div>
						<div>
							<p className="text-xl text-black font-serif m-0">
								Where culture crosses continents and stories span generations.
							</p>
							<p className="text-sm text-black mt-2 m-0">
								Explore the intersection of heritage and identity.
							</p>
						</div>
					</div>
					
					{/* Optimized buttons with proper focus states */}
					<div className="flex flex-col sm:flex-row gap-6">
						<button 
							className="px-8 py-4 text-lg font-medium bg-yellow-400 text-black hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 transition-colors shadow-lg"
							type="button"
						>
							PLAN YOUR VISIT
						</button>
						<button 
							className="px-8 py-4 text-lg font-medium border-2 border-teal-700 text-black hover:bg-teal-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2 transition-colors"
							type="button"
						>
							CURRENT EXHIBITIONS
						</button>
					</div>

				</div>
				


				{/* Right column - Exhibit image space */}
				<div className="hidden lg:block w-2/5 relative">
					{/* Image container with refined Glaser-inspired framing */}
					<div className="absolute inset-0 flex items-center justify-center p-16">
						{/* Image container with enhanced border */}
						<div className="w-full h-full relative overflow-hidden shadow-2xl">
							{/* Border inspired by Glaser's sense of color and form */}
							<div className="absolute inset-0 border-8 border-yellow-400 z-10">
								{/* Blue accent corner - connecting the image colors to the text */}
								<div className="absolute top-0 left-0 w-16 h-16 border-b-8 border-r-8 border-blue-500 opacity-80"></div>
							</div>
							
							{/* Using Next.js Image component */}
							<div className="absolute inset-0">
								<Image 
									src="/image0.png"
									alt="Featured Exhibit"
									fill={true}
									sizes="100vw"
									style={{ objectFit: 'cover' }}
									quality={90}
									priority
								/>
							</div>
						</div>
					</div>
				</div>




			</div>
		</div>
	);
};

