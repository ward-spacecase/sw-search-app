export const FetchLocationDetails = async (url) => {
    try {
        const response = await fetch(url).then(res => res.json())
        console.log(response)
        return response;
    } catch (error) {
      console.error('Error', error);
    }
  };