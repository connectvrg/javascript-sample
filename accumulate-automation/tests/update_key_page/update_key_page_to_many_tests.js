import { assert } from 'chai';

import * as commonLib from '../../cli/common.js';
import { sendTokens } from '../../cli/transactions/send_tokens/sendTokens.js';
import { cliConstants } from '../../constants/cliConstants.js';
import adiTestData  from '../../constants/testAdiDataFile.js';
import { keyPageActions } from '../../cli/transactions/create_key_page/keyPageActions.js';
import liteTestData  from '../../constants/testLiteDataFile.js';
import { transaction } from '../../cli/transactions/tx/transaction.js';
import { createKeyPage } from '../../cli/transactions/create_key_page/createKeyPage.js';
import { addCredits } from '../../cli/transactions/add_credits/addCredits.js';
import { sleep } from '../../utils/utils.js';

describe('Update key page with multiple accounts Tests', function () {
    describe('With ACME Tokens', function () {
        this.timeout(100000);
        it('[]  Verify updating a existing key with new key', function () {
          // const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account4;
          const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account2;
          const signerKey = adiAccount.publicKey;

          //Assuming the below keys are present in Wallet DB
          const key1 = "key1";
          const key2 = "key2";
          const newKey = "CustomKey" + commonLib.random_name_generator(4);
          commonLib.generate_key(newKey);

          const newKeyDetails = commonLib.get_private_key(newKey);
          const newKeyHash = commonLib.sha256(newKeyDetails.publicKey);
          
          const additionalKeyDetails = commonLib.get_private_key(key1);
          const additionalKeyHash = commonLib.sha256(additionalKeyDetails.publicKey);

          let keyPageUrl = adiAccount.keyBook + "/2";
          let old_credits = commonLib.get_credits(keyPageUrl);
          console.log("Old Credits =>", old_credits);
          assert.isTrue(old_credits > Number(cliConstants.FEE_KEY_ACTION) * 100, "KeyPage has sufficient credits");
         
          let keyPageActionsObj  = new keyPageActions();
          keyPageActionsObj.add_key_to_key_page(keyPageUrl, signerKey, key2);
          sleep(20000);

          let info = commonLib.get_data_by_url(keyPageUrl);
          console.log("Key Page Data ::". info);
          let oldKeyHash = info.data.keys[0].publicKeyHash;
          console.log(">>>>>>> oldKeyHash ::", oldKeyHash);
          update_key_page_to_multiple_party(keyPageUrl, signerKey, oldKeyHash, newKeyHash, additionalKeyHash);
          sleep(10000);

          //To verify the modified key is present
          let updatedInfo = commonLib.get_data_by_url(keyPageUrl);
          console.log("Page Data ::". updatedInfo);
          let isUpdated = false;
          for (let index = 0; index < updatedInfo.data.keys.length; index++) {
            const element = updatedInfo.data.keys[index];
            if(element.publicKeyHash === newKeyHash){
              isUpdated = true;
            }
          }
          console.log("isUpdated ::". isUpdated);
          assert.isTrue(isUpdated, "Is key updated successfully");
         
          //Post Test action -> Remove the keys from KeyPage
          keyPageActionsObj.remove_key_from_key_page(keyPageUrl, signerKey, key1);
          keyPageActionsObj.remove_key_from_key_page(keyPageUrl, signerKey, key2);
          keyPageActionsObj.remove_key_from_key_page(keyPageUrl, signerKey, newKey);
          
        });
        
        function update_key_page_to_multiple_party(keyPageUrl, signerKey, oldKey, newKey, additionalKeyHash){
          console.log(">>>> update_key_page_to_multiple_party");
      
          let payload = commonLib.construct_update_key_to_multiparty_payload(keyPageUrl, oldKey, newKey, additionalKeyHash);
          sleep(5000);

          let transactionObj = new transaction();
          return transactionObj.execute(keyPageUrl, signerKey, payload);
        };
    });

});

