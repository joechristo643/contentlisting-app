  
  /**
* Fetch data drom API for each page
* @param {Number} pageNo
*/
function fetchDataApi({url,pageNo}){
    return fetch(`${url}page${pageNo}.json`)
      .then((response) => {
        return response.json();
      })
      .catch(error => {
         return{error:Error('API error')};
    })
  };

  export default fetchDataApi;