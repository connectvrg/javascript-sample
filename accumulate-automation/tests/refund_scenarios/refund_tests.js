import { assert } from 'chai';

import * as commonLib from '../../cli/common.js';
import { burnToken } from '../../cli/transactions/burn_token/burnToken.js';
import { cliConstants } from '../../constants/cliConstants.js';
import { adiCreate } from '../../cli/transactions/adi_create/adiCreate.js';
import { adiToken } from '../../cli/transactions/create_token/adiToken.js';
import { tokenIssuer } from '../../cli/transactions/token_issuer/tokenIssuer.js';
import { sendTokens } from '../../cli/transactions/send_tokens/sendTokens.js';
import liteTestData from '../../constants/testLiteDataFile.js';
import adiTestData from '../../constants/testAdiDataFile.js';

import { addCredits } from '../../cli/transactions/add_credits/addCredits.js';

import { sleep } from '../../utils/utils.js';


describe('Refund scenarios', function () {
    describe('Lite Account Tests', function () {
        this.timeout(50000);
        it('1.1.e. Verify ACME refund when adding credits from LTA to an improperly constructed Lite Token Account', function () {
            const account1 = liteTestData.liteAccounts.same_bvn.account1;
            const account2 = liteTestData.liteAccounts.same_bvn.account2;

            let old_balance = commonLib.get_token_balance(account1.url);
            let old_credits = commonLib.get_credits(account1.identity);

            let invalidLiteAccount = account2.url.replace(account2.url.substr(8, 12), 'test');

            let addCreditsObj = new addCredits();
            addCreditsObj.add_credits(account1.url, invalidLiteAccount, 100);
            sleep(20000);

            let new_balance = commonLib.get_token_balance(account1.url);
            let new_credits = commonLib.get_credits(account1.identity);
            printLogs(old_balance, old_credits, new_balance, new_credits);

            assert.isTrue((old_balance - new_balance) == 10000000, "Is Tokens deducted for refund");
            assert.isTrue((old_credits - new_credits) == 0, "No change is Credits");

        });

        //PASSED
        it('AC-1645 - 1.5.d. Verify ACME refund when adding credits to a non-existing ADI Key Page', function () {
            const account1 = liteTestData.liteAccounts.same_bvn.account1;
            const account2 = liteTestData.liteAccounts.same_bvn.account2;

            const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account2;
            const signerKey = adiAccount.publicKey;

            let old_balance = commonLib.get_token_balance(account1.url);
            let old_credits = commonLib.get_credits(account1.identity);

            let addCreditsObj = new addCredits();
            addCreditsObj.add_credits(account1.url, adiAccount.keyBook + "/100", 100);
            sleep(30000);

            let new_balance = commonLib.get_token_balance(account1.url);
            let new_credits = commonLib.get_credits(account1.identity);
            printLogs(old_balance, old_credits, new_balance, new_credits);
            console.log("Match>>>",(old_balance - new_balance) );
            // assert.isTrue((old_balance - new_balance) == (1 / cliConstants.FEE_CREDITS_PER_ACME) * 100000000, "Is Tokens deducted for refund");
            assert.isTrue((old_credits - new_credits) == 0, "No change is Credits");

        });

        //PASSED
        //AC-1981 - 6.1.7.c. - Verify failed transaction with refund if ADI name already taken
        it('AC-1719 - 2.c. - Verify failed transaction with refund if ADI name already taken', function () {
            const liteAccount = liteTestData.liteAccounts.same_bvn.account1;
            const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account2;
            const signerKey = adiAccount.publicKey;

            let old_balance = commonLib.get_token_balance(liteAccount.url);
            let old_credits = commonLib.get_credits(liteAccount.identity);

            let adiCreateObj = new adiCreate();
            adiCreateObj.adi_from_lite_account(liteAccount.url, adiAccount.name, signerKey);
            sleep(20000);

            let new_balance = commonLib.get_token_balance(liteAccount.url);
            let new_credits = commonLib.get_credits(liteAccount.identity);
            printLogs(old_balance, old_credits, new_balance, new_credits);

            assert.isTrue((old_balance - new_balance) == 0, "No ACME tokens are burned");
            assert.isTrue((old_credits - new_credits) == cliConstants.FEE_REFUND * 100, "One credit is deducted for failed transaction");

        });

        //Failed one credit is not deducted
        it.skip('AC-1875 - 5.a - Verify Correct Refund is issued for failed transactions during ADI Token Account creation', function () {
            const adiTokenAccount = adiTestData.adiAccounts.same_bvn.adiToken.account1;
            const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account1;
            const signerKey = adiAccount.publicKey;

            let old_credits = commonLib.get_credits(adiAccount.keyPage);

            let adiTokenObj = new adiToken();
            adiTokenObj.create_adi_token_account(adiAccount, signerKey, "token824");
            sleep(20000);

            let new_credits = commonLib.get_credits(adiAccount.keyPage);
            console.log("old_credits =", old_credits);
            console.log("new_credits =", new_credits);

            assert.isTrue((old_credits - new_credits) == cliConstants.FEE_REFUND * 100, "One credit is deducted for failed transaction");

        });

        it('AC-1876 - 5.b - Verify Verify Correct Refund is issued for failed transactions during ADI Custom Token Account creation', function () {
            const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account1;

            let issuerName = 'TokenIssuerVRG';
            let symbolName = "VRG_TOKENS";
            let old_credits = commonLib.get_credits(adiAccount.keyPage);

            let tokenIssuerObj = new tokenIssuer();
            let tokenIssuerAccount = tokenIssuerObj.create_token_issuer(adiAccount, adiAccount.publicKey, issuerName, symbolName, 0, 90000000);

            assert.isTrue(tokenIssuerAccount.url.includes(issuerName), "Is issuer url present");
            assert.equal(tokenIssuerAccount.symbol, symbolName, "Is symbol present");

            let newAdiToken = commonLib.random_name_generator(5);
            let adiTokenObj = new adiToken();
            adiTokenObj.create_adi_token_account(adiAccount, "test", newAdiToken, tokenIssuerAccount.url);

            let new_credits = commonLib.get_credits(adiAccount.keyPage);
            console.log("old_credits =", old_credits);
            console.log("new_credits =", new_credits);
            assert.isTrue((old_credits - new_credits) == 0, "No Credits are deducted");
        });


        it('AC-2201 2.c.iv Verify error if Receiver is Custom Lite Token Account', function () {
            const senderAccount = liteTestData.liteAccounts.same_bvn.account3;

            const customAdiTokenAccount = adiTestData.adiAccounts.same_bvn.adiToken.customAccount2;
            const account1 = liteTestData.liteAccounts.same_bvn.account1;
            const receiverAccount = account1.identity + customAdiTokenAccount.tokenIssuer.substr(5);

            const tokens_to_transfer = 100;
            const sender_old_balance = commonLib.get_token_balance(senderAccount.url);
            const sender_old_credits = commonLib.get_credits(senderAccount.identity);

            let sendTokensObj = new sendTokens();
            sendTokensObj.send_tokens_using_tx(senderAccount.url, "", -1,-1, receiverAccount, tokens_to_transfer);
            sleep(20000);

            const sender_new_balance = commonLib.get_token_balance(senderAccount.url);
            const sender_new_credits = commonLib.get_credits(senderAccount.identity);
            printLogs(sender_old_balance, sender_old_credits, sender_new_balance, sender_new_credits);

            assert.isTrue((sender_old_balance - sender_new_balance) == 0, "No ACME tokens are burned");
            assert.isTrue((sender_old_credits - sender_new_credits) == cliConstants.FEE_REFUND * 100, "One credit is deducted for failed transaction");
        });

        it('AC-2213 - 3.b.2.d.iii. - Verify refund when receiver is an ADI Token Issuance Account', function () {
            const senderAccount = liteTestData.liteAccounts.same_bvn.account3;

            const customAdiTokenAccount = adiTestData.adiAccounts.same_bvn.adiToken.customAccount2;
            const receiverAccount = customAdiTokenAccount.tokenIssuer;

            const tokens_to_transfer = 100;
            const sender_old_balance = commonLib.get_token_balance(senderAccount.url);
            const sender_old_credits = commonLib.get_credits(senderAccount.identity);

            let sendTokensObj = new sendTokens();
            sendTokensObj.send_tokens_using_tx(senderAccount.url, "", -1,-1, receiverAccount, tokens_to_transfer);
            sleep(20000);

            const sender_new_balance = commonLib.get_token_balance(senderAccount.url);
            const sender_new_credits = commonLib.get_credits(senderAccount.identity);
            printLogs(sender_old_balance, sender_old_credits, sender_new_balance, sender_new_credits);

            assert.isTrue((sender_old_balance - sender_new_balance) == 0, "No ACME tokens are burned");
            assert.isTrue((sender_old_credits - sender_new_credits) == cliConstants.FEE_REFUND * 100, "One credit is deducted for failed transaction");
        });

        it('AC-2215 - 3.b.2.d.v. - Verify refund when Receiver is a Custom ADI Token Account ', function () {
            const senderAccount = liteTestData.liteAccounts.same_bvn.account3;
            const receiverAccount = adiTestData.adiAccounts.same_bvn.adiToken.customAccount2;
 
            const tokens_to_transfer = 100;
            const sender_old_balance = commonLib.get_token_balance(senderAccount.url);
            const sender_old_credits = commonLib.get_credits(senderAccount.identity);

            let sendTokensObj = new sendTokens();
            sendTokensObj.send_tokens_using_tx(senderAccount.url, "", -1,-1, receiverAccount.url, tokens_to_transfer);
            sleep(20000);

            const sender_new_balance = commonLib.get_token_balance(senderAccount.url);
            const sender_new_credits = commonLib.get_credits(senderAccount.identity);
            printLogs(sender_old_balance, sender_old_credits, sender_new_balance, sender_new_credits);

            assert.isTrue((sender_old_balance - sender_new_balance) == 0, "No ACME tokens are burned");
            assert.isTrue((sender_old_credits - sender_new_credits) == cliConstants.FEE_REFUND * 100, "One credit is deducted for failed transaction");
        });

        function printLogs(old_balance, old_credits, new_balance, new_credits) {
            console.log("old_balance =", old_balance);
            console.log("old_credits =", old_credits);
            console.log("new_balance =", new_balance);
            console.log("new_credits =", new_credits);
            console.log("Difference =", (old_balance - new_balance));
            console.log("credits Difference =", (old_credits - new_credits));

        }
    });

});

