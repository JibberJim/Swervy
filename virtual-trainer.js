const bleno = require('bleno');
const events = require('events');

const SteeringService = require('./steering-service/steering-service');

class VirtualTrainer extends events {
  constructor() {
    super();

    this.name = 'Steering';
    process.env['BLENO_DEVICE_NAME'] = this.name;
    
    this.messages = [];
    this.ss = new SteeringService();
    this.stopTimer = null;
    
    bleno.on('stateChange', (state) => {
      
      if (state === 'poweredOn') {
        let uuids = [ this.ss.uuid ];
        bleno.startAdvertising(this.name, uuids);
      } else {
        bleno.stopAdvertising();
      }
    });

    bleno.on('advertisingStart', (error) => {

      if (!error) {
        let services = [ this.ss ];
        bleno.setServices(services,
        (error) => {
          console.log(`setServices: ${(error ? 'error ' + error : 'success')}`);
        });
      }
    });

    bleno.on('advertisingStartError', () => {
      console.log(`advertisingStartError: advertising stopped`);
    });

    bleno.on('advertisingStop', error => {
      console.log(`advertisingStop: ${(error ? 'error ' + error : 'success')}`);
    });

    bleno.on('servicesSet', error => {
      console.log(`servicesSet: ${(error ? 'error ' + error : 'success')}`);
    });

    bleno.on('accept', (clientAddress) => {
      console.log(`accept: client ${clientAddress}`);
      bleno.updateRssi();
    });

    bleno.on('rssiUpdate', (rssi) => {
      console.log(`rssiUpdate: ${rssi}`);
    });
  }

  get() {
    let data = this.messages.shift();
    if (typeof data === 'undefined') {
      console.log(`get: no messages in queue`);
      data = {};
    }
    return data;
  }

  update(event) {
    console.log(`update: ${JSON.stringify(event)}`);
    if (this.stopTimer) {
      clearTimeout(this.stopTimer);
    }

    this.ss.notify(event);

  }
}

module.exports = VirtualTrainer;
