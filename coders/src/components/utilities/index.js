export const ObjToArray = (obj) => {
    const values = [];
  
    const getValues = (nestedObj) => {
      for (const key in nestedObj) {
        if (typeof nestedObj[key] === 'object') {
          getValues(nestedObj[key]);
        } else {
          values.push(nestedObj[key]);
        }
      }
    };
  
    getValues(obj);
  
    return values;
  };
  