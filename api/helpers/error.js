

const handleError = (err, res) => {
    const { statusCode, message } = err;
    // console.log(err);
    // console.log(res);
    res.status(statusCode).json({
      status: "error",
      statusCode,
      message
    });
  };
  
  class ErrorHandler extends Error {
    constructor(statusCode, message) {
      super();
      this.statusCode = statusCode;
      this.message ={message:message,code:32423423} ;
    }
  }
  

  module.exports = {
    ErrorHandler,handleError
  }