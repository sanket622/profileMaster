export const leakMiddleware = (req, res, next) => {
    const leakyArray = [];
    leakyArray.push(new Array(1000).fill('no leak'));
  
    if (leakyArray.length > 10) 
    leakyArray.shift();  
    next();
  };
  

//Memory Leak: In this context, a memory leak occurs when memory that is no longer needed is not released. In a middleware, if the array keeps growing and never releases old elements, it could lead to increased memory usage.
// Potential Issue: In the given code, leakyArray is initialized on each request, so it doesn’t actually lead to a memory leak in this exact form. However, if leakyArray were a global variable or if the array size was not properly managed, it could lead to increased memory usage.