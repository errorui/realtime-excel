import NavBarHome from "./NavBarHome";
import Link from "next/link";

export default function Home() {
  return (
    <main className="text-white pt-5 gap-y-[50px] flex flex-col items-center w-screen bg-black min-h-screen">
      <NavBarHome />
      <div className="flex 2xl:flex-row xs:flex-col w-full 2xl:gap-x-[25px] items-center px-5">
        <div className="h-[70%] xl:w-[50%] bg-slate-600 xl:min-w-[730px] md:w-[50%] md:min-w-[500px] xs:w-10/12 xs:min-w-[200px] overflow-hidden shadow-sm shadow-white/15">
         
          <img className="w-full h-auto object-contain " src="./landing page.jpg" alt="image" />
        </div>

        <div className="flex-1 flex flex-col max-h-[560px] min-h-[530px] h-full pt-5 items-center justify-start 2xl:w-5/12 xs:w-7/12 xs:min-w-[300px] px-4 py-2">
          <div className="flex flex-col gap-y-1">
            <div className="text-3xl font-bold tracking-wider">
              Product-Name
            </div>
            <div className="text-lg opacity-60 tracking-tight">
              Pioneers
            </div>
            <div className="text-left mt-4 xl:text-xl md:text-md xs:text-md font-light leading-7">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla commodo, est vitae vestibulum bibendum, elit dolor maximus quam, quis fermentum nunc urna eu tortor. Phasellus ornare iaculis lacinia. Phasellus interdum maximus justo, et molestie erat venenatis et. Integer non pellentesque elit. Aenean tincidunt velit fermentum metus dictum convallis.
            </div>
          </div>
          <button className="transition-all duration-500 hover:-translate-y-3 shadow-xl hover:shadow-white hover:bg-slate-950 hover:text-white mt-16 flex place-self-start justify-center w-3/12 min-w-[130px] py-3 px-4 bg-white text-black rounded-xl">
            <Link href="/login">
              get started
            </Link>
          </button>
        </div>
      </div>
    </main>
  );
}
