const bleno = require('bleno');
const events = require('events');

const SteeringService = require('./steering-service/steering-service');

class VirtualTrainer extends events {
  constructor(steeringEnabled) {
    super();

    this.name = 'Steering';
    process.env['BLENO_DEVICE_NAME'] = this.name;
    
    this.messages = [];
    this.ss = new SteeringService();
    this.stopTimer = null;
    this.steeringEnabled = true;
    
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
      console.log(`Steering advertisingStartError: advertising stopped`);
    });

    bleno.on('advertisingStop', error => {
      console.log(`Steering advertisingStop: ${(error ? 'error ' + error : 'success')}`);
    });

    bleno.on('servicesSet', error => {
      console.log(`Steering servicesSet: ${(error ? 'error ' + error : 'success')}`);
    });

    bleno.on('accept', (clientAddress) => {
      console.log(`Steering accept: client ${clientAddress}`);
      bleno.updateRssi();
    });

    bleno.on('rssiUpdate', (rssi) => {
      console.log(`Steering rssiUpdate: ${rssi}')}`);
    });
  }

  get() {
    let data = this.messages.shift();
    if (typeof data === 'undefined') {
      console.log(`Steering get: no messages in queue')}`);
      data = {};
    }
    return data;
  }

  update(event) {
    console.log(`Steering update: ${JSON.stringify(event)}`);
    if (this.stopTimer) {
      clearTimeout(this.stopTimer);
    }

    this.ss.notify(event);

  }
}

module.exports = VirtualTrainer;
