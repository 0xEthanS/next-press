import { 
    MainContainer, 
    ContentSectionButton, 
    ImageContainer, 
    TextContainer 
} from "@/components/pages/content-section";




const Philanthropy = () => {
	return (
		<div>
			<MainContainer
                background="bg-home-background"
                border="border-b border-home-border"
            >
                <ImageContainer 
                    href="/donate" 
                    order="md:order-1" 
                    src="/camoc1.webp" 
                    alt="Oldham County History Center Campus" 
                    width={1500} 
                    height={1000}
                    
                />
                <TextContainer order="md:order-2">
                    <div className="flex h-8 w-fit shrink-0 items-center rounded-xl px-2.5 
                            bg-home-accent
                        "
                    >
                        <span className="tracking-[0.01em] font-mono text-sm uppercase leading-[1.1] font-medium 
                            "
                        >
                            Welcome
                        </span>
                    </div>
                    {/*<h1 className="font-sans tracking-[-0.01em] text-2xl sm:text-[2rem] sm:leading-[1.2] 
                            text-home-text
                        "
                    >
                        <a href="/donate">
                            HOW CAN YOU GIVE BACK?
                        </a>
                    </h1>*/}
                    <p className="tracking-[0.01em] text-base line-clamp-6 
                            text-home-text
                        "
                    >
                        We invite Chicago to discover the unique local Chinese American history through 
                        showcasing and celebrating current Chinese American art, culture, and innovation.
                    </p>
                    <p className="tracking-[0.01em] text-base line-clamp-6 
                            text-home-text
                        "
                    >
                        Chicago’s Chinatown is a site of rich historical importance. CAMOC not only 
                        invites visitors to discover it, but is a home for Chicagoans to gather, 
                        support, and create an expansive and evolving narrative of the Chinese American 
                        story.
                    </p>
                    <p className="tracking-[0.01em] text-base line-clamp-6 
                            text-home-text
                        "
                    >
                        To learn more about what goes on at CAMOC, follow us on Instagram and Facebook <strong>@camochicago</strong>
                    </p>
                    {/*<ContentSectionButton href="/donate">
                        Read More
                    </ContentSectionButton>*/}
                </TextContainer>
            </MainContainer>
		</div>
	);
}




export { Philanthropy }



