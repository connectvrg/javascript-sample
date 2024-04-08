import { assert } from 'chai';
import { sleep } from '../../utils/utils.js';
import { adiToken } from '../../cli/transactions/create_token/adiToken.js';
import { createDataAccount } from '../../cli/transactions/data_account/create_data.js';
import { createKeyBook } from '../../cli/transactions/create_key_book/createKeyBook.js';
import { transaction } from '../../cli/transactions/tx/transaction.js';
import { authActions } from '../../cli/transactions/auth/authActions.js';
import { writeToDataAccount } from '../../cli/transactions/data_account/write_data.js';
import { dataAccountUtils } from '../../cli/transactions/data_account/dataAccountUtils.js';
import { cliConstants } from '../../constants/cliConstants.js';
import adiTestData  from '../../constants/testAdiDataFile.js';
import * as commonLib from '../../cli/common.js';
import fs from 'fs';


describe('ADI Data Account Tests ', function () {
    describe('', function () {
      this.timeout(1500000);
      it('[] Verify writing string into ADI Data Account ', function () {
        const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account5;
        const dataAccountUrl = adiAccount.url + "/dataAccount" + Math.floor(Math.random() * 100);
     
        let dataAccountObj = new createDataAccount();
        dataAccountObj.create_data_account_from_adi(adiAccount.url, adiAccount.publicKey, dataAccountUrl);
        console.log("Data account =>", dataAccountUrl);

        let data = "Test data";
        successful_creation(adiAccount, adiAccount.publicKey, dataAccountUrl, data);
      });
  
      it('[] Verify writing Hex into ADI Data Account ', function () {
        const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account5;
        const dataAccountUrl = adiAccount.url + "/dataAccount" + Math.floor(Math.random() * 100);
     
        let dataAccountObj = new createDataAccount();
        dataAccountObj.create_data_account_from_adi(adiAccount.url, adiAccount.publicKey, dataAccountUrl);
        console.log("Data account =>", dataAccountUrl);

        let data = "486170707920496e646570656e64616e636520446179";
        successful_creation(adiAccount, adiAccount.publicKey, dataAccountUrl, data);
      });

      it('[] Verify writing unicode chars into ADI Data Account ', function () {
        const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account5;
        const dataAccountUrl = adiAccount.url + "/dataAccount" + Math.floor(Math.random() * 100);
     
        let dataAccountObj = new createDataAccount();
        dataAccountObj.create_data_account_from_adi(adiAccount.url, adiAccount.publicKey, dataAccountUrl);
        console.log("Data account =>", dataAccountUrl);

        let data = "c5932c20652064616e73206c276f2c206f2d6520656e7472656c6163c3a9206f72206f206574206520636f6c6cc3a9732f6c69c3a973";
        successful_creation(adiAccount, adiAccount.publicKey, dataAccountUrl, data);
      });

      it('[] Verify Sign Transaction and Write to State ', function () {
        const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account5;
        const dataAccountUrl = adiAccount.url + "/dataAccount" + Math.floor(Math.random() * 100);
     
        let dataAccountObj = new createDataAccount();
        dataAccountObj.create_data_account_from_adi(adiAccount.url, adiAccount.publicKey, dataAccountUrl);
        console.log("Data account =>", dataAccountUrl);
        sleep(20000);
        let data = "486170707920496e646570656e64616e636520446179";

        let writeToDataAccountObj = new writeToDataAccount();
        let writeToAccount = writeToDataAccountObj.write_data_to_adi_data_account(dataAccountUrl, adiAccount.publicKey + "@" + adiAccount.keyBook.substr(6), data, "write_state");
        console.log(">>>>>>>>>> writeToAccount ::", writeToAccount.entryHash);
        sleep(5000);
      
        let dataAccountUtilsObj = new dataAccountUtils();
        let output = dataAccountUtilsObj.get_data_by_entryHash(dataAccountUrl, writeToAccount.entryHash);
        console.log("Output ::", output);
        assert.equal(output.data.entryHash,writeToAccount.entryHash, "Is Data is present");
  
      });

      it('[] Verify Sign Transaction and Write to State With Sign Data ', function () {
        const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account5;
        const dataAccountUrl = adiAccount.url + "/dataAccount" + Math.floor(Math.random() * 100);
     
        let dataAccountObj = new createDataAccount();
        dataAccountObj.create_data_account_from_adi(adiAccount.url, adiAccount.publicKey, dataAccountUrl);
        console.log("Data account =>", dataAccountUrl);
        sleep(20000);
        let data = "ACME replaced Factom " + + Math.floor(Math.random() * 1000);;

        let writeToDataAccountObj = new writeToDataAccount();
        let writeToAccount = writeToDataAccountObj.write_data_to_adi_data_account(dataAccountUrl, adiAccount.publicKey + "@" + adiAccount.keyBook.substr(6), data, "write_state",  adiAccount.publicKey);
        console.log(">>>>>>>>>> writeToAccount ::", writeToAccount.entryHash);
        sleep(5000);
      
        let dataAccountUtilsObj = new dataAccountUtils();
        let output = dataAccountUtilsObj.get_data_by_entryHash(dataAccountUrl, writeToAccount.entryHash);
        console.log("Output ::", output);
        assert.equal(output.data.entryHash,writeToAccount.entryHash, "Is Data is present");
  
      });

      it('[] Verify writing data into ADI Data Account when the Auth is disabled ', function () {
        const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account2;
        const dataAccountUrl = adiAccount.url + "/dataAccount" + Math.floor(Math.random() * 100);
     
        const adiAccountToWrite = adiTestData.adiAccounts.same_bvn.adi.account3;

        let dataAccountObj = new createDataAccount();
        dataAccountObj.create_data_account_from_adi(adiAccount.url, adiAccount.publicKey, dataAccountUrl);
        console.log("Data account =>", dataAccountUrl);

        let dataHash = commonLib.toHex("Test data " + commonLib.random_name_generator(20));
        console.log("Hex value ::", dataHash);
        let signerKeyName = adiAccount.publicKey;

        commonLib.load_credits(adiAccount.keyPage, 500);
        sleep(5000);
        let old_credits = commonLib.get_credits(adiAccount.keyPage);
       
        // const originAdiurl = adiAccount.url.substring(0, 10);
        // let createKeyBookObj = new createKeyBook();
        // const newKeyBook = "KeyBook" + commonLib.random_name_generator(5);
        // createKeyBookObj.create_key_book(adiAccount.url, adiAccount.publicKey,"","", newKeyBook, adiAccount.publicKey);
        // sleep(20000);

        // let authorityUrl = adiAccount.url+ "/"+ newKeyBook;
        // commonLib.load_credits(authorityUrl + "/1", 500);
        // sleep(20000);

        let authActionsObj = new authActions();
        let authOutput = authActionsObj.auth_disable(adiAccount.url,adiAccount.publicKey, adiAccount.keyBook );
        sleep(20000);

        let transactionObj = new transaction(); 
        transactionObj.sign(adiAccount.keyPage, adiAccount.publicKey + "@" + adiAccount.keyBook.substr(6) , authOutput.transactionHash);
        sleep(10000);

        let authoritiesInfo = commonLib.get_data_by_url(dataAccountUrl);
        assert.isTrue(authoritiesInfo.data.authorities.length >= 1, "Is Authority is updated");

        let authorityData = commonLib.get_data_by_url(dataAccountUrl);
        console.log("authorityData of DataAccount >>>> ", authorityData.data.authorities);

        let writeToDataAccountObj = new writeToDataAccount();
        let writeToAccount = writeToDataAccountObj.write_data_to_adi_data_account(dataAccountUrl, adiAccountToWrite.publicKey + "@" + adiAccountToWrite.keyBook.substr(6), dataHash);
        console.log(">>>>>>>>>> writeToAccount ::", writeToAccount.entryHash);
        sleep(40000);
  
        let dataAccountUtilsObj = new dataAccountUtils();
        let output = dataAccountUtilsObj.get_data_by_entryHash(dataAccountUrl, writeToAccount.entryHash);
        console.log("Output ::", output);
        assert.equal(output.data.entryHash,writeToAccount.entryHash, "Is Data is present");
  
        //Post test activity-Enable Auth
        authActionsObj.auth_enable(adiAccount.url,adiAccount.publicKey, adiAccount.keyBook );

      });

      it.skip('[] Verify writing <20KB content into ADI Data Account ', function () {
        const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account5;
        const dataAccountUrl = adiAccount.url + "/dataAccount" + Math.floor(Math.random() * 100);
     
        let dataAccountObj = new createDataAccount();
        dataAccountObj.create_data_account_from_adi(adiAccount.url, adiAccount.publicKey, dataAccountUrl);
        console.log("Data account =>", dataAccountUrl);

        let sampleFile = fs.readFileSync('accumulate-automation/tests/data_account/sample_file_18kb.txt');
        console.log("Sample File :",sampleFile);
        successful_creation(adiAccount, adiAccount.publicKey, dataAccountUrl, sampleFile);
      });

      it.skip('[] Verify writing >20KB content into ADI Data Account ', function () {
        const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account5;
        const dataAccountUrl = adiAccount.url + "/dataAccount" + Math.floor(Math.random() * 100);
     
        let dataAccountObj = new createDataAccount();
        dataAccountObj.create_data_account_from_adi(adiAccount.url, adiAccount.publicKey, dataAccountUrl);
        console.log("Data account =>", dataAccountUrl);

        let sampleFile = fs.readFileSync('accumulate-automation/tests/data_account/sample_file_21kb.txt');
        console.log("Sample File :",sampleFile);
        successful_creation(adiAccount, adiAccount.publicKey, dataAccountUrl, sampleFile);
      });

      

      function successful_creation(adiAccount, signerKeyName, dataAccountUrl, data) {
        console.log(">>>> successful_creation -- dataAccountUrl =>", dataAccountUrl);
  
        commonLib.load_credits(adiAccount.keyPage, 500);
        sleep(5000);
        let old_credits = commonLib.get_credits(adiAccount.keyPage);
       
        let writeToDataAccountObj = new writeToDataAccount();
        let writeToAccount = writeToDataAccountObj.write_data_to_adi_data_account(dataAccountUrl, signerKeyName, data);
        console.log(">>>>>>>>>> writeToAccount ::", writeToAccount.entryHash);
        sleep(5000);
  
        let dataAccountUtilsObj = new dataAccountUtils();
        let output = dataAccountUtilsObj.get_data_by_entryHash(dataAccountUrl, writeToAccount.entryHash);
        console.log("Output ::", output);
        assert.equal(output.data.entryHash,writeToAccount.entryHash, "Is Data is present");
  
        let new_credits = commonLib.get_credits(adiAccount.keyPage);
        console.log("Old credits in ADI =", old_credits);
        console.log("New credits in ADI =", new_credits);
        // assert.isTrue(old_credits-new_credits==cliConstants.FEE_CREATE_TOKEN_ACCOUNT * 100, "Expected Credits are deducted?");
  
      };
  
    });
  
  
  });
  