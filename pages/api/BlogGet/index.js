import axios from 'axios';

export const fetchDataBlogGet = async (accessTokenRef, id, setValue, setBlogName) => {
  try {
    const response = await axios.get(`https://localhost:7240/api/Blogs/GetBlog/${id}`, {
      headers: {
        'Authorization': `Bearer ${accessTokenRef.current}`
      }
    });
    const blogData = response.data.blogModel;

    setBlogName(blogData[1].blogName);
    Object.keys(blogData).forEach((langID) => {
      const langData = blogData[langID];
      if (langData) {
        setValue(`blogSubName_${langID}`, langData.blogSubName || '');
        setValue(`shortText_${langID}`, langData.shortText || '');
        setValue(`summerNote_${langID}`, langData.summerNote || '');
        setValue(`title_${langID}`, langData.title || '');
        setValue(`description_${langID}`, langData.description || '');
        setValue(`url_${langID}`, langData.url || '');
      }
    });
  } catch (error) {
    console.error('Blog verisi alınırken bir hata oluştu:', error);
  }
};
