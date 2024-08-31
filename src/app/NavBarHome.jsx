'use client'

import Link from "next/link"
import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownSection,  DropdownItem} from "@nextui-org/dropdown";
import { AuthContext, useAuth } from "../../context/auth"
import { useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const API_URL = 'http://localhost:4002'

const NavBarHome = () => {

    const {user, setUser} = useContext(AuthContext)
    const router = useRouter()

    const handleLogout = async () => {
        try {
          await axios.get(`${API_URL}/api/user/logout`, {withCredentials: true});
          setUser(null); //Reset user state
          router.push('/')
        } catch (error) {
          console.error('Logout failed', error)
        }
      }
    console.log(user)

    if(user){
        return(
            <div className="w-[98%] rounded-lg flex text-xl justify-center items-center bg-[#2B2B2B]">
                <div className="w-11/12 flex h-full py-5 justify-between">
                    <div className="flex justify-center items-center">Pioneers-Sheets</div>
                    <div className="flex justify-center items-center gap-x-3">
                        <Link href="/workbench"><span>Wrokbench</span></Link>
                        <Link href="/chart"><span>GenerateCharts</span></Link>
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
        <div className="w-[98%] rounded-lg flex text-xl justify-center items-center bg-[#2B2B2B]">
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