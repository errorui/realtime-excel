import AvatarStack from '@/app/components/AvatarStack'
import React from 'react'
const avatars = [
  {  alt: 'User 1' },
  {  alt: 'User 1' },
  {  alt: 'User 1' },
  {  alt: 'User 1' },
  
  
  
];
const page = () => {
  return (
    <>
    <div className="w-full flex justify-between items-center px-2 py-4" >
      <h1>LOGO</h1>
      <AvatarStack avatars={avatars}></AvatarStack>
    </div>
    <div>roomid</div>
    </>
    
  )
}

export default page