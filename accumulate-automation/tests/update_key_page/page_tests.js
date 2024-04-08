import { assert } from 'chai';

import * as commonLib from '../../cli/common.js';
import { sendTokens } from '../../cli/transactions/send_tokens/sendTokens.js';
import { cliConstants } from '../../constants/cliConstants.js';
import adiTestData  from '../../constants/testAdiDataFile.js';
import liteTestData  from '../../constants/testLiteDataFile.js';
import { transaction } from '../../cli/transactions/tx/transaction.js';
import { createKeyPage } from '../../cli/transactions/create_key_page/createKeyPage.js';
import { keyPageActions } from '../../cli/transactions/create_key_page/keyPageActions.js';
import { addCredits } from '../../cli/transactions/add_credits/addCredits.js';
import { sleep } from '../../utils/utils.js';

describe('Key Page related Tests', function () {
    describe('Page Lock and Unlock', function () {
        this.timeout(100000);
        it.only('[] Verify whether we are NOT able to perform updateKeyPage operations on a locked key page successfully)', function () {
          const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account2;
          const liteAccount = liteTestData.liteAccounts.same_bvn.account1;
          const signerKey = adiAccount.publicKey;

          let keyBookData = commonLib.get_data_by_url(adiAccount.keyBook);
          let pageToLockUrl = keyBookData.data.authorities[0].url + "/3"; 
          console.log(" pageToLockUrl ", pageToLockUrl);
          let pageCredits = commonLib.get_credits(pageToLockUrl);
          console.log("pageCredits =", pageCredits);
          assert.isTrue(pageCredits >= Number(cliConstants.FEE_KEY_ACTION) * 100, "KeyPage has sufficient credits");
          console.log("pageCredits =>", pageCredits);

          let keyToSign = "key5";
          let keyPageActionsObj = new keyPageActions();
          keyPageActionsObj.add_key_to_key_page(pageToLockUrl, "CustomKeyb5aW" + "@" + pageToLockUrl.substr(6), keyToSign);
          sleep(10000);
          
          keyPageActionsObj.lock_key_page(pageToLockUrl, signerKey + "@" + adiAccount.keyPage.substr(6) );
          sleep(20000);

          let info = commonLib.get_data_by_url(pageToLockUrl);
          assert.equal(info.data.transactionBlacklist[0], "updateKeyPage", "Is Page is Locked successfully");

          const keyName1 = "CustomKey" + commonLib.random_name_generator(4);
          commonLib.generate_key(keyName1);
          let addKeyOutput = keyPageActionsObj.add_key_to_key_page(pageToLockUrl, keyToSign  + "@" + pageToLockUrl.substr(6) , keyName1);

          assert.isTrue(addKeyOutput.error.message.includes(cliConstants.ERROR_NOT_AUTHORIZED), "Not authorized to sign updateKeyPage message displayed as expected");
       
          //Post test activity
          keyPageActionsObj.unlock_key_page(pageToLockUrl, signerKey + "@" + adiAccount.keyPage.substr(6) );
          sleep(20000);

        });
        
        it('[] Verify whether we are able to unlock the key page successfully)', function () {
            const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account2;
            const liteAccount = liteTestData.liteAccounts.same_bvn.account1;
            const signerKey = adiAccount.publicKey;
  
            let keyBookData = commonLib.get_data_by_url(adiAccount.keyBook);
            let pageToLockUrl = keyBookData.data.authorities[0].url + "/2"; 
            console.log(" pageToLockUrl ", pageToLockUrl);
            let pageCredits = commonLib.get_credits(pageToLockUrl);
            assert.isTrue(pageCredits >= Number(cliConstants.FEE_KEY_ACTION) * 100, "KeyPage has sufficient credits");
            console.log("pageCredits =>", pageCredits);
  
            let keyPageActionsObj = new keyPageActions();
            keyPageActionsObj.lock_key_page(pageToLockUrl, signerKey + "@"+ adiAccount.keyPage.substr(6));
            sleep(10000);
      
            let info = commonLib.get_data_by_url(pageToLockUrl);
            assert.equal(info.data.transactionBlacklist[0], "updateKeyPage", "Is Page is Locked successfully");

            keyPageActionsObj.unlock_key_page(pageToLockUrl, signerKey + "@"+ adiAccount.keyPage.substr(6));
            sleep(10000);

            info = commonLib.get_data_by_url(pageToLockUrl);
            console.log("info.data.transactionBlacklist[0] ", (info.data.transactionBlacklist == null));
            assert.isTrue(info.data.transactionBlacklist == null, "Key Page is unlocked successfully ");
          });

        function create_new_key_page(adiAccount, signerKey, keyNames){
          let keyBookData = commonLib.get_data_by_url(adiAccount.keyBook);
          console.log(">>> keyBookData ::", keyBookData.data);
          const pageCount = keyBookData.data.pageCount;
          console.log(">>> current page count =", Number(pageCount));
      
          let addCreditsObj = new addCredits();
          const liteAccount = liteTestData.liteAccounts.same_bvn.account1;
          let keyPage = keyBookData.data.authorities[0].url + "/" + (pageCount-1);
          console.log(">>>>>>>>>> key book =", keyBookData.data.keyBook);
          console.log(">>>>>>>>>>keyPage =", keyPage);
          addCreditsObj.add_credits(liteAccount.url,adiAccount.keyPage , Number(cliConstants.FEE_CREATE_KEY_PAGE)+1000);
          sleep(5000);
      
          let old_credits = commonLib.get_credits(adiAccount.keyPage);
          assert.isTrue(old_credits > Number(cliConstants.FEE_CREATE_KEY_PAGE) * 100, "KeyPage has sufficient credits");
        
          let createKeyPageObj = new createKeyPage();
          createKeyPageObj.create_key_page(adiAccount.keyBook, signerKey,'','', keyNames);
      
          sleep(10000);
          const keyPageCreated = keyBookData.data.authorities[0].url + "/" + (pageCount+1);
          addCreditsObj.add_credits(liteAccount.url,keyPageCreated, 100);
 
          return keyPageCreated;
        }

        function update_key_page(keyPageUrl, signerKey, oldKey, newKey, delegateValue=""){
          console.log(">>>> successful_creation");
      
          let payload = commonLib.construct_update_key_payload(oldKey, newKey, delegateValue);
          sleep(5000);

          let transactionObj = new transaction();
          return transactionObj.execute(keyPageUrl, signerKey, payload);
        };
    });

});

