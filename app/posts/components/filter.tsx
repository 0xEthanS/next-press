"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/wp/filter-helper"
import clsx from 'clsx';
import { useRouter } from "next/navigation";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Cross1Icon } from "@radix-ui/react-icons"
import Link from "next/link";




interface Author {
	id: number;
	name: string;
}

interface Tag {
	id: number;
	name: string;
}

interface Category {
	id: number;
	name: string;
}

interface FilterPostsProps {
	authors: Author[];
	tags: Tag[];
	categories: Category[];
	selectedAuthor?: string;
	selectedTag?: string;
	selectedCategory?: string;
}




export function Filter(
	{
		authors,
		tags,
		categories,
		selectedAuthor,
		selectedTag,
		selectedCategory,
	}: FilterPostsProps
) {

	const router = useRouter();


	const handleFilterChange = (type: string, value: string) => {

		console.log(`Filter changed: ${type} -> ${value}`);

		const newParams = new URLSearchParams(window.location.search);

		if (value === "all") {
			newParams.delete(type);
		} else {
			newParams.set(type, value);
		}

		router.push(`/posts?${newParams.toString()}`);

	};


	const handleResetFilters = () => {
		router.push("/posts");
	};




	return (
		<div className="">




			<RadioGroup 
				value={selectedTag || "all"} 
				onValueChange={(value) => handleFilterChange("tag", value)} 
				className="mb-3
				"
			>

				
				<div className="flex flex-wrap gap-4 items-center">


					<Link 
						href="/posts/tags"
						className="font-sans text-lg font-bold tracking-[0.01em] uppercase hover:underline
							text-articles-text
						"
					>
						Tags
					</Link>


					{selectedTag && (
						<RadioGroupPrimitive.Item value="all" className="flex flex-wrap items-center gap-1 hover:underline text-sm">
							<Cross1Icon className="border 
									border-custom-black
								" 
							/> 
							Clear Tags
						</RadioGroupPrimitive.Item>
					)}

				</div>


				<div className="flex flex-wrap gap-2">
					{tags.map((tag, index) => (
						<Label key={tag.id} className={clsx(`flex h-8 w-fit shrink-0 items-center gap-x-4 rounded-xl border px-2.5 duration-150
										border-articles-border
									`,
									{
										"bg-[#353535] text-white hover:text-[#353535]": tag.id.toString() === selectedTag?.toString(),
										"hover:bg-articles-accent-0 hover:border-articles-accent-0": [0, 3, 6, 9, 12, 15].includes(index),
										"hover:bg-articles-accent-1 hover:border-articles-accent-1": [1, 4, 7, 10, 13, 16].includes(index),
										"hover:bg-articles-accent-2 hover:border-articles-accent-2": [2, 5, 8, 11, 14, 17].includes(index),
									}
								)
							}
						>
							<span className="tracking-[0.01em] font-mono text-sm uppercase leading-[1.1]">{tag.name}</span>
							<RadioGroupItem 
								value={tag.id.toString()} 
								id={`r${index + 1}`} 
								className={clsx(
									{
										"bg-[#353535] text-white border-white": tag.id.toString() === selectedTag?.toString()
									}
								)} 
							/>
						</Label>
					))}
				</div>


			</RadioGroup>




			<RadioGroup 
				value={selectedCategory || "all"} 
				onValueChange={(value) => handleFilterChange("category", value)} 
				className="mb-3
				"
			>
				<div className="flex flex-wrap gap-4 items-center">


					<Link 
						href="/posts/categories"
						className="font-sans text-lg font-bold tracking-[0.01em] uppercase hover:underline
							text-articles-text
						"
					>
						Categories
					</Link>


					{selectedCategory && (
						<RadioGroupPrimitive.Item value="all" className="flex flex-wrap items-center gap-1 hover:underline text-sm">
							<Cross1Icon className="border 
									border-articles-border
								" 
							/> 
							Clear Categories
						</RadioGroupPrimitive.Item>
					)}

				</div>
				<div className="flex flex-wrap gap-2">
					{categories.map((i, index) => (
						<Label key={i.id} className={clsx(`flex h-8 w-fit shrink-0 items-center gap-x-4 rounded-xl border px-2.5 duration-150 
								border-articles-border
							`,
									{
										"bg-[#353535] text-white hover:text-[#353535]": i.id.toString() === selectedCategory?.toString(),
										"hover:bg-articles-accent-0 hover:border-articles-accent-0": [0, 3].includes(index),
										"hover:bg-articles-accent-1 hover:border-articles-accent-1": [1].includes(index),
										"hover:bg-articles-accent-2 hover:bord-articles-accent-2": [2].includes(index),
									}
								)
							}
						>
							<span className="tracking-[0.01em] font-mono text-sm uppercase leading-[1.1]
									text-articles-text
								"
							>
								{i.name}
							</span>
							<RadioGroupItem 
								value={i.id.toString()} 
								id={`r${index + 1}`} 
								className={clsx(
									{
										"bg-[#353535] text-white border-white": i.id.toString() === selectedCategory?.toString()
									}
								)}
							/>
						</Label>
					))}
				</div>
			</RadioGroup>




			<RadioGroup value={selectedAuthor || "all"} onValueChange={(value) => handleFilterChange("author", value)} className="">
				<div className="flex flex-wrap gap-4 items-center">
					

					<Link 
						href="/posts/authors"
						className="font-sans text-lg font-bold tracking-[0.01em] uppercase hover:underline
							text-articles-text
						"
					>
						Authors
					</Link>


					{selectedAuthor && (
						<RadioGroupPrimitive.Item value="all" className="flex flex-wrap items-center gap-1 hover:underline text-sm">
							<Cross1Icon className="border 
									border-articles-border
								" 
							/> 
							Clear Authors
						</RadioGroupPrimitive.Item>
					)}
				</div>
				<div className="flex flex-wrap gap-2">
					{authors.map((i, index) => (
						<Label key={i.id} className={clsx(`flex h-8 w-fit shrink-0 items-center gap-x-4 rounded-xl border px-2.5 duration-150 
										border-articles-border
									`,
									{
										"bg-[#353535] text-white hover:text-[#353535]": i.id.toString() === selectedAuthor?.toString(),
										"hover:bg-articles-accent-0 hover:border-articles-accent-0": [0, 3].includes(index),
										"hover:bg-articles-accent-1 hover:border-articles-accent-1": [1].includes(index),
										"hover:bg-articles-accent-2 hover:bord-articles-accent-2": [2].includes(index),
									}
								)
							}
						>
							<span className="tracking-[0.01em] font-mono text-sm uppercase leading-[1.1]
									text-articles-text
								"
							>
								{i.name}
							</span>
							<RadioGroupItem 
								value={i.id.toString()} 
								id={`r${index + 1}`} 
								className={clsx(
									{
										"bg-[#353535] text-white border-white": i.id.toString() === selectedAuthor?.toString()
									}
								)} 
							/>
						</Label>
					))}
				</div>


			</RadioGroup>




		</div>
	)
}



