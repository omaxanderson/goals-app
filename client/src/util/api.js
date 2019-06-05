const api = {
   /*
    * Method to call the API
    * @param {string} path - URL path
    * @param {object|string} options - options to be passed to the fetch method
    *                                - this should either contain the get query parameters or PUT/POST body
    * @param {string} method - REST method to use
    */
   makeRequest: async (path, options = {}, method = 'GET') => {
      try {
         const { params, body } = options;
         let queryParams;
         if (method === 'GET' && params) {
            queryParams = Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
         }
         path = `/api${path}${queryParams ? `?${queryParams}` : ''}`;

         const opts = method !== 'GET'
            ? {
               method,
               headers: {
                  'Content-Type': 'application/json',
               },
               body: typeof body === 'string'
                  ? body
                  : JSON.stringify(body),
            }
            : {};

         const result = await fetch(path, opts);
         const data = await result.json();
         return data;
      } catch (e) {
         console.log('Error:', e);
         return e;
      }
   },
   async get(path, params) {
      return await this.makeRequest(path, params, 'GET');
   },
   async post(path, body) {
      return await this.makeRequest(path, body, 'POST');
   },
   async put(path, body) {
      return await this.makeRequest(path, body, 'PUT');
   },
};

export default api;
