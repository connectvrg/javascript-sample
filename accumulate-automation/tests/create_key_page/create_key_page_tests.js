import { assert } from 'chai';
import { sleep } from '../../utils/utils.js';
import { addCredits } from '../../cli/transactions/add_credits/addCredits.js';
import { cliConstants } from '../../constants/cliConstants.js';
import adiTestData  from '../../constants/testAdiDataFile.js';
import liteTestData  from '../../constants/testLiteDataFile.js';
import { createKeyPage } from '../../cli/transactions/create_key_page/createKeyPage.js';
import * as commonLib from '../../cli/common.js';

describe('Create Key Page from ADI Tests ', function () {
  describe('', function () {
    this.timeout(130000);

    it('[] Verify Signing key with Public Key and Public key in Key Page', function () {
      // const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account6;
      const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account2;
      const signerKey = adiAccount.publicKey;

      var keyNames = [];
      keyNames.push(signerKey);
      successful_creation(adiAccount, signerKey, keyNames);
    });

    it('[]Verify Signing key with Public Key and new key in Key Page', function () {
      const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account2;
      const signerKey = adiAccount.publicKey;

      const keyName = commonLib.random_name_generator();
      commonLib.generate_key(keyName);
      
      var keyNames = [];
      keyNames.push(keyName);
      successful_creation(adiAccount, signerKey, keyNames);
    });

    it('[] Verify Signing key with Key and Public key in Key Page', function () {
      // const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account6;
      const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account2;
      const publicKey = adiAccount.publicKey;
      const signerKey = adiAccount.additionalKey;

      var keyNames = [];
      keyNames.push(signerKey);
      successful_creation(adiAccount, publicKey, keyNames);
    });

    it('[] Verify Signing key with custom Key and new key in Key Page', function () {
      const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account2;
      // const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account6;
      const signerKey = adiAccount.additionalKey;
      var keyNames = [];

      const keyName = commonLib.random_name_generator();
      commonLib.generate_key(keyName);
      keyNames.push(keyName)
      
      successful_creation(adiAccount, signerKey, keyNames);
    });

    it('[] Verify Signing key with custom Key and multiple keys in Key Page', function () {
      // const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account6;
      const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account2;
      const signerKey = adiAccount.additionalKey;
      var keyNames = [];

      const keyName1 = "CustomKey" + commonLib.random_name_generator(4);
      commonLib.generate_key(keyName1);
      keyNames.push(keyName1);

      const keyName2 = "CustomKey" + commonLib.random_name_generator(4);
      commonLib.generate_key(keyName2);
      keyNames.push(keyName2);
      
      successful_creation(adiAccount, signerKey, keyNames);
    });

    it('[] Verify with duplicate keys in Key Page', function () {
      const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account2;
      const signerKey = adiAccount.additionalKey;
      var keyNames = [];

      const keyName1 = "CustomKey" + commonLib.random_name_generator(4);
      commonLib.generate_key(keyName1);
      keyNames.push(keyName1);
      keyNames.push(keyName1);
      
      let result = failure_scenario(adiAccount, signerKey, keyNames);
      assert.isTrue(result.error.message.includes(cliConstants.ERROR_DUPLICATE_KEYS), "Duplicate keys are not allowed");

    });

    it('[] Verify with non-existing key in Key Page', function () {
      // const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account6;
      const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account2;
      const signerKey = adiAccount.additionalKey;
      var keyNames = [];

      const keyName1 = "CustomKey" + commonLib.random_name_generator(4);
      commonLib.generate_key(keyName1);
      keyNames.push(keyName1);
      keyNames.push("TestKey");
      
      let result = failure_scenario(adiAccount, signerKey, keyNames);
      assert.isTrue(result.error != null, "Key doesn't exists error displayed");
    });

    it('[] Verify with invalid ADI', function () {
      const adiAccount = adiTestData.adiAccounts.same_bvn.adi.invalidAccount;
      const signerKey = adiAccount.publicKey;
      var keyNames = [];
      keyNames.push(signerKey);
      
      let createKeyPageObj = new createKeyPage();
      let result = createKeyPageObj.create_key_page(adiAccount.keyBook, signerKey,'','', keyNames);
     
      assert.isTrue(result.error.includes(cliConstants.ERROR_FAILED_TO_GET_KEY), "When ADI doesn't exists");
    });

    it('[] Verify with invalid signing key', function () {
      const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account4;
      const signerKey = "rajaKey";
      var keyNames = [];
      keyNames.push(signerKey);
      
      let createKeyPageObj = new createKeyPage();
      let result = createKeyPageObj.create_key_page(adiAccount.keyBook, signerKey,'','', keyNames);
     
      assert.isTrue(result.error.includes("failed to get key"), "When invalid signer key is present");
    });


  });

  function successful_creation(adiAccount, signerKey, keyNames) {
    console.log(">>>> successful_creation");
    console.log("signerKey =", signerKey);
    console.log("keyNames = ", keyNames);

    let keyBookData = commonLib.get_data_by_url(adiAccount.keyBook);
    console.log(">>> keyBookData ::", keyBookData.data);
    const pageCount = keyBookData.data.pageCount;
    console.log(">>> current page count =", Number(pageCount));

    let addCreditsObj = new addCredits();
    const liteAccount = liteTestData.liteAccounts.same_bvn.account1;
    let keyPage = keyBookData.data.url + "/" + (pageCount);
    console.log(">>>>>>>>>>VRG  key book =", keyBookData.data.url);
    console.log(">>>>>>>>>> VRG keyPage =", keyPage);
    addCreditsObj.add_credits(liteAccount.url,adiAccount.keyPage , Number(cliConstants.FEE_CREATE_KEY_PAGE)+1200);
  
    sleep(10000);

    let old_credits = commonLib.get_credits(adiAccount.keyPage);
    assert.isTrue(old_credits >= Number(cliConstants.FEE_CREATE_KEY_PAGE) * 100, "KeyPage has sufficient credits");
  
    let createKeyPageObj = new createKeyPage();
    createKeyPageObj.create_key_page(adiAccount.keyBook, signerKey,'','', keyNames);
    sleep(20000);
    
    keyBookData = commonLib.get_data_by_url(adiAccount.keyBook);
    console.log(">>> keyBookData ::", keyBookData.data);
    const newPageCount = keyBookData.data.pageCount;
    console.log(">>> new page count =", newPageCount);

    assert.equal(newPageCount,pageCount+1, "Is new KeyPage created successfully");

    let new_credits = commonLib.get_credits(adiAccount.keyPage);
    console.log(">>> old_credits =", old_credits);
    console.log(">>> new_credits =", new_credits);
    console.log(">>> old_credits - new_credits =", (old_credits - new_credits));
    assert.isTrue(old_credits - new_credits >= Number(cliConstants.FEE_CREATE_KEY_PAGE) * 100, cliConstants.FEE_CREATE_KEY_BOOK + " Credits is deducted as expected");
  };

  function failure_scenario(adiAccount, signerKey, keyNames) {
    let old_credits = commonLib.get_credits(adiAccount.keyPage);
    assert.isTrue(old_credits > Number(cliConstants.FEE_CREATE_KEY_PAGE) * 100, "KeyPage has sufficient credits");
  
    let createKeyPageObj = new createKeyPage();
    let output = createKeyPageObj.create_key_page(adiAccount.keyBook, signerKey,'','', keyNames);
    sleep(5000);    
    console.log(">>>>>>>> output =", output);
    return output;
  }
});

