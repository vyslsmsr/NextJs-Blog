import axios from 'axios';

export const handleDelete = async (categoryID, accessTokenRef) => {
  try {
    const config = {
      headers: {
        'Authorization': `Bearer ${accessTokenRef.current}`
      }
    };

    await axios.delete(`https://localhost:7240/api/Category/BlogCategoryDelete/${categoryID}`, config);
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
};
