import Image from "next/image";
import { Button } from "@/components/buttons";
import { EmailForm0 } from "@/components/email-form";
import { SocialCluster } from "@/components/socials-cluster";
import { config } from "../../wp.config.mjs"


const contact = config.contact
const hours = config.footerData.hours
const logo = config.logo
const rightsReserved = config.footerData.rightsReserved
const blocks = config.footerData.blocks
const buttons = config.footerData.buttons
const emailSlogan = config.footerData.emailSlogan


const d = new Date();
let YEAR = d.getFullYear();




export default function Footer() {
	return (
		<div className="
				bg-footer-main-bg
			"
		>
			<footer className="">
				{/* Newsletter Signup */}
				<div className="mx-auto w-full max-w-(--breakpoint-xl) px-5 sm:px-10 border-t 
						border-footer-border 
					"
				>
					<div className="mx-auto flex flex-wrap items-center gap-x-8 py-10 sm:justify-center sm:py-16 xl:max-w-(--breakpoint-lg) xl:justify-between xl:gap-44">
						<p className="tracking-normal sm:text-[1.25rem] sm:leading-normal text-[1.375rem] leading-normal sm:max-w-[26rem] 
								text-footer-text 
							"
						>
							{emailSlogan}
						</p>
						<div className="mt-8 mb-8">
							<EmailForm0 />
						</div>
					</div>
				</div>
				{/* Main Content */}
				<div className="mx-auto w-full max-w-(--breakpoint-xl) px-5 sm:px-10 relative border-t 
						border-footer-border 
					"
				>
					<div className="flex">
						<div className="border-r border-solid  py-8 pr-3 pl-3 sm:py-16 sm:pr-8 sm:pl-4 
								bg-footer-accent 
								border-footer-border 
							"
						>
							<Image 
								src={logo.src}
								width={logo.width}
								height={logo.height}
								alt={logo.alt}
								className="w-32"
							/>
						</div>
						<div className="flex grow flex-col items-start gap-12 py-8 pl-6 sm:flex-row sm:flex-wrap sm:justify-between sm:gap-16 sm:pl-16 sm:pt-16 ">
							<div className="flex w-fit flex-col gap-4 sm:order-1">
								{/* Button 1 */}
								<Button className=" duration-300
										bg-button-1-primary 
										border-button-1-primary 
										hover:border-button-1-secondary 
										text-button-1-secondary 
									"
								>
									<a href={buttons.button0Link}>
										{buttons.botton0Text}
									</a>
								</Button>
								{/* Button 2 */}
								<Button className="duration-300
										bg-button-2-primary 
										hover:bg-button-2-secondary 
										border-button-2-secondary 
										text-button-2-secondary 
										hover:text-button-2-primary 
									"
								>
									<a href={buttons.button1Link}>
										{buttons.button1Text}
									</a>
								</Button>
							</div>
							<nav className="sm:order-none">
								<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:grid-rows-2 sm:gap-20 xl:flex">
									{/* Blocks */}
									{blocks.map((i, index) => (
										<div key={index} className="">
											<div className="flex flex-col items-start gap-3">
												<p className="font-medium tracking-normal sm:text-[1.25rem] sm:leading-normal text-[1.375rem] leading-normal 
														text-footer-text 
													"
												>
													{i.blockTitle}
												</p>
												<div className="flex flex-col gap-3 
														text-footer-text 
													"
												>
													{i.links.map((k) => (
														<div key={k.title}>
															<a href={k.link} className="group/link relative block overflow-hidden delay-75 hover:underline">
																{k.title}
															</a>
														</div>
													))}
												</div>
											</div>
										</div>
									))}
									{/* Hours */}
									<div className="flex flex-col items-start gap-3">
										<p className="font-medium tracking-normal sm:text-[1.25rem] sm:leading-normal text-[1.375rem] leading-normal 
												text-footer-text 
											"
										>
											Hours:
										</p>
										<div className="flex flex-col gap-3">
											<div className="grid grid-cols-5 
													text-footer-text 
												"
											>

												<div className="col-span-1 order-1 mr-2">
													{hours.map((i, index) => (
														<div key={index}>
															<div className="delay-75">{i.day}</div>
														</div>
													))}
												</div>

												<div className="col-span-4 order-2">
													{hours.map((i, index) => (
														<div key={index}>
															<div className="delay-75 text-nowrap">{i.time}</div>
														</div>
													))}
												</div>    
								 
											</div>
										</div>
									</div>
									{/* Contact Us */}
									<div className="flex flex-col items-start gap-3">
										<p className="font-medium tracking-normal sm:text-[1.25rem] sm:leading-normal text-[1.375rem] leading-normal
												text-footer-text 
											"
										>
											Contact Us:
										</p>
										<div className="flex flex-col gap-3
												text-footer-text 
											"
										>
											<div className="delay-75">
												{contact.address} 
											</div>										
											<div className="delay-75">
												{contact.email} 
											</div>
											<div className="delay-75">
												{contact.phone} 
											</div>
										</div>
									</div>
								</div>
							</nav>
							<div className="flex flex-col justify-between gap-6 sm:order-3 sm:w-full sm:flex-row sm:items-center">
								<div className="flex flex-wrap items-center gap-6">
									<SocialCluster />
								</div>
								<p className="tracking-[0.01em] text-sm	
										text-footer-text 
									"
								>
									© {YEAR} {rightsReserved}
								</p>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}







