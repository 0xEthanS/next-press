import { JSDOM } from 'jsdom';
import { processInternalLink } from '@/components/wp/parsing/helpers/process-internal-link';




export const processWPContent = (rawContent: string): string => {
	try {
		// Create virtual DOM
		const virtualDom = new JSDOM(rawContent);
		const document = virtualDom.window.document;
		



		// Process each image
		document.querySelectorAll('img').forEach((img) => {
			// Get the real image URL from data-src
			const realSrc = img.getAttribute('data-src');
			if (realSrc) {
				// Replace placeholder with actual image URL
				img.setAttribute('src', realSrc);
			}
		
			// Get srcset from data-srcset if available
			const realSrcset = img.getAttribute('data-srcset');
			if (realSrcset) {
				img.setAttribute('srcset', realSrcset);
			}
		
			// Get sizes from data-sizes if available
			const sizes = img.getAttribute('data-sizes');
			if (sizes) {
				img.setAttribute('sizes', sizes);
			}
		
			// Remove lazy loading specific attributes we no longer need
			img.removeAttribute('data-src');
			img.removeAttribute('data-srcset');
			img.removeAttribute('data-sizes');
			img.removeAttribute('loading');
			img.removeAttribute('decoding');
			img.removeAttribute('srcset');
		
			// Remove the base64 placeholder if it's still there
			const currentSrc = img.getAttribute('src');
			if (currentSrc?.startsWith('data:image/gif;base64')) {
				img.setAttribute('src', realSrc || '');
			}
		});




		// Process anchor tags
		document.querySelectorAll('a').forEach((anchor) => {
			const href = anchor.getAttribute('href');
			if (href) {
				anchor.setAttribute('href', processInternalLink(href));
			}
		});




		// Remove noscript tags using proper element type
		const noscriptElements = document.getElementsByTagName('noscript');
		while (noscriptElements.length > 0) {
			const element = noscriptElements[0];
			element.parentNode?.removeChild(element);
		}



		// Data-type: Object ----- document

		// Data-type: HTMLBodyElement object ----- document.body
		// HTMLBodyElement inherits from HTMLElement which inherits from Element and Node

		// Data-type: String ----- document.body.innerHTML

		return document.body.innerHTML;




	} catch (error) {
		console.error('Error processing content:', error);
		return rawContent; // Return original content if processing fails
	}
};