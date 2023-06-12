import axios from 'axios';


export async function fetchData(accessTokenRef, setDataList) {
  try {
    const response = await axios.get('https://localhost:7240/api/Category/CategoryList', {
      headers: {
        'Authorization': `Bearer ${accessTokenRef.current}`
      }
    });
    const jsonData = response.data;
    setDataList(jsonData);
  } catch (error) {
    console.error('Hata:', error);
  }
}
