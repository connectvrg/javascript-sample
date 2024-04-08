import { assert } from 'chai';
import {  sleep } from '../../utils/utils.js';
import { addCredits } from '../../cli/transactions/add_credits/addCredits.js';
import { adiUtils } from '../../cli/adi_account/adiUtils.js';
import { cliConstants } from '../../constants/cliConstants.js';
import adiTestData  from '../../constants/testAdiDataFile.js';
import liteTestData  from '../../constants/testLiteDataFile.js';
import * as commonLib from '../../cli/common.js';

describe('', function () {
  describe('', function () {
    this.timeout(130000);

    it('6.1.a - Verify ADI creation [origin-adi-url][signer key][adi url to create] [public-key ]', function () {
      const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account0;
      const signerKey = adiAccount.publicKey;
      const newAdiUrl = "AutoADI" + commonLib.random_name_generator(10) + ".acme";
      successful_creation(adiAccount, signerKey, newAdiUrl, signerKey);
    });

    it('6.1.d. - Verify ADI creation from [origin-adi-url][signer key][adi url to create] [key name][key-book-name]', function () {
      const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account1;
      const signerKey = adiAccount.publicKey;
      const newAdiUrl = "AutoADI" + commonLib.random_name_generator(10) + ".acme";
      const bookName = "myAutoBook";

      successful_creation(adiAccount, signerKey, newAdiUrl, signerKey, bookName);
    });

    it('6.1.b. - Verify ADI creation from [origin-adi-url][signer key][adi url to create] [key name]', function () {
      const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account1;
      const signerKey = adiAccount.publicKey;
      const newAdiUrl = "AutoADI" + commonLib.random_name_generator(10) + ".acme";

      const keyName = commonLib.random_name_generator();
      commonLib.generate_key(keyName);

      successful_creation(adiAccount, signerKey, newAdiUrl, keyName);
    });

    it('6.1.d. - Verify ADI creation from [origin-adi-url][signer key][adi url to create] [key name][key-book-name]', function () {
      const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account1;
      const signerKey = adiAccount.publicKey;
      const newAdiUrl = "AutoADI" + commonLib.random_name_generator(10) + ".acme";

      const keyName = commonLib.random_name_generator();
      commonLib.generate_key(keyName);
      const bookName = "myAutoBook";

      successful_creation(adiAccount, signerKey, newAdiUrl, keyName, bookName);
    });

    it.skip('Verify Sub ADI creation [origin-adi-url][signer key][adi url to create] [public-key ]', function () {
      const adiAccount = adiTestData.adiAccounts.same_bvn.sub_adi.account2;
      const signerKey = adiAccount.publicKey;
      const newAdiUrl = "AutoADI" + commonLib.random_name_generator(10) + ".acme";

      successful_creation(adiAccount, signerKey, adiAccount.name + "/" + newAdiUrl, signerKey);
    });

  });

  function successful_creation(adiAccount, signerKey, new_adi_url, adi_signerKey, keybook = "") {
    console.log(">>>> successful_transfer");
    const liteAccount = liteTestData.liteAccounts.same_bvn.account1;

    let addCreditsObj = new addCredits();
    addCreditsObj.add_credits(liteAccount.url, adiAccount.keyPage, 5000);
    sleep(10000);

    let old_credits = commonLib.get_credits(adiAccount.keyPage);
    assert.isTrue(old_credits > Number(cliConstants.FEE_CREATE_IDENTITY) * 100, "KeyPage has sufficient credits");

    let adiUtilsObj = new adiUtils();
    const adiCreated = adiUtilsObj.create_adi_from_adi_account(adiAccount.url, signerKey, new_adi_url, adi_signerKey, keybook);

    let output = commonLib.get_data_by_url(adiCreated);
    console.log(">>>> output.data =", output.data);

    let newAdiKeyBook = new_adi_url + ((keybook !== "") ? "/"+keybook : "/book") ;
    console.log("newAdiKeyBook -->", newAdiKeyBook);
    assert.isTrue(output.data.url.includes(new_adi_url), "ADI is created successfully");
    // assert.isTrue(output.data.keyBook.includes(newAdiKeyBook), "Given Keybook is present in ADI");

    let new_credits = commonLib.get_credits(adiAccount.keyPage);
    assert.isTrue(old_credits - new_credits == Number(cliConstants.FEE_CREATE_IDENTITY) * 100, cliConstants.FEE_CREATE_IDENTITY + " Credits is deducted as expected");
  };
});

