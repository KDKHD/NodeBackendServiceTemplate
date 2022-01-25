import ExtendableError from "./extendableError";


class niceError extends ExtendableError {
  code: number;
  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }

  getJson(){
    return {
      message:this.message
    }
  }
}

export default niceError


