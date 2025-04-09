import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon } from '@/components/icons'
import { cn } from "@/lib/utils";




const exhibitData = [
	{
		type: 'Visit',
		header: 'Road Warrior Sculpture',
		paragraph: `
            The Road Warrior Sculpture. WWII Veteran and national spokesperson, 
			Dr. Bruce Heilman, on his Marine issue Harley Davidson motorcycle as 
			he has traveled across the United States, including Alaska, bringing 
			attention...
        `,
		link: '/visit/roadWarriorSculpture',
		date: '',
		image: {
			src: '/roadwarrior.jpg',
			alt: 'Road Warrior Motorcycle',
			width: 431,
			height: 287
		}
	},
    {
		type: 'Underground Railroad',
		header: 'Underground Railroad Podcast',
		paragraph: `
            Thirty Days of Stories on the Underground Railroad is a series of 
			podcasts series created in celebration of September as International 
			Underground Railroad Month. The National Park Service has declared 
			September as...
        `,
		link: '/undergroundRailroad/thirtyDaysOfStoriesOnTheUndergroundRailroadInKentucky',
		date: '',
		image: {
			src: '/DSC.jpg',
			alt: 'underground Railroad Podcast',
			width: 1707,
			height: 2560
		}
	},
    {
		type: 'Museum',
		header: 'Other Exhibits',
		paragraph: `
            From Ashbourne Farms to Hermitage Farm. From veteran exhibits such 
			as Pearl Harbor to the Road Warrior outdoor sculpture being dedicated 
			in May 2021. The Oldham County Historical Society has compiled an 
			extensive collection of exhibits that are sure to pique...
        `,
		link: '/museum/otherExhibits',
		date: '',
		image: {
			src: 'https://oldhamkyhistory.com/wp-content/uploads/2020/01/Pearl-Harbor-Photo-Museum-Tourist-851.jpg',
			alt: 'Hermitage Farm Picture',
			width: 851,
			height: 315
		}
	},
    {
		type: 'Projects',
		header: 'Earl D. Bennett WWII Letters',
		paragraph: `
            Earl Dawson Bennett was born on March 13th, 1923, in La Grange, KY. 
            He graduated from Liberty High School in Oldham County in 1941 at the 
            age of 18. The next year, Earl joined the Army Air Corp to fight in 
            World War II.
        `,
		link: '/projects/earlDBennettWWIILetters',
		date: '',
		image: {
			src: 'https://oldhamkyhistory.com/wp-content/uploads/2023/12/5-6-43-Mom-scaled.jpg',
			alt: 'Earl D. Bennett WWII Letter',
			width: 1819,
			height: 2560
		}
	},
]




function StaticBlogCard({ data }: { data: any }) {
	return(
		<div className={cn(`rounded-lg flex justify-between flex-col not-prose gap-8`, `hover:bg-accent/75 transition-all`)}>
			<div className="flex flex-col gap-5 shrink-0">
				<div className='group relative overflow-hidden pb-[100%] rounded-lg'>
					<Image 
						src={data.image.src} 
						alt={data.image.alt}
						width={data.image.width}
						height={data.image.height}
						className="rounded-lg absolute size-full object-cover transition-all duration-300 group-focus-within:scale-105 group-focus-within:blur-xs group-hover:scale-105 group-hover:blur-xs"
					/>
					<div className='absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100'>
						<Link href={`${data.link}`} className='group inline-flex cursor-pointer items-center justify-center rounded-full font-mono text-sm uppercase tracking-[0.01em] transition-colors delay-75 border h-14 gap-4 px-6 py-2.5 group 
								border-home-background 
								bg-home-background 
								text-home-text 
								hover:border-[#E4E3D4] 
								hover:bg-[#E4E3D4] 
								active:border-[#E4E3D4] 
								active:bg-[#E4E3D4] 
							'
						>
							View Article
							<ArrowRightIcon width={25} height={25} />
						</Link>
					</div>
				</div>
				<div className="flex justify-between items-center text-xs">
					<div className="flex h-8  items-center rounded-xl px-2.5 w-fit shrink-0
							bg-home-accent 
						"
					>
						<span className="tracking-[0.01em] font-mono uppercase leading-[1.1] font-medium">
							{data.type}
						</span>
					</div>
					<p className='tracking-[0.01em] !font-normal 
							!text-home-text
						'
					>
						{data.date}
					</p>
				</div>
				<div className="tracking-[0.01em] text-base font-medium pb-1 line-clamp-2 leading-snug!">
					<Link href={`${data.link}`}>
						{data.header}
					</Link>
				</div>
				<div className="text-sm tracking-[0.01em] !font-normal 
						!text-home-text
					"
				>
					<Link href={`${data.link}`}>
						{data.paragraph}
					</Link>
				</div>
			</div>
		</div>
	);
}




export default function Exhibits() {
	return (
		<div className="mx-auto w-full px-6 sm:px-16 
				bg-home-background
			"
		>
			<div className="flex flex-col py-14 sm:py-24">
				<div className="w-full">
					<div className="flex flex-col items-center justify-between sm:flex-row text-inherit mb-8 sm:mb-12">
						<div className="w-full">
							<h3 className="font-sans tracking-[-0.01em] text-3xl leading-[1.2] sm:text-[2.5rem] sm:leading-[1.1] mb-8 inline-block align-top text-balance 
									text-home-text
								"
							>
								Explore Our Exhibits
							</h3>
						</div>
					</div>
					<div className="grid gap-x-7 gap-y-12 sm:gap-x-10 sm:gap-y-16 sm:grid-cols-3 md:grid-cols-4 z-0">



						
						{exhibitData.map((i, index) => (

							<StaticBlogCard 
								key={index} 
								data={i} 
							/>

						))}




					</div>
				</div>
			</div>
		</div>
	);
}



