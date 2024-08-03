import { Header } from "@/components/custom/Header";
import bgImage from '../../assets/home-bg-image.jpg'

export function Home() {
  console.log(bgImage)
  return (
		<>
  	  <Header />
			<div className="flex flex-col w-full items-center">
				<div id="home" className={`flex bg-center w-full justify-center items-center bg-[url('/src/assets/home-bg-image.jpg')] h-[600px] bg-no-repeat from-transparent to-white`}>
          <div>
            <h1 className="text-6xl font-bold text-grayLight">MULTI</h1>
            <h1 className="text-3xl font-bold text-grayLight text-center">UEPB</h1>
          </div>

				</div>
        <div className="w-full h-28 mt-[-112px] bg-gradient-to-b from-transparent to-white">
        </div>
        <div id="about-us" className="w-full pt-10">
          AAAAAAAAAAAA
        </div>
        <div id="features" className="">
          AAAAAAAAAAAAAAAAA
        </div>
        <div id="faq" className="">
          AAAAAAAAAAAAAAAAAAAAAAA
        </div>
			</div>
		</>
		
	)
}