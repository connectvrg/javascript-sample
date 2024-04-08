import { assert } from 'chai';

import * as commonLib from '../../cli/common.js';
import { sendTokens } from '../../cli/transactions/send_tokens/sendTokens.js';
import { cliConstants } from '../../constants/cliConstants.js';
import adiTestData  from '../../constants/testAdiDataFile.js';
import liteTestData  from '../../constants/testLiteDataFile.js';
import { sleep } from '../../utils/utils.js';

describe('Send Tokens from Custom Lite Token Account Tests', function () {
    describe('With Custom Tokens', function () {
        this.timeout(50000);
        it('[] Verify token transfer from Custom Lite Token Account to Custom Lite Token Account where Amount is an Integer', function () {
            const tokens_to_transfer = 1;
            lta_to_lta_transfer(tokens_to_transfer);
        });

        //Failed
        it.skip('[]  Verify token transfer from Custom Lite Token Account to Custom Lite Token Account where Amount is Decimal', function () {
            const tokens_to_transfer = 1.5;
            lta_to_lta_transfer(tokens_to_transfer);
        });

        it('[] Verify token transfer from Custom Lite Token Account to Custom Lite Token Account with insufficient Tokens', function () {
            const customAdiTokenAccount = adiTestData.adiAccounts.same_bvn.adiToken.customAccount2;

            const account1 = liteTestData.liteAccounts.same_bvn.account1;
            const senderAccount = account1.identity + customAdiTokenAccount.tokenIssuer.substr(5);
            const account2 = liteTestData.liteAccounts.same_bvn.account2;
            const receiverAccount = account2.identity + customAdiTokenAccount.tokenIssuer.substr(5);

            let sender_old_balance = commonLib.get_token_balance(senderAccount);
            const tokens_to_transfer = sender_old_balance + 5;

            let sendTokensObj = new sendTokens();
            let output = sendTokensObj.send_tokens_using_tx(senderAccount, "", -1, -1, receiverAccount, tokens_to_transfer);
            sleep(10000);

            console.log("output -->", output);
            assert.isTrue(output.error.message.includes(cliConstants.ERROR_INSUFFICIENT_BALANCE), "Error occurred");
        });


        /****************************************************************************************** */
      
        //From Custom Lite Token account to Custom ADI Token Account tests
        it('[] Verify token transfer from Custom Lite Token account to Custom ADI Token Account where Amount is an Integer', function () {
            const tokens_to_transfer = 1;
            lta_to_adi_transfer(tokens_to_transfer);
        });

        //Decimal values are NOT considered
        it.skip('[] Verify token transfer from Custom Lite Token account to Custom ADI Token Account where Amount is Decimal', function () {
            const tokens_to_transfer = 1.5;
            lta_to_adi_transfer(tokens_to_transfer);
        });

        it('[] Verify token transfer from Custom Lite Token Account to Custom ADI Token Account with insufficient ACME', function () {
            const customAccount = adiTestData.adiAccounts.same_bvn.adiToken.customAccount2;

            const account1 = liteTestData.liteAccounts.same_bvn.account1;
            const customLiteTokenAccount = account1.identity + customAccount.tokenIssuer.substr(5);
            const customAdiTokenAccount = customAccount.url;

            let sender_token_balance = commonLib.get_token_balance(customLiteTokenAccount);
            const tokens_to_transfer = sender_token_balance + 10;

            let sendTokensObj = new sendTokens();
            let output = sendTokensObj.send_tokens_using_tx(customLiteTokenAccount, "", -1, -1, customAdiTokenAccount, tokens_to_transfer);
            sleep(10000);

            console.log("output -->", output);
            assert.isTrue(output.error.message.includes(cliConstants.ERROR_INSUFFICIENT_BALANCE), "Error occurred");
        });

        function successful_transfer(fromAccount, signerKey="", toAccount, tokens_to_transfer) {

            let sender_old_balance = commonLib.get_token_balance(fromAccount);
            let receiver_old_balance = commonLib.get_token_balance(toAccount);

            console.log("sender_old_balance+tokens_to_transfer =>",sender_old_balance+tokens_to_transfer);
            console.log("sender_old_balance =>",  sender_old_balance);
            assert.isTrue(sender_old_balance > tokens_to_transfer , "Sender has sufficient tokens for transfer");
            
            let sendTokensObj = new sendTokens();
            sendTokensObj.send_tokens_using_tx(fromAccount, signerKey, -1, -1, toAccount, tokens_to_transfer);
            sleep(20000);

            let sender_new_balance = commonLib.get_token_balance(fromAccount);
            let receiver_new_balance = commonLib.get_token_balance(toAccount);
            console.log("sender_old_balance =", sender_old_balance);
            console.log("sender_new_balance =", sender_new_balance);
            console.log("Difference =", (sender_old_balance - sender_new_balance));

            assert.isTrue((sender_old_balance - sender_new_balance) == Number(tokens_to_transfer), "Is Tokens deducted from sender as expected");
            assert.isTrue(receiver_new_balance == (receiver_old_balance + Number(tokens_to_transfer)), "Is Tokens received as expected");
        };

        function failed_transfer(account, tokens_to_burn) {
            let old_balance = commonLib.get_token_balance(account);
            console.log("old_balance =", old_balance);

            let burnTokenObj = new burnToken();
            let output = burnTokenObj.burn_token(account, "", tokens_to_burn);
            console.log("Output >>>>>>", output);

            // let new_balance = commonLib.get_token_balance(account);
            // console.log("new_balance =", new_balance);

            // assert.isTrue(old_credits == new_credits, "No change is receiver credits?");
            // assert.strictEqual(result.error,cliConstants.ERROR_INSUFFICIENT_ACME);
        };

        function lta_to_lta_transfer(tokens_to_transfer){
            const customAdiTokenAccount = adiTestData.adiAccounts.same_bvn.adiToken.customAccount1;
            const customAdiTokenAccount2 = adiTestData.adiAccounts.same_bvn.adiToken.customAccount2;

            const account1 = liteTestData.liteAccounts.same_bvn.account1;
            const senderAccount = account1.identity + customAdiTokenAccount.tokenIssuer.substr(5);
            const account2 = liteTestData.liteAccounts.same_bvn.account2;
            const receiverAccount = account2.identity + customAdiTokenAccount2.tokenIssuer.substr(5);

            successful_transfer(senderAccount, "", receiverAccount, tokens_to_transfer);
   
        };

        function lta_to_adi_transfer(tokens_to_transfer){
            const customAccount = adiTestData.adiAccounts.same_bvn.adiToken.customAccount2;

            const account1 = liteTestData.liteAccounts.same_bvn.account1;
            const customLiteTokenAccount = account1.identity + customAccount.tokenIssuer.substr(5);
            // const account2 = customAdiTokenAccount;
            const customAdiTokenAccount = customAccount.url;

            successful_transfer(customLiteTokenAccount, "", customAdiTokenAccount, tokens_to_transfer);
        };
    });

});

