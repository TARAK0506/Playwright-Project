const testData = require('../config/testData');

// Recursive function to traverse and print all keys and values
function traverse(obj, path = '') {
  if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      traverse(item, `${path}[${index}]`);
    });
  } else if (obj !== null && typeof obj === 'object') {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        traverse(obj[key], path ? `${path}.${key}` : key);
      }
    }
  } else {
    console.log(`${path}: ${obj}`);
  }
}

console.log('Traversing testData:\n');
traverse(testData);
