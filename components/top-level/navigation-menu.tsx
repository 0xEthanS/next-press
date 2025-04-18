import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { 
	Disclosure, 
	DisclosureButton,
	DisclosurePanel,
} from '@headlessui/react'
import { cn } from "@/lib/utils"
import clsx from "clsx"
import { config } from "../../wp.config.mjs"




const navMenu = config.navMenu




export function NavigationMenuDemo({ path, transparent}: { path: string; transparent: boolean;}) {
	return (
        <div>
            <NavigationMenu className="hidden text-lg font-medium md:text-sm gap-6 md:gap-5 lg:gap-6 flex-col md:flex md:flex-row md:items-center 
					text-navbar-text 
				"
			>



				<NavigationMenuList>
					{navMenu.linkTree.map((item) => {
                        if (item.type === "headlessTree" && item.links) {
                            return (
                                <DesktopTarget
                                    key={item.title}
                                    title={item.title}
                                    list={item.links}
                                    path={path}
                                    transparent={transparent}
                                />
                            );
                        } else if (item.type === "singleNode" && item.link) {
                            return (




                                <NavigationMenuItem 
									key={item.title}
								>
                                    <Link 
										href={item.link} 
										legacyBehavior 
										passHref
									>
                                        <NavigationMenuLink
                                            className={clsx(
												"px-4 py-2 ",
												{
                                                	"text-[#091717]": path !== "/" && transparent,
                                                	"text-navbar-text": path !== "/" && !transparent,
                                                	"text-slate-50": path === "/"
        	                                	}
											)}
                                        >
                                            {item.title}
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>




                            );
                        }
                        return null;
                    })}
				</NavigationMenuList>
			</NavigationMenu>
            <Sheet>
				<SheetTrigger asChild className="">
					<Button
						variant="outline"
						size="icon"
						className="shrink-0 md:hidden 
							bg-white 
						"
					>
						<Menu className="h-5 w-5" />
						<span className="sr-only">
							Toggle navigation menu
						</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="left">
					<nav className="grid gap-6 text-lg font-medium">
						<Link
							href="/"
							className="text-muted-foreground hover:text-foreground"
						>
							Home
						</Link>
						{navMenu.linkTree.map((item) => {
                            if (item.type === "headlessTree" && item.links) {
                                return (
                                    <MobileTarget
                                        key={item.title}
                                        title={item.title}
                                        list={item.links}
                                    />
                                );
                            } else if (item.type === "singleNode" && item.link) {
                                return (
                                    <Link
                                        key={item.title}
                                        href={item.link}
                                        className="text-muted-foreground hover:text-foreground"
                                        legacyBehavior>
                                        {item.title}
                                    </Link>
                                );
                            }
                            return null;
                        })}
					</nav>
				</SheetContent>
			</Sheet>
        </div>
    );
}












const ListItem = (
	{ 
		className, 
		title, 
		children, 
		key, 
		href,
		index,
	}: any
) => {
    return (
        <li 
			key={key}
			className={clsx(
			"rounded-md", 
				{
					"bg-navbar-dropdown-accent-0":  [0, 3, 6, 9, 12, 15, 18, 21, 24, 27].includes(index),
					"bg-navbar-dropdown-accent-1": [1, 4, 7, 10, 13, 16, 19, 22, 25, 28].includes(index), 
					"bg-navbar-dropdown-accent-2": [2, 5, 8, 11, 14, 17, 20, 23, 26, 29].includes(index)
				}
			)}
		>
            <NavigationMenuLink asChild>
                <a 
					href={href}
                    className={cn(
                        `block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground
						
						`,
                        className
                    )}
                >
                    <div className="text-sm font-bold leading-none hover:underline 
							text-navbar-dropdown-htext
						"
					>
                        {title}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground 
							text-navbar-dropdown-ptext
						"
					>
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
}




// Static Route Dropdown Link
function StaticRoute() {
	return (
		<li className="row-span-3">
			<NavigationMenuLink asChild>
				<a
					className="flex h-full w-full select-none flex-col justify-end rounded-md bg-linear-to-b from-muted/50 to-muted p-6 no-underline outline-hidden focus:shadow-md 
						bg-navbar-dropdown-accent-1
					"
					href={navMenu?.staticRoute?.link}
				>
					<div className="mb-2 mt-4 text-lg font-medium hover:underline 
							text-navbar-dropdown-htext
						"
					>
						{navMenu?.staticRoute?.title}
					</div>
					<p className="text-sm leading-tight text-muted-foreground
							text-navbar-dropdown-ptext
						"
					>
						{navMenu?.staticRoute?.description}
					</p>
				</a>
			</NavigationMenuLink>
		</li>	
	);
}




function MobileTarget(
	{
		title, 
		list
	}: {
		title: string; 
		list: { 
			key: number;
			title: string; 
			description: string;
			href: string;
		}[]
	}
) {
	return (
		<Disclosure 
			as="div" 
			className="-mx-3"
		>
			<DisclosureButton 
				className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 

					text-gray-900 

					hover:bg-gray-50 

				"
			>
				{title}
				<ChevronDownIcon 
					className='h-5 w-5 flex-none'
					aria-hidden="true"
				/>
			</DisclosureButton>
			<DisclosurePanel 
				className="mt-2 space-y-2"
			>
				{list.map((item) => (
					<DisclosureButton 
						key={item.key} 
						as="a" 
						href={item.href} 
						className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 

							text-gray-900 

							hover:bg-gray-50 

						"
					>
						{item.title}
					</DisclosureButton>
				))}
			</DisclosurePanel>
		</Disclosure>
	);
}




function DesktopTarget(
	{
		title, 
		path, 
		transparent, 
		list, 
	}: any
) {
	return (
		<NavigationMenuItem>
			<NavigationMenuTrigger className={clsx(
					"text-navbar-text",
					{/*
						
						"text-custom-white": path != "/" && transparent === false || path === "/",

						"text-custom-black": path != "/" && transparent === true,

					*/}
				)
			}
			>
				{title}
			</NavigationMenuTrigger>




			<NavigationMenuContent>
				<ul className="grid w-[450px] gap-3 p-4 md:w-[550px] md:grid-cols-2 lg:w-[650px] 
						bg-navbar-dropdown-background
					"
				>
					{navMenu?.staticRoute && <StaticRoute />}



					{list.map((i:any, index:number) => (
						
						<ListItem
							key={index}
							index={index}
							title={i.title}
							href={i.href}
						>
							{i.description}
						</ListItem>
					))}
				</ul>
			</NavigationMenuContent>




		</NavigationMenuItem>
	);
}







