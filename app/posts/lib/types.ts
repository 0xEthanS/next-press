export type Post = {
	id: number;
	date: string;
	date_gmt: string;
	guid: {
		rendered: string;
	};
	modified: string;
	modified_gmt: string;
	slug: string;
	status: "publish" | "future" | "draft" | "pending" | "private";
	type: string;
	link: string;
	title: {
		rendered: string;
	};
	content: {
		rendered: string;
		protected: boolean;
	};
	excerpt: {
		rendered: string;
		protected: boolean;
	};
	author: number;
	featured_media: number;
	comment_status: "open" | "closed";
	ping_status: "open" | "closed";
	sticky: boolean;
	template: string;
	format:
		| "standard"
		| "aside"
		| "chat"
		| "gallery"
		| "link"
		| "image"
		| "quote"
		| "status"
		| "video"
		| "audio";
	meta: any[];
	categories: number[];
	tags: number[];
};




export type Category = {
	id: number;
	count: number;
	description: string;
	link: string;
	name: string;
	slug: string;
	taxonomy: "category";
	parent: number;
	meta: any[];
};




export type Tag = {
	id: number;
	count: number;
	description: string;
	link: string;
	name: string;
	slug: string;
	taxonomy: "post_tag";
	meta: any[];
};




export type Page = {
	id: number;
	date: string;
	date_gmt: string;
	guid: {
		rendered: string;
	};
	modified: string;
	modified_gmt: string;
	slug: string;
	status: "publish" | "future" | "draft" | "pending" | "private";
	type: string;
	link: string;
	title: {
		rendered: string;
	};
	content: {
		rendered: string;
		protected: boolean;
	};
	excerpt: {
		rendered: string;
		protected: boolean;
	};
	author: number;
	featured_media: number;
	parent: number;
	menu_order: number;
	comment_status: "open" | "closed";
	ping_status: "open" | "closed";
	template: string;
	meta: any[];
};




export type Author = {
	id: number;
	name: string;
	url: string;
	description: string;
	link: string;
	slug: string;
	avatar_urls: {
		[key: string]: string;
	};
	meta: any[];
};




export type BlockType = {
	api_version: number;
	title: string;
	name: string;
	description: string;
	icon: string;
	category: string;
	keywords: string[];
	parent: string[];
	supports: {
		[key: string]: any;
	};
	styles: {
		name: string;
		label: string;
		isDefault: boolean;
	}[];
	textdomain: string;
	example: {
		[key: string]: any;
	};
	attributes: {
		[key: string]: any;
	};
	provides_context: {
		[key: string]: string;
	};
	uses_context: string[];
	editor_script: string;
	script: string;
	editor_style: string;
	style: string;
};




export type EditorBlock = {
	id: string;
	name: string;
	attributes: {
		[key: string]: any;
	};
	innerBlocks: EditorBlock[];
	innerHTML: string;
	innerContent: string[];
};




export type TemplatePart = {
	id: string;
	slug: string;
	theme: string;
	type: string;
	source: string;
	origin: string;
	content: string | EditorBlock[];
	title: {
		raw: string;
		rendered: string;
	};
	description: string;
	status: "publish" | "future" | "draft" | "pending" | "private";
	wp_id: number;
	has_theme_file: boolean;
	author: number;
	area: string;
};




export type SearchResult = {
	id: number;
	title: string;
	url: string;
	type: string;
	subtype: string;
	_links: {
		self: {
			embeddable: boolean;
			href: string;
		}[];
		about: {
			href: string;
		}[];
	};
};




export type FeaturedMedia = {
	id: number;
	date: string;
	slug: string;
	type: string;
	link: string;
	title: {
		rendered: string;
	};
	author: number;
	caption: {
		rendered: string;
	};
	alt_text: string;
	media_type: string;
	mime_type: string;
	media_details: {
		width: number;
		height: number;
		file: string;
		sizes: {
			[key: string]: {
				file: string;
				width: number;
				height: number;
				mime_type: string;
				source_url: string;
			};
		};
	};
	source_url: string;
};




type FilterBarProps = {
	authors: Author[];
	tags: Tag[];
	categories: Category[];
	selectedAuthor?: string;
	selectedTag?: string;
	selectedCategory?: string;
};




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


