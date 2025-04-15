import querystring from 'query-string'
import { config } from "../wp.config.mjs"




export type Page = {
	id: number;
	date: string;
	date_gmt: string;
	guid: {
		rendered: string;
	};
	modified: string;
	modified_gmt: string;
	slug: string;
	status: "publish" | "future" | "draft" | "pending" | "private";
	type: string;
	link: string;
	title: {
		rendered: string;
	};
	content: {
		rendered: string;
		protected: boolean;
	};
	excerpt: {
		rendered: string;
		protected: boolean;
	};
	author: number;
	featured_media: number;
	parent: number;
	menu_order: number;
	comment_status: "open" | "closed";
	ping_status: "open" | "closed";
	template: string;
	meta: any[];
};




export type FeaturedMedia = {
	id: number;
	date: string;
	slug: string;
	type: string;
	link: string;
	title: {
		rendered: string;
	};
	author: number;
	caption: {
		rendered: string;
	};
	alt_text: string;
	media_type: string;
	mime_type: string;
	media_details: {
		width: number;
		height: number;
		file: string;
		sizes: {
			[key: string]: {
				file: string;
				width: number;
				height: number;
				mime_type: string;
				source_url: string;
			};
		};
	};
	source_url: string;
};




function getUrl(
	path: string, 
	query?: Record<string, any>
) {
	const params = query ? querystring.stringify(query) : null
	return `${config.baseUrl}${path}${params ? `?${params}` : ""}`
}




// Helper function to handle API responses
async function fetchAPI<T>(url: string): Promise<T> {
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
    }
    
    const clonedResponse = response.clone();
    
    try {
		const jsonResponse = await response.json();	
        return jsonResponse
    } catch (error) {
        return await clonedResponse.json();
    }
}




async function getAllPages(): Promise<Page[]> {
	const url = getUrl(
		"/wp-json/wp/v2/pages"
	);
	const pages = await fetchAPI<Page[]>(url);
	return pages;
}




async function getPageById(
	id: number
): Promise<Page> {
	const url = getUrl(
		`/wp-json/wp/v2/pages/${id}`
	);
	const page = await fetchAPI<Page>(url);
	return page;
}




/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
async function getPageBySlug(
	slug: string
): Promise<Page> {
	const url = getUrl(
		"/wp-json/wp/v2/pages", 
		{ slug }
	);
	const page = await fetchAPI<Page[]>(url);
	return page[0];
}
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////




async function getFeaturedMediaById(
	id: number
): Promise<FeaturedMedia> {
	const url = getUrl(
		`/wp-json/wp/v2/media/${id}`
	);
	const featuredMedia = await fetchAPI<FeaturedMedia>(url);
	return featuredMedia;
}




export {
	getAllPages, 
	getPageById, 
	getPageBySlug, 

	getFeaturedMediaById, 
}



