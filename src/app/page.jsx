

import NavBarHome from "./NavBarHome";
import Link from "next/link";
import image from '../../public/landing page.jpg'
import Image from "next/image";

export default function Home() {
  return (
    <main className="text-white pt-5 gap-y-[50px] flex flex-col items-center w-screen ">
      <NavBarHome/>
      <div className="flex w-10/12 gap-x-3 justify-between items-center">
        <div className="w-6/12 border min-w-[750px] border-white">
          <Image className="full" src={image} alt="image" />
        </div>
        <div className="flex flex-col max-h-[560px] min-h-[530px] h-full pt-5 items-center justify-between w-5/12">
          <div className="flex flex-col gap-y-1">
            <div className="text-3xl">
              Product-Name
            </div>
            <div className="text-2xl opacity-60">
              Pioneers
            </div>
            <div className="text-left mt-4 text-2xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla commodo, est vitae vestibulum bibendum, elit dolor maximus quam, quis fermentum nunc urna eu tortor. Phasellus ornare iaculis lacinia. Phasellus interdum maximus justo, et molestie erat venenatis et. Integer non pellentesque elit. Aenean tincidunt velit fermentum metus dictum convallis. 
            </div>
          </div>
          <Link className="flex place-self-start justify-center w-3/12 min-w-[130px] py-3 px-4 bg-white text-black rounded-xl" href="/signup">
            <button>
              get started
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
