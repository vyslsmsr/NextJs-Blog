import React, { useState, useEffect, useRef } from 'react';
import DashboardPage from '../admin/dashboard';
import { Button } from "@nextui-org/react";
import swal from 'sweetalert';
import { Select, Input  } from 'antd';
import { fetchData } from '../api/LanguageGet/index.js';
import { fetchDataBlogList } from '../api/CategoryBlogList/index.js';
import { createBlog } from '../api/BlogCrate/index.js';



const BlogCreate = () => {
    const [activeTab, setActiveTab] = useState('');
    const [formData, setFormData] = useState({});
    const [blogName, setBlogName] = useState('');
    const [languages, setLanguages] = useState([]);
    const [cateBlogs, setCateBlogs] = useState([]);
    const [categoryID, setCategoryID] = useState('');
    const accessTokenRef = useRef(null);

    useEffect(() => {
        accessTokenRef.current = sessionStorage.getItem('token');
    }, []);

     // dil
     useEffect(() => {
        fetchData(accessTokenRef, setLanguages, setActiveTab);
      }, []);

      // kategori listeledik
      useEffect(() => {
        fetchDataBlogList(accessTokenRef, setCateBlogs);
      }, []);


    const handleInputChange = (e, languageId) => {
        const { name, value } = e.target;
        const field = name.split('_')[0]; // Örneğin, "blogSubName_1" -> "blogSubName"
        setFormData((prevData) => ({
            ...prevData,
            [languageId]: {
                ...prevData[languageId],
                [field]: value,
            },
        }));
    };
   

      const onSecondVategoryChange = (selectedOption) => {
        setCategoryID(selectedOption);
      };


    const handleBlogNameChange = (e) => {
        setBlogName(e.target.value);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
    
        createBlog(blogName, categoryID, languages, formData, accessTokenRef.current)
          .then((response) => {
            if (response.data === 'Ok') {
              swal(response.data, 'You clicked the button!', 'success');
              setTimeout(function () {
                window.location.href = 'http://localhost:3000/Bloglist_';
              }, 2000);
            } else {
              swal(response.data, 'You clicked the button!', 'error');
            }
          })
          .catch((error) => {
            console.error('POST hatası:', error);
          });
      };

    return (
        <div className='bg-white my-5 ml-5 shadow-[#7a7a7a] '>
            <div className='container mx-auto'>
                <div className="flex flex-row">
                    <div className=' bg-slate-700 py-3 px-3 w-full mx-auto'>
                        <h3 className='text-white font-bold'>Blog Oluştur</h3>
                    </div>
                </div>
            </div>
            <div className='container w-full p-5'>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group flex flex-col">
                            <label className='font-bold mb-3 text-[1.1rem]' htmlFor={`blogName`}>Blog Adı</label>
                            <Input 
                                required
                                autoComplete='off'
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
                                id={`tab-${language.langID}-content`}
                                className={`mt-4 ${activeTab === language.langID ? 'block' : 'hidden'}`}
                            >
                                <div className="form-group">
                                    <label className='font-bold mb-3 text-[1.1rem]' htmlFor={`blogSubName_${language.langID}`}>Alt İsim</label>
                                    <Input 
                                        required
                                        autoComplete='off'
                                        type="text"
                                        name={`blogSubName_${language.langID}`}
                                        placeholder="Alt İsim"
                                        onChange={(e) => handleInputChange(e, language.langID)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className='font-bold mb-3 text-[1.1rem]' htmlFor={`shortText_${language.langID}`}>Kısa Metin</label>
                                    <textarea
                                        className="w-full h-20 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                                        name={`shortText_${language.langID}`}
                                        placeholder="Kısa Metin"
                                        onChange={(e) => handleInputChange(e, language.langID)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className='font-bold mb-3 text-[1.1rem]' htmlFor={`summerNote_${language.langID}`}>Yazı</label>
                                    <textarea
                                        className="w-full h-20 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                                        name={`summerNote_${language.langID}`}
                                        placeholder="Yazı"
                                        onChange={(e) => handleInputChange(e, language.langID)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className='font-bold mb-3 text-[1.1rem]' htmlFor={`title_${language.langID}`}>Başlık</label>
                                    <Input 
                                        autoComplete='off'
                                        type="text"
                                        name={`title_${language.langID}`}
                                        placeholder="Başlık"
                                        onChange={(e) => handleInputChange(e, language.langID)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className='font-bold mb-3 text-[1.1rem]' htmlFor={`description_${language.langID}`}>Açıklama</label>
                                    <Input 
                                        autoComplete='off'
                                        type="text"
                                        name={`description_${language.langID}`}
                                        placeholder="Açıklama"
                                        onChange={(e) => handleInputChange(e, language.langID)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className='font-bold mb-3 text-[1.1rem]' htmlFor={`url_${language.langID}`}>Url</label>
                                    <Input 
                                        autoComplete='off'
                                        type="text"
                                        name={`url_${language.langID}`}
                                        placeholder="URL"
                                        onChange={(e) => handleInputChange(e, language.langID)}
                                    />
                                </div>
                            </div>
                        ))}
                        <Button className='mt-5' type="submit" shadow color="success" auto>Kaydet</Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const index = () => {
    return (
        <DashboardPage>
            <BlogCreate />
        </DashboardPage>
    );
};

export default index;
