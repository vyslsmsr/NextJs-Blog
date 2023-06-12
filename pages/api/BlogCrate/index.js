import axios from 'axios';

export const createBlog = (blogName, categoryID, languages, formData, accessToken) => {
  const dataList = languages.map((language) => {
    const languageId = language.langID;
    const blogSubName = formData[languageId]?.blogSubName || '';
    const shortText = formData[languageId]?.shortText || '';
    const summerNote = formData[languageId]?.summerNote || '';
    const title = formData[languageId]?.title || '';
    const description = formData[languageId]?.description || '';
    const url = formData[languageId]?.url || '';

    return {
      lang: languageId,
      blogSubName,
      shortText,
      summerNote,
      title,
      description,
      url
    };
  });

  return axios.post('https://localhost:7240/api/Blogs/BlogCreate', {
    blogName: blogName.toString(),
    categoryID: categoryID,
    dataList: dataList
  }, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });
};
