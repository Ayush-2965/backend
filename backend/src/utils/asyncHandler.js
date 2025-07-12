const asyncHandler = async (fnc) => {
  return (req, res, next) => {
    Promise.resolve(fnc(req, res, next)).catch(next);
  };
};


export { asyncHandler };

// const asyncHandler = (fnc) => {
//   async () => {
//     try {
//       await fnc();
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };
