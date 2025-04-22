



export const config = {
	//baseUrl: "https://windpress.wpenginepowered.com/",
	//baseUrl: "https://aerialphotographylouisville.com/",


	//baseUrl: "https://oldhamkyhistory.com/",
	//hostname: "oldhamkyhistory.com",
	
	//baseUrl: "https://slovenianunion.org/",
	//hostname: "slovenianunion.org",

	baseUrl: "https://ccamuseum.org/",
	hostname: "ccamuseum.org",




	meatadata: {
		title: "Chinese American Museum of Chicago",
		description: "Chinese American Museum of Chicago"
	},
	logo: {
		src: "/camoc-logo.png",
		width: 500,
		height: 114,
		alt: "Chinese American Museum of Chicago Logo"
	}, 
	contact: {
		address: "238 West 23rd Street Chicago, IL 60616",
		email: "visit@camochicago.org",
		phone: "(312) 949-1000",
		// For Changes to socials, update the following files: 
		// @/components/icons.tsx
		// @/components/social-cluster.tsx
		socials: [
			{ 
				title: "Facebook", 
				link: "https://www.facebook.com/camochicago/" 
			},
			{ 
				title: "Instagram", 
				link: "https://www.instagram.com/camochicago" 
			},
			{ 
				title: "Linkedin", 
				link: "https://www.instagram.com/camochicago" 
			},
			{ 
				title: "Youtube", 
				link: "https://www.instagram.com/camochicago" 
			},
			//{ title: "Twitter", link: "" },
		],
	},
	footerData: {
		emailSlogan: `
			Subscribe to our newsletter. Join our newsletter…We won't 
			bombard you with junk email!
		`,
		hours: [
			{ day: "M:", time: "Closed" },
			{ day: "Tu:", time: "Closed" },
			{ day: "W:", time: "9:30 a.m. - 5:00 p.m." },
			{ day: "Th:", time: "Closed" },
			{ day: "F:", time: "9:30 a.m. - 5:00 p.m." },
			{ day: "Sa:", time: "10:00 a.m. - 5:00 p.m." },
			{ day: "Su:", time: "10:00 a.m. - 5:00 p.m." },
			{ day: "Group Visits:", time: "By Appointment Only" },
		],
		blocks: [
			{
				blockTitle: "Museum:",
				links: [
					{
						title: "Donate",
						link: "/content/donate"
					},
					{
						title: "Jean T. Lee Eulogy Delivered By Medora Lee",
						link: "/content/jean-t-lee-eulogy-delivered-by-medora-lee"
					},
					{
						title: "Raymond B Lee Donation In Memory Of Jean T. Lee",
						link: "/content/raymond-b-lee-donation-in-memory-of-jean-t-lee"
					},
					{
						title: "Staff",
						link: "/content/staff"
					},
					{
						title: "Board of Directors",
						link: "/content/board-of-directors"
					},
					{
						title: "Advisory Council",
						link: "/content/advisory-council"
					},
					{
						title: "Teaach Act",
						link: "/content/teaach-act"
					},
					{
						title: "Volunteer",
						link: "/content/volunteer"
					},
					{
						title: "4th Floor Room Rental",
						link: "/content/4th-floor-room-rental"
					},
				]
			},
		],
		buttons: {
			button0Link: "/content/donate",
			botton0Text: "Support Us",
			button1Link: "/content/information-for-visitors",
			button1Text: "Plan Your Visit"
		},
		rightsReserved: "by Chinese American Museum of Chicago. All rights reserved.",
	},
	navMenu: {
		utilityBanner: {
			text: "Plan Your Visit",
			link: "/content/information-for-visitors"
		},
		staticRoute: {
			title: "Donate",
			link: "/content/donate",
			description: ``
		},
		linkTree: [
			{
				type: "headlessTree",
				title: "About",
				links: [
					{ 
						key: 1, 
						title: 'Become a Member', 
						description: '',
						href: '/content/become-a-member',
						preFetch: null
					},	
					{ 
						key: 2, 
						title: 'Donate', 
						description: '',
						href: '/content/donate',
						preFetch: null
					},	
					{ 
						key: 3, 
						title: 'Volunteer', 
						description: '',
						href: '/content/volunteer',
						preFetch: null
					},	



					{ 
						key: 4, 
						title: 'Jean T Lee Eulogy Delivered By Medora Lee', 
						description: '',
						href: '/content/jean-t-lee-eulogy-delivered-by-medora-lee',
						preFetch: null
					},
					{ 
						key: 5, 
						title: 'Raymond B Lee Donation In Memory Of Jean T Lee', 
						description: '',
						href: '/content/raymond-b-lee-donation-in-memory-of-jean-t-lee',
						preFetch: null
					},
					{ 
						key: 6, 
						title: 'History And Mission', 
						description: '',
						href: '/content/history-and-mission',
						preFetch: null
					},
					{ 
						key: 7, 
						title: 'Board Of Directors', 
						description: '',
						href: '/content/board-of-directors',
						preFetch: null
					},
					{ 
						key: 8, 
						title: 'Advisory Council', 
						description: '',
						href: '/content/advisory-council',
						preFetch: null
					},
					{ 
						key: 9, 
						title: 'Associate Board', 
						description: '',
						href: '/content/associate-board',
						preFetch: null
					},
					{ 
						key: 10, 
						title: 'Staff', 
						description: '',
						href: '/content/staff',
						preFetch: null
					},	
					{ 
						key: 11, 
						title: 'In Memoriam', 
						description: '',
						href: '/content/in-memoriam',
						preFetch: null
					},
					{ 
						key: 12, 
						title: 'Obituary Of Mrs Jean-lee', 
						description: '',
						href: '/content/obituary-of-mrs-jean-lee',
						preFetch: null
					},
				]
			},
			{
				type: "headlessTree",
				title: "Visit & Contact",
				links: [
					{ 
						key: 1, 
						title: 'Information For Visitors', 
						description: '',
						href: '/content/information-for-visitors',
						preFetch: null
					},
					{ 
						key: 2, 
						title: 'Group Visit', 
						description: '',
						href: '/content/group-visit',
						preFetch: null
					},
					{ 
						key: 3, 
						title: 'Contact Us', 
						description: '',
						href: '/content/contact-us',
						preFetch: null
					},
					{ 
						key: 4, 
						title: '4th Floor Room Rental', 
						description: '',
						href: '/content/4th-floor-room-rental',
						preFetch: null
					},
				]
			},
			{
				type: "headlessTree",
				title: "Events & Exhibits",
				links: [
					{ 
						key: 1, 
						title: 'Events', 
						description: '',
						href: '/posts/',
						preFetch: null
					},
					{ 
						key: 2, 
						title: 'Past Events', 
						description: '',
						href: '/posts?category=611846666',
						preFetch: null
					},
					{ 
						key: 3, 
						title: 'Past Exhibits', 
						description: '',
						href: '/posts?category=620820045',
						preFetch: null
					},
					{ 
						key: 4, 
						title: 'Current Exhibits', 
						description: '',
						href: '/content/current-exhibits',
						preFetch: null
					},
					{ 
						key: 5, 
						title: 'Video Archive', 
						description: '',
						href: '/content/video-archive',
						preFetch: null
					},
				]
			},
			{
				type: "headlessTree",
				title: "Research & Conservation",
				links: [
					{ 
						key: 1, 
						title: 'Lunar New Year History and Traditions Explained', 
						description: '',
						href: '/content/lunar-new-year-history-and-traditions-explained',
						preFetch: null
					},
					{ 
						key: 2, 
						title: 'Education', 
						description: '',
						href: '/content/education',
						preFetch: null
					},
					{ 
						key: 3, 
						title: 'Burnham Wildlife Corridor', 
						description: '',
						href: '/content/burnham-wildlife-corridor',
						preFetch: null
					},
				]
			},
			{
				type: "headlessTree",
				title: "The Teaach Act",
				links: [
					{ 
						key: 1, 
						title: 'Teaach Act', 
						description: '',
						href: '/content/teaach-act',
						preFetch: null
					},
					{ 
						key: 2, 
						title: 'Celebrating Asian American and Pacific Islander Heritage Month', 
						description: '',
						href: '/posts/celebrating-asian-american-and-pacific-islander-heritage-month',
						preFetch: null
					},
					{ 
						key: 3, 
						title: 'Moca Book Recommendations', 
						description: '',
						href: '/posts/moca-book-recommendations',
						preFetch: null
					},
					{ 
						key: 4, 
						title: 'Chinese American Asian American History Videos On PBS', 
						description: '',
						href: '/content/chinese-american-asian-american-history-videos-on-pbs',
						preFetch: null
					},
					{ 
						key: 5, 
						title: 'The Teaach Act is Passed', 
						description: '',
						href: '/content/the-teaach-act-is-passed',
						preFetch: null
					},
					{ 
						key: 6, 
						title: 'Uncovering Asian American Stories in Evanston and The Midwest', 
						description: '',
						href: '/content/uncovering-asian-american-stories-in-evanston-and-the-midwest',
						preFetch: null
					},
					{ 
						key: 7, 
						title: 'Asian Women Suffragists', 
						description: '',
						href: '/posts/asian-women-suffragists-2',
						preFetch: null
					},
					{ 
						key: 8, 
						title: 'Shows on Asian Americans on PBS TV Links to Watch Free', 
						description: '',
						href: '/posts/shows-on-asian-americans-on-pbs-tv-links-to-watch-free',
						preFetch: null
					},
					{ 
						key: 9, 
						title: 'Exhibitions and Teaching From China Institute in America', 
						description: '',
						href: '/content/exhibitions-and-teaching-from-china-institute-in-america',
						preFetch: null
					},
				]
			},
			{
				type: "singleNode",
				title: "Museum in the News",
				link: "/posts/",
				preFetch: false
			},
		]
	},
	static: {
		content: [
			'jean-t-lee-eulogy-delivered-by-medora-lee', 
			'raymond-b-lee-donation-in-memory-of-jean-t-lee', 
			'history-and-mission', 
			'board-of-directors', 
			'advisory-council', 
			'associate-board', 
			'staff', 
			'in-memoriam', 
			'obituary-of-mrs-jean-lee', 
			'information-for-visitors', 
			'group-visit', 
			'current-exhibits', 
			'video-archive', 
			'lunar-new-year-history-and-traditions-explained', 
			'education', 
			'burnham-wildlife-corridor', 
			'teaach-act', 
			'chinese-american-asian-american-history-videos-on-pbs', 
			'the-teaach-act-is-passed', 
			'uncovering-asian-american-stories-in-evanston-and-the-midwest', 
			'exhibitions-and-teaching-from-china-institute-in-america', 
			'become-a-member', 
			'donate', 
			'volunteer', 
			'contact-us', 
			'4th-floor-room-rental',
		]
	},
	wp: {
		thumbnailFallback: '/tang-dynasty-stele.webp',
		fallbackVenue: "Chinese American Museum of Chicago"
	},
}









const array = [
	'about-the-museum',
	'century-of-progress-exhibition',
	'century-progress-exhibition',
	'columbian-exhibition',
	'columbian-exhibition-1893',
	'current-upcoming-events',
	'current-events',
	'current-exhibits',
	'event-announcements',
	'food',
	''
]