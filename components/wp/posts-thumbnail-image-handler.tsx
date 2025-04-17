import * as cheerio from 'cheerio';
import { config } from "../../wp.config.mjs";
import { Post } from "@/lib/types";
import { getFeaturedMediaById } from "@/lib/wordpress";




const fallback = config.wp.thumbnailFallback || '/images/default-post-image.jpg';




const getPostImageUrl = async (post: Post): Promise<string> => {

    
    // Case 1: Featured media is available
    if (post.featured_media && post.featured_media !== 0) {
        try {
            const media = await getFeaturedMediaById(post.featured_media);
            if (media && media.source_url) {
                return media.source_url;
            }
        } catch (error) {
            console.error('Error fetching featured media:', error);
        }
    }
  

    // Case 2: Image embedded in post content HTML
    if (post.content && post.content.rendered) {
        try {
            const $ = cheerio.load(post.content.rendered);
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
            console.error('Error parsing HTML content:', error);
        }
    }
    

    // Case 3: Check for URLs in post excerpt
    if (post.excerpt && post.excerpt.rendered) {
        try {
            const $ = cheerio.load(post.excerpt.rendered);
            const imgSrc = $('img').first().attr('src');
            if (imgSrc) {
                return imgSrc;
            }
        } catch (error) {
            console.error('Error parsing HTML excerpt:', error);
        }
    }
    

    // Case 4: Check for linked images in content
    if (post.content && post.content.rendered) {
        try {
            const $ = cheerio.load(post.content.rendered);
            const linkHref = $('a[href$=".jpg"], a[href$=".jpeg"], a[href$=".png"], a[href$=".gif"]')
                .first()
                .attr('href');
            
            if (linkHref) { 
                return linkHref;
            }
        } catch (error) {
            console.error('Error parsing HTML for linked images:', error);
        }
    }

  
    // Case 5: Fallback to a default image
    return fallback;
};




export { getPostImageUrl };



