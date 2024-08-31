import { Poppins } from "next/font/google";

const poppins = Poppins({weight: "700", subsets: ["latin"]})

const LandingPageImgCom = () => {
    return ( <div className="w-full flex justify-center items-center relative">
        <img src="https://res.cloudinary.com/dg5ddxvko/image/upload/v1725136076/SIH/landingPageImg1_dqeqpe.png" alt="pic" />
        <div class="absolute inset-y-0 left-0 w-7/12 bg-gradient-to-r from-black/100 to-transparent pointer-events-none"></div>
        <div class="absolute inset-y-0 right-0 w-7/12 bg-gradient-to-l from-black/100 to-transparent pointer-events-none"></div>
        <div class="absolute inset-y-0 bottom-0 w-full h-1/4 bg-gradient-to-b from-black/100 to-transparent pointer-events-none"></div>
        <div class="absolute inset-y-0 top-0 w-full h-1/4 bg-gradient-to-b from-black/100 to-transparent pointer-events-none"></div>
        <div className="absolute xl:bottom-[180px] md:bottom-[120px] xs:bottom-[45px] xl:text-[36px] md:text-[24px] xs:text-[16px]">Grow With</div>
        <div className={`text-[#FF00E5] xl:bottom-[130px] md:bottom-[80px] xs:bottom-[20px] xl:text-[45px] md:text-[34px] sm:text-[22px] xs:text-[20px] absolute  ${poppins.className}`}>Pioneers-Sheets</div>
    </div> );
}
 
export default LandingPageImgCom;