import { assert } from 'chai';

import * as commonLib from '../../cli/common.js';
import { sendTokens } from '../../cli/transactions/send_tokens/sendTokens.js';
import { cliConstants } from '../../constants/cliConstants.js';
import adiTestData  from '../../constants/testAdiDataFile.js';
import liteTestData  from '../../constants/testLiteDataFile.js';
import { sleep } from '../../utils/utils.js';

describe('Send Tokens from ADI Token Account Tests', function () {
    describe('With ACME Tokens', function () {
        this.timeout(50000);
        it('[] Verify token transfer from ADI Token Account to ADI Token Account where Amount is an Integer', function () {
            const senderAccount = adiTestData.adiAccounts.same_bvn.adiToken.account1;
            const receiverAccount = adiTestData.adiAccounts.same_bvn.adiToken.account2;
            const tokens_to_transfer = 1;

            successful_transfer(senderAccount.url,senderAccount.signerKey, receiverAccount.url ,tokens_to_transfer);
        });

        it('[]  Verify token transfer from ADI Token Account to ADI Token Account where Amount is Decimal', function () {
            const senderAccount = adiTestData.adiAccounts.same_bvn.adiToken.account1;
            const receiverAccount = adiTestData.adiAccounts.same_bvn.adiToken.account2;
            const tokens_to_transfer = 10.5;

            successful_transfer(senderAccount.url,senderAccount.signerKey,receiverAccount.url ,tokens_to_transfer);
        });

        it('[] Verify token transfer from ADI Token Account to ADI Token Account with insufficient ACME', function () {
            const senderAccount = adiTestData.adiAccounts.same_bvn.adiToken.account1;
            const receiverAccount = adiTestData.adiAccounts.same_bvn.adiToken.account2;
            let sender_old_balance = commonLib.get_token_balance(senderAccount.url);
            const tokens_to_transfer = sender_old_balance + 100;

            let sendTokensObj = new sendTokens();
            let output = sendTokensObj.send_tokens_using_tx(senderAccount.url,senderAccount.signerKey, -1,-1, receiverAccount.url, tokens_to_transfer);
            sleep(10000);

            console.log("output -->", output);
            assert.isTrue(output.error.message.includes(cliConstants.ERROR_INSUFFICIENT_BALANCE), "Error occurred");
        });


        // /****************************************************************************************** */
        // //From ADI Token account to LTA tests
        it('[] Verify token transfer from ADI Token account to LTA where Amount is an Integer', function () {
            const senderAccount = adiTestData.adiAccounts.same_bvn.adiToken.account1;
            const receiverAccount = liteTestData.liteAccounts.same_bvn.account1;
            const tokens_to_transfer = 10;

            successful_transfer(senderAccount.url,senderAccount.signerKey, receiverAccount.url ,tokens_to_transfer);
        });

        it('[] Verify token transfer from ADI Token account to LTA where Amount is Decimal', function () {
            const senderAccount = adiTestData.adiAccounts.same_bvn.adiToken.account1;
            const receiverAccount = liteTestData.liteAccounts.same_bvn.account1;
            const tokens_to_transfer = 1.5;

            successful_transfer(senderAccount.url,senderAccount.signerKey, receiverAccount.url ,tokens_to_transfer);
        });

        it('[] Verify token transfer from ADI Token Account to LTA with insufficient ACME', function () {
            const senderAccount = adiTestData.adiAccounts.same_bvn.adiToken.account1;
            const receiverAccount = liteTestData.liteAccounts.same_bvn.account1;
            let sender_old_balance = commonLib.get_token_balance(senderAccount.url);
            const tokens_to_transfer = sender_old_balance + 100;

            let sendTokensObj = new sendTokens();
            let output = sendTokensObj.send_tokens_using_tx(senderAccount.url,senderAccount.signerKey, -1,-1, receiverAccount.url, tokens_to_transfer);
            sleep(10000);

            console.log("output -->", output);
            assert.isTrue(output.error.message.includes(cliConstants.ERROR_INSUFFICIENT_BALANCE), "Error occurred");
        });

        function successful_transfer(fromAccount, signerKey, toAccount, tokens_to_transfer ) {

            let sender_old_balance = commonLib.get_token_balance(fromAccount);
            let receiver_old_balance = commonLib.get_token_balance(toAccount);
            console.log("old_balance =", sender_old_balance);
            console.log("receiver_old_balance =", receiver_old_balance);

            let sendTokensObj = new sendTokens();
            sendTokensObj.send_tokens_using_tx(fromAccount, signerKey, -1,-1, toAccount, tokens_to_transfer);
            sleep(10000);

            let sender_new_balance = commonLib.get_token_balance(fromAccount);
            let receiver_new_balance = commonLib.get_token_balance(toAccount);
            console.log("new_balance =", sender_new_balance);
            console.log("receiver_new_balance =", receiver_new_balance);
            console.log("Difference =", (sender_old_balance - sender_new_balance));
            
            assert.isTrue((sender_old_balance - sender_new_balance) / 100000000 == Number(tokens_to_transfer), "Is Tokens deducted from sender as expected");
            assert.isTrue(receiver_new_balance == (receiver_old_balance + Number(tokens_to_transfer) * 100000000 ), "Is Tokens received as expected");
        };

        function failed_transfer(account,tokens_to_burn ) {
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
    });

});

