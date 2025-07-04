
// export const getApi = async (url) => {
//   try {
//     const response = await fetch(url);
//     if (!response.ok) throw new Error('API request failed');
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('getApi error:', error.message);
//     throw error;
//   }
// };


export const getApi = async (url, body) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) throw new Error('POST request failed');

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('postApi error:', error.message);
    throw error;
  }
};

export const postApiFormData = async (url, body) => {
  try {
    const formData = new FormData();
    for (let key in body) {
      formData.append(key, body[key]);
    }

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('POST failed');

    const data = await response.json(); 
    return data;
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
};
