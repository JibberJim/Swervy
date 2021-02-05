
const bleno = require('bleno');

const CharacteristicUserDescription = '2901';
const UnknownFeature1 = '347b0012-7635-408b-8918-8ff3949ce592';

class UnknownCharacteristic1 extends  bleno.Characteristic {
  constructor() {
    super({
      uuid: UnknownFeature1,
      properties: ['write'],
      descriptors: [
        new bleno.Descriptor({
          uuid: CharacteristicUserDescription,
          value: 'Unknown 1'
        })
      ],
    });
  }

  onWriteRequest(data, offset, withoutResponse, callback) {
    callback(this.RESULT_SUCCESS);
  }
}

module.exports = UnknownCharacteristic1;
