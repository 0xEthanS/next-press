/** @type {import('next').NextConfig} */



import { config } from "./wp.config.mjs"
const baseUrl = config.baseUrl
const hostname = config.hostname
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
    output: 'export',
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


			{
                protocol: "https",
                hostname: hostname,
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "www." + hostname,
                port: "",
                pathname: "/**",
            },


			{
                protocol: "https",
                hostname: "oldhamkyhistory.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "www.oldhamkyhistory.com",
                port: "",
                pathname: "/**",
            },


            {
                protocol: "https",
                hostname: "i0.wp.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "www." + "i0.wp.com",
                port: "",
                pathname: "/**",
            },


			{
                protocol: "https",
                hostname: "i1.wp.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "www." + "i1.wp.com",
                port: "",
                pathname: "/**",
            },


			{
                protocol: "https",
                hostname: "i2.wp.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "www." + "i2.wp.com",
                port: "",
                pathname: "/**",
            },

            {
                protocol: "https",
                hostname: "**.xx.fbcdn.net",
                port: "",
                pathname: "/**",
            }
		],
	},
    trailingSlash: true,
};




export default nextConfig;



// i2.wp.com