import axios from 'axios';
import swal from 'sweetalert';

export const handleSubmit = async (categoryName, languages, formData, accessTokenRef) => {
  try {
    const dataList = languages.map((language) => {
      const languageId = language.langID;
      const categorySubName = formData[languageId]?.categorySubName || '';

      return {
        lang: languageId,
        categorySubName
      };
    });

    const response = await axios.post('https://localhost:7240/api/Category/CategoryAdd', {
      categoryName: categoryName.toString(),
      dataList: dataList
    }, {
      headers: {
        'Authorization': `Bearer ${accessTokenRef.current}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.data === 'Ok') {
      swal(response.data, 'You clicked the button!', 'success');
      setTimeout(function () {
        window.location.href = 'http://localhost:3000/Categorylist';
      }, 2000);
    } else {
      swal(response.data, 'You clicked the button!', 'error');
    }
  } catch (error) {
    console.error('POST hatası:', error);
  }
};
