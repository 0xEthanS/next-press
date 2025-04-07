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




const PageContent = (
	{ 
		children 
	}: { 
		children: React.ReactNode 
	}
) => {
	return (
		<div className="
				bg-pages-background	
			"
		>
			<div className='mx-auto w-full max-w-(--breakpoint-xl) px-5 sm:px-10 py-14 sm:py-24'>
				<div className='grid items-start gap-x-28 xl:grid-cols-[3.2fr_1fr] mt-8'>
					<div className='overflow-hidden'>
                        {children}
                    </div>
					<SideBar />
				</div>
			</div>
		</div>
	);
}




export { 
    SideBar, 
    PageContent 
}



