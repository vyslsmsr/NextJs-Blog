import axios from 'axios';



export const fetchCategoryData = async (id, accessToken, setCategoryName,setValue) => {

  if (id) {
    try {
      const response = await axios.get(`https://localhost:7240/api/Category/GetCategoryList/${id}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const categoryData = response.data.categoryModel;

      setCategoryName(categoryData[1].categoryName);
      Object.keys(categoryData).forEach((langID) => {
        const langData = categoryData[langID];
        if (langData) {
          setValue(`categorySubName_${langID}`, langData.categorySubName || '');
        }
      });
    } catch (error) {
      console.error('Blog verisi alınırken bir hata oluştu:', error);
    }
  }
};