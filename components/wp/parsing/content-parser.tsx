import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import parse, { domToReact } from 'html-react-parser';
import { cn } from "@/lib/utils";
import parseStyle from 'style-to-object';




export const ContentParser = (
	{ 
		content, 
		className 
	}: any
) => {

	if (!content) return null;

	const options = {

		replace: (domNode: any) => {


			if (!domNode.attribs) return;			




			if (domNode.attribs && domNode.attribs.style) {
				const { 
					style,
					...restAttribs 
				} = domNode.attribs;
			
				const styleObject = parseStyle(style);
				
				domNode = {
					...domNode,
					attribs: {
						...restAttribs,
						style: styleObject
					}
				};
			}




			if (domNode.name === 'p') {
				// Check for multiple images first
				let alignment = ""
				const { style } = domNode.attribs;

				switch (true) {
					case style && style['text-align'] === 'center':
						alignment = "text-center"
						break;
					case style && style['text-align'] === 'left':
						alignment = "text-left"
						break;
					case style && style['text-align'] === 'right':
						alignment = "text-right"
						break;
				}
				const imageNodes = domNode.children.filter((child: any) => child.name === 'img' && child.attribs?.class?.includes('alignnone'));
				if (imageNodes.length > 1) {
					const images = imageNodes.map((imgNode: any) => (
						{
							src: imgNode.attribs['data-src'] || imgNode.attribs.src,
							alt: imgNode.attribs.alt || '',
							width: parseInt(imgNode.attribs.width),
							height: parseInt(imgNode.attribs.height),
						}
					));
					return (
						<div className="flex flex-wrap gap-4 justify-center">
							{images.map((img: any, index:number) => (
								<img key={index} src={img.src} alt={img.alt} width={img.width} height={img.height} className="object-cover" />
							))}
						</div>
					);
				}
				return (
				  	<div className={cn(`tracking-[0.01em] text-base`, alignment)}>
						{domToReact(domNode.children, options)}
				  	</div>
				);
			}




			if (domNode.name === 'h1' || domNode.name === 'h2' || domNode.name === 'h3' || domNode.name === 'h4' || domNode.name === 'h5' || domNode.name === 'h6') {
				let alignment = ""
				const { style } = domNode.attribs;
				switch (true) {
					case style && style['text-align'] === 'center':
						alignment = "text-center"
						break;
					case style && style['text-align'] === 'left':
						alignment = "text-left"
						break;
					case style && style['text-align'] === 'right':
						alignment = "text-right"
						break;
				}
				return (
					<div className={cn(
							`
								font-normal 
								font-sans 
								tracking-[-0.01em] 
								text-2xl 
								sm:text-[2rem] 
								sm:leading-[1.2] 
								mt-0
							`, 
							alignment
						)}
					> 
						{domToReact(domNode.children, options)}
					</div>
				)
			}




			if (domNode.name === 'a') {
				const { href, ...restAttribs } = domNode.attribs;
				return <Link href={href} {...restAttribs}>{domToReact(domNode.children, options)}</Link>
			}


			

			if (domNode.name === 'img') {
				const { src, alt, width, height, class: className = '' } = domNode.attribs;
				let orientation;
				let alignment;
				let inline;
				let containerClasses = "";
				let imgClasses = "";
				const numWidth = parseInt(width) || 0;
				const numHeight = parseInt(height) || 0;
				const breakNumber = numWidth / numHeight
				switch (true) {
					case breakNumber > 1.3:
						orientation = "landscape";
						break;
					case breakNumber <= 1.3:
						orientation = "portrait";
						break;
				}
				switch (true) {
					case className.includes('alignleft'):
						alignment = "left"
						inline = true; 
						break;
					case className.includes('alignright'):
						alignment = "right"
						inline = true;
						break;
					case className.includes('aligncenter'):
						alignment = "center"
						inline = false;
						break;
					default:
						alignment = "none";
						inline = false;
				}
				switch (true) {
					case inline === true && orientation === "landscape" && alignment === "left":
						containerClasses = `float-left mr-6 mb-4 max-w-[300px] sm:max-w-[400px] w-full`
						break;
					case inline === true && orientation === "landscape" && alignment === "right":
						containerClasses = `float-right ml-6 mb-4 max-w-[300px] sm:max-w-[400px] w-full`
						break;
					case inline === true && orientation === "landscape" && alignment === "center":
						containerClasses = `mx-auto block w-full`
						break;
					case inline === true && orientation === "landscape" && alignment === "none":
						containerClasses = `w-full`
						break;
					case inline === true && orientation === "portrait" && alignment === "center":
						containerClasses = `mx-auto block w-full max-w-[400px]`
						break;
					case inline === true && orientation === "portrait" && alignment === "none":
						containerClasses = `w-full max-w-[400px] mx-auto`
						break;
					case inline === true && orientation === "portrait":
						return <InlinePortrait src={src} alt={alt} width={width} height={height} alignment={alignment} />
					case inline === false && orientation === "landscape" && alignment === "left":
						containerClasses = `float-left mr-6 mb-4 max-w-[300px] sm:max-w-[400px] max-w-full w-full`
						break;
					case inline === false && orientation === "landscape" && alignment === "right":
						containerClasses = `float-right ml-6 mb-4 max-w-[300px] sm:max-w-[400px] max-w-full w-full`
						break;
					case inline === false && orientation === "landscape" && alignment === "center":
						containerClasses = `mx-auto block w-full max-w-full`
						break;
					case inline === false && orientation === "landscape" && alignment === "none":
						containerClasses = `w-full max-w-full`
						break;
					case inline === false && orientation === "portrait" && alignment === "left":
						containerClasses = `float-left mr-6 mb-4 max-w-[300px] sm:max-w-[400px] max-w-full max-w-[400px] mx-auto`
						break;
					case inline === false && orientation === "portrait" && alignment === "right":
						containerClasses = `float-right ml-6 mb-4 max-w-[300px] sm:max-w-[400px] max-w-full max-w-[400px] mx-auto`
						break;
					case inline === false && orientation === "portrait" && alignment === "center":
						containerClasses = `mx-auto block w-full max-w-full max-w-[400px]`
						break;
					case inline === false && orientation === "portrait" && alignment === "none":
						containerClasses = `w-full max-w-full max-w-[400px] mx-auto`
						break;
				}
				return (
					<div className={cn(`not-prose relative my-4 rounded-lg border overflow-hidden bg-white`, containerClasses)}>
						<Image src={src} alt={alt || ''} width={width} height={height} className={cn(`w-full h-auto`, imgClasses, inline ? "object-contain" : "object-cover" )}/>
					</div>
				);




			}


		}
	};




	return (
		<article className={
				cn(	
					`
						prose 
						max-w-full 
						prose-neutral 
						prose:font-sans 


						dark:prose-invert 


						xl:prose-lg 


						prose-strong:font-bold 


						prose-a:underline 


						prose-li:mb-[0.85em] 
						last:prose-li:mb-0 
						prose-li:tracking-[0.01em] 
						prose-li:text-base 
						prose-li:has(img):ps-[4ch] 


						prose-ul:ps-[2.5ch] 
						prose-ul:text-base 
						[&_>li]:prose-ul:list-disc 
						[&_>ul]:prose-ul:mb-[0.85em] 


						prose-ol:ps-[2.5ch] 
						prose-ol:text-base 
						[&_>li]:prose-ol:list-decimal 
						[&_>ol]:prose-ol:mb-[0.85em] 
						prose-ol:mt-0 


						prose-blockquote:not-italic 


						prose-pre:border 
						prose-pre:bg-muted/25 


						prose-img:m-0 
						prose-img:rounded-lg 
						prose-img:border 
						prose-img:overflow-hidden 


					`, 
					
					`
						*:mb-6 
						sm:*:mb-8
					`, 

					`
						after:content-[''] 
						after:block 
						after:clear-both
					`, 

					className	
				)
			}
		>
			{
				parse(
					content, 
					options
				)
			}
		</article>
	);
};




const InlinePortrait = (
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
			<Image src={src} alt={alt || ''} width={width} height={height} className={cn(`w-full h-auto object-contain`)} />
		</div>
	);
};



