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
                    src="https://oldhamkyhistory.com/wp-content/uploads/2020/01/1631307957MuseumBrickpic2.jpg" 
                    alt="Oldham County History Center Campus" 
                    width={1800} 
                    height={1200} 
                />


                <TextContainer order="md:order-2">
					

                    <div className="flex h-8 w-fit shrink-0 items-center rounded-xl px-2.5 
                            bg-home-accent
                        "
                    >
                        <span className="tracking-[0.01em] font-mono text-sm uppercase leading-[1.1] font-medium 
                            "
                        >
                            Philanthropy
                        </span>
                    </div>


                    <h1 className="font-sans tracking-[-0.01em] text-2xl sm:text-[2rem] sm:leading-[1.2] 
                            text-home-text
                        "
                    >
                        <a href="/donate">
                            HOW CAN YOU GIVE BACK?
                        </a>
                    </h1>


                    <p className="tracking-[0.01em] text-base line-clamp-6 
                            text-home-text
                        "
                    >
                        Whether you would like to donate your time, donate to a special project 
                        such as the Road Warrior Sculpture, or contribute financially in the form 
                        of an event sponsorship or planned gift, we at the Oldham County Historicial 
                        Society are thankful for you! There are so many ways you can be involved in
                        helping to preserve our Oldham County History.
                    </p>


                    <p className="tracking-[0.01em] text-base line-clamp-6 
                            text-home-text
                        "
                    >
                        Membership | Donate to a Specific Cause | Buy a Brick | Be an Event 
                        Sponsor | Volunteer | Planned Gifts & Provisions
                    </p>


                    <p className="tracking-[0.01em] text-base line-clamp-6 
                            text-home-text
                        "
                    >
                        Thank you to the sponsors of the 2023 Oldham County 
                        History Center Gala!
                    </p>


                    <div className="ml-8">
                        
                        <p className="tracking-[0.01em] text-base line-clamp-6 mb-2 
                                text-home-text
                            "
                        >
                            <strong>- Presenting Sponsors: </strong>Owsley & Christina 
                            Brown Fund, Eleanor Bingham Miller, Jean Frazier
                        </p>

                        <p className="tracking-[0.01em] text-base line-clamp-6 mb-2 
                                text-home-text
                            "
                        >
                            <strong>- Dinner Sponsors: </strong>Peyton Samuel Head 
                            Family Trust
                        </p>

                        <p className="tracking-[0.01em] text-base line-clamp-6 mb-2 
                                text-home-text
                            "
                        >
                            <strong>- Bar Sponsors: </strong>Terri and Dave Miller
                        </p>

                        <p className="tracking-[0.01em] text-base line-clamp-6 mb-2 
                                text-home-text
                            "
                        >
                            <strong>- Dessert Sponsors: </strong>LaGrange Service Center, 
                            Duane and Anne Murner, John and Sylvia Burke, Nina Bonnie, 
                            Emily S. Bingham, Stephen R. Reily
                        </p>

                        <p className="tracking-[0.01em] text-base line-clamp-6 mb-2 
                                text-home-text
                            "
                        >
                            <strong>- Art Walk Sponsors: </strong>Financial Solutions, East 
                            & Westbrook Construction, Burckleberry Farm, Bailey Safety, Inc., 
                            Karin and Joern Soltau, Champion Chevrolet-Buick-GMC
                        </p>

                        <p className="tracking-[0.01em] text-base line-clamp-6 mb-2 
                                text-home-text
                            "
                        >
                            <strong>- Table Sponsors: </strong>East & Westbrook Construction, 
                            Burckleberry Farm, LaGrange and Oldham County Tourism, United 
                            Citizens Bank, Oldham County Water District
                        </p>

                        <p className="tracking-[0.01em] text-base line-clamp-6 
                                text-home-text
                            "
                        >
                            <strong>- In-Kind Donations: </strong>Peter Campbell and 
                            Bobbi Nelson – Photography
                        </p>

                    </div>


                    <ContentSectionButton href="/donate">
                        Read More
                    </ContentSectionButton>


                </TextContainer>


            </MainContainer>


		</div>
	);
}




export { Philanthropy }



