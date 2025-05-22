import { 
    getPageBySlug, 
    getPagesForStaticGeneration 
} from "@/lib/wordpress";
import { PageContent } from "@/components/pages/page-templates";
import { PageFrame } from "@/components/pages/page-frame";
import { processWPContent } from '@/components/wp/parsing/helpers/process-wp-content';
import { ServerContentParser } from "@/components/wp/parsing/server-content-parser";
import { ClientContentParser } from "@/components/wp/parsing/client-content-parser";


import { decode } from 'he';


import { config } from "../../../wp.config.mjs";



type Params = Promise<{ slug: string }>



export const dynamicParams = true;


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

    console.log("Eyyyyyyyyyyy, the Page() function ran")


	const params = await props.params
	console.log("Params: ", params)
    const slug = params.slug

	const isStaticRoute = slugsArray.includes(slug);
    console.log("isStaticRouteValue: ", isStaticRoute)
	






	const page = await getPageBySlug(slug);


	const title = page?.title?.rendered



	// Decode Step of HTML!!!!!!!!!!!!!!!!!
	const decodedTitle = title ? decode(title) : '';


 


	const renderedContent = page?.content?.rendered;
	// Only process content if it exists and is a string
	const processedRenderedContent = typeof renderedContent === 'string'
		? processWPContent(renderedContent)
		: '';


	//console.log("Content: ", processedRenderedContent)



    let finalDate


	const date = page?.date;
	const modified = page?.modified;

    if (date === modified) {
        finalDate = date;
    } else {
        finalDate = modified;
    }

	







	//const title = page.title.rendered
	//const excerpt = page.excerpt.rendered




	return (
        <div className="">
            <PageFrame
				title={decodedTitle}
                date={finalDate}
			>









				{isStaticRoute ? (

                    // Use server-side parsing for static routes
                    (<ServerContentParser 
                        content={processedRenderedContent}
                        className=""
                    />)

                ) : (
                    // Use client-side parsing for dynamic routes
                    (<ClientContentParser 
                        content={processedRenderedContent}
                        className="space-y-6 sm:space-y-8"
                    />)

                )}




			</PageFrame>
        </div>
    ); 
}














