import * as cheerio from 'cheerio';
import { processInternalLink } from '@/components/wp/parsing/helpers/process-internal-link';





export const processWPContent = (rawContent: string): string => {
  try {
    // Load HTML into cheerio
    const $ = cheerio.load(rawContent);

    // Process each image
    $('img').each((_, img) => {
      const $img = $(img);
      const src = $img.attr('src');
      const dataSrc = $img.attr('data-src');

      if ((!src && !dataSrc) || (src && src.includes('blank.gif')) || (src === '')) {
        // If it's inside a paragraph that only contains this image, remove the entire paragraph
        const $parent = $img.parent();
        if ($parent.is('p')) {
          const parentContent = $parent.text().trim();
          if (!parentContent || parentContent === '') {
            $parent.remove();
          } else {
            // Otherwise just remove the image
            $img.remove();
          }
        } else {
          // If not in a paragraph, just remove the image
          $img.remove();
        }
        
        // Skip further processing for this removed image
        return;
      }

      // Get the real image URL from data-src
      const realSrc = $img.attr('data-src');
      if (realSrc) {
        // Replace placeholder with actual image URL
        $img.attr('src', realSrc);
      }

      // Get srcset from data-srcset if available
      const realSrcset = $img.attr('data-srcset');
      if (realSrcset) {
        $img.attr('srcset', realSrcset);
      }

      // Get sizes from data-sizes if available
      const sizes = $img.attr('data-sizes');
      if (sizes) {
        $img.attr('sizes', sizes);
      }

      // Remove lazy loading specific attributes we no longer need
      $img.removeAttr('data-src');
      $img.removeAttr('data-srcset');
      $img.removeAttr('data-sizes');
      $img.removeAttr('loading');
      $img.removeAttr('decoding');
      $img.removeAttr('srcset');

      // Remove the base64 placeholder if it's still there
      const currentSrc = $img.attr('src');
      if (currentSrc?.startsWith('data:image/gif;base64')) {
        $img.attr('src', realSrc || '');
      }
    });

    // Process anchor tags - completely skip mailto links
    $('a').each((_, anchor) => {
      const $anchor = $(anchor);
      const href = $anchor.attr('href');
      if (href && !href.startsWith('mailto:')) {
        $anchor.attr('href', processInternalLink(href));
      }
    });

    // Process PDF objects
    $('object[type="application/pdf"]').each((_, obj) => {
      const $obj = $(obj);
      // Remove the hidden attribute to make it visible
      $obj.removeAttr('hidden');
      $obj.removeAttr('data-wp-bind--hidden');
      
      // Make sure it has proper dimensions
      if (!$obj.attr('style')) {
        $obj.attr('style', 'width:100%;height:800px');
      }
    });

    // Remove noscript tags
    $('noscript').remove();

    // Fix for TypeScript error with null checks
    const bodyContent = $('body').html() || '';
    
    // Return the processed HTML content
    return bodyContent;

  } catch (error) {
    console.error('Error processing content:', error);
    return rawContent; // Return original content if processing fails
  }
};