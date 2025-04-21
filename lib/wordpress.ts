import querystring from 'query-string'
import { config } from "../wp.config.mjs"
import type { 
	Post,
  	Category,
  	Tag,
  	Page,
  	Author,
  	FeaturedMedia,
} from './types';




const baseUrl = config.baseUrl

const cacheTimes = 3600 // 60 * 60




function getUrl(path: string, query?: Record<string, any>) {

	const params = query ? querystring.stringify(query) : null

	return `${baseUrl}${path}${params ? `?${params}` : ""}`

}




// 23 



export async function getAllPosts(filterParams?: {author?: string;tag?: string;category?: string;}): Promise<Post[]> {  
	const url = getUrl(
		"/wp-json/wp/v2/posts?_embed", 
		{ 
			author: filterParams?.author, 
			tags: filterParams?.tag, 
			categories: filterParams?.category 
		}
	);

	console.log("---------- getAllPosts() Ran ----------")


	const response = await fetch(
		url, 
		{
			cache: 'force-cache',
			next: { 
				revalidate: cacheTimes 
			}
		}
	);
	const posts: Post[] = await response.json();
	return posts;
}


export async function getThreePosts(filterParams?: { author?: string; tag?: string; category?: string; }): Promise<Post[]> {
    const url = getUrl(
		"/wp-json/wp/v2/posts", 
		{ 
			author: filterParams?.author, 
			tags: filterParams?.tag, 
			categories: filterParams?.category, 
			per_page: 3,
			_embed: true 
		}
	);

	console.log("---------- getThreePosts() Ran ----------")


	const response = await fetch(
		url, 
		{
			cache: 'force-cache',
			next: { 
				revalidate: cacheTimes 
			}
		}
	);
	const posts: Post[] = await response.json();
    return posts
}


export async function getPostById(id: number): Promise<Post> {
	const url = getUrl(
		`/wp-json/wp/v2/posts/${id}`
	);

	console.log("---------- getPostsById() Ran ----------")


	const response = await fetch(
		url,
		{
			next: { 
				revalidate: cacheTimes 
			}
		}
	);
	const post: Post = await response.json();
	return post;
}


export async function getPostBySlug(slug: string): Promise<Post> {
	const url = getUrl(
		"/wp-json/wp/v2/posts", 
		{ slug, _embed: true }
	);

	console.log("---------- getPostsBySlug() Ran ----------")


	const response = await fetch(
		url,
		{
			cache: 'force-cache',
			next: { 
				revalidate: cacheTimes 
			}
		}
	);
	const post: Post[] = await response.json();
	return post[0];
}






export async function getAllCategories(): Promise<Category[]> {
	const url = getUrl(
		"/wp-json/wp/v2/categories"
	);

	console.log("---------- getAllCategories() Ran ----------")


	//const response = await fetch(url);
	// This caches the response on Vercel's servers
	const response = await fetch(
		url, 
		{
			cache: 'force-cache',
			next: { 
				revalidate: cacheTimes 
			}
		}
	);




	const categories: Category[] = await response.json();
	return categories;
}






export async function getCategoryById(id: number): Promise<Category> {
	const url = getUrl(
		`/wp-json/wp/v2/categories/${id}`
	);

	console.log("---------- getCategoryById() Ran ----------")


	const response = await fetch(
		url,
		{
			next: { 
				revalidate: cacheTimes 
			}
		}
	);
	const category: Category = await response.json();
	return category;
}


export async function getCategoryBySlug(slug: string): Promise<Category> {
	const url = getUrl(
		"/wp-json/wp/v2/categories", 
		{ slug }
	);

	console.log("---------- getCategoryBySlug() Ran ----------")


	const response = await fetch(
		url,
		{
			next: { 
				revalidate: cacheTimes 
			}
		}
	);
	const category: Category[] = await response.json();
	return category[0];
}


export async function getPostsByCategory(categoryId: number): Promise<Post[]> {
	const url = getUrl(
		"/wp-json/wp/v2/posts", 
		{ categories:  categoryId }
	);

	console.log("---------- getPostsByCategoryBy() Ran ----------")

	
	const response = await fetch(
		url,
		{
			next: { 
				revalidate: cacheTimes 
			}
		}
	);
	const posts: Post[] = await response.json();
	return posts;
}


export async function getPostsByTag(tagId: number): Promise<Post[]> {
	const url = getUrl(
		"/wp-json/wp/v2/posts", 
		{ tags:  tagId }
	);

	console.log("---------- getPostsByTag() Ran ----------")


	const response = await fetch(
		url,
		{
			next: { 
				revalidate: cacheTimes 
			}
		}
	);
	const posts: Post[] = await response.json();
	return posts;
}


export async function getTagsByPost(postId: number): Promise<Tag[]> {
	const url = getUrl(
		"/wp-json/wp/v2/tags", 
		{ post:  postId }
	);

	console.log("---------- getTagByPost() Ran ----------")


	const response = await fetch(
		url,
		{
			next: { 
				revalidate: cacheTimes 
			}
		}
	);
	const tags: Tag[] = await response.json();
	return tags;
}


