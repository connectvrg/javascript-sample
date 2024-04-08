import { assert } from 'chai';

import * as commonLib from '../../../cli/common.js';
import { sendTokens } from '../../../cli/transactions/send_tokens/sendTokens.js';
import { cliConstants } from '../../../constants/cliConstants.js';
import adiTestData  from '../../../constants/testAdiDataFile.js';
import liteTestData  from '../../../constants/testLiteDataFile.js';
import { sleep } from '../../../utils/utils.js';

describe('Send Tokens from Lite Token Account Tests', function () {
    describe('With ACME Tokens', function () {
        this.timeout(50000);
        it('[Different BVN] Verify token transfer from LTA to LTA ', function () {
            const senderAccount = liteTestData.liteAccounts.different_bvn.bvnAccount0;
            const receiverAccount = liteTestData.liteAccounts.different_bvn.bvnAccount1;
            const tokens_to_transfer = 10;

            let sender_old_balance = commonLib.get_token_balance(senderAccount.url);
            let receiver_old_balance = commonLib.get_token_balance(receiverAccount.url);
            console.log("old_balance =", sender_old_balance);
            console.log("receiver_old_balance =", receiver_old_balance);

            let sendTokensObj = new sendTokens();
            sendTokensObj.send_tokens_using_tx(senderAccount.url, "", -1,-1, receiverAccount.url, tokens_to_transfer);
            sleep(10000);

            let sender_new_balance = commonLib.get_token_balance(senderAccount.url);
            let receiver_new_balance = commonLib.get_token_balance(receiverAccount.url);
            console.log("new_balance =", sender_new_balance);
            console.log("receiver_new_balance =", receiver_new_balance);
            console.log("Difference =", (sender_old_balance - sender_new_balance));
            
            assert.isTrue((sender_old_balance - sender_new_balance) / 100000000 == Number(tokens_to_transfer), "Is Tokens deducted from sender as expected");
            assert.isTrue(receiver_new_balance == (receiver_old_balance + Number(tokens_to_transfer) * 100000000 ), "Is Tokens received as expected");

        });

        it('[Different BVN] Verify token transfer from Custom Lite Token Account to Custom Lite Token Account ', function () {
            const tokens_to_transfer = 1;
            const customAdiTokenAccount1 = adiTestData.adiAccounts.different_bvn.customToken.customBvnAccount1;
            const customAdiTokenAccount2= adiTestData.adiAccounts.different_bvn.customToken.customBvnAccount2;

            const account1 = liteTestData.liteAccounts.different_bvn.bvnAccount0;
            const senderAccount = account1.identity + customAdiTokenAccount1.tokenIssuer.substr(5);
            const account2 = liteTestData.liteAccounts.different_bvn.bvnAccount1;
            const receiverAccount = account2.identity + customAdiTokenAccount2.tokenIssuer.substr(5);

            successful_transfer_1(senderAccount, "", receiverAccount, tokens_to_transfer);
        });

        it('[Different BVN] Verify token transfer from LTA to ADI Token account', function () {
            const senderAccount = liteTestData.liteAccounts.different_bvn.bvnAccount0;
            const receiverAccount = adiTestData.adiAccounts.different_bvn.adiToken.bvnAccount1;
            const tokens_to_transfer = 100;

            successful_transfer_2(senderAccount.url,"", receiverAccount.url ,tokens_to_transfer);
        });

        function successful_transfer_1(fromAccount, signerKey="", toAccount, tokens_to_transfer) {

            let sender_old_balance = commonLib.get_token_balance(fromAccount);
            let receiver_old_balance = commonLib.get_token_balance(toAccount);

            assert.isTrue(sender_old_balance > tokens_to_transfer , "Sender has sufficient tokens for transfer");
            
            let sendTokensObj = new sendTokens();
            sendTokensObj.send_tokens_using_tx(fromAccount, signerKey, -1, -1, toAccount, tokens_to_transfer);
            sleep(10000);

            let sender_new_balance = commonLib.get_token_balance(fromAccount);
            let receiver_new_balance = commonLib.get_token_balance(toAccount);
            printLogs(sender_old_balance, sender_new_balance, receiver_old_balance, receiver_new_balance);

            assert.isTrue((sender_old_balance - sender_new_balance)  == Number(tokens_to_transfer), "Is Tokens deducted from sender as expected");
            assert.isTrue(receiver_new_balance == (receiver_old_balance + Number(tokens_to_transfer) ), "Is Tokens received as expected");
           };

           function successful_transfer_2(fromAccount, signerKey="", toAccount, tokens_to_transfer) {

            let sender_old_balance = commonLib.get_token_balance(fromAccount);
            let receiver_old_balance = commonLib.get_token_balance(toAccount);

            assert.isTrue(sender_old_balance > tokens_to_transfer , "Sender has sufficient tokens for transfer");
            
            let sendTokensObj = new sendTokens();
            sendTokensObj.send_tokens_using_tx(fromAccount, signerKey, -1, -1, toAccount, tokens_to_transfer);
            sleep(10000);

            let sender_new_balance = commonLib.get_token_balance(fromAccount);
            let receiver_new_balance = commonLib.get_token_balance(toAccount);
            printLogs(sender_old_balance, sender_new_balance, receiver_old_balance, receiver_new_balance);

            assert.isTrue((sender_old_balance - sender_new_balance) / 100000000 == Number(tokens_to_transfer), "Is Tokens deducted from sender as expected");
            assert.isTrue(receiver_new_balance == (receiver_old_balance + Number(tokens_to_transfer) * 100000000 ), "Is Tokens received as expected");
           };
           
           function printLogs(sender_old_balance, sender_new_balance, receiver_old_balance, receiver_new_balance){
            console.log("sender_old_balance =", sender_old_balance);
            console.log("sender_new_balance =", sender_new_balance);
            console.log("receiver_old_balance =", receiver_old_balance);
            console.log("receiver_new_balance =", receiver_new_balance);
            console.log("Difference =", (sender_old_balance - sender_new_balance));

           }
    });

});

