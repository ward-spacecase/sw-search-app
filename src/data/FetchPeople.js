export const FetchPeople = async (name) => {
    try {
        const url = `https://www.swapi.tech/api/people/?name=${name}`
        const response = await fetch(url).then(res => res.json())
        console.log(response);
        return response;
    } catch (error) {
      console.log('Error', error);
    }
  };