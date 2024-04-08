import { assert } from 'chai';
import { execute, exec_cmd, jyothi_exec, sleep } from '../../../utils/utils.js';
import { cliConstants } from '../../../constants/cliConstants.js';
import adiTestData  from '../../../constants/testAdiDataFile.js';
import liteTestData  from '../../../constants/testLiteDataFile.js';
import * as commonLib from '../../../cli/common.js';
import { issueToken } from '../../../cli/transactions/issue_token/issueToken.js';

describe('ADI Token Account URL (Token Issuer URL) issuing to a Custom Lite Token Account', function () {
    describe('', function () {
        this.timeout(80000);
        it('[] Verify issuing tokens to Custom Lite Token Account where Amount is a whole number', function () {
            const account = adiTestData.adiAccounts.same_bvn.adiToken.customAccount6;
       
            const tokenIssuer = account.tokenIssuer;
            const signerKey = account.signerKey;
            const tokensToIssue = 1;

            const account2 = liteTestData.liteAccounts.same_bvn.account2;
            const receiverAccount = account2.identity + tokenIssuer.substr(5);
            console.log("receiverAccount ->" , receiverAccount);
            success_scenario(tokenIssuer, signerKey, receiverAccount, tokensToIssue);
        });

        //Failed
        it('[] Verify issuing tokens to Custom Lite Token Account where Amount is a decimal', function () {
            const account = adiTestData.adiAccounts.same_bvn.adiToken.customAccount6;
       
            const tokenIssuer = account.tokenIssuer;
            const signerKey = account.signerKey;
            const tokensToIssue = 2;

            const account2 = liteTestData.liteAccounts.same_bvn.account2;
            const receiverAccount = account2.identity + tokenIssuer.substr(5);
            console.log("receiverAccount ->" , receiverAccount);
            success_scenario(tokenIssuer, signerKey, receiverAccount, tokensToIssue);
        });

        it.skip('[] Verify issuing tokens to Custom Lite Token Account with insufficient tokens', function () {
            const account = adiTestData.adiAccounts.same_bvn.adiToken.customAccount6;
            const tokenIssuer = account.tokenIssuer;
            const signerKey = account.signerKey;
           
            const account2 = liteTestData.liteAccounts.same_bvn.account1;
            const receiverAccount = account2.identity + tokenIssuer.substr(5);
           
            let output = commonLib.get_data_by_url(tokenIssuer);
            // assert.isTrue(tokenIssuer == output.data.url, "Is Token issuer present");
            const supplyLimit = Number(output.data.supplyLimit);
            const tokensToIssue = supplyLimit + 10;

            let issueTokenObj = new issueToken();
            let result = issueTokenObj.issue_token(tokenIssuer, signerKey, receiverAccount, tokensToIssue);
            sleep(10000);
            console.log("result =>", result);
            assert.equal(result.error.message,cliConstants.ERROR_SUPPLY_LIMIT, "Supply Limit Error Displayed");
        });


        function success_scenario(tokenIssuer, signerKey, receiverAccount, tokensToIssue) {
            let output = commonLib.get_data_by_url(tokenIssuer);
            assert.isTrue(tokenIssuer == output.data.url, "Is Token issuer present");
            const issuedTokensBefore = Number(output.data.issued);
            const supplyLimit = Number(output.data.supplyLimit);
            assert.isTrue(supplyLimit > tokensToIssue, "Is sufficient tokens available to issue?");

            output = commonLib.get_data_by_url(receiverAccount);
            console.log(">>>> output ", output);
            // const accountBalanceBeforeIssue = output.data.balance;

            //Issue tokens from Issuer to Custom account
            let issueTokenObj = new issueToken();
            issueTokenObj.issue_token(tokenIssuer, signerKey, receiverAccount, tokensToIssue);
            sleep(20000);

            output = commonLib.get_data_by_url(tokenIssuer);
            const issuedTokensAfter = Number(output.data.issued);
            output = commonLib.get_data_by_url(receiverAccount);
            const accountBalanceAfterIssue = output.data.balance;

            console.log("issuedTokensBefore ->", issuedTokensBefore);
            console.log("issuedTokensAfter ->", issuedTokensAfter);
            // console.log("accountBalanceBeforeIssue ->", accountBalanceBeforeIssue);
            console.log("accountBalanceAfterIssue ->", accountBalanceAfterIssue);

            assert.isTrue((issuedTokensBefore + tokensToIssue) == issuedTokensAfter, "Is correct tokens issued by Issuer");
            // assert.isTrue(Number(accountBalanceBeforeIssue) + Number(tokensToIssue) == Number(accountBalanceAfterIssue), "Tokens credited successfully");
        };

        function failure_scenario(tokenIssuer, signerKey, receiverAccount, tokensToIssue) {
            let output = commonLib.get_data_by_url(receiverAccount);
            const accountBalanceBeforeIssue = output.data.balance;

            //Issue tokens from Issuer to Custom account
            let issueTokenObj = new issueToken();
            let result = issueTokenObj.issue_token(tokenIssuer, signerKey, receiverAccount, tokensToIssue);
            sleep(10000);
            console.log("result =>", result);
            ERROR_SUPPLY_LIMIT

            // output = commonLib.get_data_by_url(tokenIssuer);
            // const issuedTokensAfter = Number(output.data.issued);
            // output = commonLib.get_data_by_url(receiverAccount);
            // const accountBalanceAfterIssue = output.data.balance;

            // console.log("issuedTokensBefore ->", issuedTokensBefore);
            // console.log("issuedTokensAfter ->", issuedTokensAfter);
            // console.log("accountBalanceBeforeIssue ->", accountBalanceBeforeIssue);
            // console.log("accountBalanceAfterIssue ->", accountBalanceAfterIssue);

            // assert.isTrue((issuedTokensBefore + tokensToIssue) == issuedTokensAfter, "Is correct tokens issued by Issuer");
            // assert.isTrue(Number(accountBalanceBeforeIssue) + Number(tokensToIssue) == Number(accountBalanceAfterIssue), "Tokens credited successfully");
        };
    });


});

