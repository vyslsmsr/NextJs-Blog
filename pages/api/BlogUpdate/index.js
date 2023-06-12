import axios from 'axios';

export const updateBlog = async (id, blogData, accessToken) => {
    try {
      const response = await axios.put(`https://localhost:7240/api/Blogs/BlogUpdate/${id}`, blogData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
  
      return response.data;
    } catch (error) {
      console.error('Blog güncelleme hatası:', error);
      throw error;
    }
  };
