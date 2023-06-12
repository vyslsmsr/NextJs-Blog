import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import DashboardPage from '../admin/dashboard';
import { Button } from "@nextui-org/react";
import swal from 'sweetalert';
import { Select, Input  } from 'antd';
import { fetchData } from '../api/LanguageGet/index.js';
import { fetchDataBlogList } from '../api/CategoryBlogList/index.js';
import { updateBlog } from '../api/BlogUpdate/index.js';
import { fetchDataBlogGet } from '../api/BlogGet/index.js';

const BlogDetail = () => {
  const [activeTab, setActiveTab] = useState('');
  const [blogName, setBlogName] = useState('');
  const [languages, setLanguages] = useState([]);
  const [categoryID, setCategoryID] = useState('');
  const [cateBlogs, setCateBlogs] = useState([]);

  const { handleSubmit, register, setValue } = useForm();

  const router = useRouter();
  const { id } = router.query;

  const accessTokenRef = useRef(null);
  useEffect(() => {
    accessTokenRef.current = sessionStorage.getItem('token');
  }, []);

 
 // get languages
 useEffect(() => {
  fetchData(accessTokenRef, setLanguages, setActiveTab);
}, []);

// get category list
useEffect(() => {
  fetchDataBlogList(accessTokenRef, setCateBlogs);
}, []);

// get blog
useEffect(() => {
  if (id) {
    fetchDataBlogGet(accessTokenRef, id, setValue, setBlogName);
  }
}, [id, setValue, setBlogName]);

 

  const onSecondVategoryChange = (selectedOption) => {
    setCategoryID(selectedOption);
  };


  const handleBlogNameChange = (event) => {
    const value = event.target.value;
    setBlogName(value);
  };
  // blog updated post
  const onSubmit = async (data) => {
    try {
      const blogData = {
        blogName: blogName,
        categoryID: categoryID,
        blogData: languages.map((language) => {
          const langID = parseInt(language.langID);
          return {
            langID: langID,
            blogSubName: data[`blogSubName_${langID}`],
            description: data[`description_${langID}`],
            shortText: data[`shortText_${langID}`],
            summerNote: data[`summerNote_${langID}`],
            title: data[`title_${langID}`],
            url: data[`url_${langID}`]
          };
        })
      };
  
      const response = await updateBlog(id, blogData, accessTokenRef.current);
      if (response === 'Blog güncellendi.') {
        swal(response, 'You clicked the button!', 'success');
        setTimeout(function () {
          window.location.href = 'http://localhost:3000/Bloglist_';
        }, 2000);
      } else {
        swal(response, 'You clicked the button!', 'error');
      }
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
              <label className='font-bold mb-3 text-[1.1rem]' htmlFor={`blogName`}>Blog Adı</label>
              <input
                className='placeholder:italic placeholder:text-slate-400 block bg-white w-96  border border-slate-300 rounded-md py-2 pl-4 pr-3 mb-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
                type="text"
                name="blogName"
                placeholder="İsim"
                value={blogName}
                onChange={handleBlogNameChange}
              />
            </div>
            <div className="form-group flex flex-col">
              <label className='font-bold mb-3 text-[1.1rem]' htmlFor={`blogName`}>Kategori Adı</label>
              <Select
                style={{ width: 180 }}
                onChange={onSecondVategoryChange}
                value={categoryID}
                options={cateBlogs.map((item) => ({ label: item.categoryName, value: item.categoryID }))}
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
                  <label className='font-bold mb-3 text-[1.1rem]' htmlFor={`blogSubName_${language.langID}`}>Alt Başlık</label>
                  <input
                    className='placeholder:italic placeholder:text-slate-400 block bg-white w-96 border border-slate-300 rounded-md py-2 pl-4 pr-3 mb-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
                    type="text"
                    name={`blogSubName_${language.langID}`}
                    placeholder="Alt Başlık"
                    {...register(`blogSubName_${language.langID}`)}
                  />
                </div>
                <div className='form-group flex flex-col'>
                  <label className='font-bold mb-3 text-[1.1rem]' htmlFor={`shortText_${language.langID}`}>Kısa Metin</label>
                  <textarea
                    className="w-full h-20 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                    name={`shortText_${language.langID}`}
                    rows="4"
                    placeholder="Kısa Metin"
                    {...register(`shortText_${language.langID}`)}
                  ></textarea>
                </div>
                <div className='form-group flex flex-col'>
                  <label className='font-bold mb-3 text-[1.1rem]' htmlFor={`summerNote_${language.langID}`}>Yazı İçeriği</label>
                  <textarea
                    className="w-full h-20 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                    name={`summerNote_${language.langID}`}
                    rows="4"
                    placeholder="Yazı İçeriği"
                    {...register(`summerNote_${language.langID}`)}
                  ></textarea>
                </div>
                <div className='form-group flex flex-col'>
                  <label className='font-bold mb-3 text-[1.1rem]' htmlFor={`title_${language.langID}`}>Meta Başlık</label>
                  <input
                    className='placeholder:italic placeholder:text-slate-400 block bg-white w-96  border border-slate-300 rounded-md py-2 pl-4 pr-3 mb-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
                    type="text"
                    name={`title_${language.langID}`}
                    placeholder="Meta Başlık"
                    {...register(`title_${language.langID}`)}
                  />
                </div>
                <div className='form-group flex flex-col'>
                  <label className='font-bold mb-3 text-[1.1rem]' htmlFor={`description_${language.langID}`}>Meta Açıklama</label>
                  <input
                    className='placeholder:italic placeholder:text-slate-400 block bg-white w-96  border border-slate-300 rounded-md py-2 pl-4 pr-3 mb-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
                    name={`description_${language.langID}`}
                    rows="4"
                    placeholder="Meta Açıklama"
                    {...register(`description_${language.langID}`)}
                  />
                </div>
                <div className='form-group flex flex-col'>
                  <label className='font-bold mb-3 text-[1.1rem]' htmlFor={`url_${language.langID}`}>URL</label>
                  <input
                    className='placeholder:italic placeholder:text-slate-400 block bg-white w-96  border border-slate-300 rounded-md py-2 pl-4 pr-3 mb-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
                    type="text"
                    name={`url_${language.langID}`}
                    placeholder="URL"
                    {...register(`url_${language.langID}`)}
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
  );
};


const index = () => {
  return (
    <DashboardPage>
      <BlogDetail />
    </DashboardPage>
  )
}

export default index;


