/** @type {import('next').NextConfig} */



import { config } from "./wp.config.mjs"
const baseUrl = config.baseUrl
console.log("mjs file url import: ", baseUrl)




function extractRootDomain(url) {
    console.log("extractRootDomain function has run")


	// Handle cases where the URL doesn't have a protocol
	if (!url.includes('://')) {
		url = 'https://' + url;
	}
	
	try {
		// Create a URL object to parse the URL
		const urlObj = new URL(url);
		
		// Get the hostname (e.g., "www.example.com")
		let hostname = urlObj.hostname;
		
		// Split the hostname by dots
		const parts = hostname.split('.');
		
		// For domains with only two parts (e.g., example.com), return the whole thing
		if (parts.length <= 2) {
			return hostname;
		}
		
		// For domains with more parts, extract the root domain and TLD
		// This handles subdomains like www.example.com, blog.example.com, etc.
		const rootDomain = parts.slice(-2).join('.');
		
		return rootDomain;
	} catch (error) {
		// Return an error message if the URL is invalid
		return "Invalid URL: " + error.message;
	}
}


const cleanedUrl = extractRootDomain(baseUrl)





const nextConfig = {
    images: {
		remotePatterns: [




			{
				protocol: "https",
				hostname: 'windpress.wpenginepowered.com',
				port: "",
				pathname: "/**",
			},


            {
                protocol: "https",
                hostname: cleanedUrl,
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "www." + cleanedUrl,
                port: "",
                pathname: "/**",
            },
		],
	},
};




export default nextConfig;



