import Link from "next/link";
import { cn } from "@/lib/utils";








export function BlurButton({ link, text, className }: { link: string; text: string; className: string }) {
	return (
		<Link href={link}
		>
			<button className={cn(
					`
						px-4 
						py-2 
						text-black 
						backdrop-blur-sm 
						border 
						border-black 
						rounded-md 
						hover:shadow-[0px_0px_4px_4px_rgba(0,0,0,0.1)] 
						bg-white/[0.2] 
						text-sm 
						transition 
						duration-200
					`,
					className
				)}
			>
				{text}
			</button>
		</Link>
	);
}











