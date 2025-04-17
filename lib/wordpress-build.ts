import querystring from 'query-string'
import { config } from "../wp.config.mjs"
import type { Page } from './types';




const baseUrl = config.baseUrl



function getUrl(path: string, query?: Record<string, any>) {
	const params = query ? querystring.stringify(query) : null
	return `${baseUrl}${path}${params ? `?${params}` : ""}`
}



// Cache for pages during build process
let pagesCache: {[slug: string]: Page} | null = null;







// Get all pages with a higher per_page parameter
export async function getAllPagesLikeAllOfThem(): Promise<Page[]> {
	const url = getUrl(
		"/wp-json/wp/v2/pages",
		{ per_page: 100 } // Increase the per_page parameter to get more pages at once
	);
	const response = await fetch(url);
	
	if (!response.ok) {
		throw new Error(`Failed to fetch pages: ${response.statusText}`);
	}
	
	const pages: Page[] = await response.json();
	return pages;
}





// Get all pages and convert to a map for easier lookup
export async function getPagesMap(): Promise<{[slug: string]: Page}> {
	// Use the cached version if available
	if (pagesCache) {
		return pagesCache;
	}
	
	const pages = await getAllPagesLikeAllOfThem();
	
	// Create a map of slug -> page data
	const pageMap: {[slug: string]: Page} = {};
	pages.forEach(page => {
		pageMap[page.slug] = page;
	});
	
	// Store in cache
	pagesCache = pageMap;
	
	return pageMap;
}







// Get a specific page by slug
export async function getPageBySlug(slug: string): Promise<Page> {
	// Check if we're in a build process (this is a heuristic)
	const isBuildProcess = process.env.NODE_ENV === 'production' && !process.env.VERCEL_ENV;
	
	// For build process, use the cached map
	if (isBuildProcess) {
		const pagesMap = await getPagesMap();
		if (pagesMap[slug]) {
			return pagesMap[slug];
		}
	}
	
	// Fallback to individual fetch if needed
	const url = getUrl(
		"/wp-json/wp/v2/pages", 
		{ slug }
	);
	const response = await fetch(url);
	
	if (!response.ok) {
		throw new Error(`Failed to fetch page "${slug}": ${response.statusText}`);
	}
	
	const pages: Page[] = await response.json();
	return pages[0];
}




// Helper function specifically for static generation
export async function getPagesForStaticGeneration(
	targetSlugs: string[]
): Promise<{[slug: string]: Page}> {
	const allPagesMap = await getPagesMap();
	
	// Filter to only include the slugs we want
	const filteredPages: {[slug: string]: Page} = {};
	
	targetSlugs.forEach(slug => {
		if (allPagesMap[slug]) {
			filteredPages[slug] = allPagesMap[slug];
		} else {
			console.warn(`Warning: Page with slug "${slug}" not found for static generation`);
		}
	});
	
	return filteredPages;
}





