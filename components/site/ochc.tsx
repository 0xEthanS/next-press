import Hero from '@/components/home/hero-ochc';
import { Philanthropy } from '@/components/home/philanthropy';
import { About } from '@/components/home/about';
import Exhibits from '@/components/home/exhibits';
import { ArticlePreview } from '@/components/wp/article-preview'
import Footer from "@/components/top-level/footer";
import { Header } from "@/components/top-level/header";


// import { ArticlePostPreviewCard } from '@/app/posts/components/article-post-preview-card';
import { ArticleEventPreviewCard } from '@/app/events/components/article-post-preview-card';
import { 
	// getThreePosts, 
	getAllEvents,
} from "@/app/events/lib/actions";




type SearchParams = Promise<{ [key: string]: string | undefined }>
type Params = Promise<{ slug: string }>




export default async function OCHC(
	// props: { 
		// searchParams: SearchParams,
		// params: Params, 
	// }
) {


	// const searchParams = await props.searchParams
	// const params = await props.params

	const from = new Date()
	const fromString = from.toISOString().split('T')[0];
	const toDate = new Date();
	toDate.setMonth(toDate.getMonth() + 3);
	const toString = toDate.toISOString().split('T')[0];


    

    // Feeds data into ArticlePreview
	const events = await getAllEvents(
		{ 
			per_page: 3, 
			start_date: fromString,
			starts_before: toString
		}
	)




	return (
        <main>
            <Hero />
            <Philanthropy />
            
            


            <ArticlePreview 
                href='/events'
            >
                {events.length > 0 ? (
                    <div className='grid grid-rows-3 gap-x-6 gap-y-20 sm:grid-rows-1 sm:grid-cols-3 sm:gap-x-8 xl:gap-x-10'>
                        {events.map((i:any) => (
                            <ArticleEventPreviewCard
                                key={i.id} 
                                post={i} 
                            />							
                        ))}
                    </div>
                ) : (
                    <div className="h-24 w-full border rounded-lg bg-accent/25 flex items-center justify-center
                            text-home-text
                        "
                    >
                        <p>No Results Found</p>
                    </div>
                )}
            </ArticlePreview>




            <About />
            <Exhibits />
        </main>
	);
}



