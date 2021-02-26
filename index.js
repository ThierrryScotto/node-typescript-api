const { EventEmitter } = require('events');

const eventEmitter = new EventEmitter();
const eventEmitter2 = new EventEmitter();

/* Explicação sobre evento em node https://medium.com/developers-arena/nodejs-event-emitters-for-beginners-and-for-experts-591e3368fdd2 */

// chamo o meu evento
eventEmitter.on('test', () => {
  console.log('Actived my own event');
});

// Crio o meu evento
eventEmitter2.emit('test');
