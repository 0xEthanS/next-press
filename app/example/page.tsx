import { getPageBySlug } from "@/lib/wordpress";
import { PageContent } from "@/components/pages/page-templates";
import { processWPContent } from '@/components/wp/parsing/helpers/process-wp-content';
import { ContentParser } from "@/components/wp/parsing/content-parser";
import { decode } from 'he';


//  Need to fix
// 11, 15, 29





const slugs = [ 
    // Home
    'jean-t-lee-eulogy-delivered-by-medora-lee', // + 0
    'raymond-b-lee-donation-in-memory-of-jean-t-lee', // + 1
    // About the Museum
    'history-and-mission', // + 2
    'board-of-directors', // + 3
    'advisory-council', // + 4
    'associate-board', // + 5
    'staff', // + 6
    'in-memoriam', // + 7
    'obituary-of-mrs-jean-lee', // + 8



    
    // Information for Visitors
    'information-for-visitors', // + 9
    'group-visit', // + 10




    // Events and Exhibits
    'current-exhibits', /////////////////////////////////////////////// + 11
    'video-archive', // + 12
    // Reasearh and Conservation
    'lunar-new-year-history-and-traditions-explained', // + 13
    'education', // + 14
    'burnham-wildlife-corridor', /////////////////////////////////////////////// + 15
    // The Teaach Act
    'teaach-act', // + 16
    'celebrating-asian-american-and-pacific-islander-heritage-month', // not page - 17
    'moca-book-recommendations', // not page - 18
    'chinese-american-asian-american-history-videos-on-pbs', // + 19
    'the-teaach-act-is-passed', // + 20
    'uncovering-asian-american-stories-in-evanston-and-the-midwest', // + 21
    'asian-women-suffragists-2', // not page - 22
    'shows-on-asian-americans-on-pbs-tv-links-to-watch-free', // not page - 23
    'exhibitions-and-teaching-from-china-institute-in-america', // + 24




    // Support
    'become-a-member', // + 25
    'donate', // + 26
    'volunteer', // + 27




    // Contact Us
    'contact-us', // + 28
    '4th-floor-room-rental', /////////////////////////////////////////////// + 29




    'welcome' // home page + 30
]




// https://ccamuseum.org//wp-json/wp/v2/pages?slug=volunteer




export default async function Page() {

    const slug = slugs[11]

	//console.log("Content Slug: ", slug)


	const page = await getPageBySlug(slug);


    //console.log(page.content.rendered)









	const title = page?.title?.rendered

    if (title) {}

	const decodedTitle = decode(title)


	const renderedContent = page?.content?.rendered
	const processedRenderedContent = processWPContent(renderedContent)
	//const title = page.title.rendered
	//const excerpt = page.excerpt.rendered




	return (
		<div className="">
			<PageContent>

				{title && 
					<div className="font-sans tracking-[-0.01em] text-4xl leading-[1.1] sm:text-6xl sm:leading-[1.07] flex-none font-bold mb-8 mt-[45px] sm:mt-0text-home-text ">
						{decodedTitle}
					</div>
					//mt-[17px] gives a 0px margin below the header
				}

				<ContentParser content={processedRenderedContent} className="space-y-6 sm:space-y-8"/>

			</PageContent>




		</div>
	); 
}



