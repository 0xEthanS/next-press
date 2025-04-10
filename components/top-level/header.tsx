'use client'

import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { NavigationMenuDemo } from './navigation-menu'
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { config } from "../../wp.config.mjs"

const logo = config.logo
const utilityBanner = config.navMenu.utilityBanner




export function Header() {
    const pathname = usePathname()
    const [path, setPath] = useState("")
    const [isMainHeaderVisible, setIsMainHeaderVisible] = useState(true)




    const [isTransparent, setIsTransparent] = useState(false)




    const lastScrollY = useRef(0)
    const ticking = useRef(false)




    const transparentRoutes = [
        '/',
    ]




    useEffect(() => {
        setPath(pathname);
    }, [])
    useEffect(() => {
        const handleScroll = () => {
            if (!ticking.current) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY
                    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
                    const isAtBottom = Math.abs(currentScrollY - maxScroll) < 50 // Small threshold for bottom detection
                    
                    


                    // Only apply transparency if we're on a designated route
                    const shouldBeTransparent = transparentRoutes.includes(pathname)


                    setIsTransparent(shouldBeTransparent && currentScrollY <= 25)
                    



                    // Handle header visibility
                    if (!isAtBottom) { // Only process normal scroll behavior if not at bottom
                        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                            // Scrolling down & past threshold - hide header
                            setIsMainHeaderVisible(false)
                        } else if (currentScrollY < lastScrollY.current) {
                            // Scrolling up - show header
                            setIsMainHeaderVisible(true)
                        }
                    }
                    lastScrollY.current = currentScrollY
                    ticking.current = false
                })
                ticking.current = true
            }
        }
        // Handle resize events to recalculate maxScroll
        const handleResize = () => {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight
            const currentScrollY = window.scrollY
            const isAtBottom = Math.abs(currentScrollY - maxScroll) < 50

            if (isAtBottom) {
                setIsMainHeaderVisible(false)
            }
        }




        // Initial check for transparency based on route
        const shouldBeTransparent = transparentRoutes.includes(pathname)
        setIsTransparent(shouldBeTransparent && window.scrollY <= 25)
        
        


        window.addEventListener('scroll', handleScroll, { passive: true })
        window.addEventListener('resize', handleResize, { passive: true })
        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleResize)
        }
    }, [])




    return (
        <header className="w-full fixed top-0 shrink-0 z-50">




            {/* Utility Banner; Height = 41px */}
            <div className="border-b w-full sm:px-3.5 z-50 sticky
                    border-utility-banner-border
                    bg-utility-banner-background
                "
            >

                <div className="mx-auto w-fit py-2 flex flex-row items-center">
                    <div className="pr-3 text-sm leading-6
                            text-utility-banner-text
                        "
                    >
                    </div>



                    {/* Button 1 */}
                    <a 
                        href={utilityBanner.link}
                        className="flex flex-row items-center rounded-full px-3.5 py-0.5 text-sm font-medium shadow-sm
                            text-button-1-secondary 
                            bg-button-1-primary
                        "
                    >
                        <div className='mr-2'>
                           {utilityBanner.text} 
                        </div>
                        <ArrowRightIcon />
                    </a>





                </div>

            </div>




            {/* Main Header; Height = 64px */}
            <div 
                className={`
                    flex 
                    items-center 
                    px-4 
                    z-40 
                    text-sm 
                    h-16 
                    transform 
                    transition-transform 
                    duration-300 
                    justify-between 
                    border-b 
                    border-transparent


                    ${isTransparent ? 'bg-transparent border-transparent' : 'bg-navbar-background'}


                    ${isMainHeaderVisible ? 'translate-y-0' : '-translate-y-16'}
                `}
            >




                <div className=''>
                    <a href='/'>
                        <Image 
                            src={logo.src}
                            width={logo.width}
                            height={logo.height}
                            alt={logo.alt}
                            className="w-32 mr-10"
                        />
                    </a>
                </div>
                <NavigationMenuDemo 
                    path={path} 
                    transparent={isTransparent}
                />
            </div>




        </header>
    )
}



