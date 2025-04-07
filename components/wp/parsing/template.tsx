import Image from 'next/image';
import parse, { domToReact } from 'html-react-parser';
// This is a test file, and it is not currently imported anywhere



const htmlData = `
    <p>
		<img 
			class="alignnone size-full wp-image-6928 lazyload" 
			data-src="https://oldhamkyhistory.com/wp-content/uploads/2023/12/1-23-44-Sis-Bro-pt.-1-scaled.jpg" 
			alt="" 
			width="1964" 
			height="2560" 
			style="--smush-placeholder-width: 1964px; --smush-placeholder-aspect-ratio: 1964/2560;" 
		/>
	</p>
	<p>
		<img 
			class="alignnone size-full wp-image-6929 lazyload" 
			data-src="https://oldhamkyhistory.com/wp-content/uploads/2023/12/1-23-44-Sis-Bro-pt.-2-scaled.jpg" 
			alt="" 
			width="2560" 
			height="2467" 
			style="--smush-placeholder-width: 2560px; --smush-placeholder-aspect-ratio: 2560/2467;" 
		/>
	</p>
	<p>TRANSCRIPT</p>
	<p>FLORENCE ARMY AIR FIELD – FLORENCE, S.C.                                          DATED 1-23-43</p>
	<p>POSTMARKED 1-24-44 (Given the location and postmark, I think the “43” is a case of muscle memory acting up and that this letter is from &#8217;44)</p>
	<p>Dear Mary &amp; C.K. –</p>
	<p>Hope this letter will find everyone in a condition that is tops. I’m taking a few hrs. (as usual) off today to catch up on my correspondence and you’re first on my list so here goes.</p>
	<p>I’m now flying about two hrs. a day and then I’m off till next day. It’s really lots of fun to fly and I wish I had more of it. I am so used to it by now I can sit up there and go to sleep or do most anything. My pilot don’t have to many hrs. in as yet so I haven’t done any night flying with him. He’s scheduled to take a cross country to Mitchell Field, N.Y. sometime in the near future so guess I’ll get to go as Engineer and see the city itself. I’ll be taking quite a number of cross country hops from now on. I hope one of them is near Bowman Field. I’ll order those mechanics to lose half the ship so we can stay there about a week at the least.</p>
	<p>I went to Lynchville S.C. last night &amp; met two of the cutest blondes you ever saw so guess I will take a jaunt out there tonite if I can get my buddy’s car &amp; see how cute they are when I’m sober. (No I wasn’t drunk – I was just drinking)</p>
	<p>Say – from what I hear I’ll have a big brother in the Army soon. Is that so? I sure hope you won’t have to go till it’s about over with anyway.</p>
	<p>Have you seen Aunt &amp; Uncle lately? The last time I heard from them Aunt was pretty sick. It seems as if you all are having quite a time this year. Oh well – so am I.</p>
	<p>Well – I have to close for now because I can think of nothing new so be good &amp; write real soon.</p>
	<p>&nbsp;</p>
	<p>Love</p>
	<p>Toots</p>
`




export function parseContent(htmlContent: string) {


	const images:any = [];


	const paragraphs: string[] = [];


	const options = {

		replace: (domNode:any) => {

			if (!domNode.attribs) return;




			if (domNode.name === 'img') {

				const { 
					'data-src': src, 
					alt, 
					width, 
					height 
				} = domNode.attribs;

				if (src) {
					images.push({
						src,
						alt: alt || '',
						width: parseInt(width),
						height: parseInt(height)
					});
				}

				return null;

			}




			if (domNode.name === 'p') {


				const hasOnlyImage = domNode.children.some(
					(child:any) => child.name === 'img'
				);
				

				if (!hasOnlyImage) {
					const text = domToReact(domNode.children, options).toString().trim();
					if (text) {
						paragraphs.push(text);
					}
				}


				return null;


			}




		}


	};


	parse(htmlContent, options);


	return {
		images,
		paragraphs
	};

	
}




export const ContentTemplate = () => {


	const { images, paragraphs } = parseContent(htmlData);


	return (
		<div className="flex flex-col gap-5 md:grid md:grid-cols-4 relative">
			
			
			<div className="md:relative md:col-span-2 md:order-2 ">
				<div className="md:sticky md:top grid gap-y-5">
					{images.map((img:any, index:any) => (
						<Image
							key={index}
							src={img.src}
							alt={img.alt}
							width={img.width}
							height={img.height}
							className="rounded-lg"
						/>
					))}
				</div>
			</div>


			<div className="flex flex-1 flex-col justify-start gap-5 md:col-span-2 md:order-1
					tracking-[0.01em] 
					text-base 
					line-clamp-6 
				"
			>
				{
					paragraphs.map((text, index) => (
						<p 
							key={index}
						>
							{text}
						</p>
					))
				}
			</div>


		</div>
	);
};



