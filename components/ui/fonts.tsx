import { 
	Inter, 
	Hanken_Grotesk, 
	Cormorant_Garamond, 
	JetBrains_Mono, 
	Libre_Caslon_Display, 
	Cormorant
} from "next/font/google";




export const inter = Inter({
	subsets: ['latin'],
	display: 'swap', 
	variable: '--font-inter'
})




export const hanken = Hanken_Grotesk({ 
	weight: '400',
	subsets: ['latin'], 
	variable: '--font-hanken'
});




export const cormorantG = Cormorant_Garamond({ 
	weight: '400',
	subsets: ['latin'],
	variable: '--font-cormorant-g' 
});




export const cormorant = Cormorant({ 
	weight: '400',
	subsets: ['latin'],
	variable: '--font-cormorant' 
});




export const jetbrains = JetBrains_Mono({ 
	weight: '400',
	subsets: ['latin'], 
	variable: '--font-jetbrains' 
});




export const libre = Libre_Caslon_Display({ 
	weight: '400',
	subsets: ['latin'], 
	variable: '--font-libre' 
});











