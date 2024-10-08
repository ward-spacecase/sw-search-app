// lowercase api functions
export const FetchPeople = async (name) => {
    try {
        const url = `https://www.swapi.tech/api/people/?name=${name}`
        const response = await fetch(url).then(res => res.json())
        return response;
    } catch (error) {
      console.error('Error', error);
    }
  };