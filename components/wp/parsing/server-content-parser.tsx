import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import parse, { domToReact } from 'html-react-parser';
import { cn } from "@/lib/utils";
import parseStyle from 'style-to-object';

import {
	TiledGallery,
	extractImagesFromGallery
} from "@/components/wp/parsing/custom-components/tiled-gallery"

import { Carousel } from '@/components/wp/parsing/custom-components/carousel';















export const ServerContentParser = (
	{ 
		content, 
		className 
	}: any
) => {

	console.log("Server Content Parser Ran")

	if (!content) return null;

	const options = {

		replace: (domNode: any) => {

			//console.log("domNode: ", domNode)

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

			// Handle Jetpack Tiled Gallery
			if (domNode.name === 'div' && 
				domNode.attribs.class && 
				domNode.attribs.class.includes('wp-block-jetpack-tiled-gallery')) {
				
				console.log("Found Jetpack Tiled Gallery");
				
				// Simple approach - just extract all images
				const images = extractImagesFromGallery(domNode);
				
				console.log(`Found ${images.length} images in gallery`);
				
				// Return our simplified gallery component
				if (images.length > 0) {
					return <TiledGallery images={images} />;
				}
			}


			// Handle Gutenberg image blocks
			if (domNode.name === 'div' && 
				domNode.attribs.class && 
				domNode.attribs.class.includes('wp-block-image')) {
			
				// Find the figure element inside the div
				const figureNode = domNode.children.find((child: any) => 
					child.name === 'figure' && child.attribs
				);
				
				if (figureNode) {
					// Extract alignment from figure's class
					const figureClass = figureNode.attribs.class || '';
					let alignment = 'none';
					let inline = false;
					
					if (figureClass.includes('alignleft')) {
						alignment = 'left';
						inline = true;
					} else if (figureClass.includes('alignright')) {
						alignment = 'right';
						inline = true;
					} else if (figureClass.includes('aligncenter')) {
						alignment = 'center';
						inline = false;
					}
					
					// Find the img inside the figure
					const imgNode = figureNode.children.find((child: any) => 
						child.name === 'img' && child.attribs
					);
					
					if (imgNode) {
						// Extract image attributes
						const { 
							src, 
							alt = '', 
							width, 
							height, 
							style: styleAttr,
							class: className = '', 
							'data-width': dataWidth, 
							'data-height': dataHeight,
						} = imgNode.attribs;
						
						// Skip if no source
						if (!src) {
							return null;
						}
						
						// Sets a reassignable variable for width and height
						let effectiveWidth = width;
						let effectiveHeight = height;
						
						// Use data attributes if width/height not specified
						if (!width && !height) {
							effectiveWidth = dataWidth;
							effectiveHeight = dataHeight;
						}
						
						// Check for width in style attribute
						if (styleAttr) {
							const styleObj = parseStyle(styleAttr);
							if (styleObj && styleObj.width) {
								const styleWidth = styleObj.width.replace('px', '');
								effectiveWidth = styleWidth;
							}
						}
						
						// Determine image orientation
						const numWidth = parseInt(effectiveWidth) || 0;
						const numHeight = parseInt(effectiveHeight) || 0;
						const breakNumber = numWidth / numHeight;
						
						let orientation = breakNumber > 1.3 ? "landscape" : "portrait";
						
						// Set container classes based on alignment and orientation
						let containerClasses = "";
						let imgClasses = "";
						
						// Determine container classes based on combination of factors
						if (inline && orientation === "landscape" && alignment === "left") {
							containerClasses = `float-left mr-6 mb-4 max-w-[300px] sm:max-w-[400px] w-full`;
						} else if (inline && orientation === "landscape" && alignment === "right") {
							containerClasses = `float-right ml-6 mb-4 max-w-[300px] sm:max-w-[400px] w-full`;
						} else if (inline && orientation === "landscape" && alignment === "center") {
							containerClasses = `mx-auto block w-full`;
						} else if (inline && orientation === "landscape" && alignment === "none") {
							containerClasses = `w-full`;
						} else if (inline && orientation === "portrait" && alignment === "center") {
							containerClasses = `mx-auto block w-full max-w-[400px]`;
						} else if (inline && orientation === "portrait" && alignment === "none") {
							containerClasses = `w-full max-w-[400px] mx-auto`;
						} else if (inline && orientation === "portrait") {
							// For portrait inline images with left/right alignment, use specialized component
							return (
								<InlinePortrait 
									src={src} 
									alt={alt} 
									width={effectiveWidth} 
									height={effectiveHeight} 
									alignment={alignment} 
								/>
							);
						} else if (!inline && orientation === "landscape" && alignment === "left") {
							containerClasses = `float-left mr-6 mb-4 max-w-[300px] sm:max-w-[400px] max-w-full w-full`;
						} else if (!inline && orientation === "landscape" && alignment === "right") {
							containerClasses = `float-right ml-6 mb-4 max-w-[300px] sm:max-w-[400px] max-w-full w-full`;
						} else if (!inline && orientation === "landscape" && alignment === "center") {
							containerClasses = `mx-auto block w-full max-w-full`;
						} else if (!inline && orientation === "landscape" && alignment === "none") {
							containerClasses = `w-full mx-auto`;
						} else if (!inline && orientation === "portrait" && alignment === "left") {
							containerClasses = `float-left mr-6 mb-4 max-w-[300px] sm:max-w-[400px] max-w-full max-w-[400px] mx-auto`;
						} else if (!inline && orientation === "portrait" && alignment === "right") {
							containerClasses = `float-right ml-6 mb-4 max-w-[300px] sm:max-w-[400px] max-w-full max-w-[400px] mx-auto`;
						} else if (!inline && orientation === "portrait" && alignment === "center") {
							containerClasses = `mx-auto block w-full max-w-full max-w-[400px]`;
						} else if (!inline && orientation === "portrait" && alignment === "none") {
							containerClasses = `w-full max-w-[400px] mx-auto`;
						}
						
						// Return image with appropriate container and styling
						return (
							<div 
								className={cn(
									`
									not-prose 
									relative 
									my-4 
									rounded-lg 
									border 
									overflow-hidden 
									bg-white
									`, 
									containerClasses
								)}
							>
								<Image 
									src={src} 
									alt={alt} 
									width={parseInt(effectiveWidth) || 800} 
									height={parseInt(effectiveHeight) || 600} 
									className={cn(
									`w-full h-auto`, 
									imgClasses, 
									inline ? "object-contain" : "object-cover" 
									)}
								/>
							</div>
						);
					}
				}
			}


			// Add this before your other image handlers

			// Handle Gutenberg Gallery Blocks
			if (domNode.name === 'figure' && 
				domNode.attribs.class && 
				domNode.attribs.class.includes('wp-block-gallery')) {
			
				// Extract all nested image figures
				const imageFigures: any[] = [];
				domNode.children.forEach((child: any) => {
					if (child.name === 'figure' && 
						child.attribs && 
						child.attribs.class && 
						child.attribs.class.includes('wp-block-image')) {
					
							// Find the img inside each figure
							const imgNode = child.children.find((imgChild:any) => 
								imgChild.name === 'img' && imgChild.attribs
							);
							
							if (imgNode) {
								imageFigures.push({
									src: imgNode.attribs.src,
									alt: imgNode.attribs.alt || '',
									width: parseInt(imgNode.attribs.width) || 800,
									height: parseInt(imgNode.attribs.height) || 600
								});
							}
						}
				});
				
				// Only process if we found images
				if (imageFigures.length > 0) {
					// Determine if this is a two-image gallery (like your example)
					if (imageFigures.length === 2) {
						return (
							<div className="my-8 w-full">
								<div className="flex flex-row gap-2">
									{imageFigures.map((img, index) => (
										<div key={index} className="flex-1 overflow-hidden rounded-lg border bg-white">
											<Image 
												src={img.src} 
												alt={img.alt} 
												width={img.width} 
												height={img.height} 
												className="w-full h-auto object-cover" 
											/>
										</div>
									))}
								</div>
							</div>
						);
					}
					
					// For galleries with more images, use a grid layout
					return (
						<div className="my-8 w-full">
							<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
								{imageFigures.map((img, index) => (
									<div key={index} className="overflow-hidden rounded-lg border bg-white">
										<Image 
											src={img.src} 
											alt={img.alt} 
											width={img.width} 
											height={img.height} 
											className="w-full h-auto object-cover" 
										/>
									</div>
								))}
							</div>
						</div>
					);
				}
			}



			// Handler for Jetpack Slideshow in ServerContentParser
			if (domNode.name === 'div' && 
				domNode.attribs.class && 
				domNode.attribs.class.includes('wp-block-jetpack-slideshow')) {
			
				// Prepare the data structure for your carousel
				const slideData:any[] = [];
				
				// Navigate through the DOM structure to find all slides
				const containerNode = domNode.children.find((child: any) => 
					child.name === 'div' && 
					child.attribs?.class?.includes('wp-block-jetpack-slideshow_container')
				);
				
				if (containerNode) {
					
					const slidesListNode = containerNode.children.find((child: any) => 
						child.name === 'ul' && 
						child.attribs?.class?.includes('wp-block-jetpack-slideshow_swiper-wrapper')
					);
					
					if (slidesListNode && slidesListNode.children) {
						// Extract image src from each slide
						slidesListNode.children.forEach((slide: any) => {
							if (slide.name === 'li' && slide.attribs?.class?.includes('wp-block-jetpack-slideshow_slide')) {
								const figureNode = slide.children.find((child: any) => child.name === 'figure');
								if (figureNode) {
									const imgNode = figureNode.children.find((child: any) => child.name === 'img');
									if (imgNode && imgNode.attribs && imgNode.attribs.src) {
										// Add this slide to our data array
										slideData.push({
											src: imgNode.attribs.src
										});
									}
								}
							}
						});
					}

				}
				
				// If we found slides, render your carousel component
				if (slideData.length > 0) {
					return (
						<div className="relative overflow-hidden w-full h-full py-20 mt-0!">
							<Carousel slides={slideData} />
						</div>
					);
				}
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
								<img 
									key={index} 
									src={img.src} 
									alt={img.alt} 
									width={img.width} 
									height={img.height} 
									className="object-cover" 
								/>
							))}
						</div>
					);

				}

				return (
				  	<div className={
							cn(
								`
									tracking-[0.01em] 
									text-base
									mb-6 sm:mb-8
								`, 
								alignment
							)
						}
					>
						{
							domToReact(
								domNode.children, 
								options
							)
						}
				  	</div>
				);
			}

			if (domNode.name === 'h1' || domNode.name === 'h2' || domNode.name === 'h3' || domNode.name === 'h4' || domNode.name === 'h5' || domNode.name === 'h6') {
				
				let alignment = ""

				const { 
					style, 
					class: className = ''  
				} = domNode.attribs;


				if (style && style['text-align'] === 'center' || className && className.includes('has-text-align-center')) {
					alignment = "text-center"

				} else if (style && style['text-align'] === 'left' || className && className.includes('has-text-align-left')) {
					alignment = "text-left"

				} else if (style && style['text-align'] === 'right' || className && className.includes('has-text-align-right')) {
					alignment = "text-right"

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

			if (domNode.name === 'ul') {
				return (
					<ul className="
							ps-[2.5ch] 
							text-base  
						"
					>
					  {domToReact(domNode.children, options)}
					</ul>
				);
			}


			if (domNode.name === 'a') {
				const { 
					href, 
					class: className, 
					...restAttribs 
				} = domNode.attribs;


				let finalHref = ""

				if (!href) {
					finalHref = "#"
				} else {
					finalHref = href
				}


				return (
                    <Link 
						href={finalHref} 
						{...restAttribs} 
						className={cn(
							className, 
							`
								underline 
								hover:text-blue-500
							`
						)}
					>
                        {
							domToReact(
								domNode.children, 
								options
							)
						}
                    </Link>
                );
			}


			// Add this to your ContentParser options.replace function

			// Handle tables
			if (domNode.name === 'table') {
				return (
					<table className="w-full border-collapse my-4">
						{domToReact(domNode.children, options)}
					</table>
				);
			}
			
			// Handle table body
			if (domNode.name === 'tbody') {
				return <tbody>{domToReact(domNode.children, options)}</tbody>;
			}
			
			// Handle table rows
			if (domNode.name === 'tr') {
				return <tr className="border border-gray-300">{domToReact(domNode.children, options)}</tr>;
			}
			
			// Handle table cells
			if (domNode.name === 'td') {
				return (
					<td className="border border-gray-300 p-2 text-center">
						{domToReact(domNode.children, options)}
					</td>
				);
			}
			
			// Handle figure blocks that might contain tables
			if (domNode.name === 'figure' && domNode.attribs.class?.includes('wp-block-table')) {
				return <div className="overflow-x-auto w-full my-6">{domToReact(domNode.children, options)}</div>;
			}


			// Built for handling PDF Object
			if (domNode.name === 'object') {
				const {
					data, 
					style
				} = domNode.attribs


				let height = '800px'; // Default height
				if (style) {
					const styleObj = parseStyle(style);
					if (styleObj && styleObj.height) {
						height = styleObj.height;
					}
				}
				
				return (
					<div className="relative w-full max-w-[800px] my-6">
						<iframe 
							src={`${data}#view=FitH`} 
							className="w-full border-0" 
							style={{ height }} 
							title="PDF Document"
							allowFullScreen 
						/>
					</div>
				);
			}


			if (domNode.name === 'img') {
				const { 
					src, 
					alt, 
					width, // Cannot be reassigned -- Default size set by editor
					height, // Cannot be reassigned -- Default size set by editor
					style: styleAttr,
					class: className = '', 
					'data-width': dataWidth, 
					'data-height': dataHeight,
				} = domNode.attribs;

			
				


				
				// Sets a reassignable variable for widht and height
				let effectiveWidth = width;
				let effectiveHeight = height;



				// Checks if image exists
				if (!src) {
					// Return empty div or placeholder for empty image sources
					return (
						<div 
							style={{ width: `${width}px`, height: `${height}px` }} 
							className="empty-img-placeholder"
						></div>
					);
				}

				if (!width && !height) {
					effectiveWidth = dataWidth
					effectiveHeight = dataHeight
				}





				if (width && height && width <= 1 && height <= 1) {
					// This is likely a tracking pixel, keep it as-is without any special container or styling
					return (
						<img src={src} alt={alt || ''} width={width} height={height} />
					);
				}

				// Sets a reassignable variable for widht and height
				if (styleAttr && styleAttr.width) {
					let styleAttrWidthValue = styleAttr.width.replace('px', '');
					effectiveWidth = styleAttrWidthValue;	
				}



				// Assigns variables for alignment and landscape or portrait
				let orientation;
				let alignment;
				let inline;
				let containerClasses = "";
				let imgClasses = "";

				// Calculates values to determine portrait or landscape
				const numWidth = parseInt(effectiveWidth) || 0;
				const numHeight = parseInt(effectiveHeight) || 0;
				const breakNumber = numWidth / numHeight

				// Determines Landscape or Portrait
				if (breakNumber > 1.3) {
					orientation = "landscape";
				} else if (breakNumber <= 1.3) {
					orientation = "portrait";
				}

				// Determines Alignment
				if (className.includes('alignleft')) {
					alignment = "left"
					inline = true; 
				} else if (className.includes('alignright')) {
					alignment = "right"
					inline = true;
				} else if (className.includes('aligncenter')) {
					alignment = "center"
					inline = false;
				} else {
					alignment = "none";
					inline = false;
				}

				// 11
				if (inline === true && orientation === "landscape" && alignment === "left") {
					//console.log("Image Value: 1")
					containerClasses = `float-left mr-6 mb-4 max-w-[300px] sm:max-w-[400px] w-full`

				} else if (inline === true && orientation === "landscape" && alignment === "right") {
					//console.log("Image Value: 2")
					containerClasses = `float-right ml-6 mb-4 max-w-[300px] sm:max-w-[400px] w-full`

				} else if (inline === true && orientation === "landscape" && alignment === "center") {
					//console.log("Image Value: 3")
					containerClasses = `mx-auto block w-full`

				} else if (inline === true && orientation === "landscape" && alignment === "none") {
					//console.log("Image Value: 4")
					containerClasses = `w-full`

				} else if (inline === true && orientation === "portrait" && alignment === "center") {
					//console.log("Image Value: 5")
					containerClasses = `mx-auto block w-full max-w-[400px]`

				} else if (inline === true && orientation === "portrait" && alignment === "none") {
					//console.log("Image Value: 6")
					containerClasses = `w-full max-w-[400px] mx-auto`

				} else if (inline === true && orientation === "portrait") {
					//console.log("Image Value: 7")
					return (
						<InlinePortrait 
							src={src} 
							alt={alt} 
							width={effectiveWidth} 
							height={effectiveHeight} 
							alignment={alignment} 
							className="m-0 rounded-lg border overflow-hidden"
						/>
					)

				} else if (inline === false && orientation === "landscape" && alignment === "left") {
					//console.log("Image Value: 8")
					containerClasses = `float-left mr-6 mb-4 max-w-[300px] sm:max-w-[400px] max-w-full w-full`

				} else if (inline === false && orientation === "landscape" && alignment === "right") {
					//console.log("Image Value: 9")
					containerClasses = `float-right ml-6 mb-4 max-w-[300px] sm:max-w-[400px] max-w-full w-full`

				} else if (inline === false && orientation === "landscape" && alignment === "center") {
					//console.log("Image Value: 10")
					containerClasses = `mx-auto block w-full max-w-full`

				} else if (inline === false && orientation === "landscape" && alignment === "none") {
					//console.log("Image Value: 11");
					containerClasses = `w-full mx-auto`;

					return (
						<div 
							className={cn(
								`
									not-prose 
									relative 
									my-4 
									rounded-lg 
									border 
									overflow-hidden 
									bg-white
								`, 
								containerClasses
							)}
							style={{ maxWidth: `${effectiveWidth}px` }}
						>
							<Image 
								src={src} 
								alt={alt || ''} 
								width={effectiveWidth} 
								height={effectiveHeight} 
								className={cn(
									`w-full h-auto`, 
									`m-0 rounded-lg border overflow-hidden`,
									imgClasses, 
									inline ? "object-contain" : "object-cover" 
								)}
							/>
						</div>
					);

				} else if (inline === false && orientation === "portrait" && alignment === "left") {
					//console.log("Image Value: 12")
					containerClasses = `float-left mr-6 mb-4 max-w-[300px] sm:max-w-[400px] max-w-full max-w-[400px] mx-auto`

				} else if (inline === false && orientation === "portrait" && alignment === "right") {
					//console.log("Image Value: 13")
					containerClasses = `float-right ml-6 mb-4 max-w-[300px] sm:max-w-[400px] max-w-full max-w-[400px] mx-auto`

				} else if (inline === false && orientation === "portrait" && alignment === "center") {
					//console.log("Image Value: 14")
					containerClasses = `mx-auto block w-full max-w-full max-w-[400px]`

				} else if (inline === false && orientation === "portrait" && alignment === "none") {
					//console.log("Image Value: 15")
					containerClasses = `w-full max-w-[400px] mx-auto`

				}

				return (
					<div 
						className={cn(
							`
								not-prose 
								relative 
								my-4 
								rounded-lg 
								border 
								overflow-hidden 
								bg-white
							`, 
							containerClasses
						)}
					>
						<Image 
							src={src} 
							alt={alt || ''} 
							width={effectiveWidth} 
							height={effectiveHeight} 
							className={cn(
								`w-full h-auto`, 
								`m-0 rounded-lg border overflow-hidden`,
								imgClasses, 
								inline ? "object-contain" : "object-cover" 
							)}
						/>
					</div>
				);
			}

			
		}
	};

	return (
		<article className={
				cn(	
					`
						prose-neutral 
						prose:font-sans 
						dark:prose-invert 

						prose-strong:font-bold 

						prose-li:mb-[0.85em] 
						last:prose-li:mb-0 
						prose-li:tracking-[0.01em] 
						prose-li:text-base 
						prose-li:has(img):ps-[4ch] 


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
					`, 
					`
						space-y-6 
						sm:space-y-8	
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






