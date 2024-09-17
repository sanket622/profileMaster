export const leakMiddleware = (req, res, next) => {
    const leakyArray = [];
    leakyArray.push(new Array(1000).fill('no leak'));
  
    if (leakyArray.length > 10) 
    leakyArray.shift();  
    next();
  };
  