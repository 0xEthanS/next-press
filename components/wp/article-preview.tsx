import { ArrowRightIcon } from '@/components/icons'
import { ReactNode } from 'react'


type SearchParams = { [key: string]: string | undefined }


async function ArticlePreview(props: {href: string, children: ReactNode}) {
	const href = props.href
	const children = props.children


	return (
		<div className="
				bg-article-background
			"
		>
			<div className='overflow-hidden'>
				<div className='mx-auto w-full max-w-(--breakpoint-xl) px-0 sm:px-0'>
					<div className='border-t border-solid xl:-mx-24 xl:[mask-image:linear-gradient(to_right,transparent_0%,black_15%,black_85%,transparent_100%)] 
							border-article-border
						'
					></div>
				</div>
			</div>
			<div className='mx-auto w-full px-6 sm:px-16 py-14 sm:py-32'>
				<div className="flex flex-col items-center justify-between sm:flex-row text-inherit mb-8 sm:mb-12">
					<div className="w-full">
						<h3 className="font-sans tracking-[-0.01em] text-3xl leading-[1.2] sm:text-[2.5rem] sm:leading-[1.1] mb-8 inline-block align-top text-balance">
							Recent Articles
						</h3>
						<div className="flex items-center">
							<a 
								href={href}
								className="group inline-flex cursor-pointer items-center rounded-full font-mono text-sm uppercase tracking-[0.01em] h-auto gap-2 p-0 justify-start hover:underline 
									border-article-border 
									bg-transparent 
									text-article-text
									hover:text-article-text/30
								"
							>
								See more from the blog
								<ArrowRightIcon width={25} height={25} />
							</a>
						</div>
					</div>
				</div>
				{children}
			</div>
		</div>
	);
}




export { ArticlePreview }



