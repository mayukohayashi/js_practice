const fs = require('fs');
const http = require('http');
const url = require('url');


////////////////////////////////////////////////
//////File
// Blocking, synchronous
/*
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8')
console.log(textIn);

const textOut = `this is: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut)
console.log('File written');


// Non-blocking, asynchronous
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
  //error is always first one
  if (err) return console.log('errrooorrrr❗');

  fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
    console.log(data2);

    fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
      console.log(data3);


      fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
        console.log('your file has been written🙏')

      })
    });
  });
});

console.log('Will read file');

*/

////////////////////////////////////////////////
//////SERVER


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data);
  // console.log(productData);

  // res.writeHead(200, { 'Content-type': 'application/json' });
  // res.end(data);

const server = http.createServer((req, res) => {
  console.log(req.url);

  const pathName =  req.url;


  // OVERVIEW PAGE
  if(pathName === '/' || pathName === '/overview') {
    

    res.end('This is the OVERVIEW');

// product page
  } else if (pathName === '/product') {
    res.end('This is the PRODUCT')

// api page
  } else if (pathName === '/api') {
      res.writeHead(200, {'Content-type': 'application/json'});
      res.end(data);

// not found
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world'
    });
    res.end('<h1>Page not found!</h1>');
  }

  res.end('Hello from the server')
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to request on port 8000');
});