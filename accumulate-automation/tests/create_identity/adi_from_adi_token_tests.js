import { assert } from 'chai';
import {  sleep } from '../../utils/utils.js';
import { addCredits } from '../../cli/transactions/add_credits/addCredits.js';
import { adiUtils } from '../../cli/adi_account/adiUtils.js';
import { cliConstants } from '../../constants/cliConstants.js';
import adiTestData  from '../../constants/testAdiDataFile.js';
import liteTestData  from '../../constants/testLiteDataFile.js';

import * as commonLib from '../../cli/common.js';

describe('ADI from ADI Token Account ', function () {
  describe('', function () {
    this.timeout(130000);

    it('Verify ADI Creation with public key', function () {
      const adiTokenAccount = adiTestData.adiAccounts.same_bvn.adiToken.account1;
      const signerKey = adiTokenAccount.signerKey;
      const new_adi_url = "AutoADI" + commonLib.random_name_generator(10) + ".acme";

      successful_creation(adiTokenAccount.url, signerKey, new_adi_url, signerKey);
    });

    it('Verify ADI Creation with public key and keybook', function () {
      const adiTokenAccount = adiTestData.adiAccounts.same_bvn.adiToken.account1;
      const signerKey = adiTokenAccount.signerKey;
      const new_adi_url = "AutoADI" + commonLib.random_name_generator(10) + ".acme";
      const bookName = "myAutoBook";

      successful_creation(adiTokenAccount.url, signerKey, new_adi_url, signerKey, bookName);

    });

    it.skip('Verify Sub ADI Creation with public key and keybook', function () {
      const adiTokenAccount = adiTestData.adiAccounts.same_bvn.subAdiToken.account1;
      const signerKey = adiTokenAccount.signerKey;
      const new_adi_url = "AutoADI" + commonLib.random_name_generator(10) + ".acme";
      const bookName = "myAutoBook";

      successful_creation(adiTokenAccount.url, signerKey, new_adi_url, signerKey, bookName);

    });

    it('Verify ADI Creation with given key', function () {
      const adiTokenAccount = adiTestData.adiAccounts.same_bvn.adiToken.account1;
      const signerKey = adiTokenAccount.signerKey;

      const keyName = commonLib.random_name_generator();
      commonLib.generate_key(keyName);
      const new_adi_url = "AutoADI" + commonLib.random_name_generator(10) + ".acme";

      successful_creation(adiTokenAccount.url, signerKey, new_adi_url, keyName);
    });

    it('Verify ADI Creation with given key and keybook', function () {
      const adiTokenAccount = adiTestData.adiAccounts.same_bvn.adiToken.account1;
      const signerKey = adiTokenAccount.signerKey;
      
      const keyName = commonLib.random_name_generator();
      commonLib.generate_key(keyName);

      const new_adi_url = "AutoADI" + commonLib.random_name_generator(10) + ".acme";
      const bookName = "myAutoBook";

      successful_creation(adiTokenAccount.url, signerKey, new_adi_url, keyName, bookName);
    });

  });

  function successful_creation(adiTokenAccount, signerKey, new_adi_url, adi_signerKey, keybook="") {
    console.log(">>>> successful_transfer");
      //Retrieve ADI Token balance
      let adiTokenAccountData = commonLib.get_data_by_url(adiTokenAccount);
      console.log("adiTokenAccountData -->", adiTokenAccountData);
      const balance = adiTokenAccountData.data.balance;

      let urlValue = adiTokenAccountData.data.url;
      let subValue = urlValue.substr(0, urlValue.indexOf(".acme"));
      console.log( "subValue >>>> ", subValue );
      const parentADIKeyPage = subValue + ".acme/book/1";

      const senderAccount = liteTestData.liteAccounts.same_bvn.account2;
      let addCreditsObj = new addCredits();
      addCreditsObj.add_credits(senderAccount.url, parentADIKeyPage, 5000, 5000);
      sleep(20000);

      let old_credits = commonLib.get_credits(parentADIKeyPage);
      assert.isTrue(old_credits > Number(cliConstants.FEE_CREATE_IDENTITY) * 100, "Parent has sufficient credits");
 
      let adiUtilsObj = new adiUtils();
      const adiCreated = adiUtilsObj.create_adi_from_adi_token_account(adiTokenAccount, signerKey, new_adi_url, adi_signerKey, keybook);
      sleep(20000);

      let output = commonLib.get_data_by_url(adiCreated);
      console.log(">>>> output.data =", output.data);
      assert.isTrue(output.data.url.includes(new_adi_url), "ADI is created successfully");
      // assert.isTrue(output.data.keyBook.includes(keybook!==""? keybook : "book"), "Given Keybook is present in ADI");
     

      let new_credits = commonLib.get_credits(parentADIKeyPage );
      console.log("old_credits -->", (old_credits));
      console.log("new_credits -->", (new_credits));
      console.log("old_credits-new_credits -->", (old_credits-new_credits));
      assert.isTrue(old_credits-new_credits==Number(cliConstants.FEE_CREATE_IDENTITY) * 100, cliConstants.FEE_CREATE_IDENTITY + " Credits is deducted as expected");
 
  };
});

