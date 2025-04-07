import * as React from "react";
import Image from "next/image";
import { ArrowRightIcon } from "@/components/icons";
// Used for home page 



const MainContainer = (
	{ 
		background,
		border,
		children 
	}: { 
		background: string;
		border: string;
		children: React.ReactNode 
	}
) => {
	return (
		<div className={`${background}`}>
			<div className="mx-auto w-full px-6 md:px-16 pt-16 md:pt-28">
				<div className={`pb-14 pt-8 md:pb-24 ${border}`}>
					<div className="flex flex-col gap-5 md:grid md:grid-cols-4 relative ">
						{children}
					</div>
				</div>
			</div>
		</div>
	);
}




const ContentSectionButton = (
	{ 
		href, 
		children 
	}: { 
		href: string;
		children: React.ReactNode 
	}
) => {
	return (
		<div>
			<a 
				href={`${href}`} 
				className="group inline-flex cursor-pointer items-center justify-center rounded-full font-mono text-sm uppercase tracking-[0.01em] transition-colors delay-75 h-auto gap-2 p-0 hover:underline 
					border-home-border 
					bg-transparent 
					text-home-text 
					hover:text-home-text/90 
				"
			>
				{children}
				<ArrowRightIcon width={25} height={25} />
			</a>
		</div>
	);
}




const ImageContainer = (
	{
		href,
		order,
		src,
		alt,
		width,
		height
	}: {
		href?: string;
		order: string;
		src: string;
		alt: string;
		width: number;
		height: number
	}
) => {
	return (
		<>
			<a 
				href={`${href}`}
				className={`md:relative md:col-span-2 ${order}`}
			>
				<div className="md:sticky md:top-[113px]">
					<Image 
						src={`${src}`}
						alt={`${alt}`}
						width={width}
						height={height}
						className="rounded-lg"
					/>
				</div>								
			</a>
		</>
	);
}




const TextContainer = (
	{ 
		order, 
		children 
	}: { 
		order: string; 
		children: React.ReactNode 
	}
) => {
	return (
		<div className={`flex flex-1 flex-col justify-end gap-5 md:col-span-2 ${order}`}>
			{children}
		</div>
	);
}




export { 
	MainContainer, 
	ContentSectionButton, 
	ImageContainer, 
	TextContainer 
}



