import React, { useState, useEffect, useRef } from 'react';
import DashboardPage from '../admin/dashboard';
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import Link from "next/link";
import swal from 'sweetalert';
import{fetchData} from "../api/Categorilist/index.js"
import { handleDelete } from '../api/CategoryDeleted/index.js';



const CategoryPage = () => {
  const [dataList, setDataList] = useState([]);
  const accessTokenRef = useRef(null);

  useEffect(() => {
    accessTokenRef.current = sessionStorage.getItem('token');
  }, []);


  useEffect(() => {
    fetchData(accessTokenRef, setDataList);
  }, []);


  const handleConfirmDelete = (id) => {
    swal({
      title: 'Emin misiniz?',
      text: 'Bu veriyi silmek istediğinizden emin misiniz?',
      icon: 'warning',
      buttons: ['Hayır', 'Evet'],
      dangerMode: true,
    }).then((confirmed) => {
      if (confirmed) {
        handleDelete(id, accessTokenRef);
      }
    });
  };

  return (
    <>
      <div className='my-5 bg-slate-700 py-3 px-3'>
        <h3 className='text-white font-bold'>Kategori Listesi</h3>
      </div>
      <div className="container mx-auto">
        <div className="flex">
          <div className="w-full pl-[3rem] relative">
            <table className="table-fixed w-full">
              <thead>
                <tr className='mb-3'>
                  <th className='flex justify-start'>#</th>
                  <th className='justify-center'>Kategori Adı</th>
                  <th className='justify-center'>Kategori Durum</th>
                  <th className='justify-center'>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {dataList.map((item, index) => (
                  <tr key={item.categoryID}>
                    <td className='mt-5'>{index + 1}</td>
                    <td className='text-center mt-5'>{item.categorySubName}</td>
                    <td className='text-center mt-5'>{item.status == true ? "Aktif" : "Pasif"}</td>
                    <td className='text-center mt-5 flex justify-center'>
                      <Link className='mx-3 text-[1.5rem]' href={`/Categorydetail/${item.categoryID}`}><FaEdit /></Link>
                      <button onClick={() => handleConfirmDelete(item.categoryID)}><FaTrashAlt/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='fixed right-16 bottom-16 bg-slate-700 text-center rounded-full h-[4rem] w-[4rem] flex justify-center items-center'>
              <Link className='text-[2rem] text-white' href="/Categorycreate"><FaEdit /></Link>
            </div>
          </div>
        </div>
        <div>

        </div>
      </div>
    </>
  )



}


const index = () => {
  return (
    <DashboardPage>
      <CategoryPage />
    </DashboardPage>
  )
}

export default index