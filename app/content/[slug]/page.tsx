import { getPageBySlug } from "@/lib/wordpress";
import { PageContent } from "@/components/pages/page-templates";
import { processWPContent } from '@/components/wp/parsing/helpers/process-wp-content';


//import { ContentParser } from "@/components/wp/parsing/content-parser";
import { ClientContentParser } from "@/components/wp/parsing/client-content-parser";



import { decode } from 'he';


type Params = Promise<{ slug: string }>

// Add this export to enable caching
export const revalidate = 604800; // 7 days in seconds (60 * 60 * 24 * 7)




export default async function Page(
	props: { 
        params: Params 
    }
) {




	const params = await props.params
    const slug = params.slug




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

				<ClientContentParser 
					content={processedRenderedContent}
					className="
						space-y-6 
						sm:space-y-8
					"
				/>

			</PageContent>
		</div>
	); 
}



