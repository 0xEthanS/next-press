import Link from "next/link";
import { 
	Facebook, 
	Youtube, 
	Instagram, 
	Twitter, 
	Linkedin 
} from "@/components/icons";
import { SocialButton } from "@/components/buttons";
import { config } from "../wp.config.mjs"


const socials = config.contact.socials




export const SocialCluster = () => {
	return (
		<div className="flex flex-wrap gap-2.5">


			{socials.map((i, index) => (


				<div key={index}>


					{i?.link && (


						<SocialButton 
							className="duration-300 
								bg-socials-bg 
								text-socials-text 
								hover:bg-socials-bg-hover
								hover:text-socials-text-hover 
							"
						>
							<Link href={i?.link}>
								{i?.title === "Instagram" && <Instagram width={25} height={25} />}
								{i?.title === "Facebook" && <Facebook width={25} height={25} />}
								{i?.title === "Youtube" && <Youtube width={25} height={25} />}
								{i?.title === "Twitter" && <Twitter width={25} height={25} />}
								{i?.title === "Linkedin" && <Linkedin width={25} height={25} />}
							</Link>
						</SocialButton>


					)}


				</div>


			))}


		</div>
	);
}



export const SocialClusterV2 = () => {
	return (
		<div className="hidden md:flex content-center items-center box-border gap-x-[8px] xl:gap-x-[10px] gap-y-[8px] xl:gap-y-[10px] basis-auto flex-row grow-0 shrink-0 flex-nowrap h-[54px] justify-start relative w-auto">
				{socials.map((i, index) => (
					<div key={index}>
						{i?.link && (
							<div className="block basis-auto grow-0 shrink-0 relative h-fit w-auto">
								<div className="flex items-center justify-center overflow-x-visible overflow-y-visible h-fit w-auto">
									<div className="flex items-center border rounded-[4px] gap-x-[10px] gap-y-[10px] p-[16px] h-fit w-auto 
											bg-[#fbfaf4] 
											border-[#8f8f8f] 
										"
									>
										<Link href={i?.link}>
											{i?.title === "Instagram" && <Instagram width={25} height={25} />}
											{i?.title === "Facebook" && <Facebook width={25} height={25} />}
											{i?.title === "Youtube" && <Youtube width={25} height={25} />}
											{i?.title === "Twitter" && <Twitter width={25} height={25} />}
											{i?.title === "Linkedin" && <Linkedin width={25} height={25} />}
										</Link>
									</div>
								</div>
							</div>
						)}
					</div>
				))}
		</div>
	);
}





export const SocialClusterV3 = () => {
	return (
		<div className="flex items-center content-center flex-row flex-nowrap grow-0 shrink-0 basis-auto justify-start gap-x-[10px] gap-y-[10px] overflow-x-hidden overflow-y-hidden relative 
				h-[54px] 
				w-full 
			"
		>
			{socials.map((i, index) => (
				<div key={index}>
					{i?.link && (
						<div className="block basis-auto grow-0 shrink-0 relative h-fit w-auto">
							<div className="flex items-center justify-center overflow-x-visible overflow-y-visible h-fit w-auto">
								<div className="flex items-center border rounded-[4px] gap-x-[10px] gap-y-[10px] p-[16px] h-fit w-auto 
										bg-[#fbfaf4] 
										border-[#8f8f8f] 
									"
								>
									<Link href={i?.link}>
										{i?.title === "Instagram" && <Instagram width={25} height={25} />}
										{i?.title === "Facebook" && <Facebook width={25} height={25} />}
										{i?.title === "Youtube" && <Youtube width={25} height={25} />}
										{i?.title === "Twitter" && <Twitter width={25} height={25} />}
										{i?.title === "Linkedin" && <Linkedin width={25} height={25} />}
									</Link>
								</div>
							</div>
						</div>
					)}
				</div>
			))}
		</div>
	);
}




