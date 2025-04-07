import Link from "next/link";
import { 
	Facebook, 
	Instagram, 
	Twitter 
} from "@/components/icons";
import { SocialButton } from "@/components/buttons";
import { config } from "../wp.config.mjs"


const socials = config.contact.socials




export const SocialCluster = () => {
    return (
        <div className="flex flex-wrap gap-2.5">
            {socials.map((i, index) => (
                <div key={index}>
                    <SocialButton 
                        className="duration-300 
                            bg-socials-bg 
                            text-socials-text 
                            hover:bg-socials-bg-hover
                            hover:text-socials-text-hover 
                        "
                    >
                        <Link href={i.link}>
                            {i.title === "Instagram" && <Instagram width={25} height={25} />}
                            {i.title === "Facebook" && <Facebook width={25} height={25} />}
                            {i.title === "Twitter" && <Twitter width={25} height={25} />}
                        </Link>
                    </SocialButton>
                </div>
            ))}
        </div>
    );
}



