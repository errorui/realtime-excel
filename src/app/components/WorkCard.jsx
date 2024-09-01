import Link from "next/link"

const WorkCard = ({work, onDelete, index}) => {
    return (
    <div class="relative grid md:h-[15rem] md:w-[400px] xs:h-[10rem] xs:w-full flex-col items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700">
    <div class="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-[url('https://res.cloudinary.com/dg5ddxvko/image/upload/v1725193085/SIH/dbWorkbench_kkkszy.png')] bg-cover bg-clip-border bg-center text-gray-700 shadow-none">
        <div class="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-t from-black/80 via-black/50"></div>
    </div>
    <div class="relative p-1 px-4 py-4 md:px-4">
    <Link href={`/workbench/${work.id}`} passHref>
        <h2 class="mb-4 block font-sans text-start md:text-3xl xs:text-xl font-medium leading-[1.5] tracking-normal text-white antialiased">
            {work.name}
        </h2>
    </Link>
        <button onClick={() => {onDelete(index)}} class="block bg-red-600 text-white bg-opacity-90 hover:bg-red-500 md:px-7 xs:px-3 rounded-md py-2 mb-4 font-sans text-xl antialiased font-semibold leading-snug tracking-normal">
            Delete
        </button>
    </div>
    </div>
);
}
 
export default WorkCard;