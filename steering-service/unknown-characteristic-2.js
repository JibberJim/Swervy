
const bleno = require('bleno');

const CharacteristicUserDescription = '2901';
const UnknownFeature2 = '347b0013-7635-408b-8918-8ff3949ce592';

class UnknownCharacteristic2 extends  bleno.Characteristic {
  constructor() {
    super({
      uuid: UnknownFeature2,
      properties: ['read'],
      descriptors: [
        new bleno.Descriptor({
          uuid: CharacteristicUserDescription,
          value: 'Unknown 2'
        })
      ],
    });
  }

  onReadRequest(offset, callback) {
    let buffer = new Buffer.alloc(1);
    buffer.writeUInt8(0xff);
    callback(this.RESULT_SUCCESS, buffer);
  }
}

module.exports = UnknownCharacteristic2;
