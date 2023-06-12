import axios from 'axios';

export const deleteData = async (accessTokenRef, blogID) => {
  try {
    const config = {
      headers: {
        'Authorization': `Bearer ${accessTokenRef.current}`
      }
    };

    await axios.delete(`https://localhost:7240/api/Blogs/BlogDelete/${blogID}`, config);
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
};
