import querystring from 'query-string'
import {
	Post,
	Category,
	Tag,
	Page,
	Author,
	FeaturedMedia,
} from "@/app/posts/lib/types";
import { config } from "../../../wp.config.mjs"




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
















// WordPress Post Functions
async function getAllPosts(
	filterParams?: { 
		author?: string; 
		tag?: string; 
		category?: string; 
	}
): Promise<Post[]> {
    const url = getUrl(
		"/wp-json/wp/v2/posts", 
		{ 
			author: filterParams?.author, 
			tags: filterParams?.tag, 
			categories: filterParams?.category 
		}
	);
	const posts = await fetchAPI<Post[]>(url);
    return posts
}


async function getThreePosts(
	filterParams?: { 
		author?: string; 
		tag?: string; 
		category?: string; 
	}
): Promise<Post[]> {
    const url = getUrl(
		"/wp-json/wp/v2/posts", 
		{ 
			author: filterParams?.author, 
			tags: filterParams?.tag, 
			categories: filterParams?.category,
			per_page: 3 // Limit to 3 posts
		}
	);
	const posts = await fetchAPI<Post[]>(url); 
    return posts
}


async function getPostById(
	id: number
): Promise<Post> {
    const url = getUrl(
		`/wp-json/wp/v2/posts/${id}`
	);
	const post = await fetchAPI<Post>(url);
    return post
}


async function getPostBySlug(
	slug: string
): Promise<Post> {
    const url = getUrl(
		"/wp-json/wp/v2/posts", 
		{ slug }
	);
    const posts = await fetchAPI<Post[]>(url);
    return posts[0];
}


async function getPostsByCategory(
	categoryId: number
): Promise<Post[]> {
	const url = getUrl(
		"/wp-json/wp/v2/posts", 
		{ categories:  categoryId }
	);
	const posts = await fetchAPI<Post[]>(url);
	return posts;
}


async function getPostsByTag(
	tagId: number
): Promise<Post[]> {
	const url = getUrl(
		"/wp-json/wp/v2/posts", 
		{ tags:  tagId }
	);
	const posts = await fetchAPI<Post[]>(url);
	return posts;
}


async function getPostsByAuthor(
	authorId: number
): Promise<Post[]> {
	const url = getUrl(
		"/wp-json/wp/v2/posts", 
		{ author: authorId }
	);
	const posts = await fetchAPI<Post[]>(url);
	return posts;
}


async function getPostsByAuthorSlug(
	authorSlug: string
): Promise<Post[]> {
	const author = await getAuthorBySlug(authorSlug);
	const url = getUrl(
		"/wp-json/wp/v2/posts", 
		{ author: author.id }
	);
	const posts = await fetchAPI<Post[]>(url);
	return posts;
}


async function getPostsByCategorySlug(
	categorySlug: string
): Promise<Post[]> {
	const category = await getCategoryBySlug(categorySlug);
	const url = getUrl(
		"/wp-json/wp/v2/posts", 
		{ categories: category.id }
	);
	const posts = await fetchAPI<Post[]>(url);
	return posts;
}


async function getPostsByTagSlug(
	tagSlug: string
): Promise<Post[]> {
	const tag = await getTagBySlug(tagSlug);
	const url = getUrl(
		"/wp-json/wp/v2/posts", 
		{ tags: tag.id }
	);
	const posts = await fetchAPI<Post[]>(url);
	return posts;
}






























async function getAllCategories(): Promise<Category[]> {
	const url = getUrl(
		"/wp-json/wp/v2/categories"
	);
	const categories = await fetchAPI<Category[]>(url);
	return categories;
}


async function getCategoryById(
	id: number
): Promise<Category> {
	const url = getUrl(
		`/wp-json/wp/v2/categories/${id}`
	);
	const category = await fetchAPI<Category>(url);
	return category;
}


async function getCategoryBySlug(
	slug: string
): Promise<Category> {
	const url = getUrl(
		"/wp-json/wp/v2/categories", 
		{ slug }
	);
	const category = await fetchAPI<Category[]>(url);
	return category[0];
}


async function getTagsByPost(
	postId: number
): Promise<Tag[]> {
	const url = getUrl(
		"/wp-json/wp/v2/tags", 
		{ post:  postId }
	);
	const tags = await fetchAPI<Tag[]>(url);
	return tags;
}


async function getAllTags(): Promise<Tag[]> {
	const url = getUrl(
		"/wp-json/wp/v2/tags"
	);
	const tags = await fetchAPI<Tag[]>(url);
	return tags;
}


async function getTagById(
	id: number
): Promise<Tag> {
	const url = getUrl(
		`/wp-json/wp/v2/tags/${id}`
	);
	const tag = await fetchAPI<Tag>(url);
	return tag;
}


async function getTagBySlug(
	slug: string
): Promise<Tag> {
	const url = getUrl(
		"/wp-json/wp/v2/tags", 
		{ slug }
	);
	const tag = await fetchAPI<Tag[]>(url);
	return tag[0];
}


async function getAllAuthors(): Promise<Author[]> {
	const url = getUrl(
		"/wp-json/wp/v2/users"
	);
	const authors = await fetchAPI<Author[]>(url);
	return authors;
}


async function getAuthorById(
	id: number
): Promise<Author> {
	const url = getUrl(
		`/wp-json/wp/v2/users/${id}`
	);
	const author = await fetchAPI<Author>(url);
	return author;
}


async function getAuthorBySlug(
	slug: string
): Promise<Author> {
	const url = getUrl(
		"/wp-json/wp/v2/users", 
		{ slug }
	);
	const author = await fetchAPI<Author[]>(url);
	return author[0];
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
	getAllPosts, 
	getThreePosts, 
	getPostById, 
	getPostBySlug, 
	getPostsByCategory, 
	getPostsByTag, 
	getPostsByAuthor, 
	getPostsByAuthorSlug, 
	getPostsByCategorySlug, 
	getPostsByTagSlug, 

	getAllCategories, 
	getCategoryById, 
	getCategoryBySlug, 
	getTagsByPost, 
	getAllTags, 
	getTagById, 
	getTagBySlug, 
	getAllAuthors, 
	getAuthorById, 
	getAuthorBySlug, 

	getAllPages, 
	getPageById, 
	getPageBySlug, 

	getFeaturedMediaById, 
}







