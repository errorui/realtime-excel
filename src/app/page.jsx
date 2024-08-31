import NavBarHome from "./NavBarHome";
import { GridPattern } from "./components/homeGridPattern";
import DemoVideo from "./components/DemoVideo";
import LandingPageImgCom from "./components/LandingPageImgCom";

export default function Home() {
  return (
    <main className="text-white bg-black min-h-screen pt-5 gap-y-[50px] flex flex-col items-center w-full ">
      <NavBarHome/>
      <div className="flex flex-col mb-6 justify-center items-center w-full h-full">
        <GridPattern/>
        <div className="flex w-full my-7 justify-center items-center xl:h-[700px] md:h-[500px] sm:h-[400px] xs:h-[350px] ">
          <DemoVideo/>
        </div>
        <div className="flex w-full justify-center items-center xl:h-[460px] lg:h-[320px] md:h-[230px] xs:h-[140px]">
          <LandingPageImgCom/>
        </div>
      </div>
    </main>
  );
}
