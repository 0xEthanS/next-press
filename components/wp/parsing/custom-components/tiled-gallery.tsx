import React from 'react';
import Image from 'next/image';






// TiledGallery component included directly in this file
const TiledGallery = ({ images }: { images: any }) => {


	if (!images || images.length === 0) {
	  	return null;
	}



 
	// For this specific layout (1 large image on left, 2 smaller images stacked on right)
	if (images.length === 3) {
		return (
			<figure className="w-full">
				{/* Container using flexbox for horizontal layout */}
				<div className="flex flex-row gap-2">
					{/* Left image (large, approximately 67% width) */}
					<div className="w-2/3 overflow-hidden rounded-lg border bg-white">
						<Image 
							src={images[0].src} 
							alt={images[0].alt || ''} 
							width={images[0].width} 
							height={images[0].height} 
							className="w-full h-auto object-cover" 
						/>
					</div>
					
					{/* Right container for the two smaller images (approximately 33% width) */}
					<div className="w-1/3 flex flex-col gap-2">
					
						{/* Top right image */}
						<div className="overflow-hidden rounded-lg border bg-white">
							<Image 
								src={images[1].src} 
								alt={images[1].alt || ''} 
								width={images[1].width} 
								height={images[1].height} 
								className="w-full h-auto object-cover" 
							/>
						</div>
						
						{/* Bottom right image */}
						<div className="overflow-hidden rounded-lg border bg-white">
							<Image 
								src={images[2].src} 
								alt={images[2].alt || ''} 
								width={images[2].width} 
								height={images[2].height} 
								className="w-full h-auto object-cover" 
							/>
						</div>

					</div>
					
				</div>
			</figure>
		);
	}
  



	// Fallback for any other number of images - simple grid
	return (
		<div className="my-8 w-full">
			<div className="grid grid-cols-2 gap-2">
				{images.map((image:any, index:any) => (
					<div key={index} className="overflow-hidden rounded-lg border bg-white">
						<Image 
							src={image.src} 
							alt={image.alt || ''} 
							width={image.width} 
							height={image.height} 
							className="w-full h-auto object-cover" 
						/>
					</div>
				))}
			</div>
		</div>
	);



};




// Helper function to extract images from gallery
const extractImagesFromGallery = (galleryNode:any) => {

	const images:any[] = [];
	



	const findImages = (node:any) => {
		if (!node) return;
		
		// If this is an image tag, extract its data
		if (node.name === 'img') {
			const src = node.attribs.src || node.attribs['data-url'] || '';
			const alt = node.attribs.alt || '';
			const width = parseInt(node.attribs['data-width'] || node.attribs.width || '800');
			const height = parseInt(node.attribs['data-height'] || node.attribs.height || '600');
			
			images.push({
				src,
				alt,
				width,
				height
			});
		}
		
		// Check children recursively
		if (node.children && node.children.length > 0) {
			node.children.forEach((child: any) => findImages(child));
		}
	};
	



	// Start recursive search from the gallery container
	findImages(galleryNode);
	



	return images;




};





export { TiledGallery, extractImagesFromGallery }