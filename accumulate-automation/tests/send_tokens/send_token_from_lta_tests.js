import { assert } from 'chai';

import * as commonLib from '../../cli/common.js';
import { sendTokens } from '../../cli/transactions/send_tokens/sendTokens.js';
import { cliConstants } from '../../constants/cliConstants.js';
import adiTestData  from '../../constants/testAdiDataFile.js';
import { transaction } from '../../cli/transactions/tx/transaction.js';
import liteTestData  from '../../constants/testLiteDataFile.js';
import { sleep } from '../../utils/utils.js';

describe('Send Tokens from Lite Token Account Tests', function () {
    describe('With ACME Tokens', function () {
        this.timeout(50000);
        it('[] Verify token transfer from LTA to LTA where Amount is an Integer', function () {
            const senderAccount = liteTestData.liteAccounts.same_bvn.account1;
            const receiverAccount = liteTestData.liteAccounts.same_bvn.account2;
            const tokens_to_transfer = 1;

            successful_transfer(senderAccount.url,receiverAccount.url ,tokens_to_transfer);
        });

        it('[] Verify token transfer from LTA to LTA where Amount is Decimal', function () {
            const senderAccount = liteTestData.liteAccounts.same_bvn.account1;
            const receiverAccount = liteTestData.liteAccounts.same_bvn.account2;
            const tokens_to_transfer = 10.5;

            successful_transfer(senderAccount.url,receiverAccount.url ,tokens_to_transfer);
        });

        it('[] Verify token transfer from LTA to LTA with insufficient ACME', function () {
            const senderAccount = liteTestData.liteAccounts.same_bvn.account3;
            const receiverAccount = liteTestData.liteAccounts.same_bvn.account2;
            let sender_old_balance = commonLib.get_token_balance(senderAccount.url);
            const tokens_to_transfer = sender_old_balance + 100;

            let sendTokensObj = new sendTokens();
            let output = sendTokensObj.send_tokens_using_tx(senderAccount.url, "", -1,-1, receiverAccount.url, tokens_to_transfer);
            sleep(10000);

            console.log("output -->", output);
            assert.isTrue(output.error.message.includes(cliConstants.ERROR_INSUFFICIENT_BALANCE), "Error occurred");
        });

        /****************************************************************************************** */
        //From LTA to ADI account tests
        it('[] Verify token transfer from LTA to ADI account where Amount is an Integer', function () {
            const senderAccount = liteTestData.liteAccounts.same_bvn.account2;
            const receiverAccount = adiTestData.adiAccounts.same_bvn.adiToken.account1;
            const tokens_to_transfer = 1;

            successful_transfer(senderAccount.url,receiverAccount.url ,tokens_to_transfer);
        });

        it('[] Verify token transfer from LTA to ADI account where Amount is Decimal', function () {
            const senderAccount = liteTestData.liteAccounts.same_bvn.account1;
            const receiverAccount = adiTestData.adiAccounts.same_bvn.adiToken.account1;
            const tokens_to_transfer = 1.5;

            successful_transfer(senderAccount.url, receiverAccount.url ,tokens_to_transfer);
        });

        it('[] Verify token transfer from LTA to ADI account with insufficient ACME', function () {
            const senderAccount = liteTestData.liteAccounts.same_bvn.account3;
            const receiverAccount = adiTestData.adiAccounts.same_bvn.adiToken.account1;
            let sender_old_balance = commonLib.get_token_balance(senderAccount.url);
            const tokens_to_transfer = sender_old_balance + 100;

            let sendTokensObj = new sendTokens();
            let output = sendTokensObj.send_tokens_using_tx(senderAccount.url, "", -1,-1, receiverAccount.url, tokens_to_transfer);
            sleep(10000);

            console.log("output -->", output);
            assert.isTrue(output.error.message.includes(cliConstants.ERROR_INSUFFICIENT_BALANCE), "Error occurred");
        });

        function successful_transfer(fromAccount, toAccount, tokens_to_transfer ) {

            let sender_old_balance = commonLib.get_token_balance(fromAccount);
            let receiver_old_balance = commonLib.get_token_balance(toAccount);
            console.log("old_balance =", sender_old_balance);
            console.log("receiver_old_balance =", receiver_old_balance);

            let sendTokensObj = new sendTokens();
            sendTokensObj.send_tokens_using_tx(fromAccount, "", -1,-1, toAccount, tokens_to_transfer);
            sleep(20000);

            let sender_new_balance = commonLib.get_token_balance(fromAccount);
            let receiver_new_balance = commonLib.get_token_balance(toAccount);
            console.log("new_balance =", sender_new_balance);
            console.log("receiver_new_balance =", receiver_new_balance);
            console.log("Difference =", (sender_old_balance - sender_new_balance));
            console.log("Number(tokens_to_transfer) * 10000000 =",Number(tokens_to_transfer) * 100000000);
            
            assert.equal((sender_old_balance - sender_new_balance) ,(Number(tokens_to_transfer) * 100000000), "Is Tokens deducted from sender as expected");
            assert.equal(receiver_new_balance, (receiver_old_balance + Number(tokens_to_transfer) * 100000000 ), "Is Tokens received as expected");
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

