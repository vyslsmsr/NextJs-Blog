import React, { useState, useEffect, useRef } from 'react';
import DashboardPage from '../admin/dashboard';
import { FaTrashAlt, FaEdit, FaImages } from "react-icons/fa";
import Link from "next/link";
import swal from 'sweetalert';
import { fetchDataBlog } from '../api/BlogCategoryGet/index.js';
import { deleteData } from '../api/BlogDelete/index.js';
import axios from 'axios';




const BlogPage = () => {
  const [dataList, setDataList] = useState([]);
  const accessTokenRef = useRef(null);

  useEffect(() => {
    accessTokenRef.current = sessionStorage.getItem('token');
  }, []);


  // get blog list
  useEffect(() => {
    fetchDataBlog(accessTokenRef, setDataList);
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
        handleDelete(id);
      }
    });
  };

  // delete 
  const handleDelete = async (blogID) => {
    await deleteData(accessTokenRef, blogID);
  };


  /// resim ekleme işlemi
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    const url = URL.createObjectURL(event.target.files[0]);
    setImageUrl(url);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      console.log('No file selected.');
      return;
    }

    try {
      const formData = new FormData();
      const randomString = generateRandomString(5); // random hafrleri burada ekledik 5 karakterliş
      const newFileName = randomString + selectedFile.name; // random ile resim adını birleştirdik
      formData.append('file', selectedFile, newFileName);
      formData.append('blogID', blogID);

      // Dosyayı belirtilen uç noktaya gönderme
      const accessToken = accessTokenRef.current; // token giriş anahtarı
      const response = await axios.post(
        'https://localhost:7240/api/Blogs/Upload',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        console.log('File uploaded successfully.');
        pictureSave(formData);
        handleCloseModal();

      } else {
        console.log('Error uploading file:', response.status);

      }
    } catch (error) {
      console.log('An error occurred:', error);
    }
  };

  // Rastgele harf random oluşturma
  const generateRandomString = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const pictureSave = async (formData) => { // resmi dosya konumuna kaydettik
    const response1 = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
  };

  /// resim ekleme işlemi



// modal işlemleri
  const [blogID, setBlogID] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);


  const handleButtonClick = (id) => {
    setBlogID(id);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setBlogID(null);
    setModalVisible(false);
  };



  return (
    <>
      <div className='my-5 bg-slate-700 py-3 px-3'>
        <h3 className='text-white font-bold'>Blog Listesi</h3>
      </div>
      <div className="container mx-auto">
        <div className="flex">
          <div className="w-full pl-[3rem] relative">
            <table className="table-fixed w-full">
              <thead>
                <tr className='mb-3'>
                  <th className='flex justify-start'>#</th>
                  <th className='justify-center'>Resim</th>
                  <th className='justify-center'>Blog Adı</th>
                  <th className='justify-center'>Blog Kısa Ad</th>
                  <th className='justify-center'>Blog Kısa Açıklama</th>
                  <th className='justify-center'>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {dataList.map((item, index) => (
                  <tr key={item.blogID}>
                    <td className='mt-5'>{index + 1}</td>
                    <td className='text-center mt-5'><button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleButtonClick(item.blogID)}><FaImages /></button>
                    </td>
                    <td className='text-center mt-5'>{item.blogName}</td>
                    <td className='text-center mt-5'>{item.blogSubName}</td>
                    <td className='text-center mt-5'>{item.shortText}</td>
                    <td className='text-center mt-5 flex justify-center'>
                      <Link className='mx-3 text-[1.5rem]' href={`/Blogdetail/${item.blogID}`}><FaEdit /></Link>
                      <button onClick={() => handleConfirmDelete(item.blogID)}><FaTrashAlt /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='fixed right-16 bottom-16 bg-slate-700 text-center rounded-full h-[4rem] w-[4rem] flex justify-center items-center'>
              <Link className='text-[2rem] text-white' href="/Blogcreate_"><FaEdit /></Link>
            </div>
          </div>
        </div>

        {modalVisible && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#00000075]">
            <div className="bg-white rounded-lg p-6 h-72 w-1/3">
              <div>
                <label>Resim Ekleme</label>
                </div>
              <div className="mb-4 h-40">
                <div className=''>
                  <form className='m-3' onSubmit={handleFormSubmit}>
                    <div className="flex items-center justify-center w-full">
                      <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg aria-hidden="true" className="w-5 h-5 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
                      </label>
                    </div>
                    <div className='mt-5'>
                      <button className='text-white bg-green-700 hover:bg-green-800 focus:outline-none font-bold focus:ring-4 focus:ring-green-300  rounded text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800' type="submit">Upload</button>
                      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleCloseModal} > İptal </button>
                    </div>
                  </form>
                </div>
                {/* {imageUrl && <img src={imageUrl} alt="Selected File" />} */}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
};

const Index = () => {
  return (
    <DashboardPage>
      <BlogPage />
    </DashboardPage>
  )
}

export default Index