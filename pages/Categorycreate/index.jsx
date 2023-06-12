import React, { useState, useEffect, useRef } from 'react';
import DashboardPage from '../admin/dashboard';
import { Button } from "@nextui-org/react";
import { fetchData } from '../api/LanguageGet/index.js';
import { handleSubmit } from '../api/CategoryCreate/index.js';



const CategoryCreate = () => {
    const [activeTab, setActiveTab] = useState('');
    const [formData, setFormData] = useState({});
    const [categoryName, setCategoryName] = useState('');
    const [languages, setLanguages] = useState([]);
    const accessTokenRef = useRef(null);
    
    useEffect(() => {
        accessTokenRef.current = sessionStorage.getItem('token');
    }, []);

    useEffect(() => {
        fetchData(accessTokenRef, setLanguages, setActiveTab);
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

    const handleBlogNameChange = (e) => {
        setCategoryName(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleSubmit(categoryName, languages, formData, accessTokenRef);
      };

    return(
       <div className='bg-white my-5 ml-5 shadow-[#7a7a7a] '>
            <div className='container mx-auto'>
                <div className="flex flex-row">
                    <div className=' bg-slate-700 py-3 px-3 w-full mx-auto'>
                        <h3 className='text-white font-bold'>Kategory Oluştur</h3>
                    </div>
                </div>
            </div>      
            <div className='container w-full p-5'>
                <div>
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-group flex flex-col">
                            <label className='font-bold mb-3 text-[1.1rem]' htmlFor={`categoryName`}>Kategori Adı</label>
                            <input
                                className='placeholder:italic placeholder:text-slate-400 block bg-white w-96  border border-slate-300 rounded-md py-2 pl-4 pr-3 mb-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
                                type="text"
                                name="categoryName"
                                placeholder="Kategori Adı"
                                value={categoryName}
                                onChange={handleBlogNameChange}
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
                                    <input
                                        className='placeholder:italic placeholder:text-slate-400 block bg-white w-96 border border-slate-300 rounded-md py-2 pl-4 pr-3 mb-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
                                        type="text"
                                        name={`categorySubName_${language.langID}`}
                                        placeholder="Alt İsim"
                                        onChange={(e) => handleInputChange(e, language.langID)}
                                    />
                                </div>
                            </div>
                        ))}
                        <Button type="submit" shadow color="success" auto>Kaydet</Button>
                    </form>
                </div>
            </div>
        </div>
    )

}

const index = () => {
    return (
        <DashboardPage>
            <CategoryCreate />
        </DashboardPage>
    )
}

export default index