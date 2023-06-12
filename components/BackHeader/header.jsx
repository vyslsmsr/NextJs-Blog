import React from 'react'
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const handleLogout = () => {
    sessionStorage.clear();
    router.push("/admin");
  };
  return (
    <div className="w-full mx-auto  md:h-[3rem] px-[5rem] content-center ">
      <div className='w-full  mx-[2rem]  bg-gradient-to-br from-gray-800 to-gray-900 flex justify-between px-[2rem] rounded-[1rem] mt-[1rem] '>
        <div className="h-[3rem] flex justify-start items-center col-span-6 content-center">
          <label className="text-white">Logo</label>
        </div>
        <div className="h-[3rem] flex justify-start items-center  col-span-5 content-center ">
          <button className="text-white" onClick={handleLogout}>Çıkış Yap</button>
        </div>
      </div>

    </div>

  )
}

export default Header