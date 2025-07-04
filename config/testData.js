// config/testData.js
const testData = {
  searchCriteria: {
    outdoorToys: {
      keywords: "Outdoor Toys",
      keywordOption: "Any words, any order",
      category: "Toys & Hobbies",
      titleAndDescription: true,
      condition: true,
      freeReturns: true,
      returnsAccepted: true,
      itemLocation: true
    },
    electronics: {
      keywords: "iPhone",
      keywordOption: "All words, any order",
      category: "Cell Phones & Accessories",
      titleAndDescription: true,
      condition: false,
      freeReturns: true,
      returnsAccepted: false,
      itemLocation: false
    }
  },
  
  urls: {
    ebay: "https://ebay.com"
  }
};

module.exports = testData;