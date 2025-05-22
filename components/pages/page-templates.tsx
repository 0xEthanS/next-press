import { EmailForm1 } from "@/components/email-form";
import { SocialCluster } from "@/components/socials-cluster";

import { config } from "../../wp.config.mjs"




const emailSlogan = config.footerData.emailSlogan




const SideBar = () => {
	return (
		<div className='top-32 mt-8 w-fit rounded-3xl border p-7 xl:sticky xl:mt-0 
				bg-sidebar-background
			'
		>
			<div className='flex flex-col gap-3'>
				<p className="font-sans text-lg font-bold tracking-[0.01em] uppercase
						text-sidebar-text 
					"
				>
					Subscribe
				</p>
				<div>
					<p className="tracking-[0.01em] text-sm 
							text-sidebar-text 
						"
					>
						{emailSlogan}
					</p>
					<EmailForm1 />
				</div>
			</div>
			<div className='flex flex-col gap-3'>
				<p className='font-sans text-lg font-bold tracking-[0.01em] uppercase
						text-sidebar-text 
					'
				>
					Share article
				</p>
				<SocialCluster />
			</div>
		</div>
	);
}




const PageContent = ({ 
    children, 
    title 
}: { 
    children: React.ReactNode,
    title?: string 
}) => {
    // Safe way to handle the first word styling without assumptions
    const firstWordStyling = (text: string) => {
        if (!text) return null;
        
        const words = text.split(' ');
        if (words.length <= 1) {
            return <span className="font-bold">{text}</span>;
        }
        
        const firstWord = words[0];
        const restOfWords = words.slice(1).join(' ');
        
        return (
            <>
                <span className="font-medium tracking-wide">
                    {firstWord}
                </span>{' '}
                <span className="font-bold tracking-normal">
                    {restOfWords}
                </span>
            </>
        );
    };
    
    return (
        <div className="bg-pages-background min-h-screen">
            {/* Refined container with intentional asymmetrical spacing */}
            <div className="mx-auto w-full max-w-(--breakpoint-xl) px-6 sm:px-10 md:px-16 lg:px-20 py-8 sm:py-12 mt-[60px]">
               
			   
			    {/* Enhanced title area with Glaser-inspired visual treatments */}
                {title && (
                    <header className="relative mb-9 overflow-hidden">
                        {/* Subtle background texture - mimicking Glaser's use of texture */}
                        <div className="absolute inset-0 bg-[url('/subtle-texture.png')] opacity-[0.03] mix-blend-overlay"></div>
                        
                        {/* Asymmetrical background element - introducing tension */}
                        <div className="absolute -top-6 -right-12 w-[45%] h-[140%] bg-[#E7EFEA] rounded-[40%] opacity-20 transform rotate-[12deg]"></div>
                        
                   
                        {/* Vertical accent line - reminiscent of Glaser's graphic elements */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#37857c] via-[#37857c] to-transparent"></div>
                        
                        {/* Content wrapper with refined spacing */}
                        <div className="relative z-10 pt-6 pb-8 pl-7 sm:pl-8">
                            {/* Title with sophisticated typography */}
                            <div className="max-w-3xl">
                                <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl leading-[1.08] text-[#1A2A38]">
                                    {firstWordStyling(title)}
                                </h1>
                                
                                {/* Metadata with compositional balance */}
                                <div className="text-sm text-[#37857c] mt-2.5 font-medium tracking-wide transform pl-0.5">
                                    Floor 1 <span className="inline-block mx-1.5 opacity-70">•</span> Current Exhibition
                                </div>
                            </div>
                            
                            {/* Refined separator with Glaser's preference for visual subtlety */}
                            <div className="relative mt-8 max-w-[95%]">
                                <div className="h-px bg-gradient-to-r from-[#37857c] via-[#37857c]/30 to-transparent"></div>
                                <div className="absolute -bottom-3 right-0 h-px w-[35%] bg-[#DA9A63]/20"></div>
                            </div>
                        </div>
                    </header>
                )}








                {/* Content grid with sophisticated proportions */}
                <div className="grid items-start gap-x-8 lg:gap-x-12 xl:grid-cols-[2.6fr_1fr]">


                    {/* Main content with refined vertical rhythm */}
                    <main className="overflow-hidden pb-12">
                        <div className="prose-container space-y-6">
                            {children}
                        </div>
                    </main>
                    

                    {/* Sidebar with subtle visual distinction */}
                    <aside className="mt-10 xl:mt-0 xl:border-l border-[#37857c]/10 xl:pl-10">
                        <div className="relative">
                            {/* Subtle visual accent to sidebar */}
                            <div className="absolute -top-6 -left-10 w-6 h-6 rounded-full border border-[#DA9A63]/30 hidden xl:block"></div>
                            <SideBar />
                        </div>
                    </aside>


                </div>








            </div>
        </div>
    );
}




export { 
    SideBar, 
    PageContent 
}



