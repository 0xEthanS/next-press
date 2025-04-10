import * as cheerio from 'cheerio';
import { config } from "../../wp.config.mjs"

const fallback = config.wp.thumbnailFallback




const getEventImageUrl = (post: any): string | null => {
    // Case 1: Direct image URL
    if (post?.image?.url) {
        return post.image.url;
    }
  
    // Case 2: Image embedded in HTML description
    if (post?.description) {
        try {
            const $ = cheerio.load(post.description);
            const images = $('img');
            
            for (let i = 0; i < images.length; i++) {
                const img = images[i];
                
                // Check for lazy loading attributes first
                const lazyUrl = $(img).attr('data-lazy-src') || 
                                $(img).attr('data-src') ||
                                $(img).attr('data-lazy-loaded');
                                
                if (lazyUrl) {
                    return lazyUrl;
                }
        
                // Fallback to regular src attribute
                const regularUrl = $(img).attr('src');
                if (regularUrl) {
                    return regularUrl;
                }
            }
        } catch (error) {
            console.error('Error parsing HTML description:', error);
        }
    }
  
    // Case 3: Fallback to a default image
    return fallback; // Add your default image path
}




export { getEventImageUrl }



