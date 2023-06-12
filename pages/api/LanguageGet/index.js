import axios from 'axios';

export const fetchData = async (accessTokenRef, setLanguages, setActiveTab) => {
  try {
    const response = await axios.get('https://localhost:7240/api/Shared/LanguageGet', {
      headers: {
        'Authorization': `Bearer ${accessTokenRef.current}`
      }
    });
    setLanguages(response.data);
    if (response.data.length > 0) {
      setActiveTab(response.data[0].langID);
    }
  } catch (error) {
    console.error('GET hatası:', error);
  }
};
