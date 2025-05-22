import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/top-level/footer";
import { Header } from "@/components/top-level/header";
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { config } from "../wp.config.mjs"
import { inter } from "@/components/ui/fonts";










const title = config.meatadata.title
const description = config.meatadata.description
const url = ""




export const metadata: Metadata = {
	title: title,
	description: description,
	metadataBase: new URL("https://curatorai.dev"),
	icons: {
	  	icon: 'logo.svg',
	},
	openGraph: {
		title: title,
		description: description,
		url: "https://curatorai.dev",
		siteName: title,
		images: [
			{
				url: "/logo.png", 
				width: 800,       
				height: 600,
				alt: title,
			},
		],
		type: "website",
	},
}










export default function RootLayout(
	{ 
		children 
	}: Readonly<{
		children: React.ReactNode;
	}>
) {
	return (
		<html lang="en">
			<body className={
					`
						${inter.className} 	
						antialiased 
						min-h-screen 
						font-sans 
						bg-home-background
					`
				}
			>

				<Header />
				{children}
				<Footer />
				<TailwindIndicator />
			</body>
		</html>
	);
}







