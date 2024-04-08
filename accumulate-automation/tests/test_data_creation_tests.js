import { assert } from 'chai';
import { execute, exec_cmd, jyothi_exec, sleep } from '../utils/utils.js';
import { liteUtils } from '../cli/lite_account/liteUtils.js';

import { addCredits } from '../cli/transactions/add_credits/addCredits.js';
import * as commonLib from '../cli/common.js';
import { adiUtils } from '../cli/adi_account/adiUtils.js';
import { adiToken } from '../cli/transactions/create_token/adiToken.js';
import { tokenIssuer } from '../cli/transactions/token_issuer/tokenIssuer.js';
import { sendTokens } from '../cli/transactions/send_tokens/sendTokens.js';
import adiTestData from '../constants/testAdiDataFile.js';
import liteTestData from '../constants/testLiteDataFile.js';
import { issueToken } from '../cli/transactions/issue_token/issueToken.js';

import { faucet } from '../cli/transactions/faucet/faucet.js';
import { getKeyPassedValue } from "../constants/environment.js"
import fs from 'fs';
import { cliConstants } from '../constants/cliConstants.js';
describe('Test Data Creation Tests', function () {

    describe('Test Data for automation', function () {
        this.timeout(30000000);
        it('Create Test Data accounts', function () {
            //Create Lite account
            let sigType = getKeyPassedValue();
            let account1 = createLiteAccount(sigType);
            console.log("Account details >>>> ", account1);

            //Create new Key 
            let keyName = "addKey" + sigType + commonLib.random_name_generator(4).toUpperCase();
            console.log(">>>> keyName ::", keyName);
            let key1 = commonLib.generate_custom_key(sigType, keyName);

            //Create ADI
            let adiAccount1 = createNewAdi(account1.url, keyName);
            sleep(10000);
            //Create new ADI Token Account
            let adiTokenAccount1 = createNewAdiToken(adiAccount1, keyName, account1);

            let keyName2 = "addKey" + sigType + commonLib.random_name_generator(4).toUpperCase();
            let key2 = commonLib.generate_custom_key(sigType, keyName2);
            let adiTokenAccount2 = createNewAdiToken(adiAccount1, keyName2, account1);

            let issuerName = 'TokenIssuerVRG'; //+ commonLib.random_name_generator(5);
            let symbolName = "VRG_TOKENS";

            let tokenissuerAccount =  createTokenIssuerAccount(adiAccount1, issuerName, symbolName);
    
            let customAccount1 = createCustomAdiTokenAccount(adiAccount1, tokenissuerAccount);
            let customAccount2 = createCustomAdiTokenAccount(adiAccount1, tokenissuerAccount);
            let customAccount3 = createCustomAdiTokenAccount(adiAccount1, tokenissuerAccount);

            let issueTokenObj = new issueToken();
            issueTokenObj.issue_token(customAccount1.tokenIssuer, keyName, customAccount1.url, 5000);
            issueTokenObj.issue_token(customAccount1.tokenIssuer, keyName, customAccount2.url, 5000);
            issueTokenObj.issue_token(customAccount1.tokenIssuer, keyName, customAccount3.url, 5000);


            // let account2 = createLiteAccount(sigType);
            // let account3 = createLiteAccount(sigType);
            console.log("Lite Account 1:: ", account1);
            // console.log("Lite Account 2:: ", account2);
            // console.log("Lite Account 3:: ", account3);
            console.log("ADI Account 1::", adiAccount1);
            console.log("ADI Token Account 1::", adiTokenAccount1);
            console.log("ADI Token Account 2::", adiTokenAccount2);
            console.log("Custom Token Account 1::", customAccount1);
            console.log("Custom Token Account 2::", customAccount2);
            console.log("Custom Token Account 3::", customAccount3);
        });

       

        it('Create new Lite Token account', function () {

            let sigType = getKeyPassedValue();
            console.log("Create Lite account with signature type :", sigType);

            let out = commonLib.generate_custom_key(sigType, "TestEdKey" +commonLib.random_name_generator(4).toUpperCase());
            console.log(" KEy output :", out);

            const lite = new liteUtils();
            const liteAccount = lite.create_lite_account();
            const liteAccountUrl = liteAccount.url;
            const liteIdentity = liteAccount.identity;

            console.log("liteAccountUrl >>>", liteAccountUrl);
            let result = commonLib.get_data_by_url(liteAccountUrl);
            const balance1 = result.data.balance;
            let addCreditsObj = new addCredits();
            addCreditsObj.add_credits(liteAccountUrl, liteAccountUrl, 10000);

            result = commonLib.get_data_by_url(liteAccountUrl);
            const balance2 = result.data.balance;
            assert.isTrue(Number(balance1) > Number(balance2), 'Is Token Balance has been reduced in Sender account? ');

            sleep(20000);

            result = commonLib.get_data_by_url(liteIdentity);
            const credits = result.data.creditBalance;
            console.log("credits ::", credits);
            assert.isTrue(Number(credits) == 1000000, "Is credits added?");

            console.log("liteAccount ->", liteAccount);

        });

        it('Create ADI from Lite Token account', function () {
            this.timeout(1200000);

            let sigType = getKeyPassedValue();
            const liteAccount = liteTestData.liteAccounts.different_bvn.bvnAccount0;
            // let liteAccount = createLiteAccount(sigType);

            let addCreditsObj = new addCredits();
            addCreditsObj.add_credits(liteAccount.url, liteAccount.url, 50000);

            let keyName = "key" + sigType + commonLib.random_name_generator(4).toUpperCase();
            let key1 = commonLib.generate_custom_key(sigType, keyName);

            let adiUtilsObj = new adiUtils();
            let newAdiAccount = adiUtilsObj.create_adi_from_lite_account(liteAccount.url, keyName, "", "", "test-dn.acme");
            sleep(30000);
            let adiData = commonLib.get_data_by_url(newAdiAccount + "/book/1");
            let adiAccount = { "name": newAdiAccount, "url": "acc://" + newAdiAccount, "keyBook": adiData.data.keyBook, "keyPage": adiData.data.url, "publicKey": keyName, "additionalKey": "" };

            console.log("adiAccount => ", adiAccount);
            addCreditsObj.add_credits(liteAccount.url, adiAccount.keyPage, 1000);

        });

        it('Create ADI from ADI', function () {
            this.timeout(150000);

            let sigType = getKeyPassedValue();
            const account1 = adiTestData.adiAccounts.same_bvn.adi.account1;
            const liteAccount = liteTestData.liteAccounts.same_bvn.account1;

            let addCreditsObj = new addCredits();
            addCreditsObj.add_credits(liteAccount.url, liteAccount.url, 10000);

            let keyName = "Key" + sigType + commonLib.random_name_generator(4).toUpperCase();
            let key1 = commonLib.generate_custom_key(sigType, keyName);

            let newAdiName = account1.name + "/subAdi" + commonLib.random_name_generator(10) + ".acme";
            let adiUtilsObj = new adiUtils();
            let newAdiAccount = adiUtilsObj.create_adi_from_adi_account(account1.name, account1.publicKey, newAdiName, keyName);
            sleep(10000);
            let adiData = commonLib.get_data_by_url(newAdiAccount + "/book/1");
            let adiAccount = { "name": newAdiAccount, "url": "acc://" + newAdiAccount, "keyBook": adiData.data.keyBook, "keyPage": adiData.data.url, "publicKey": keyName, "additionalKey": "" };

            console.log("adiAccount => ", adiAccount);
            addCreditsObj.add_credits(liteAccount.url, adiAccount.keyPage, 1000);

        });


        it('Create ADI Token Account of BVN0', function () {
            this.timeout(130000000);

            const adiAccount =  adiTestData.adiAccounts.same_bvn.adi.account1;
            const liteAccount = liteTestData.liteAccounts.same_bvn.account1;

            createNewAdiToken(adiAccount, adiAccount.publicKey, liteAccount);

        });

        it('Create ADI Token Account of BVN1', function () {
            this.timeout(30000);

            const adiAccount = adiTestData.adiAccounts.different_bvn.adi.bvnAccount1;
            const liteAccount = liteTestData.liteAccounts.same_bvn.account1;

            createNewAdiToken(adiAccount, adiAccount.publicKey, liteAccount);

        });

        it('Create ADI Token Account from First ADI', function () {
            this.timeout(30000);

            const adiAccount = adiTestData.adiAccounts.different_bvn.adi.bvnAccount2;
            const liteAccount = liteTestData.liteAccounts.different_bvn.bvnAccount1;

            let addCreditsObj = new addCredits();
            addCreditsObj.add_credits(liteAccount.url, adiAccount.keyPage, 1000);

            let adiTokenObj = new adiToken();
            let newAdiTokenAccount = adiTokenObj.create_adi_token_account(adiAccount);
            console.log("name = ", newAdiTokenAccount);
            sleep(20000);

            let result = commonLib.get_data_by_url(newAdiTokenAccount);
            assert.equal(result.data.url, newAdiTokenAccount, "Is ADI Token Account created successfully?");

        });

        it('Create Custom ADI Token Account of BVN0', function () {
            this.timeout(100000);
            let issuerName = 'TokenIssuerVRG'; //+ commonLib.random_name_generator(5);
            let symbolName = "VRG_TOKENS";

            const adiAccount =  adiTestData.adiAccounts.same_bvn.adi.account0;
            let tokenissuerAccount =  createTokenIssuerAccount(adiAccount, issuerName, symbolName);
            
            createCustomAdiTokenAccount(adiAccount, tokenissuerAccount);
            createCustomAdiTokenAccount(adiAccount, tokenissuerAccount);

        });

        it('Create Custom ADI Token Account of BVN1', function () {
            this.timeout(100000);
            let issuerName = 'TokenIssuerVRG'; //+ commonLib.random_name_generator(5);
            let symbolName = "VRG_TOKENS";

            const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account0;
            let tokenissuerAccount =  createTokenIssuerAccount(adiAccount, issuerName, symbolName);
            createCustomAdiTokenAccount(adiAccount, tokenissuerAccount);

        });



        it('[] Issue Tokens to Custom Lite Token account', function () {
            this.timeout(50000);
            const liteAccount = liteTestData.liteAccounts.same_bvn.account1;
            const adiAccount = adiTestData.adiAccounts.same_bvn.adiToken.customAccount2;
            sendCustomTokens(adiAccount, liteAccount);

            const liteAccount2 = liteTestData.liteAccounts.same_bvn.account2;
            sendCustomTokens(adiAccount, liteAccount2);

        });
       
        it('Create BVN Accounts ', function () {
            this.timeout(150000);
            let sigType = getKeyPassedValue();
            const liteAccount = liteTestData.liteAccounts.different_bvn.bvnAccount0;
            
            let bvn0 = "test-BVN000.acme";

            let keyName = "addKey" + sigType + commonLib.random_name_generator(4).toUpperCase();
            let key1 = commonLib.generate_custom_key(sigType, keyName);

            let bvn0AdiAccount = createNewAdi(liteAccount.url, keyName, "", "",bvn0);

            let bvn0AdiTokenAccount1 = createNewAdiToken(bvn0AdiAccount, bvn0AdiAccount.publicKey, liteAccount);
            let bvn0AdiTokenAccount2 = createNewAdiToken(bvn0AdiAccount, bvn0AdiAccount.publicKey, liteAccount);

            let issuerName = 'TokenIssuerBVN0'; 
            let symbolName = "BVN_TOKENS";
            let tokenissuerAccount =  createTokenIssuerAccount(bvn0AdiAccount, issuerName, symbolName);
            let customAccount1 = createCustomAdiTokenAccount(bvn0AdiAccount, tokenissuerAccount);
            let customAccount2 = createCustomAdiTokenAccount(bvn0AdiAccount, tokenissuerAccount);


            let bvn1 = "test-BVN10.acme";
            const liteAccount2 = liteTestData.liteAccounts.different_bvn.bvnAccount1;

            let keyName1 = "addKey" + sigType + commonLib.random_name_generator(4).toUpperCase();
            let key2 = commonLib.generate_custom_key(sigType, keyName1);
            
            let bvn1AdiAccount = createNewAdi(liteAccount.url, keyName1, "", "",bvn1);

            let bvn1AdiTokenAccount1 = createNewAdiToken(bvn1AdiAccount, bvn1AdiAccount.publicKey, liteAccount2);
            let bvn1AdiTokenAccount2 = createNewAdiToken(bvn1AdiAccount, bvn1AdiAccount.publicKey, liteAccount2);

            let issuerName1 = 'TokenIssuerBVN1'; 
            let symbolName1 = "BVN_TOKENS";
            let tokenissuerAccount1 =  createTokenIssuerAccount(bvn1AdiAccount, issuerName1, symbolName1);
            let customAccount3 = createCustomAdiTokenAccount(bvn1AdiAccount, tokenissuerAccount1);
            let customAccount4 = createCustomAdiTokenAccount(bvn1AdiAccount, tokenissuerAccount1);

            console.log("BVN 0 :");
            console.log("liteAccount:: ", liteAccount);
            console.log("bvnAccount0 ::", bvn0AdiAccount);
            console.log("ADI Token Account 1::", bvn0AdiTokenAccount1);
            console.log("ADI Token Account 2::", bvn0AdiTokenAccount2);
            console.log(" customBvnAccount1 ", customAccount1);
            console.log(" customBvnAccount2", customAccount2);

            console.log("BVN 1 :");
            console.log("liteAccount:: ", liteAccount2);
            console.log("bvnAccount1 ::", bvn1AdiAccount);
            console.log("ADI Token Account 1::", bvn1AdiTokenAccount1);
            console.log("ADI Token Account 2::", bvn1AdiTokenAccount2);
            console.log("customBvnAccount3 ", customAccount3);
            console.log("customBvnAccount4 ", customAccount4);

        });


        //Create 3 lite accounts for "same bvn"
        //Create lite accounts for "different bvn"
        //Update "testLiteAccounts.js" file
        it('Create Test Data LiteAccounts', function () {
            let sigType = getKeyPassedValue();
            let account1 = createLiteAccount(sigType);
            let account2 = createLiteAccount(sigType);
            let account3 = createLiteAccount(sigType);
            console.log("Account details >>>> ", account1, account2, account3);
        });


        it('Create ADI Test Data accounts', function () {
            this.timeout(1500000);
            //Create Lite account
            let sigType = getKeyPassedValue();
            let liteAccount1 = createLiteAccount(sigType);
            console.log("Lite Account 1 ", liteAccount1);

            //Create new Key 
            let keyName = "addKey" + sigType + commonLib.random_name_generator(4).toUpperCase();
            let key1 = commonLib.generate_custom_key(sigType, keyName);

            //Create ADI
            let adiAccount1 = createNewAdi(liteAccount1.url, keyName);

            //Create new ADI Token Account
            let adiTokenAccount1 = createNewAdiToken(adiAccount1, keyName, liteAccount1);

            let keyName2 = "addKey" + sigType + commonLib.random_name_generator(4).toUpperCase();
            let key2 = commonLib.generate_custom_key(sigType, keyName2);
            let adiTokenAccount2 = createNewAdiToken(adiAccount1, keyName2, liteAccount1);

            let issuerName = 'TokenIssuerVRG'; //+ commonLib.random_name_generator(5);
            let symbolName = "VRG_TOKENS";
            let tokenissuerAccount =  createTokenIssuerAccount(adiAccount1, issuerName, symbolName);
            let customAccount1 = createCustomAdiTokenAccount(adiAccount1, tokenissuerAccount);
            let customAccount2 = createCustomAdiTokenAccount(adiAccount1, tokenissuerAccount);
            let customAccount3 = createCustomAdiTokenAccount(adiAccount1, tokenissuerAccount);

            issueTokensToCustomLiteTokenAccount(tokenissuerAccount ,keyName, liteAccount1 );
            
            console.log("Lite Account 1:: ", liteAccount1);
            console.log("ADI Account 1::", adiAccount1);
            console.log("ADI Token Account 1::", adiTokenAccount1);
            console.log("ADI Token Account 2::", adiTokenAccount2);
            console.log("Custom Token Account 1::", customAccount1);
            console.log("Custom Token Account 2::", customAccount2);
            console.log("Custom Token Account 3::", customAccount3);
        });

        it('Test Debug', function () {
            let input = `{\"type\": \"ed25519\", \"publicKey\": \"f8813b896ac1fba6d59ccbe68ed5f212ff26a10f0ef0bc2853f1d3401a578295\", \"signer\": \"b691dce286aa9f9f87b3b71c9d2998aa9bc77f883e04e95d\", \"signerVersion\": 1, \"timestamp\": 1 }`;
            // const output = await exec_cmd("debug.exe", ["encode","signature", "--hash", '{ "type": "ed25519", "publicKey": "f8813b896ac1fba6d59ccbe68ed5f212ff26a10f0ef0bc2853f1d3401a578295", "signer": "b691dce286aa9f9f87b3b71c9d2998aa9bc77f883e04e95d", "signerVersion": 1, "timestamp": 1 }']);
            // let rawdata = fs.readFileSync('test.txt');
            let command = `./debug.exe account route https://beta.testnet.accumulatenetwork.io/v2 acc://automationAdi448.acme​​​​​​`;

            let output = jyothi_exec(command);
            console.log(output);
        });

        it('test sha', async function () {
            console.log("Testing SHA");
            const a = await commonLib.sha256("3442decb12161ce15552ffeb5c229479fd9554583cf792ce2f5a802b53b2179d");
            console.log("Test SHA ", a);

        });


        //Functions
        function createLiteAccount(sigType) {
            let keyName = "TestKey" + sigType + commonLib.random_name_generator(5).toUpperCase();
            // let keyName = "";
            console.log("Create Lite account with signature type :", sigType);

            let result = commonLib.generate_custom_key(sigType, keyName);
            const identity = result.liteAccount.substr(0, result.liteAccount.indexOf("/ACME"));
            let liteAccount = { "name": result.name, "url": result.liteAccount, "identity": identity, "publicKey": result.publicKey, "keyType": result.keyType };
            console.log(" liteAccount :", liteAccount);
            sleep(20000);
            //Add Faucet
            addFaucet(liteAccount.url, liteAccount.url);
            sleep(20000);
            //Add Credits
            addCreditsToAccount(liteAccount.url, liteAccount.url);
            sleep(10000);
            return liteAccount;
        }

        function addFaucet(fromAccount, toAccount) {
            let faucetObj = new faucet();
            for (let index = 0; index < 50; index++) {
                faucetObj.execute_faucet(fromAccount, toAccount);
            }
            sleep(5000);
        }

        function addCreditsToAccount(fromAccount, toAccount, number_of_credits = 0) {
            number_of_credits = (number_of_credits != 0) ? number_of_credits : 10000;
            let addCreditsObj = new addCredits();
            addCreditsObj.add_credits(fromAccount, toAccount, number_of_credits);
            sleep(10000);
        }

        function sendCustomTokens(adiAccount, liteAccount) {
            let tokenIssuer = adiAccount.tokenIssuer;
            const receiverAccount = liteAccount.identity + tokenIssuer.substr(5);

            let signerKey = adiAccount.signerKey;

            //Issue tokens from Issuer to Custom account
            let issueTokenObj = new issueToken();
            issueTokenObj.issue_token(tokenIssuer, signerKey, receiverAccount, 5000);
        }

        function createNewAdi(liteAccount, keyName,keyBookName = "", keyPage = "", newAdiName = "") {
            let adiUtilsObj = new adiUtils();
            let newAdiAccount = adiUtilsObj.create_adi_from_lite_account(liteAccount, keyName,"","", newAdiName);
            sleep(10000);

            //Add Credits to ADI
            addCreditsToAccount(liteAccount, newAdiAccount + "/book/1", 1000);
            sleep(20000);
            let adiData = commonLib.get_data_by_url(newAdiAccount + "/book/1");
            let adiAccount1 = { "name": newAdiAccount, "url": "acc://" + newAdiAccount, "keyBook": adiData.data.keyBook, "keyPage": adiData.data.url, "publicKey": keyName, "additionalKey": "" };
            console.log("ADI Account ::", adiAccount1);
            return adiAccount1;
        }

        function createNewAdiToken(adiAccount, keyName, liteAccountPassed="") {
            let adiTokenObj = new adiToken();
            let newAdiTokenAccount = adiTokenObj.create_adi_token_account(adiAccount);
            console.log("name = ", newAdiTokenAccount);
            sleep(20000);

            let result = commonLib.get_data_by_url(newAdiTokenAccount);
            assert.equal(result.data.url, newAdiTokenAccount, "Is ADI Token Account created successfully?");
            let adiTokenAccount = { "name": newAdiTokenAccount, "signerKey": keyName };
            console.log("ADI Token Account ::", adiTokenAccount);

            const liteAccount = liteTestData.liteAccounts.same_bvn.account2;
            addFaucet(liteAccount.url, liteAccount.url);
            sleep(20000);

            let sendTokensObj = new sendTokens();
            sendTokensObj.send_tokens_using_tx(liteAccount.url, "", -1, -1, adiTokenAccount.name, 500);
            sleep(10000);
            return adiTokenAccount;
        }

        function createTokenIssuerAccount(adiAccount, issuerName, symbolName){
            console.log("issuerName =>", issuerName);
            console.log("symbolName =>", symbolName);
            commonLib.load_credits(adiAccount.keyPage, 5000);
            sleep(10000);

            let tokenIssuerObj = new tokenIssuer();
            const signerKey = adiAccount.publicKey;
            let tokenIssuerAccount = tokenIssuerObj.create_token_issuer(adiAccount, signerKey, issuerName, symbolName, 0, 90000000);

            assert.isTrue(tokenIssuerAccount.url.includes(issuerName), "Is issuer url present");
            assert.equal(tokenIssuerAccount.symbol, symbolName, "Is symbol present");
            return tokenIssuerAccount;
        }

        function createCustomAdiTokenAccount(adiAccount, tokenIssuerAccount) {
            // console.log("issuerName =>", issuerName);
            // console.log("symbolName =>", symbolName);
            // commonLib.load_credits(adiAccount.keyPage, 5000);
            // sleep(10000);

            // let tokenIssuerObj = new tokenIssuer();
            // const signerKey = adiAccount.publicKey;
            // let tokenIssuerAccount = tokenIssuerObj.create_token_issuer(adiAccount, signerKey, issuerName, symbolName, 0, 90000000);

            // assert.isTrue(tokenIssuerAccount.url.includes(issuerName), "Is issuer url present");
            // assert.equal(tokenIssuerAccount.symbol, symbolName, "Is symbol present");

            const signerKey = adiAccount.publicKey;
            
            let adiTokenObj = new adiToken();
            let newAdiToken1 = "CustomToken" + commonLib.random_name_generator(5);
            let adiTokenAccount = adiTokenObj.create_adi_token_account(adiAccount, signerKey, newAdiToken1, tokenIssuerAccount.url);

            let newAdiToken2 = "CustomToken" + commonLib.random_name_generator(5);
            let adiTokenAccount2 = adiTokenObj.create_adi_token_account(adiAccount, signerKey, newAdiToken2, tokenIssuerAccount.url);
            sleep(10000);

            let output = commonLib.get_data_by_url(adiTokenAccount);
            console.log("ADI Token Account Data =>", output.data);
            let customAccount1 = { "keyBook": output.data.keyBook, "url": output.data.url, "tokenIssuer": output.data.tokenUrl, "signerKey": adiAccount.publicKey };

            output = commonLib.get_data_by_url(adiTokenAccount2);
            console.log("ADI Token Account Data =>", output.data);
            let customAccount2 = { "keyBook": output.data.keyBook, "url": output.data.url, "tokenIssuer": output.data.tokenUrl, "signerKey": adiAccount.publicKey };

            let issueTokenObj = new issueToken();
            issueTokenObj.issue_token(customAccount1.tokenIssuer, signerKey, customAccount1.url, 5000);
            issueTokenObj.issue_token(customAccount2.tokenIssuer, signerKey, customAccount2.url, 5000);

            console.log("Custom ADI Token Account 1 =>", customAccount1);
            console.log("Custom ADI Token Account 2 =>", customAccount2);
            return customAccount1;
        }


        function issueTokensToCustomLiteTokenAccount(tokenIssuerAccount, signerKey, liteAccount) {
            console.log(" tokenIssuerAccount =>", tokenIssuerAccount);
            const customLiteAccount = liteAccount + tokenIssuerAccount.url.substr(5);

            let issueTokenObj = new issueToken();
            issueTokenObj.issue_token(tokenIssuerAccount.url, signerKey, customLiteAccount, 5000);

            return customLiteAccount;
        }
    });

});

