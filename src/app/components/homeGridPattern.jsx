'use client'
import React from "react";
import { useRouter } from "next/navigation";

export function GridPattern() {

    const router = useRouter()

  return (
    (<div
      className="lg:h-[40rem] sm:h-[30rem] w-[70%] dark:bg-black bg-black  dark:bg-grid-white/[0.2] bg-grid-white/[0.4] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div
        className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>
      <div className="flex flex-col text-center font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
        <div className="2xl:text-[80px] xl:text-[60px] lg:text-[50px] md:text-[35px] sm:text-[28px] xs:text-[22px]">Pioneers-Sheets</div> 
        <div className="2xl:text-[54px] xl:text-[44px=] lg:text-[34px] md:text-[25px] sm:text-[20px] xs:text-[16px]">Pioneers</div>
        <div className="flex h-[100px] justify-center items-center">
            <button className="bg-white rounded-xl px-3 py-2 max-w-[300px] w-7/12 place-self-center text-xl text-black hover:border hover:border-black hover:text-white shadow-black transition-all ease-in-out shadow-md hover:shadow-white backdrop-blur-sm   hover:bg-black/60 bg-opacity-60" onClick={() => {router.push('/signup')}}>Get Started</button>
        </div>
      </div>
    </div>)
  );
}













// const GridPattern = () => {
//     const gridContainerStyle = {
//         width: '80vw',
//         height: '75vh',
//         display: 'grid',
//         gridTemplateColumns: 'repeat(20, 1fr)',
//         gridTemplateRows: 'repeat(10, 1fr)',
//         gap: '20px',
//       };
    
//       // Inline styles for each grid item
//       const gridItemStyle = {
//         position: 'relative',
//         width: '50%',
//         height: '50%',
//       };
    
//       // Inline styles for the pseudo-elements (lines)
//       const lineStyleBefore = {
//         content: '""',
//         position: 'absolute',
//         top: '50%',
//         left: '0',
//         right: '0',
//         height: '1px',
//         backgroundColor: '#444',
//         transform: 'translateY(-50%)',
//       };
    
//       const lineStyleAfter = {
//         content: '""',
//         position: 'absolute',
//         top: '0',
//         bottom: '0',
//         left: '50%',
//         width: '1px',
//         backgroundColor: '#444',
//         transform: 'translateX(-50%)',
//       };
    
//       return (
//         <div className="border border-white rounded-xl border-opacity-30" style={gridContainerStyle}>
//           {Array.from({ length: 200 }).map((_, index) => (
//             <div key={index} style={gridItemStyle}>
//               <div style={lineStyleBefore}></div>
//               <div style={lineStyleAfter}></div>
//             </div>
//           ))}
//         </div>
//       );
//     };
 
// export default GridPattern;