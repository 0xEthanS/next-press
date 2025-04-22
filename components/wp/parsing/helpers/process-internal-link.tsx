import { config } from "../../../../wp.config.mjs"
const hostname = config.hostname







export const processInternalLink = (href: string): string => {
	try {




		if (!href) return '#';



	

		if (href.startsWith('http') && !href.includes(hostname)) {
			return href;
		}
	



		// Handle relative URLs or URLs without protocol
		if (!href.startsWith('http://') && !href.startsWith('https://')) {
			// If it's just a path starting with /, remove the leading slash
			const cleanPath = href.replace(/^\/+|\/+$/g, '');
			const segments = cleanPath.split('/').filter(Boolean);
			const slug = segments[segments.length - 1];
			return `/content/${slug}`;
		}



	
		// If it's a full URL
		const url = new URL(href);
		const path = url.pathname.replace(/^\/+|\/+$/g, '');
		



		// Skip processing if it's pointing to media or specific WordPress paths
		if (path.includes('wp-content') || 
			path.includes('wp-admin') || 
			path.includes('wp-includes')) {
			return href;
		}



	
		const segments = path.split('/').filter(Boolean);
		const slug = segments[segments.length - 1];
		



		return `/content/${slug}`;


		
	} catch (error) {
		// If URL parsing fails, try to extract the last segment directly
		const cleanPath = href.replace(/^\/+|\/+$/g, '');
		const segments = cleanPath.split('/').filter(Boolean);
		const slug = segments[segments.length - 1];
		return `/content/${slug}`;
	}
};




