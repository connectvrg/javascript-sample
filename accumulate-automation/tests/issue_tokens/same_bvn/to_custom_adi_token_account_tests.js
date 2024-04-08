import { assert } from 'chai';
import { sleep } from '../../../utils/utils.js';
import { cliConstants } from '../../../constants/cliConstants.js';
import adiTestData  from '../../../constants/testAdiDataFile.js';

import * as commonLib from '../../../cli/common.js';
import { issueToken } from '../../../cli/transactions/issue_token/issueToken.js';

describe('ADI Token Account URL (Token Issuer URL) issuing to a Custom ADI Token Account', function () {
    describe('', function () {
        this.timeout(50000);
        it('[] Verify issuing tokens to Custom ADI Token Account where Amount is a whole number', function () {
            const account = adiTestData.adiAccounts.same_bvn.adiToken.customAccount2;
            const account2 = adiTestData.adiAccounts.same_bvn.adiToken.customAccount4;
            const tokenIssuer = account.tokenIssuer;
            const signerKey = account.signerKey;
            const customAdiTokenAccount = account2.url;
            const tokensToIssue = 5;

            success_scenario(tokenIssuer, signerKey, customAdiTokenAccount, tokensToIssue);
        });

        //Failed
        it('[] Verify issuing tokens to Custom ADI Token Account where Amount is a decimal', function () {
            const account = adiTestData.adiAccounts.same_bvn.adiToken.customAccount4;
            const account2 = adiTestData.adiAccounts.same_bvn.adiToken.customAccount2;
            const tokenIssuer = account.tokenIssuer;
            const signerKey = account.signerKey;
            const customAdiTokenAccount = account2.url;
            const tokensToIssue = 2;

            success_scenario(tokenIssuer, signerKey, customAdiTokenAccount, tokensToIssue);
        });

        it.skip('[] Verify issuing tokens to Custom ADI Token Account with insufficient tokens', function () {
            const account = adiTestData.adiAccounts.same_bvn.adiToken.customAccount6;
            const account2 = adiTestData.adiAccounts.same_bvn.adiToken.customAccount5;
            const tokenIssuer = account.tokenIssuer;
            const signerKey = account.signerKey;
            const receiverAccount = account2.url;
           
            let output = commonLib.get_data_by_url(tokenIssuer);
            assert.isTrue(tokenIssuer == output.data.url, "Is Token issuer present");
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
            console.log("supplyLimit =>", supplyLimit);
            console.log("tokensToIssue =>", tokensToIssue);
            assert.isTrue(supplyLimit > tokensToIssue, "Is sufficient tokens available to issue?");
            sleep(10000);

            output = commonLib.get_data_by_url(receiverAccount);
            const accountBalanceBeforeIssue = output.data.balance;

            //Issue tokens from Issuer to Custom account
            let issueTokenObj = new issueToken();
            issueTokenObj.issue_token(tokenIssuer, signerKey, receiverAccount, tokensToIssue);
            sleep(10000);

            output = commonLib.get_data_by_url(tokenIssuer);
            const issuedTokensAfter = Number(output.data.issued);
            output = commonLib.get_data_by_url(receiverAccount);
            const accountBalanceAfterIssue = output.data.balance;

            console.log("issuedTokensBefore ->", issuedTokensBefore);
            console.log("issuedTokensAfter ->", issuedTokensAfter);
            console.log("accountBalanceBeforeIssue ->", accountBalanceBeforeIssue);
            console.log("accountBalanceAfterIssue ->", accountBalanceAfterIssue);

            assert.isTrue((issuedTokensBefore + tokensToIssue) == issuedTokensAfter, "Is correct tokens issued by Issuer");
            assert.isTrue(Number(accountBalanceBeforeIssue) + Number(tokensToIssue) == Number(accountBalanceAfterIssue), "Tokens credited successfully");
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

