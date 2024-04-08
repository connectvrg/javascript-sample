import { assert } from 'chai';
import { sleep } from '../../utils/utils.js';
import { addCredits } from '../../cli/transactions/add_credits/addCredits.js';
import { adiUtils } from '../../cli/adi_account/adiUtils.js';
import { cliConstants } from '../../constants/cliConstants.js';
import adiTestData  from '../../constants/testAdiDataFile.js';
import liteTestData  from '../../constants/testLiteDataFile.js';

import * as commonLib from '../../cli/common.js';

describe('ADI from ADI Token Issuer ', function () {
  describe('', function () {
    this.timeout(130000);

    it('[] Verify ADI Creation with public key', function () {
      const adiTokenAccount = adiTestData.adiAccounts.same_bvn.adiToken.customAccount2;
      const signerKey = adiTokenAccount.signerKey;
      const newAdiUrl = "AutoADI" + commonLib.random_name_generator(5) + ".acme";

      successful_creation(adiTokenAccount.tokenIssuer, signerKey, newAdiUrl, signerKey);
    });

    it('[] Verify ADI Creation with public key and keybook', function () {
      const adiTokenAccount = adiTestData.adiAccounts.same_bvn.adiToken.account1;
      const signerKey = adiTokenAccount.signerKey;
      const new_adi_url = "AutoADI" + Math.floor(Math.random() * 1000) + ".acme";
      const bookName = "myAutoBook";

      successful_creation(adiTokenAccount.url, signerKey, new_adi_url, signerKey, bookName);

    });

    it('[] Verify ADI Creation with given key', function () {
      const adiTokenAccount = adiTestData.adiAccounts.same_bvn.adiToken.account1;
      const signerKey = adiTokenAccount.signerKey;

      const keyName = commonLib.random_name_generator();
      commonLib.generate_key(keyName);
      const new_adi_url = "AutoADI" + Math.floor(Math.random() * 1000) + ".acme";

      successful_creation(adiTokenAccount.url, signerKey, new_adi_url, keyName);
    });

    it('[] Verify ADI Creation with given key and keybook', function () {
      const adiTokenAccount = adiTestData.adiAccounts.same_bvn.adiToken.account1;
      const signerKey = adiTokenAccount.signerKey;

      const keyName = commonLib.random_name_generator();
      commonLib.generate_key(keyName);

      const new_adi_url = "AutoADI" + Math.floor(Math.random() * 1000) + ".acme";
      const bookName = "myAutoBook";

      successful_creation(adiTokenAccount.url, signerKey, new_adi_url, keyName, bookName);
    });

  });

  function successful_creation(tokenIssuerAccount, signerKey, new_adi_url, adi_signerKey, keybook = "") {
    console.log(">>>> successful_transfer");

    //Retrieve ADI Token balance
    let tokenIssuerData = commonLib.get_data_by_url(tokenIssuerAccount);
    console.log("tokenIssuerData -->", tokenIssuerData);
    const balance = tokenIssuerData.data.balance;

    const parentKeyPage = tokenIssuerData.data.authorities[0].url + "/1";

    const senderAccount = liteTestData.liteAccounts.same_bvn.account2;
    let addCreditsObj = new addCredits();
    addCreditsObj.add_credits(senderAccount.url, parentKeyPage, Number(cliConstants.FEE_CREATE_IDENTITY), Number(cliConstants.FEE_CREATE_IDENTITY));
    sleep(20000);

    let old_credits = commonLib.get_credits(parentKeyPage);
    assert.isTrue(old_credits > Number(cliConstants.FEE_CREATE_IDENTITY) * 100, "Parent has sufficient credits");

    let adiUtilsObj = new adiUtils();
    const adiCreated = adiUtilsObj.create_adi_from_adi_token_account(tokenIssuerAccount, signerKey, new_adi_url, adi_signerKey, keybook);

    let output = commonLib.get_data_by_url(adiCreated);
    console.log(">>>> output.data =", output.data);
    assert.isTrue(output.data.url.includes(new_adi_url), "ADI is created successfully");
    assert.isTrue(output.data.authorities[0].url.includes(keybook !== "" ? keybook : "book"), "Given Keybook is present in ADI");

    let new_credits = commonLib.get_credits(parentKeyPage);
    console.log(old_credits - new_credits )
    console.log(Number(cliConstants.FEE_CREATE_IDENTITY)* 100)
    // assert.isTrue(old_credits - new_credits == Number(cliConstants.FEE_CREATE_IDENTITY) * 100, cliConstants.FEE_CREATE_IDENTITY + " Credits is deducted as expected");

  };
});

