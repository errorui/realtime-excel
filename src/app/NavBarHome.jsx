'use client'

import Link from "next/link"
import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownSection,  DropdownItem} from "@nextui-org/dropdown";
import {  useAuth } from "../../context/auth"

import axios from "axios";
import { useRouter } from "next/navigation";

const API_URL = 'http://localhost:4002'

const NavBarHome = () => {

   const {user,setUser}=useAuth()
    const router = useRouter()

    const handleLogout = async () => {
        try {
          await axios.get(`${API_URL}/api/user/logout`, {withCredentials: true});
          setUser(null); 
          router.push('/')
        } catch (error) {
          console.error('Logout failed', error)
        }
      }
 

    if(user){
        return(
            <div className="sticky top-0 z-[1000000]  bg-slate-900 bg-opacity-70 backdrop-blur-md w-[98%] rounded-lg flex text-xl justify-center items-center text-white">
                <div className="w-11/12 gap-x-4 flex h-full py-5 justify-between">
                    <div className="flex justify-center items-center font-semibold text-2xl tracking-wider">
                        <Link href="/"><span className="lg:text-2xl md:block xs:hidden">Pioneers-Sheets</span></Link>
                        <Link href="/"><div className="w-[50px] h-[50px] md:hidden xs:block rounded-full bg-red-600"></div></Link>
                    
                    </div>
                    <div className="flex justify-center flex-wrap md:text-2xl xs:text-lg items-center md:gap-x-3 xs:gap-x-1 ">
                        <Link href="/workbench"><span>Workbench</span></Link>
                        <Link href="/chart"><span className="md:block xs:hidden" >GenerateCharts</span></Link>
                        <Link href="/chart"><span className="md:hidden xs:block " >Charts</span></Link>
                    </div>
                    <div className="flex justify-center items-center gap-x-3">
                        <div>{user ? (user.username) : ('user')}</div>
                        {/* <div className="w-10 h-10 rounded-full bg-violet-800"></div> */}
                        <Dropdown>
                            <DropdownTrigger>
                                <div className="w-10 h-10 rounded-full bg-violet-800"></div>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="static Actions">
                                <DropdownItem onClick={handleLogout} className="px-3 py-2 text-white text-xl bg-red-500 rounded-xl hover:bg-red-400 active:bg-red-300">LogOut</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        )
    }

    return ( 
        <div className="w-[98%] rounded-lg flex text-xl justify-center items-center bg-[#2B2B2B] z-10 sticky">
            <div className="w-11/12 flex h-full py-5 justify-between">
                <div>Pioneers-Sheets</div>
                <div className="flex gap-x-3">
                    <Link href='/signup'><span>SignUp</span></Link>
                    <Link href='/login'><span>LogIn</span></Link>
                </div>
            </div>
        </div>
        
     );
}


export default NavBarHome;