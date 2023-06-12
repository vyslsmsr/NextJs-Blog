import axios from 'axios';

export const fetchDataBlog = async (accessTokenRef, setDataList) => {
  try {
    const response = await axios.get('https://localhost:7240/api/Blogs/GetBlogsWithCategory', {
      headers: {
        'Authorization': `Bearer ${accessTokenRef.current}`
      }
    });
    const jsonData = response.data;
    setDataList(jsonData);
  } catch (error) {
    console.error('Hata:', error);
  }
};