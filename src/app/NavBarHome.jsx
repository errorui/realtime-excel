'use client'

import Link from "next/link"


const NavBarHome = () => {

    return ( 
        <div className="w-[98%] rounded-lg flex text-xl justify-center items-center bg-[#2B2B2B]">
            <div className="w-11/12 flex h-full py-5 justify-between">
                <div>ProductName</div>
                <div className="flex gap-x-3">
                    <Link href='/signup'><span>SignUp</span></Link>
                    <Link href='/login'><span>LogIn</span></Link>
                </div>
            </div>
        </div>
     );
}

export const getStartedBtn = () => {
    return(
        <button className="rouded-md py-3 px-4 text-2xl bg-white text-black">
            Get Started
        </button>
    )
}
 

export default NavBarHome;