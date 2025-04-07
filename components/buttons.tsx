import { cn } from "@/lib/utils"




export function Button(
    { 
        className, 
        children 
    }: { 
        className: string; 
        children: any 
    }
) {
	return(
		<div
			className={cn(`
					group 
                    inline-flex 
                    cursor-pointer 
                    items-center 
                    justify-center 
                    rounded-full 
                    font-mono 
                    text-sm 
                    uppercase 
                    tracking-[0.01em] 
                    transition-colors 
                    delay-75 
                    border 
                    h-10 
                    gap-3 
                    px-4 
                    py-1.5 
                    self-stretch 
				`, 
				className
			)}
		>
			{children}
		</div>
	);
}




export function SocialButton(
    { 
        className, 
        children 
    }: { 
        className: string; 
        children: any 
    }
) {
    return(
        <div className={cn(`
                    grid 
                    size-10 
                    place-content-center 
                    rounded-full 
                    border 
                    border-current 
                `, 
                className
            )}
        >
            {children}	
        </div>
    );
}



