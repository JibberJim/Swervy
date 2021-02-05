
const bleno = require('bleno');

const CharacteristicUserDescription = '2901';
const UnknownFeature3 = '347b0014-7635-408b-8918-8ff3949ce592';

class UnknownCharacteristic3 extends  bleno.Characteristic {
  constructor() {
    super({
      uuid: UnknownFeature3,
      properties: ['notify'],
      descriptors: [
        new bleno.Descriptor({
          uuid: CharacteristicUserDescription,
          value: 'Unknown 3'
        })
      ],
    });

    this.updateValueCallback = null;
  }

  onSubscribe(maxValueSize, updateValueCallback) {
    this.updateValueCallback = updateValueCallback;
    return this.RESULT_SUCCESS;
  };

  onUnsubscribe() {
    this.updateValueCallback = null;
    return this.RESULT_UNLIKELY_ERROR;
  };
}

module.exports = UnknownCharacteristic3;
