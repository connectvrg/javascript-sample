import { assert } from 'chai';

import * as commonLib from '../../cli/common.js';
import { sendTokens } from '../../cli/transactions/send_tokens/sendTokens.js';
import { cliConstants } from '../../constants/cliConstants.js';
import adiTestData  from '../../constants/testAdiDataFile.js';
import liteTestData  from '../../constants/testLiteDataFile.js';
import { transaction } from '../../cli/transactions/tx/transaction.js';
import { createKeyPage } from '../../cli/transactions/create_key_page/createKeyPage.js';
import { addCredits } from '../../cli/transactions/add_credits/addCredits.js';
import { sleep } from '../../utils/utils.js';

describe('Update key page Tests', function () {
    describe('With ACME Tokens', function () {
        this.timeout(160000);
        it('[]  Verify updating a existing key with new key', function () {
          // const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account7;
          const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account2;
          const signerKey = adiAccount.publicKey;

          const oldKey = "CustomKey" + commonLib.random_name_generator(4);
          commonLib.generate_key(oldKey);
          var keyNames = [oldKey];
          let keyPageUrl = create_new_key_page(adiAccount, signerKey, keyNames);
          sleep(10000);

          const newKey = "CustomKey" + commonLib.random_name_generator(4);
          commonLib.generate_key(newKey);

          update_key_page(keyPageUrl, signerKey + "@" +adiAccount.keyPage.substr(6), oldKey, newKey);
          sleep(30000);
          let new_credits = commonLib.get_credits(keyPageUrl);
          console.log("New Credits =>", new_credits);

          let info = commonLib.get_data_by_url(keyPageUrl);
          assert.equal(info.data.keys[0].publicKeyHash, commonLib.get_public_key_hash(newKey), "Is key updated successfully");
        });


        //FAILED
        it('[] Verify updating a existing key with delegate)', function () {
          // const adiAccount1 = adiTestData.adiAccounts.same_bvn.adi.account7;
          const adiAccount1 = adiTestData.adiAccounts.same_bvn.adi.account2;
          const signerKey = adiAccount1.publicKey;

          const oldKey = "CustomKey" + commonLib.random_name_generator(4);
          commonLib.generate_key(oldKey);
          var keyNames = [oldKey];
          let keyPageUrl = create_new_key_page(adiAccount1, signerKey, keyNames);
          sleep(20000);

          // let old_credits = commonLib.get_credits(keyPageUrl);
          // assert.isTrue(old_credits > Number(cliConstants.FEE_KEY_ACTION) * 100, "KeyPage has sufficient credits");
          // console.log("Old Credits =>", old_credits);

          const newKey = "CustomKey" + commonLib.random_name_generator(4);
          commonLib.generate_key(newKey);

          const adiAccount2 = adiTestData.adiAccounts.same_bvn.adi.account6;
          const signerKey2 = adiAccount2.publicKey;
          let newKeyPageUrl = create_new_key_page(adiAccount2, signerKey2, [newKey]);
          sleep(20000);

         const delegateValue =  adiAccount2.keyBook.substr(6);
          let updateOuptut = update_key_page(keyPageUrl, signerKey + "@" + adiAccount1.keyPage.substr(6), oldKey, newKey, delegateValue );
          console.log("updateOuptut =>", updateOuptut);

          let transactionObj = new transaction();
          transactionObj.sign(keyPageUrl, newKey + "@" + delegateValue, updateOuptut.transactionHash);
          sleep(30000);

          let new_credits = commonLib.get_credits(keyPageUrl);
          console.log("New Credits =>", new_credits);

          let info = commonLib.get_data_by_url(keyPageUrl);
          // assert.equal(info.data.keys[0].publicKeyHash, commonLib.get_public_key_hash(newKey), "Is key updated successfully");
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

