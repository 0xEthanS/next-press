import Link from 'next/link';
import parse from 'html-react-parser';



function PostExcerpt({ 
    excerpt,
    sliceSize, 
    linkHref = "#" 
}: {
    excerpt: string;  
    sliceSize: number;
    linkHref?: string;  
}) {

	const htmlContent = String(excerpt)

	const textString = parseAndTruncate({ htmlContent, sliceSize })

    return (
        <Link href={linkHref} legacyBehavior>
            {textString}
        </Link>
    );
}


export { PostExcerpt }



const parseAndTruncate = ({ htmlContent, sliceSize }: { htmlContent: string; sliceSize: number }) => {

	let textString = ""

	const options = {
		replace: (domNode: any) => {
			if (domNode.type === 'text') {
                const text = domNode.data;
				textString = textString + text
				return
            }
		}
	}

	parse( htmlContent, options )

	textString = textString
		.replace(/\n/g, ' ') 
		.replace(/\s+/g, ' ')  
		.split(" ")
		.slice(0, sliceSize)
		.join(" ")
		.trim() + "...";

	return textString
}