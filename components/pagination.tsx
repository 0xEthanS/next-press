import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination"




export default function PaginationDemo(
	{ 
		date, 
		setDate,
	}: { 
		date: Date | undefined; 
		setDate: (date: Date | undefined) => void; 
	}
) {


	const today = new Date();

	
	const reset = () => {
		const DATE = new Date()
		setDate(DATE)
	}


	const plus = () => {
		if (date) {
			const newDate = new Date(date.getTime())
			newDate.setDate(newDate.getDate() + 1)
			setDate(newDate)
		}
	}


	const minus = () => {
		if (date) {
			const newDate = new Date(date.getTime())
			newDate.setDate(newDate.getDate() - 1)
			setDate(newDate)
		}
	} 


	return (
		<Pagination className="justify-start sm:justify-end">
			<PaginationContent>


				{date && date >= today && (
					<PaginationItem>
						<PaginationPrevious 
							href="#" 
							onClick={minus}
						/>
					</PaginationItem>
				)}


				<PaginationItem>
					<PaginationLink 
						href="#" 
						isActive
						onClick={reset}
						className="px-10"
					>
						Today
					</PaginationLink>
				</PaginationItem>




				<PaginationItem>
					<PaginationNext 
						href="#" 
						onClick={plus}
					/>
				</PaginationItem>




			</PaginationContent>
		</Pagination>
	)
}









