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
  

  export const isObjectIncluded = (obj1, obj2) => {
    return Object.keys(obj1).every(key => obj2.hasOwnProperty(key) && obj2[key] === obj1[key]);
  }