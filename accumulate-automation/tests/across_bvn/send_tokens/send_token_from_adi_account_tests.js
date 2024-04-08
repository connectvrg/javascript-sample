import { assert } from 'chai';

import * as commonLib from '../../../cli/common.js';
import { sendTokens } from '../../../cli/transactions/send_tokens/sendTokens.js';
import { cliConstants } from '../../../constants/cliConstants.js';
import adiTestData  from '../../../constants/testAdiDataFile.js';
import liteTestData  from '../../../constants/testLiteDataFile.js';
import { sleep } from '../../../utils/utils.js';

describe('Different BVN Accounts - Send Tokens from ADI Token Account Tests', function () {
    describe('With ACME Tokens', function () {
        this.timeout(50000);
        it('[Different BVN] Verify token transfer from ADI Token Account to ADI Token Account', function () {
            const senderAccount = adiTestData.adiAccounts.different_bvn.adiToken.bvnAccount0;
            const receiverAccount = adiTestData.adiAccounts.different_bvn.adiToken.bvnAccount1;
            const tokens_to_transfer = 100;

            let sender_old_balance = commonLib.get_token_balance(senderAccount.url);
            let receiver_old_balance = commonLib.get_token_balance(receiverAccount.url);
            console.log("old_balance =", sender_old_balance);
            console.log("receiver_old_balance =", receiver_old_balance);

            let sendTokensObj = new sendTokens();
            sendTokensObj.send_tokens_using_tx(senderAccount.url, senderAccount.signerKey, -1,-1, receiverAccount.url, tokens_to_transfer);
            sleep(10000);

            let sender_new_balance = commonLib.get_token_balance(senderAccount.url);
            let receiver_new_balance = commonLib.get_token_balance(receiverAccount.url);
            console.log("new_balance =", sender_new_balance);
            console.log("receiver_new_balance =", receiver_new_balance);
            console.log("Difference =", (sender_old_balance - sender_new_balance));
            
            assert.isTrue((sender_old_balance - sender_new_balance) / 100000000 == Number(tokens_to_transfer), "Is Tokens deducted from sender as expected");
            assert.isTrue(receiver_new_balance == (receiver_old_balance + Number(tokens_to_transfer) * 100000000 ), "Is Tokens received as expected");
    
        });

        it('[Different BVN] Verify token transfer from Custom ADI Token Account to Custom ADI Token Account in BVN0', function () {
            const senderAccount = adiTestData.adiAccounts.different_bvn.customToken.customBvnAccount1;
            const receiverAccount = adiTestData.adiAccounts.different_bvn.customToken.customBvnAccount2;
            const tokens_to_transfer = 2;

            successful_transfer(senderAccount.url, senderAccount.signerKey, receiverAccount.url, tokens_to_transfer);
        });

        it('[Different BVN] Verify token transfer from Custom ADI Token Account to Custom ADI Token Account in BVN1', function () {
            const senderAccount = adiTestData.adiAccounts.different_bvn.customToken.customBvnAccount2;
            const receiverAccount = adiTestData.adiAccounts.different_bvn.customToken.customBvnAccount4;
            const tokens_to_transfer = 2;

            successful_transfer(senderAccount.url, senderAccount.signerKey, receiverAccount.url, tokens_to_transfer);
        });

        it('[Different BVN] Verify token transfer from Custom ADI Token account to Custom LTA', function () {
            const tokens_to_transfer = 1;

            const senderAccount = adiTestData.adiAccounts.different_bvn.customToken.customBvnAccount1;
            const account2 =liteTestData.liteAccounts.different_bvn.bvnAccount0;
            const issuer=senderAccount.tokenIssuer;
            const receiverAccount = account2.identity + issuer.substr(5);

            successful_transfer(senderAccount.url, senderAccount.signerKey, receiverAccount, tokens_to_transfer);

        });

        function successful_transfer(fromAccount, signerKey, toAccount, tokens_to_transfer) {

            let sender_old_balance = commonLib.get_token_balance(fromAccount);
            let receiver_old_balance = commonLib.get_token_balance(toAccount);

            let sendTokensObj = new sendTokens();
            sendTokensObj.send_tokens_using_tx(fromAccount, signerKey, -1, -1, toAccount, tokens_to_transfer);
            sleep(20000);

            let sender_new_balance = commonLib.get_token_balance(fromAccount);
            let receiver_new_balance = commonLib.get_token_balance(toAccount);
            console.log("sender_old_balance =", sender_old_balance);
            console.log("sender_new_balance =", sender_new_balance);
            console.log("receiver_old_balance =", receiver_old_balance);
            console.log("receiver_new_balance =", receiver_new_balance);
            console.log("Difference =", (sender_old_balance - sender_new_balance));

            assert.isTrue((sender_old_balance - sender_new_balance) == Number(tokens_to_transfer), "Is Tokens deducted from sender as expected");
            assert.equal(receiver_new_balance, (receiver_old_balance + Number(tokens_to_transfer)), "Is Tokens received as expected");
        };

       
    });

});

