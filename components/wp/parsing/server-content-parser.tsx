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

import { BlurButton } from "@/components/wp/parsing/custom-components/buttons"


import {
	jetbrains, 
	hanken, 
	cormorantG, 
	libre
} from "@/components/ui/fonts"


















export const ServerContentParser = (
	{ 
		content, 
		className 
	}: any
) => {

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
			if (
				domNode.name === 'div' && 
				domNode.attribs.class && 
				domNode.attribs.class.includes('wp-block-jetpack-tiled-gallery')
			) {

				const images = extractImagesFromGallery(domNode);

				if (images.length > 0) {
					return (
						<TiledGallery images={images} />
					);
				}

			}




			// Handle Gutenberg image blocks
			if (
				domNode.name === 'div' && 
				domNode.attribs.class && 
				domNode.attribs.class.includes('wp-block-image')
				|| 
				domNode.name === 'figure' && 
				domNode.attribs.class && 
				domNode.attribs.class.includes('wp-block-image')
			) {

				let figureNode = null;

				if (domNode.name === 'div') {
					// Find the figure element inside the div
					figureNode = domNode.children.find((child: any) => 
						child.name === 'figure' && child.attribs
					);
				} else {
					figureNode = domNode;
				}
			
				
				
				if (figureNode) {

					const { 
						class: figureClass = ''
					} = figureNode.attribs;

					let alignmentClass = '';
					
					// Determine alignment from figure class
					if (figureClass.includes('aligncenter')) {
						alignmentClass = "mx-auto";
					} else if (figureClass.includes('alignleft')) {
						alignmentClass = "float-left mr-6 mb-4";
					} else if (figureClass.includes('alignright')) {
						alignmentClass = "float-right ml-6 mb-4";
					}

					
					// Find the img inside the figure
					const imgNode = figureNode.children.find((child: any) => 
						child.name === 'img' && child.attribs
					);









					
					if (imgNode) {
						const { 
							src, 
							alt = '', 
							width: attrWidth, 
							height: attrHeight, 
							style: styleAttr,
							sizes: sizesAttr,
							class: className = ''
						} = imgNode.attribs;


						if (!src) return null;
						

						const origWidth = parseInt(attrWidth || '800');
						const origHeight = parseInt(attrHeight || '600');



						let styleMaxWidth;
						let sizesMaxWidth;


						// Extract width from style attribute (highest priority)
						let styleWidth;
						if (styleAttr) {
							const widthMatch = styleAttr.match(/width:(\d+)px/);
							if (widthMatch && widthMatch[1]) {
								styleWidth = parseInt(widthMatch[1]);
							}
						}
						







						// Extract max width from sizes attribute (second priority)
						let maxWidthFromSizes;
						if (sizesAttr) {
							const lastSizeMatch = sizesAttr.match(/(\d+)px(?!\d|.*\d+px)/);
							if (lastSizeMatch && lastSizeMatch[1]) {
								maxWidthFromSizes = parseInt(lastSizeMatch[1]);
							}
						}

						
						// Determine final width (priority order: style -> sizes -> attr)
						const finalWidth = styleWidth || maxWidthFromSizes || origWidth;
						
						// Set container style based on if it's resized or not
						let containerStyle = {};
						if (figureClass.includes('is-resized') && styleWidth) {
							containerStyle = { 
								width: `${finalWidth}px`,
								maxWidth: '100%' // Ensure responsiveness
							};
						} else {
							containerStyle = { 
								width: `${finalWidth}px`,
								maxWidth: '100%' // Ensure responsiveness
							};	
						}



						return (
							<figure 
								className={`relative my-5 ${alignmentClass}`}
								style={containerStyle}
							>
								<Image 
									src={src} 
									alt={alt} 
									width={origWidth}
									height={origHeight}
									className="w-full h-auto rounded-lg border bg-white"
								/>
							</figure>
						);
					}	
















				}
			}




			// Add this before your other image handlers

			// Handle Gutenberg Gallery Blocks
			if (
				domNode.name === 'figure' && 
				domNode.attribs.class && 
				domNode.attribs.class.includes('wp-block-gallery')
			) {
			
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
							<div className="my-8 mx-8 sm:mx-24 lg:mx-8 w-auto">
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
			if (
				domNode.name === 'div' && 
				domNode.attribs.class && 
				domNode.attribs.class.includes('wp-block-jetpack-slideshow')
			) {
			
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




			if (
				domNode.name === 'div' && 
				domNode.attribs.class && 
				domNode.attribs.class.includes('wp-block-buttons')
			) {
				// Find the button div (first level of nesting)
				const buttonNode = domNode.children.find((child:any) => 
					child.name === 'div' && 
					child.attribs && 
					child.attribs.class && 
					child.attribs.class.includes('wp-block-button')
				);
				
				if (buttonNode) {
					// Find the anchor tag (second level of nesting)
					const linkNode = buttonNode.children.find((child:any) => 
						child.name === 'a'
					);
					
					if (linkNode && linkNode.attribs && linkNode.attribs.href) {
						const href = linkNode.attribs.href;
						const buttonText = linkNode.children[0]?.data || 'Button';
						
						console.log("Found link:", href);
						console.log("Button text:", buttonText);
						
						return (
							<BlurButton 
								link={href} 
								text={buttonText}
								className='mt-[20px]'
							/>
						);
					}
				}
			}















			if (domNode.name === 'p') {

				let alignment = ""

				const { 
					style 
				} = domNode.attribs;


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

				const imageNodes = domNode?.children.filter(
					(child: any) => child?.name === 'img' && child?.attribs?.class?.includes('alignnone')
				);
				
				
				if (imageNodes && imageNodes.length > 1) {

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




			}




			if (
				domNode.name === 'h1' || 
				domNode.name === 'h2' || 
				domNode.name === 'h3' || 
				domNode.name === 'h4' || 
				domNode.name === 'h5' || 
				domNode.name === 'h6'
			) {
				
				let alignment = ""

				const { 
					style, 
					class: className = '',
				} = domNode.attribs;


				if (
					style && style['text-align'] === 'center' || 
					className && className.includes('has-text-align-center')
				) {
					alignment = "text-center"

				} else if (
					style && style['text-align'] === 'left' || 
					className && className.includes('has-text-align-left')
				) {
					alignment = "text-left"

				} else if (
					style && style['text-align'] === 'right' || 
					className && className.includes('has-text-align-right')
				) {
					alignment = "text-right"

				}
				
		





				if (domNode.name === 'h1') {
					return <h1 className={cn(alignment)}>{domToReact(domNode.children, options)}</h1>
				} else if (domNode.name === 'h2') {
					return <h2 className={cn(alignment)}>{domToReact(domNode.children, options)}</h2>
				} else if (domNode.name === 'h3') {
					return <h3 className={cn(alignment)}>{domToReact(domNode.children, options)}</h3>
				} else if (domNode.name === 'h4') {
					return <h4 className={cn(alignment)}>{domToReact(domNode.children, options)}</h4>
				} else if (domNode.name === 'h5') {
					return <h5 className={cn(alignment)}>{domToReact(domNode.children, options)}</h5>
				} else if (domNode.name === 'h6') {
					return <h6 className={cn(alignment)}>{domToReact(domNode.children, options)}</h6>
				}
			}




			if (domNode.name === 'ul') {
				return (
					<ul className="
						"
					>
						{domToReact(domNode.children, options)}
					</ul>
				);
			}
  

			if (domNode.name === 'li') {
				return (
					<li
						className="
						"
					>
						{domToReact(domNode.children, options)}
					</li>
				);
			}
  

			if (domNode.name === 'ol') {
				return (
					<ol className="
						"
					>
						{domToReact(domNode.children, options)}
					</ol>
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
							`
							`,
							className
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




			if (
				domNode.name === 'figure' && 
				domNode.attribs.class?.includes('wp-block-table')
			) {
				return (
					<figure className="
							overflow-x-auto 

							w-full 
						"
					>
						{domToReact(domNode.children, options)}
					</figure>
				);
			}

			if (domNode.name === 'table') {
				return (			
					<table className="
							border 
							rounded-lg 
							border-slate-300 
							border-solid 
							overflow-hidden 

							w-full 
							border-collapse 

							bg-slate-300
						"
					>
						{domToReact(domNode.children, options)}
					</table>
				);
			}

			if (domNode.name === 'tbody') {
				return (
					<tbody className='
						'
					>
						{domToReact(
							domNode.children, 
							options
						)}
					</tbody>
				);
			}

			if (domNode.name === 'tr') {
				return (
					<tr className="
							border 
							border-gray-300 
					"
					>
						{domToReact(
							domNode.children, 
							options
						)}
					</tr>
				);
			}

			if (domNode.name === 'th') {
				return (
					<th className="
							border 
							border-gray-300 
							p-[10px]
						
							align-top
							text-left

							bg-slate-200	
						"
					>
						<p className='
								not-prose
								inline-block
								m-0
								font-hanken 
								text-[18px] 
								tracking-[-0.18]
								md:tracking-normal 
								leading-[27px] 	
							'
						>
							<strong>
								{domToReact(domNode.children, options)}
							</strong>
						</p>
					</th>
				);
			}

			if (domNode.name === 'td') {
				return (
					<td className="
							border 
							border-gray-300 
							p-[10px]
						
							align-top
							text-left

							bg-slate-100
						"
					>
						<p className='
								not-prose
								inline-block
								m-0
								font-hanken 
								text-[18px] 
								tracking-[-0.18]
								md:tracking-normal 
								leading-[27px] 
							
							'
						>
							{domToReact(domNode.children, options)}
						</p>
					</td>
				);
			}	




			// PDF Handler
			if (domNode.name === 'object') {
				try {
					const { data, style = '' } = domNode.attribs || {};
					
					// Defensive coding: ensure we have data before proceeding
					if (!data) {
						console.warn('PDF object missing data attribute');
						return null;
					}
					
					// Safe height handling with fallback
					let height = '600px'; // Default height
					
					if (style) {
						try {
							const styleObj = parseStyle(style);
							// Double-check that we have a valid object with height
							if (styleObj && typeof styleObj === 'object' && styleObj.height) {
								height = styleObj.height;
							}
						} catch (styleError) {
							console.warn('Error parsing PDF style:', styleError);
							// Continue with default height
						}
					}
					
					return (
						<div className="relative w-full max-w-full sm:max-w-[800px] my-6 mx-auto">
							<div className="pdf-wrapper relative" style={{ paddingTop: '4px', paddingBottom: '4px' }}>
								<iframe 
									src={`${data}#view=FitH&toolbar=1&navpanes=0`}
									className="w-full border-0 rounded shadow-sm" 
									style={{ height, maxHeight: 'calc(100vh - 200px)' }}
									title="PDF Document"
									loading="lazy"
									allowFullScreen 
								/>
							</div>
							
							{/* Simple controls for PDF */}
							<div className="flex justify-end mt-2 gap-2 text-sm">
								<a 
									href={data} 
									target="_blank" 
									rel="noopener noreferrer" 
									className="text-blue-600 hover:underline"
								>
									Open PDF
								</a>
							</div>
						</div>
					);
				} catch (error) {
					console.error('Error rendering PDF:', error);
					return <p className="text-red-500">Error displaying PDF. Please try downloading instead.</p>;
				}
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
							className="m-0"
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
									`m-0`,
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
								`m-0`,
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
						${hanken.variable}
						${cormorantG.variable}
						${libre.variable}
						${jetbrains.variable}
					`,
					`
						prose-neutral 
					
						dark:prose-invert 
	

						prose-blockquote:not-italic 
						prose-pre:border 
						prose-pre:bg-muted/25 


						after:content-[''] 
						after:block 
						after:clear-both
					
					
					`, 
					`

		
						
						[&_div]:font-hanken 

						[&_div]:text-[18px] 
						[&_div]:tracking-[-0.18] 
						md:[&_div]:tracking-normal 
						[&_div]:leading-[27px] 



						prose-img:rounded-lg 
						prose-img:border 
						prose-img:overflow-hidden 




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




						prose-figure:mt-[24px] 




						prose-strong:font-bold 




						prose-a:text-[#20808d] 
						prose-a:hover:underline	





						prose-hr:mt-[28px] 
						prose-hr:border-slate-800




					`,
					`


				
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






