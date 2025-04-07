import React from "react"
import { cn } from "@/lib/utils";




const Article = (
	{
		children,
		className,
		id,
		dangerouslySetInnerHTML,
	}: any
) => {
	return (
		<article
			dangerouslySetInnerHTML={dangerouslySetInnerHTML}
			className={cn(
				`
					prose 
					max-w-full 
					prose-neutral 
					prose:font-sans 
					dark:prose-invert 
					xl:prose-lg 


					prose-headings:font-normal 
					prose-headings:font-sans 
					prose-headings:tracking-[-0.01em] 
					prose-headings:text-2xl 
					sm:prose-headings:text-[2rem] 
					sm:prose-headings:leading-[1.2] 
					prose-headings:mt-0 


					prose-p:tracking-[0.01em] 
					prose-p:text-base 


					prose-strong:font-bold 


					prose-a:underline 


					prose-li:mb-[0.85em] 
					last:prose-li:mb-0 
					prose-li:tracking-[0.01em] 
					prose-li:text-base 


					prose-ul:ps-[2.5ch] 
					prose-ul:text-base 
					[&_>li]:prose-ul:list-disc 
					[&_>ul]:prose-ul:mb-[0.85em] 


					prose-ol:ps-[2.5ch] 
					prose-ol:text-base 
					[&_>li]:prose-ol:list-decimal 
					[&_>ol]:prose-ol:mb-[0.85em] 
					prose-ol:mt-0 


					prose-blockquote:not-italic 


					prose-pre:border 
					prose-pre:bg-muted/25 


					prose-img:rounded-lg 
					prose-img:border 
					prose-img:overflow-hidden 
				`,
				className
			)}
			id={id}
		>
			{children}
		</article>
	);
};





export { Article };



