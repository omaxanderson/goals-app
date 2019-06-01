class Error {
   constructor(e) {
      this._errorText = e;
   }

   get errorText() {
      return this._errorText;
   }

   set errorText(e) {
      this._errorText = e;
   }

   what = () => this._errorText;
}

export default Error;
