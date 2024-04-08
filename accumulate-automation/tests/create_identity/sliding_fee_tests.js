import { assert } from 'chai';
import { sleep } from '../../utils/utils.js';
import { liteUtils } from '../../cli/lite_account/liteUtils.js';
import { adiCreate } from '../../cli/transactions/adi_create/adiCreate.js';
import { addCredits } from '../../cli/transactions/add_credits/addCredits.js';
import { adiUtils } from '../../cli/adi_account/adiUtils.js';
import { cliConstants } from '../../constants/cliConstants.js';
import liteTestData  from '../../constants/testLiteDataFile.js';
import * as commonLib from '../../cli/common.js';

describe('Sliding Fee validation of ADI ', function () {
  describe('', function () {
    this.timeout(50000);
    it('[] Verify ADI Fee for 50 chars', function () {
        const charLength = 45;
        const charge = 5;
        calculate_fee(charLength, charge);
      });

    it('[] Verify ADI Fee for 13 chars', function () {
      const charLength = 13;
      const charge = 5;
      calculate_fee(charLength, charge);
    });

    it('[] Verify ADI Fee for 12 chars', function () {
        const charLength = 12;
        const charge = 10;
        calculate_fee(charLength, charge);
      });

      it('[] Verify ADI Fee for 11 chars', function () {
        const charLength = 11;
        const charge = 20;
        calculate_fee(charLength, charge);
      });

      it('[] Verify ADI Fee for 10 chars', function () {
        const charLength = 10;
        const charge = 40;
        calculate_fee(charLength, charge);
      });

      it('[] Verify ADI Fee for 9 chars', function () {
        const charLength = 9;
        const charge = 80;
        calculate_fee(charLength, charge);
      });

      it('[] Verify ADI Fee for 8 chars', function () {
        const charLength = 8;
        const charge = 160;
        calculate_fee(charLength, charge);
      });

      it('[] Verify ADI Fee for 7 chars', function () {
        const charLength = 7;
        const charge = 320;
        calculate_fee(charLength, charge);
      });

      it('[] Verify ADI Fee for 6 chars', function () {
        const charLength = 6;
        const charge = 640;
        calculate_fee(charLength, charge);
      });

      it('[] Verify ADI Fee for 5 chars', function () {
        const charLength = 5;
        const charge = 1280;
        calculate_fee(charLength, charge);
      });

      it('[] Verify ADI Fee for 4 chars', function () {
        const charLength = 4;
        const charge = 2560;
        calculate_fee(charLength, charge);
      });

      it('[] Verify ADI Fee for 3 chars', function () {
        const charLength = 3;
        const charge = 5120;
        calculate_fee(charLength, charge);
      });

      it('[] Verify ADI Fee for 2 chars', function () {
        const charLength = 2;
        const charge = 10240;
        calculate_fee(charLength, charge);
      });

      it('[] Verify ADI Fee for 1 char', function () {
        const charLength = 1;
        const charge = 20480;
        calculate_fee(charLength, charge);
      });


  });


  function calculate_fee(charLength, charge) {
    console.log(">>>> calculate_fee");
    const liteAccount = liteTestData.liteAccounts.same_bvn.fee_account;
    const adiName = commonLib.random_name_generator(charLength) + ".acme";

    const keyName = commonLib.random_name_generator();
    commonLib.generate_key(keyName);

    let adiCreateObj = new adiCreate();
    let outputData = adiCreateObj.adi_from_lite_account(liteAccount.url, adiName, keyName,"", "");
    let message = outputData.error.message;
    console.log("Output Data --> ", message);

    let value = message.substr(message.indexOf("want ") + 5);
    console.log("value ==", value);
    assert.isTrue(Number(value)== charge * 100, "Is Fee calculated based on ADI Length?");
  };
});

