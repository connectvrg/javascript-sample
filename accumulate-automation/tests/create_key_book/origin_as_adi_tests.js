import { assert } from 'chai';
import { execute, exec_cmd, jyothi_exec, sleep } from '../../utils/utils.js';
import { addCredits } from '../../cli/transactions/add_credits/addCredits.js';
import { adiUtils } from '../../cli/adi_account/adiUtils.js';
import { cliConstants } from '../../constants/cliConstants.js';
import adiTestData  from '../../constants/testAdiDataFile.js';
import liteTestData  from '../../constants/testLiteDataFile.js';
import { createKeyBook } from '../../cli/transactions/create_key_book/createKeyBook.js';
import * as commonLib from '../../cli/common.js';

describe('Create Key Book in ADI Tests ', function () {
  describe('', function () {
    this.timeout(130000);

    it('[] Verify Signing Key Name is a Public Key and KeyBook with given key', function () {
      const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account0;
      const signerKey = adiAccount.publicKey;
      const newKeyBook = "KeyBook" + commonLib.random_name_generator(5);

      const keyName = commonLib.random_name_generator();
      commonLib.generate_key(keyName);
      
      successful_creation(adiAccount, signerKey, newKeyBook, keyName);
    });

    it('[] Verify Signing Key Name is a Public Key and KeyBook with public key', function () {
        const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account2;
        const signerKey = adiAccount.publicKey;
        const newKeyBook = "KeyBook" + commonLib.random_name_generator(5);
  
        successful_creation(adiAccount, signerKey, newKeyBook, adiAccount.publicKey);
      });
    
      it('[] Verify Signing Key Name with given Key and KeyBook with given key', function () {
        const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account1;
        const signerKey =  adiAccount.additionalKey;
        const newKeyBook = "KeyBook" + commonLib.random_name_generator(5);
  
        const keyName = commonLib.random_name_generator();
        commonLib.generate_key(keyName);
        
        successful_creation(adiAccount, signerKey, newKeyBook, keyName);
      });

      it('[] Verify Signing Key with given Key and KeyBook with public key', function () {
        const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account1;
        const signerKey = adiAccount.additionalKey;
        const newKeyBook = "KeyBook" + commonLib.random_name_generator(5);
        
        successful_creation(adiAccount, signerKey, newKeyBook, adiAccount.publicKey);
      });

      it('[] Verify error message of duplicate keybook ', function () {
        const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account1;
        const signerKey = adiAccount.additionalKey;
        const newKeyBook = "book" ;

        let output = failure_scenario(adiAccount, signerKey, newKeyBook, adiAccount.publicKey);
        assert.isTrue(output.error.message.includes(cliConstants.ERROR_FAILED_TO_CREATE), "Failed to Create KeyBook");
      });
    
      it('[] Verify error message when Origin ADI does not exist ', function () {
        const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account1;
        const signerKey = adiAccount.additionalKey;
        const newKeyBook = "KeyBook" + commonLib.random_name_generator(5);

        const originAdiurl = adiAccount.url.substring(0, 10);
        let createKeyBookObj = new createKeyBook();
        let output = createKeyBookObj.create_key_book(originAdiurl, signerKey,"","", newKeyBook,signerKey);
        
        console.log(">>>>>>>> output =", output);
        assert.isTrue(output.error.includes(cliConstants.ERROR_INVALID_IDENTITY), "Failed to Create KeyBook");
      });
      

  });

  function successful_creation(adiAccount, signerKey, newKeyBookName, keyBookSignerKey="") {
    console.log(">>>> successful_creation");
    const liteAccount = liteTestData.liteAccounts.same_bvn.account1;

    let addCreditsObj = new addCredits();
    addCreditsObj.add_credits(liteAccount.url, adiAccount.keyPage, Number(cliConstants.FEE_CREATE_KEY_BOOK));
    sleep(10000);

    let old_credits = commonLib.get_credits(adiAccount.keyPage);
    assert.isTrue(old_credits > Number(cliConstants.FEE_CREATE_KEY_BOOK) * 100, "KeyPage has sufficient credits");
  
    let createKeyBookObj = new createKeyBook();
    let newKeyBookCreated = createKeyBookObj.create_key_book(adiAccount.url, signerKey,"","", newKeyBookName, keyBookSignerKey);

    console.log("newKeyBookCreated =>",newKeyBookCreated);
    sleep(20000);
    let newAdiUrl = adiAccount.url + "/" + newKeyBookName;
    let output = commonLib.get_data_by_url(newAdiUrl);
    console.log(">>>> output.data =", output.data);

    // assert.isTrue(output.data.url.includes(newAdiUrl), "Is new KeyBook created successfully");
    // assert.isTrue(output.data.keyBook.includes(newAdiUrl), "Given Keybook is present in ADI");

    let new_credits = commonLib.get_credits(adiAccount.keyPage);
    console.log(">>>> old_credits - new_credits=", (old_credits - new_credits));
    assert.isTrue(old_credits - new_credits == Number(cliConstants.FEE_CREATE_KEY_BOOK) * 100, cliConstants.FEE_CREATE_KEY_BOOK + " Credits is deducted as expected");
  };

  function failure_scenario(adiAccount, signerKey, newKeyBook, keyBookSignerKey="") {
    let old_credits = commonLib.get_credits(adiAccount.keyPage);
    assert.isTrue(old_credits > Number(cliConstants.FEE_CREATE_KEY_BOOK) * 100, "KeyPage has sufficient credits");
  
    let createKeyBookObj = new createKeyBook();
    let output = createKeyBookObj.create_key_book(adiAccount.url, signerKey,"","", newKeyBook,keyBookSignerKey);
    console.log(">>>>>>>> output =", output);
    return output;
  }
});

