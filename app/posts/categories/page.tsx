"use cache"

import { unstable_cacheLife as cacheLife } from 'next/cache'
import { getAllCategories } from "@/lib/wordpress";
import { Metadata } from "next";
import Link from "next/link";
import clsx from "clsx";




export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "All Categories",
		description: "Browse all categories on the site.",
	};
}



async function Categories() {
	const categories = await getAllCategories();
	console.log("---------- Authors Page() function ran ----------")

	return (
		<>
			{categories.map((i: any, index) => (
				<Link
					key={i.id}
					href={`/posts/?tag=${i.id}`}
					className={clsx(`flex h-8 w-fit shrink-0 items-center gap-x-4 rounded-xl border px-2.5 duration-150 
							border-articles-border
						`,
						{
							"hover:bg-articles-accent-0 hover:border-articles-accent-0": [0, 3, 6, 9].includes(index),
							"hover:bg-articles-accent-1 hover:border-articles-accent-1": [1, 4, 7, 10].includes(index),
							"hover:bg-articles-accent-2 hover:border-articles-accent-2": [2, 5, 8, 11].includes(index),
						}
					)}
				>
					{i.name}
				</Link>
			))}
		</>
	)
}




export default async function Page() {
	return (
        <div className="
				bg-articles-background
			"
		>
            <div className="mx-auto w-full max-w-(--breakpoint-xl) px-5 sm:px-10 py-[120px] sm:py-28 ">
				<div className="grid gap-y-14 lg:grid-cols-[21rem_1fr] lg:items-start lg:gap-x-24">
					<div className="">
						<div className="flex flex-col gap-3">

							<p className="font-sans text-lg font-bold tracking-[0.01em] uppercase
									text-articles-text
								"
							>
								Categories
							</p>

							<div className="flex flex-wrap gap-2">

								<Link 
									href={`/posts`} 
									className="flex h-8 w-fit shrink-0 items-center gap-x-4 rounded-xl border px-2.5 duration-150 

										text-articles-text
										border-articles-border

										hover:text-articles-background 
										hover:bg-articles-text
									"
								>
									All
								</Link>

								<Categories />

							</div>

						</div>
					</div>
				</div>
			</div>
        </div>
    );
}



