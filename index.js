// See instructions for installing Request module for NodeJS
// https://www.npmjs.com/package/request

// Requiring module
const request = require('request');
const reader = require('xlsx');



//Listing all book details, get data in xls sheet
function jsonOtSheet() {
  const options = {
    "url": "https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=vGy5HA5EFhEQWgj2NNufCn56IlImYE8N",
    "method": "GET",
    "headers": {
      "Accept": "application/json"
    }
  };
  request(options, function (err, res, body) {
    if (err) {
      console.error(err);
    }
    else {
      body = JSON.parse(body);
      for (let list_name of body.results.lists){
        // Reading our test file
        const file = reader.readFile('./test.xlsx');
        const ws = reader.utils.json_to_sheet(list_name.books);
        reader.utils.book_append_sheet(file,ws,`${list_name.list_name_encoded}`);
        // Writing to our file
        reader.writeFile(file,'./test.xlsx');
      }
    }
  });
}

// Search function for book and return as json
function execute(bookName) {
// replace all the spaces with %20
  const titleForUrl = bookName.trim().replace(/ /gi, "%20")

  const options = {
    "url": `https://api.nytimes.com/svc/books/v3/reviews.json?title=${titleForUrl}&api-key=vGy5HA5EFhEQWgj2NNufCn56IlImYE8N`,
    "method": "GET",
    "headers": {
      "Accept": "application/json"
    }
  };
  // request data form api
  request(options, function (err, res, body) {
    if (err) {
      console.log(err);
      return err;
    }
    else {
      console.log(body);
      return body;
    }
  });
}





let bookName = "the LINCOLN HIGHWAY";

jsonOtSheet()
execute(bookName)
