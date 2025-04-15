import React from 'react';
import Image from "next/image";
import { Button } from "@/components/ui/button"








const Hero = () => {
		return (
				// Hero Section
				<section className="relative overflow-hidden">
					<div className="absolute inset-0 z-0">




						<Image
							src="/sun___leaders.jpg"
							alt="Chinese American Museum"
							fill
							className="object-cover"
							priority
						/>




						<div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
					</div>

					{/* Decorative elements */}
					<div className="absolute top-0 right-0 w-64 h-64 opacity-20 z-0">
						<svg viewBox="0 0 100 100" className="w-full h-full text-red-600">
							<path d="M50,3 L97,50 L50,97 L3,50 L50,3" fill="currentColor" />
						</svg>
					</div>
					<div className="absolute bottom-0 left-0 w-40 h-40 opacity-20 z-0">
						<svg viewBox="0 0 100 100" className="w-full h-full text-red-600">
							<path d="M50,3 L97,50 L50,97 L3,50 L50,3" fill="currentColor" />
						</svg>
					</div>

					<div className="container relative z-10 py-24 md:py-32 lg:py-40">
						<div className="max-w-3xl space-y-6 text-white">
							<div className="inline-block px-3 py-1 border border-red-400/30 bg-red-900/20 rounded-md text-sm font-medium text-red-100 mb-2">
								Established 2005
							</div>
							<h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
								<span className="block text-red-400">Discover</span>
								<span className="block">Chinese American</span>
								<span className="block">Heritage & Culture</span>
							</h1>
							<p className="text-lg md:text-xl text-white/90 max-w-xl border-l-4 border-red-500 pl-4">
								Explore the rich history, vibrant traditions, and significant contributions of Chinese Americans through
								our immersive exhibits and programs.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 pt-6">
								<Button size="lg" className="bg-red-700 hover:bg-red-800 text-white group transition-all duration-300">
									Plan Your Visit
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
									>
										<path d="M5 12h14"></path>
										<path d="m12 5 7 7-7 7"></path>
									</svg>
								</Button>

								
								<Button size="lg" variant="outline" className="border-white text-white hover:text-white hover:bg-white/5 bg-white/30"
								>
									Explore Exhibits
								</Button>



							</div>
						</div>
					</div>

					{/* Scroll indicator */}
					<div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 hidden md:block">
						<div className="flex flex-col items-center text-white/70">
							<span className="text-xs mb-2">Scroll to explore</span>
							<div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
								<div className="w-1 h-2 bg-white/70 rounded-full animate-bounce"></div>
							</div>
						</div>
					</div>
				</section>
		);
};




export default Hero;






// /Hermitage-600x400.jpg
// /1953DerbyWinner-Dark-Star.jpg
// /DW-Griffith-Groucho-Marx-400.jpg



