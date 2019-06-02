const api = {
   makeRequest: async (path, options = {}, method = 'GET') => {
      try {
         const { params, body } = options;
         let queryParams;
         if (method === 'GET' && params) {
            queryParams = Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
         }
         path = `/api${path}${queryParams ? `?${queryParams}` : ''}`;

         const result = await fetch(path, {
            method,
            headers: {
               'Content-Type': 'application/json',
            },
            body: typeof body === 'string'
               ? body
               : JSON.stringify(body),
         });
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
