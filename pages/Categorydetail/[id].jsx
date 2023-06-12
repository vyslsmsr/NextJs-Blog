import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import DashboardPage from '../admin/dashboard';
import { Button } from "@nextui-org/react";
import swal from 'sweetalert';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { fetchData } from '../api/LanguageGet/index.js';


import { fetchCategoryData } from '../api/CategoryGet/index.js';


const CategoryDetail = () => {
    const [activeTab, setActiveTab] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [languages, setLanguages] = useState([]);
    const accessTokenRef = useRef(null);

    const { handleSubmit, register, setValue } = useForm();
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        accessTokenRef.current = sessionStorage.getItem('token');
    }, []);

    // dil
    useEffect(() => {
      fetchData(accessTokenRef, setLanguages, setActiveTab);
    }, []);

    // detay
    useEffect(() => {
      const accessToken = accessTokenRef.current;
      fetchCategoryData(id, accessToken, setCategoryName,setValue);
    }, [id]);

      const handlecategoryNameChange = (event) => {
        const value = event.target.value;
        setCategoryName(value);
      };
    
      //update
      const onSubmit = async (data) => {
        try {
          const categoryData = {
            categoryName: categoryName,
            categoryData: languages.map((language) => {
              const langID = parseInt(language.langID);
              return {
                langID: langID,
                categorySubName: data[`categorySubName_${langID}`]
              };
            })
          };
          const response = await axios.put(`https://localhost:7240/api/Category/CategoryUpdate/${id}`, categoryData, {
            headers: {
              'Authorization': `Bearer ${accessTokenRef.current}`,
              'Content-Type': 'application/json'
            }
          });    
          if (response.data == "Blog güncellendi.") {
            swal(response.data, "You clicked the button!", "success");
            setTimeout(function () {
                window.location.href = "http://localhost:3000/Categorylist";
            }, 2000);
        }
        else swal(response.data, "You clicked the button!", "error");    
        } catch (error) {
          console.error('Blog güncelleme hatası:', error);
        }
      };
    

  return (
    <div className='bg-white my-5 shadow-[#7a7a7a] md:h-[calc(100vh-136px)] overflow-y-scroll'>
      <div className='container mx-auto'>
        <div className="flex flex-row">
          <div className=' bg-slate-700 py-3 px-3 w-full mx-auto'>
            <h3 className='text-white font-bold'>Blog Güncelle</h3>
          </div>
        </div>
      </div>

      <div className='container w-full p-5'>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group flex flex-col">
              <label className='font-bold mb-3 text-[1.1rem]' htmlFor={`categoryName`}>Blog Adı</label>
              <input
                className='placeholder:italic placeholder:text-slate-400 block bg-white w-96  border border-slate-300 rounded-md py-2 pl-4 pr-3 mb-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
                type="text"
                name="categoryName"
                placeholder="İsim"
                value={categoryName}
                onChange={handlecategoryNameChange}
              />
            </div>
            <div className='mt-3 border-b-2 border-b-black'>
              <label className='text-[1.5rem]'>Dil Çevirileri</label>
            </div>
            <ul className="flex w-auto border-b-2 border-b-slate-100 ">
              {languages.map((language) => (
                <li
                  key={language.langID}
                  className={`mr-4 py-3 ${activeTab === language.langID ? 'font-bold border-b-2 border-b-teal-300' : ''}`}
                  onClick={() => setActiveTab(language.langID)}>
                  <a href={`#${language.langID}`}>{language.langName}</a>
                </li>
              ))}
            </ul>

            {languages.map((language) => (
              <div
                key={language.langID}
                id={language.langID}
                className={`mt-4 ${activeTab === language.langID ? '' : 'hidden'}`}>
                <div className='form-group'>
                  <label className='font-bold mb-3 text-[1.1rem]' htmlFor={`categorySubName_${language.langID}`}>Alt Başlık</label>
                  <input
                    className='placeholder:italic placeholder:text-slate-400 block bg-white w-96 border border-slate-300 rounded-md py-2 pl-4 pr-3 mb-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
                    type="text"
                    name={`categorySubName_${language.langID}`}
                    placeholder="Alt Başlık"
                    {...register(`categorySubName_${language.langID}`)}
                  />
                </div>
              </div>
            ))}

            <div className='flex justify-start mt-5'>
              <Button type="submit" shadow color="success" auto>Güncelle</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}


const index = () => {
    return (
      <DashboardPage>
        <CategoryDetail />
      </DashboardPage>
    )
  }
  
  export default index;
  