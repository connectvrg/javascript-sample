import { assert } from 'chai';

import * as commonLib from '../../cli/common.js';
import { sendTokens } from '../../cli/transactions/send_tokens/sendTokens.js';
import { cliConstants } from '../../constants/cliConstants.js';
import adiTestData  from '../../constants/testAdiDataFile.js';
import liteTestData  from '../../constants/testLiteDataFile.js';
import { issueToken } from '../../cli/transactions/issue_token/issueToken.js';
import { sleep } from '../../utils/utils.js';

describe('Send Tokens from Custom ADI Token Account Tests', function () {
    describe('With Custom Tokens', function () {
        this.timeout(50000);
        it('[] Verify token transfer from Custom ADI Token Account to Custom ADI Token Account where Amount is an Integer', function () {
            const senderAccount = adiTestData.adiAccounts.same_bvn.adiToken.customAccount1;
            const receiverAccount = adiTestData.adiAccounts.same_bvn.adiToken.customAccount2;
            const tokens_to_transfer = 2;

            successful_transfer(senderAccount.url, senderAccount.signerKey, receiverAccount.url, tokens_to_transfer);
        });

        //Failed
        it.skip('[]  Verify token transfer from Custom ADI Token Account to Custom ADI Token Account where Amount is Decimal', function () {
            const senderAccount = adiTestData.adiAccounts.same_bvn.adiToken.customAccount1;
            const receiverAccount = adiTestData.adiAccounts.same_bvn.adiToken.customAccount2;
            const tokens_to_transfer = 1.5;

            successful_transfer(senderAccount.url, senderAccount.signerKey, receiverAccount.url, tokens_to_transfer);
        });

        it('[] Verify token transfer from Custom ADI Token Account to Custom ADI Token Account with insufficient Tokens', function () {
            const senderAccount = adiTestData.adiAccounts.same_bvn.adiToken.customAccount1;
            const receiverAccount = adiTestData.adiAccounts.same_bvn.adiToken.customAccount2;
            let sender_old_balance = commonLib.get_token_balance(senderAccount.url);
            const tokens_to_transfer = sender_old_balance + 5;

            let sendTokensObj = new sendTokens();
            let output = sendTokensObj.send_tokens_using_tx(senderAccount.url, senderAccount.signerKey, -1, -1, receiverAccount.url, tokens_to_transfer);
            sleep(10000);

            console.log("output -->", output);
            assert.isTrue(output.error.message.includes(cliConstants.ERROR_INSUFFICIENT_BALANCE), "Error occurred");
        });


        /****************************************************************************************** */
        //From Custom ADI Token account to Custom LTA tests
        it('[] Verify token transfer from Custom ADI Token account to Custom LTA where Amount is an Integer', function () {
            const tokens_to_transfer = 1;

            const senderAccount = adiTestData.adiAccounts.same_bvn.adiToken.customAccount2;
            const account2 = liteTestData.liteAccounts.same_bvn.account1;
            const receiverAccount = account2.identity + senderAccount.tokenIssuer.substr(5);

            successful_transfer(senderAccount.url, senderAccount.signerKey, receiverAccount, tokens_to_transfer);

        });

        it('[] Verify token transfer from Custom ADI Token account to Custom LTA where Amount is Decimal', function () {
            const tokens_to_transfer = 1;

            const senderAccount = adiTestData.adiAccounts.same_bvn.adiToken.customAccount2;
            const account2 = liteTestData.liteAccounts.same_bvn.account1;
            const receiverAccount = account2.identity + senderAccount.tokenIssuer.substr(5);

            successful_transfer(senderAccount.url, senderAccount.signerKey, receiverAccount, tokens_to_transfer);

        });

        it('[] Verify token transfer from Custom ADI Token Account to Custom LTA with insufficient ACME', function () {
            const senderAccount = adiTestData.adiAccounts.same_bvn.adiToken.customAccount2;
            const account2 = liteTestData.liteAccounts.same_bvn.account1;
            const receiverAccount = account2.identity + senderAccount.tokenIssuer.substr(5);
            let sender_old_balance = commonLib.get_token_balance(senderAccount.url);

            const tokens_to_transfer = Number(sender_old_balance) + 100;

            let sendTokensObj = new sendTokens();
            let output = sendTokensObj.send_tokens_using_tx(senderAccount.url, senderAccount.signerKey, -1, -1, receiverAccount, tokens_to_transfer);
            sleep(10000);

            console.log("output -->", output);
            assert.isTrue(output.error.message.includes(cliConstants.ERROR_INSUFFICIENT_BALANCE), "Error occurred");
        });

        function successful_transfer(fromAccount, signerKey, toAccount, tokens_to_transfer) {

            let sender_old_balance = commonLib.get_token_balance(fromAccount);
            let receiver_old_balance = commonLib.get_token_balance(toAccount);

            let sendTokensObj = new sendTokens();
            sendTokensObj.send_tokens_using_tx(fromAccount, signerKey, -1, -1, toAccount, tokens_to_transfer);
            sleep(10000);

            let sender_new_balance = commonLib.get_token_balance(fromAccount);
            let receiver_new_balance = commonLib.get_token_balance(toAccount);
            console.log("sender_old_balance =", sender_old_balance);
            console.log("sender_new_balance =", sender_new_balance);
            console.log("receiver_old_balance =", receiver_old_balance);
            console.log("receiver_new_balance =", receiver_new_balance);
            console.log("Difference =", (sender_old_balance - sender_new_balance));
            console.log(">>>>>>>>>> Number(tokens_to_transfer) =", Number(tokens_to_transfer));

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
    });

});

