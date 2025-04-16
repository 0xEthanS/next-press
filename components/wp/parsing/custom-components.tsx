import Image from "next/image";
import { cn } from "@/lib/utils";




export const InlinePortrait = (
	{
		src,
		alt,
		width,
		height,
		alignment
	}: any
) => {
	let alignClass = '';

	switch (true) {
		case alignment === 'left':
			alignClass = "float-left mr-6"
			break;
		case alignment === 'right':
			alignClass = 'float-right ml-6'
			break;
	}

	return (
		<div className={
			cn(`
				not-prose 
				relative 
				my-4 
				rounded-lg 
				border 
				overflow-hidden 
				bg-white 
				float-left 
				mr-6 
				mb-4 
				w-auto
				`,
				alignClass
			)
		}
			style={{
				maxWidth: `${width}px`,
				minWidth: `${width}px`
			}}
		>
			<Image 
                src={src} 
                alt={alt || ''} 
                width={width} 
                height={height} 
                className={cn(`w-full h-auto object-contain`)} 
            />
		</div>
	);
};