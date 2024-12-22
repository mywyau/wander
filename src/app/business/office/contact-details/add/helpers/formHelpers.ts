export const updateNestedField = (obj: any, keys: string[], value: any): any => {
    if (keys.length === 1) {
      // Base case: update the final key
      return { ...obj, [keys[0]]: value };
    }
  
    const [firstKey, ...restKeys] = keys;
  
    return {
      ...obj,
      [firstKey]: updateNestedField(obj[firstKey] || {}, restKeys, value),
    };
  };
  