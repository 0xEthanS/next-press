import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/top-level/footer";
import { Header } from "@/components/top-level/header";
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { config } from "../wp.config.mjs"





import { 
	Inter,
	//Space_Grotesk  
} from 'next/font/google'




const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
  })


//export const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });








export const metadata: Metadata = {
	title: config.meatadata.title,
	description: config.meatadata.description,
};

console.log("Hello World")




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







