const EventEmitter = require('events');

const myEmitter = new EventEmitter();

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

myEmitter.on('newSale', () => {
  console.log('there was a new sale!')
});

myEmitter.on('newSale', () => {
  console.log('Customer name: Jonas');
});

myEmitter.on('newSale', stock => {
  console.log(`There are now ${stock} items left in stock.`);
})

myEmitter.emit('newSale', 9);