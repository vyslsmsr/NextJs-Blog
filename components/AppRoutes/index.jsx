import React from 'react'
import { useRouter } from "next/router";

const Index = () => {
    const router = useRouter();

    const handleMenuClick = (route) => {
        router.push(route);
    };

  

   
    return (
        <div className='h-screen w-40 overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 md:h-[calc(100vh-136px)] rounded-[1rem] my-5 ml-5 shadow-2xl '>
            <nav className="px-5 py-3">
                <ul className="space-y-4">
                    <li className='text-white'>
                        <button className='bg-gradient-to-br from-pink-500 to-red-600 w-full p-1'  onClick={() => handleMenuClick("/admin/dashboard")}>Dashboard</button>
                    </li>
                    <li className="text-[1rem] text-white uppercase hover:text-primary cursor-pointer">
                        <button  onClick={() => handleMenuClick("/Bloglist_")}>Blog List</button>
                    </li>
                    <li className="text-[1rem] text-white uppercase hover:text-primary cursor-pointer">
                        <button  onClick={() => handleMenuClick("/About_")}>About</button>
                    </li>
                    <li className="text-[1rem] text-white uppercase hover:text-primary cursor-pointer">
                        <button  onClick={() => handleMenuClick("/About_")}>Dil Ayarları</button>
                    </li>
                    <li className="text-[1rem] text-white uppercase hover:text-primary cursor-pointer">
                        <button  onClick={() => handleMenuClick("/Categorylist")}>Kategori liste</button>
                    </li>
                    <li className="text-[1rem] text-white uppercase hover:text-primary cursor-pointer">
                        <button  onClick={() => handleMenuClick("/About_")}>İletişim</button>
                    </li>
                    <li className="text-[1rem] text-white uppercase hover:text-primary cursor-pointer">
                        <button  onClick={() => handleMenuClick("/About_")}>Slider</button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Index