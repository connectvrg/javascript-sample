import { assert } from 'chai';
import { sleep } from '../../utils/utils.js';
import { transaction } from '../../cli/transactions/tx/transaction.js';
import { keyPageActions } from '../../cli/transactions/create_key_page/keyPageActions.js';
import { authActions } from '../../cli/transactions/auth/authActions.js';
import adiTestData  from '../../constants/testAdiDataFile.js';
import * as commonLib from '../../cli/common.js';
import fs from 'fs';


describe('Auth related Tests ', function () {
    describe('', function () {
      this.timeout(3000000);

      it.only('[] Verify updateAccountAuth for multiple accounts ', function () {
        const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account4;
        const dataAccountUrl = adiAccount.url + "/dataAccount" + Math.floor(Math.random() * 100);
     
        let directoryValues = commonLib.get_adi_directory_list(adiAccount.url, 0, 20);
        let authorityUrl = directoryValues.items[0];
        console.log("Key Book where the Authority to be added ::", authorityUrl);

        const keyName1 = "CustomKey" + commonLib.random_name_generator(4);
        commonLib.generate_key(keyName1);
        let keyPageActionsObj = new keyPageActions();
        keyPageActionsObj.add_key_to_key_page(authorityUrl +"/1", adiAccount.publicKey, keyName1);
        sleep(20000);

        let authActionsObj = new authActions();
        let authOutput = authActionsObj.auth_add(adiAccount.url,adiAccount.publicKey, authorityUrl );
        sleep(20000);

        let transactionObj = new transaction(); 
        transactionObj.sign(adiAccount.keyPage, keyName1 + "@" + authorityUrl.substr(6) , authOutput.transactionHash);
        sleep(10000);

        //To verify the authority is updated correctly
         let authoritiesInfo = commonLib.get_data_by_url(adiAccount.url);
         console.log("authoritiesInfo data ::". authoritiesInfo);
         let isAuthorityPresent = false;
         for (let index = 0; index < authoritiesInfo.data.authorities.length; index++) {
           const element = authoritiesInfo.data.authorities[index];
           if(element.url === authorityUrl){
              isAuthorityPresent = true;
              break;
           }
         }
        console.log("isAuthorityPresent ::". isAuthorityPresent);
        assert.isTrue(isAuthorityPresent, "Is Authority is updated");
  
        let multiAuthPayload = commonLib.construct_updateAccountAuth_to_multiparty_payload(authorityUrl, "disable", adiAccount.keyBook,"enable");
        let authOutputData = transactionObj.execute(adiAccount.url, adiAccount.publicKey , multiAuthPayload);

        transactionObj.sign(adiAccount.url, keyName1 + "@" + authorityUrl.substr(6) , authOutputData.transactionHash);
        sleep(10000);

        let authorityUrlData = commonLib.get_data_by_url(authorityUrl);
        console.log(">>>> authorityUrlData ::", authorityUrlData.data);

        authOutput = authActionsObj.auth_remove(adiAccount.url,adiAccount.publicKey, authorityUrl );
        sleep(10000);
        transactionObj.sign(adiAccount.keyPage, keyName1 + "@" + authorityUrl.substr(6) , authOutput.transactionHash);
      });

    });
  
  
  });
  