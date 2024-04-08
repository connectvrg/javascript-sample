import { assert } from 'chai';
import { sleep } from '../../utils/utils.js';
import { adiToken } from '../../cli/transactions/create_token/adiToken.js';
import { createDataAccount } from '../../cli/transactions/data_account/create_data.js';
import { writeToDataAccount } from '../../cli/transactions/data_account/write_data.js';
import { dataAccountUtils } from '../../cli/transactions/data_account/dataAccountUtils.js';
import { addCredits } from '../../cli/transactions/add_credits/addCredits.js';
import { liteUtils } from '../../cli/lite_account/liteUtils.js';
import { cliConstants } from '../../constants/cliConstants.js';
import adiTestData from '../../constants/testAdiDataFile.js';
import { faucet } from '../../cli/transactions/faucet/faucet.js';
import liteTestData from '../../constants/testLiteDataFile.js';
import { getKeyPassedValue } from "../../constants/environment.js"
import * as commonLib from '../../cli/common.js';
import fs from 'fs';


describe('Lite Data Account Tests ', function () {
  describe('', function () {
    this.timeout(90000);
    it('[] Verify writing string into Lite Data Account ', function () {
      let sigType = getKeyPassedValue();
      let keyName = "TestKey" + sigType + commonLib.random_name_generator(5).toUpperCase();
      console.log("Create Lite account with signature type :", sigType);

      let liteAccount = createLiteToken(sigType, keyName);
      let dataAccountUrl = createNewDataAccount(liteAccount);
      let data = "Test data";

      successful_creation(liteAccount, dataAccountUrl, data);
    });

    it('[] Verify writing HEX into Lite Data Account ', function () {
      let sigType = getKeyPassedValue();
      let keyName = "TestKey" + sigType + commonLib.random_name_generator(5).toUpperCase();
      console.log("Create Lite account with signature type :", sigType);

      let liteAccount = createLiteToken(sigType, keyName);
      let dataAccountUrl = createNewDataAccount(liteAccount);
      let data = "486170707920496e646570656e64616e636520446179";

      successful_creation(liteAccount, dataAccountUrl, data);
    });

    it('[] Verify writing unicode chars into Lite Data Account ', function () {
      let sigType = getKeyPassedValue();
      let keyName = "TestKey" + sigType + commonLib.random_name_generator(5).toUpperCase();
      console.log("Create Lite account with signature type :", sigType);

      let liteAccount = createLiteToken(sigType, keyName);
      let dataAccountUrl = createNewDataAccount(liteAccount);
      let data = "c5932c20652064616e73206c276f2c206f2d6520656e7472656c6163c3a9206f72206f206574206520636f6c6cc3a9732f6c69c3a973";

      successful_creation(liteAccount, dataAccountUrl, data);
    });

    it.skip('[] Verify writing <20KB content into Lite Data Account ', function () {
      let sigType = getKeyPassedValue();
      let keyName = "TestKey" + sigType + commonLib.random_name_generator(5).toUpperCase();
      console.log("Create Lite account with signature type :", sigType);

      let liteAccount = createLiteToken(sigType, keyName);
      let dataAccountUrl = createNewDataAccount(liteAccount);
      let sampleFile = fs.readFileSync('accumulate-automation/tests/data_account/sample_file_18kb.txt');
      console.log("Sample File :", sampleFile);
      successful_creation(liteAccount, dataAccountUrl, sampleFile);

    });

    it.skip('[] Verify writing >20KB content into Lite Data Account ', function () {
      let sigType = getKeyPassedValue();
      let keyName = "TestKey" + sigType + commonLib.random_name_generator(5).toUpperCase();
      console.log("Create Lite account with signature type :", sigType);

      let liteAccount = createLiteToken(sigType, keyName);
      let dataAccountUrl = createNewDataAccount(liteAccount);
      let sampleFile = fs.readFileSync('accumulate-automation/tests/data_account/sample_file_21kb.txt');
      console.log("Sample File :", sampleFile);
      successful_creation(liteAccount, dataAccountUrl, sampleFile);

    });

    function createLiteToken(sigType, keyName) {
      let result = commonLib.generate_custom_key(sigType, keyName);
      const identity = result.liteAccount.substr(0, result.liteAccount.indexOf("/ACME"));
      let liteAccount = { "name": result.name, "url": result.liteAccount, "identity": identity, "publicKey": result.publicKey, "keyType": result.keyType };

      let faucetObj = new faucet();
      for (let index = 0; index < 2; index++) {
        faucetObj.execute_faucet(liteAccount.url, liteAccount.url);
      }
      sleep(10000);
      let addCreditsObj = new addCredits();
      addCreditsObj.add_credits(liteAccount.url, liteAccount.url, 1000);
      sleep(10000);
      return liteAccount;
    }

    function createNewDataAccount(liteAccount){
      let dataAccountObj = new createDataAccount();
      let output = dataAccountObj.create_data_account_from_lite(liteAccount.identity, liteAccount.identity);
      let dataAccountUrl = output.accountUrl;
      console.log("Data account =>", dataAccountUrl);
      return dataAccountUrl;
    }

    function successful_creation(liteAccount, dataAccountUrl, data) {
      console.log(">>>> successful_creation -- dataAccountUrl =>", dataAccountUrl);

      commonLib.load_credits(liteAccount.identity, 500);
      sleep(5000);
      let old_credits = commonLib.get_credits(liteAccount.identity);

      let writeToDataAccountObj = new writeToDataAccount();
      let writeToAccount = writeToDataAccountObj.write_data_to_lite_data_account(liteAccount.identity, dataAccountUrl, data);
      console.log(">>>>>>>>>> writeToAccount ::", writeToAccount.entryHash);
      sleep(5000);

      let dataAccountUtilsObj = new dataAccountUtils();
      let dataOutput = dataAccountUtilsObj.get_data_by_account(dataAccountUrl);
      console.log("Output ::", dataOutput.data.entryHash);

      let output = dataAccountUtilsObj.get_data_by_entryHash(dataAccountUrl, dataOutput.data.entryHash);
      console.log("Output ::", output.data.entryHash);
      assert.equal(output.data.entryHash, dataOutput.data.entryHash, "Is Data is present");

      let new_credits = commonLib.get_credits(liteAccount.identity);
      console.log("Old credits in ADI =", old_credits);
      console.log("New credits in ADI =", new_credits);
      // assert.isTrue(old_credits-new_credits==cliConstants.FEE_CREATE_TOKEN_ACCOUNT * 100, "Expected Credits are deducted?");

    };

  });


});