export async function getAllTags(): Promise<Tag[]> {
	const url = getUrl(
		"/wp-json/wp/v2/tags"
	);

	console.log("---------- getAllTags() Ran ----------")


	const response = await fetch(
		url, 
		{
			cache: 'force-cache',
			next: { 
				revalidate: cacheTimes 
			}
		}
	);



	const tags: Tag[] = await response.json();
	return tags;
}


export async function getTagById(id: number): Promise<Tag> {
	const url = getUrl(
		`/wp-json/wp/v2/tags/${id}`
	);

	console.log("---------- getTagsById() Ran ----------")


	const response = await fetch(
		url,
		{
			next: { 
				revalidate: cacheTimes 
			}
		}
	);
	const tag: Tag = await response.json();
	return tag;
}


export async function getTagBySlug(slug: string): Promise<Tag> {
	const url = getUrl(
		"/wp-json/wp/v2/tags", 
		{ slug }
	);

	console.log("---------- getTagBySlug() Ran ----------")


	const response = await fetch(
		url,
		{
			next: { 
				revalidate: cacheTimes 
			}
		}
	);
	const tag: Tag[] = await response.json();
	return tag[0];
}


export async function getAllAuthors(): Promise<Author[]> {
	const url = getUrl(
		"/wp-json/wp/v2/users"
	);

	console.log("---------- getAllAuthors() Ran ----------")


	const response = await fetch(
		url, 
		{
			cache: 'force-cache',
			next: { 
				revalidate: cacheTimes 
			}
		}
	);
	const authors: Author[] = await response.json();
	return authors;
}


export async function getAuthorById(id: number): Promise<Author> {
	const url = getUrl(
		`/wp-json/wp/v2/users/${id}`
	);

	console.log("---------- getAuthorById() Ran ----------")


	const response = await fetch(
		url,
		{
			next: { 
				revalidate: cacheTimes 
			}
		}
	);
	const author: Author = await response.json();
	return author;
}


export async function getAuthorBySlug(slug: string): Promise<Author> {
	const url = getUrl(
		"/wp-json/wp/v2/users", 
		{ slug }
	);

	console.log("---------- getAuthorBySlug() Ran ----------")


	const response = await fetch(
		url,
		{
			next: { 
				revalidate: cacheTimes 
			}
		}
	);
	const author: Author[] = await response.json();
	return author[0];
}


export async function getPostsByAuthor(authorId: number): Promise<Post[]> {
	const url = getUrl(
		"/wp-json/wp/v2/posts", 
		{ author: authorId }
	);

	console.log("---------- getPostsByAuthor() Ran ----------")


	const response = await fetch(
		url,
		{
			next: { 
				revalidate: cacheTimes 
			}
		}
	);
	const posts: Post[] = await response.json();
	return posts;
}


export async function getPostsByAuthorSlug(authorSlug: string): Promise<Post[]> {
	const author = await getAuthorBySlug(authorSlug);
	const url = getUrl(
		"/wp-json/wp/v2/posts", 
		{ author: author.id }
	);

	console.log("---------- getPostsByAuthorSlug() Ran ----------")


	const response = await fetch(
		url,
		{
			next: { 
				revalidate: cacheTimes 
			}
		}
	);
	const posts: Post[] = await response.json();
	return posts;
}


export async function getPostsByCategorySlug(categorySlug: string): Promise<Post[]> {
	const category = await getCategoryBySlug(categorySlug);
	const url = getUrl(
		"/wp-json/wp/v2/posts", 
		{ categories: category.id }
	);

	console.log("---------- getPostsByCategorySlug() Ran ----------")


	const response = await fetch(
		url,
		{
			next: { 
				revalidate: cacheTimes 
			}
		}
	);
	const posts: Post[] = await response.json();
	return posts;
}


export async function getPostsByTagSlug(tagSlug: string): Promise<Post[]> {
	const tag = await getTagBySlug(tagSlug);
	const url = getUrl(
		"/wp-json/wp/v2/posts", 
		{ tags: tag.id }
	);

	console.log("---------- getPostsByTagSlug() Ran ----------")


	const response = await fetch(
		url,
		{
			next: { 
				revalidate: cacheTimes 
			}
		}
	);
	const posts: Post[] = await response.json();
	return posts;
}








export async function getAllPages(): Promise<Page[]> {
	const url = getUrl(
		"/wp-json/wp/v2/pages"
	);

	console.log("---------- getAllPages() Ran ----------")


	const response = await fetch(url);
	const pages: Page[] = await response.json();
	return pages;
}


export async function getPageById(id: number): Promise<Page> {
	const url = getUrl(
		`/wp-json/wp/v2/pages/${id}`
	);

	console.log("---------- getPageById() Ran ----------")


	const response = await fetch(url);
	const page: Page = await response.json();
	return page;
}








export async function getFeaturedMediaById(id: number): Promise<FeaturedMedia> {
	const url = getUrl(
		`/wp-json/wp/v2/media/${id}`
	);

	console.log("---------- getFeaturedMediaById() Ran ----------")


	const response = await fetch(url);
	const featuredMedia: FeaturedMedia = await response.json();
	return featuredMedia;
}


















/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

// Cache for pages during build process
let pagesCache: {
	[slug: string]: Page
} | null = null;



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







