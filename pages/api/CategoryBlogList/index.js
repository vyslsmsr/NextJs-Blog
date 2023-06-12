import axios from 'axios';

export const fetchDataBlogList = async (accessTokenRef,setCateBlogs) => {
  try {
    const response = await axios.get('https://localhost:7240/api/Category/CategoryBlogList', {
      headers: {
        'Authorization': `Bearer ${accessTokenRef.current}`
      }
    });
    setCateBlogs(response.data);
  } catch (error) {
    console.error('GET hatası:', error);
  }
};


