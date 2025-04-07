import { 
    MainContainer,  
    ImageContainer, 
    TextContainer 
} from "@/components/pages/content-section";




const About = () => {
	return (
		<div>
			<MainContainer
                background="bg-home-background"
                border="border-b border-home-border"
            >
				<ImageContainer  
					order="md:order-2" 
					src="https://oldhamkyhistory.com/wp-content/uploads/2020/01/Oldham-Pharmacy-Bar-Pic-BOTTOM-851.jpg" 
					alt="Oldham County Pharmacy Bar Picture" 
					width={851} 
					height={315} 
				/>	
				<TextContainer order="md:order-1">
					<div className="flex h-8 w-fit shrink-0 items-center rounded-xl px-2.5 
							bg-home-accent
						"
					>
						<span className="tracking-[0.01em] font-mono text-sm uppercase leading-[1.1] font-medium
							"
						>
							Our History
						</span>
					</div>
					<h1 className="font-sans tracking-[-0.01em] text-2xl sm:text-[2rem] sm:leading-[1.2] 
							text-home-text
						"
					>
						Oldham County Historical Society
					</h1>
					<p className="tracking-[0.01em] text-base line-clamp-6 
							text-home-text
						"
					>
						The Oldham County Historical Society preserves, collects and conveys the 
						history of Oldham County, Kentucky by telling the story of its people and 
						the events that shaped its development, using the objects and artifacts 
						that illustrate and symbolize that history.
					</p>
					<p className="tracking-[0.01em] text-base line-clamp-6 
							text-home-text
						"
					>
						We provide an environment in which the life of the past is experienced in 
						the present. Through its exhibits, programs, events and activities, it 
						will engage people in a dynamic process of thought, participation, and 
						action. It will strive to affirm the importance of individual and 
						collective community memory to develop a more enlightened society.
					</p>
					<p className="tracking-[0.01em] text-base line-clamp-6 
							text-home-text
						"
					>
						We create, maintain, and manage for the benefit of all the people of 
						Oldham County: a physical presence, an organizational structure, a strong 
						financial base and an endowment, a staff and volunteers, collections, 
						exhibits, creative educational programs, activities and special events, 
						and a publications program.
					</p>
				</TextContainer>
			</MainContainer>
		</div>
	);
}





export { About }



