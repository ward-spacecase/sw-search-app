export const FetchPersonDetails = async (id) => {
    try {
        const url = `https://www.swapi.tech/api/people/${id}`
        const response = await fetch(url).then(res => res.json())
        console.log(response);
        return response;
    } catch (error) {
      console.log('Error', error);
    }
  };