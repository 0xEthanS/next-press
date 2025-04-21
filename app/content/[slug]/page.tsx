import { 
    getPageBySlug, 
    getPagesForStaticGeneration 
} from "@/lib/wordpress";
import { PageContent } from "@/components/pages/page-templates";
import { processWPContent } from '@/components/wp/parsing/helpers/process-wp-content';
import { ServerContentParser } from "@/components/wp/parsing/server-content-parser";
import { ClientContentParser } from "@/components/wp/parsing/client-content-parser";
import { decode } from 'he';
import { config } from "../../../wp.config.mjs";



type Params = Promise<{ slug: string }>



export const dynamicParams = false; // Only pre-render pages defined by generateStaticParams

// Add this to your page.tsx file
export const dynamic = 'force-static';

export const revalidate = 3600; // 1 hour in seconds (60 * 60)
const slugsArray = config.static.content





export async function generateStaticParams() {
    // Get all pages data at once in a single API call
    const pagesData = await getPagesForStaticGeneration(slugsArray);
    
    // Create params from available pages
    const params = Object.keys(pagesData).map(slug => ({ slug }));
    
    return params;
}






export default async function Page(
	props: { 
        params: Params 
    }
) {

    console.log("------------------ Eyyyyyyyyyyy, the Page() function ran ----------------------")


	const params = await props.params
    const slug = params.slug

	const isStaticRoute = slugsArray.includes(slug);
    console.log("---------- isStaticRouteValue: ", isStaticRoute, " ----------")




	const page = await getPageBySlug(slug);

	const title = page?.title?.rendered
	const decodedTitle = decode(title)




	const renderedContent = page?.content?.rendered
	const processedRenderedContent = processWPContent(renderedContent)




	//const title = page.title.rendered
	//const excerpt = page.excerpt.rendered




	return (
        <div className="">
            <PageContent>




				{title && 
					<div className="
							font-sans 
							tracking-[-0.01em] 
							text-4xl 
							leading-[1.1] 
							sm:text-6xl 
							sm:leading-[1.07] 
							flex-none 
							
							font-bold 
							mb-8

							mt-[45px] 
							sm:mt-0
						
							text-home-text 
						"
					>
						{decodedTitle}
					</div>

					//mt-[17px] gives a 0px margin below the header
				}




				{isStaticRoute ? (

                    // Use server-side parsing for static routes
                    (<ServerContentParser 
                        content={processedRenderedContent}
                        className="space-y-6 sm:space-y-8"
                    />)

                ) : (

                    // Use client-side parsing for dynamic routes
                    (<ClientContentParser 
                        content={processedRenderedContent}
                        className="space-y-6 sm:space-y-8"
                    />)

                )}




			</PageContent>
        </div>
    ); 
}














