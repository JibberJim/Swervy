
const bleno = require('bleno');

const CharacteristicUserDescription = '2901';
const UnknownFeature1 = '347b0031-7635-408b-8918-8ff3949ce592';

class RxCharacteristic extends  bleno.Characteristic {
  constructor(tc) {
    super({
      uuid: UnknownFeature1,
      properties: ['write'],
      descriptors: [
        new bleno.Descriptor({
          uuid: CharacteristicUserDescription,
          value: 'Rx'
        })
      ],
    });

    this.tc = tc;
  }

  onWriteRequest(data, offset, withoutResponse, callback) {
    if (data.length == 1) {
      let value = data.readUInt8(0);
      callback(this.RESULT_SUCCESS);
      return;
    }

    let value = data.readUInt16BE(0);

    switch(value) {
      case 0x0310:
        if (this.tc.indicate) {
          let buffer = new Buffer.alloc(4);
          buffer.writeUInt16BE(0x0310, 0);
          buffer.writeUInt16BE(0x4a89, 2);
          this.tc.indicate(buffer);
        }
        break;
      case 0x0311:
        if (this.tc.indicate) {
          let buffer = new Buffer.alloc(4);
          buffer.writeUInt16BE(0x0311, 0);
          buffer.writeUInt16BE(0xffff, 2);
          this.tc.indicate(buffer);
        }
        break;
      case 0x0202:
        console.log('[RxCharacteristic] Received 0x0202');
      default:
        console.log('[RxCharacteristic] Unknown value: ' + value);
        break;
    }

    callback(this.RESULT_SUCCESS);
  }
}

module.exports = RxCharacteristic;
