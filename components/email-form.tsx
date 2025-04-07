import { Button } from "@/components/buttons";
import { Input } from "@/components/ui/input"




const EmailForm0 = () => {
	return(
		<div className="relative flex w-full max-w-[26rem] grow-0 flex-nowrap items-center border-b 
				border-sidebar-border 
			"
		>			 
			<Input
				className="focus-visible:outline-hidden focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 w-full h-14 bg-transparent mr-2 border-none 
					placeholder:text-sidebar-text 
				" 
				type="email" 
				placeholder="Email..." 
			/>
			{/* Button 2 */}
			<Button className="h-8 duration-300 self-center 
					bg-button-2-primary 
					hover:bg-button-2-secondary 
					border-button-2-secondary 
					text-button-2-secondary 
					hover:text-button-2-primary 
				"
			>
				Submit
			</Button>
		</div>
	);
}




const EmailForm1 = () => {
	return(
		<div className="py-8">
			<div className="relative flex w-full max-w-[26rem] grow-0 flex-nowrap items-center border-b 
					border-sidebar-border 
				"
			>
				<Input
					className="focus-visible:outline-hidden focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 w-full h-14 bg-transparent mr-2 border-none 
						placeholder:text-sidebar-text 
					" 
					type="email" 
					placeholder="Email..." 
				/>
				
			</div>
			{/* Button 2 */}
			<Button className="h-8 duration-300 mt-4 
					bg-button-2-primary  
					hover:bg-button-2-secondary 
					border-button-2-secondary 
					text-button-2-secondary 
					hover:text-button-2-primary  
				"
			>
				Submit
			</Button>
		</div>
	);
}




export { 
	EmailForm0, 
	EmailForm1 
}



