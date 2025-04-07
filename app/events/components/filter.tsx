"use client"

import { useState } from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"


import { Calendar } from "@/app/events/components/calendar"


import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

type SearchParams = Promise<{ [key: string]: string | undefined }>



export function Filter() {

	const [from, setFrom] = useState(new Date());
	const [to, setTo] = useState(() => {
		const toDate = new Date();
		toDate.setMonth(toDate.getMonth() + 3);
		return toDate;
	});

	const [date, setDate] = useState<DateRange | undefined>({
		from: from,
		to: to,
	});


	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();


	function handleSubmit() {
		console.log("Search Params", searchParams)


		const params = new URLSearchParams(searchParams);
		
		if (date?.from && date?.to) {
			// Format dates as YYYY-MM-DD
			const fromString = date.from.toISOString().split('T')[0];
			const toString = date.to.toISOString().split('T')[0];
			
			params.set('from', fromString);
			params.set('to', toString);
		}

		
		replace(`${pathname}?${params.toString()}`);
		
	}




	return (
		<div className="grid gap-2">
				<Popover>



					<PopoverTrigger asChild>
						<Button
							id="date"
							variant={"outline"}
							className={cn(`w-full justify-start text-left rounded-full tracking-[0.01em] font-mono uppercase leading-[1.1] font-medium 
									border-articles-border 
									text-articles-text
								`,
								!date && "text-muted-foreground"
							)}
						>
							<CalendarIcon className="mr-2" />
							{date?.from ? (
								date.to ? (
									<>
										{format(date.from, "LLL dd, y")} - {" "}
										{format(date.to, "LLL dd, y")}
									</>
								) : (
									format(date.from, "LLL dd, y")
								)
							) : (
								<span className="
										text-articles-text
									"
								>
									Pick a date
								</span>
							)}
						</Button>
					</PopoverTrigger>
					<PopoverContent 
						className="w-auto p-0 tracking-[0.01em] font-mono uppercase leading-[1.1] font-medium 
							bg-articles-background
							text-articles-text
						" 
						align="start"
					>








						<Calendar
							initialFocus
							mode="range"
							defaultMonth={date?.from}
							selected={date}
							onSelect={setDate}
							numberOfMonths={2} 
						/>








					</PopoverContent>
				</Popover>

				<Button 
					onClick={handleSubmit}
					className="
						w-fit 
						justify-start 
						text-left 
						border 


						border-articles-border 


						rounded-full 
						tracking-[0.01em] 
						font-mono 
						uppercase 
						leading-[1.1] 
						font-medium 


						text-articles-text
					"
				>
					Update Date
				</Button>
		</div>
	)
}



