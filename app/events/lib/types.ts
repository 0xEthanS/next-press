export type DateDetails = {
	year: string;
	month: string;
	day: string;
	hour: string;
	minutes: string;
	seconds: string;
};




export type CostDetails = {
	currency_symbol: string;
	currency_code: string;
	currency_position: string;
	values: any[];
};




export type Organizer = {
	id: number;
	author: string;
	status: string;
	date: string;
	date_utc: string;
	modified: string;
	modified_utc: string;
	url: string;
	organizer: string;
	slug: string;
	phone: string;
	website: string;
	email: string;
	json_ld: {
		"@type": string;
		name: string;
		description: string;
		url: string;
		telephone: string;
		email: string;
		sameAs: string;
	};
	global_id: string;
	global_id_lineage: string[];
};




export type Venue = {
    id: number;
    author: string;
    status: string;
    date: string;
    date_utc: string;
    modified: string;
    modified_utc: string;
    url: string;
    venue: string;
    slug: string;
    address: string;
    city: string;
    country: string;
    state: string;
    zip: string;
    phone: string;
    website: string;
    stateprovince: string;
    show_map: boolean;
    show_map_link: boolean;
    global_id: string;
    global_id_lineage: string[];
};




export type JsonLd = {
	"@context": string;
	"@type": string;
	name: string;
	description: string;
	url: string;
	eventAttendanceMode: string;
	eventStatus: string;
	startDate: string;
	endDate: string;
	organizer: {
		"@type": string;
		name: string;
		description: string;
		url: string;
		telephone: string;
		email: string;
		sameAs: string;
	};
	performer: string;
};




export type Event = {
	id: number;
	global_id: string;
	global_id_lineage: string[];
	author: string;
	status: string;
	date: string;
	date_utc: string;
	modified: string;
	modified_utc: string;
	url: string;
	rest_url: string;
	title: string;
	description: string;
	excerpt: string;
	slug: string;
	image: boolean;
	all_day: boolean;
	start_date: string;
	start_date_details: DateDetails;
	end_date: string;
	end_date_details: DateDetails;
	utc_start_date: string;
	utc_start_date_details: DateDetails;
	utc_end_date: string;
	utc_end_date_details: DateDetails;
	timezone: string;
	timezone_abbr: string;
	cost: string;
	cost_details: CostDetails;
	website: string;
	show_map: boolean;
	show_map_link: boolean;
	hide_from_listings: boolean;
	sticky: boolean;
	featured: boolean;
	categories: any[];
	tags: any[];
	venue: Venue;
	organizer: Organizer[];
	json_ld: JsonLd;
	ticketed: boolean;
};







