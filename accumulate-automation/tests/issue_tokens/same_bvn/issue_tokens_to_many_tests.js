import { assert } from 'chai';

import * as commonLib from '../../../cli/common.js';
import adiTestData  from '../../../constants/testAdiDataFile.js';
import { transaction } from '../../../cli/transactions/tx/transaction.js';
import { sleep } from '../../../utils/utils.js';

describe('Issue Tokens To Multiple accounts Tests', function () {
    describe('With ACME Tokens', function () {
        this.timeout(50000);
        it('[] Verify issue tokens from ADI Token to multiple accounts', function () {
            const account1 = adiTestData.adiAccounts.same_bvn.adiToken.customAccount1;
            const receiverAccount1 = adiTestData.adiAccounts.same_bvn.adiToken.customAccount2;
            const receiverAccount2 = adiTestData.adiAccounts.same_bvn.adiToken.customAccount4;
            const tokenIssuer = account1.tokenIssuer;
            const signerKey = account1.signerKey;
            const tokensForAccount1 = 5;
            const tokensForAccount2 = 5;

            multiple_accounts(tokenIssuer, account1.signerKey, receiverAccount1.url, receiverAccount2.url,tokensForAccount1, tokensForAccount2);
        });

        function multiple_accounts(tokenIssuer, signerKey, toAccount1, toAccount2, tokens_to_toAccount1, tokens_to_toAccount2  ) {

            let output = commonLib.get_data_by_url(tokenIssuer);
            assert.isTrue(tokenIssuer == output.data.url, "Is Token issuer present");
            const issuedTokensBefore = Number(output.data.issued);
            const supplyLimit = Number(output.data.supplyLimit);
            assert.isTrue(supplyLimit > tokens_to_toAccount1, "Is sufficient tokens available to issue?");

            output = commonLib.get_data_by_url(toAccount1);
            const accountBalanceBeforeIssue1 = output.data.balance;

            output = commonLib.get_data_by_url(toAccount2);
            const accountBalanceBeforeIssue2 = output.data.balance;

            //Issue tokens from Issuer to Custom account
            let payload = commonLib.construct_issue_tokens_payload(toAccount1, toAccount2, tokens_to_toAccount1, tokens_to_toAccount2);
            sleep(5000);
  
            let transactionObj = new transaction();
            transactionObj.execute(tokenIssuer, signerKey, payload);
            sleep(10000);

            output = commonLib.get_data_by_url(tokenIssuer);
            const issuedTokensAfter = Number(output.data.issued);
            output = commonLib.get_data_by_url(toAccount1);
            const accountBalanceAfterIssue1 = output.data.balance;
            output = commonLib.get_data_by_url(toAccount2);
            const accountBalanceAfterIssue2 = output.data.balance;

            console.log("issuedTokensBefore ->", issuedTokensBefore);
            console.log("issuedTokensAfter ->", issuedTokensAfter);
            console.log("accountBalanceBeforeIssue1 ->", accountBalanceBeforeIssue1);
            console.log("accountBalanceAfterIssue1 ->", accountBalanceAfterIssue1);
            console.log("accountBalanceBeforeIssue2 ->", accountBalanceBeforeIssue2);
            console.log("accountBalanceAfterIssue2 ->", accountBalanceAfterIssue2);

            assert.isTrue((issuedTokensBefore + tokens_to_toAccount1 + tokens_to_toAccount2) == issuedTokensAfter, "Is correct tokens issued by Issuer");
            assert.isTrue(Number(accountBalanceBeforeIssue1) + Number(tokens_to_toAccount1) == Number(accountBalanceAfterIssue1), "Tokens credited successfully");
            assert.isTrue(Number(accountBalanceBeforeIssue2) + Number(tokens_to_toAccount2) == Number(accountBalanceAfterIssue2), "Tokens credited successfully");

        };
    });

});

