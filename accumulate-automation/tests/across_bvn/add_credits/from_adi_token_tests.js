import { assert } from 'chai';
import { sleep } from '../../../utils/utils.js';
import { liteUtils } from '../../../cli/lite_account/liteUtils.js';
import { addCredits } from '../../../cli/transactions/add_credits/addCredits.js';
import adiTestData from '../../../constants/testAdiDataFile.js';
import { sendTokens } from '../../../cli/transactions/send_tokens/sendTokens.js';
import liteTestData from '../../../constants/testLiteDataFile.js';
import * as commonLib from '../../../cli/common.js';

describe('Credits transfer from ADI Token Account to different accounts', function () {
    describe('Single Signature', function () {
        this.timeout(90000);
        it('[Different BVN] Verify successful credits transaction from ADI Token Account to ADI Key Page', function () {
            const senderAccount = adiTestData.adiAccounts.different_bvn.adiToken.bvnAccount0;
            const receiverAccount = adiTestData.adiAccounts.different_bvn.adi.bvnAccount1;
            let no_of_credits = 5;

            const old_receiver_credits = commonLib.get_credits(receiverAccount.keyPage);
            const sendTokensObj = new sendTokens();
            sendTokensObj.send_tokens_using_tx(senderAccount.url, senderAccount.signerKey, -1, -1, senderAccount.url, 100);

            let addCreditsObj = new addCredits();
            addCreditsObj.add_credits(senderAccount.url, receiverAccount.keyPage, no_of_credits);
            sleep(30000);

            const new_receiver_credits = commonLib.get_credits(receiverAccount.keyPage);
            console.log("old_receiver_credits =", old_receiver_credits);
            console.log("total old_receiver_credits =", (old_receiver_credits + (no_of_credits * 100)));
            console.log("new_receiver_credits =", new_receiver_credits);
            assert.isTrue(old_receiver_credits + (no_of_credits * 100) == new_receiver_credits, "Is Credits received in Lite Identity?");

        });

        it('[Different BVN] Verify successful credits transaction from ADI Token Account to Lite Identity', function () {
            const senderAccount = adiTestData.adiAccounts.different_bvn.adiToken.bvnAccount0;
            const receiverAccount = liteTestData.liteAccounts.different_bvn.bvnAccount1;
            let no_of_credits = 5;

            const liteObj = new liteUtils();
            liteObj.add_tokens(receiverAccount.url, senderAccount.url);
            const old_receiver_credits = commonLib.get_credits(receiverAccount.identity);

            let addCreditsObj = new addCredits();
            addCreditsObj.add_credits(senderAccount.url, receiverAccount.identity, no_of_credits);
            sleep(20000);

            const new_receiver_credits = commonLib.get_credits(receiverAccount.identity);

            console.log("old_receiver_credits =", old_receiver_credits);
            console.log("total old_receiver_credits =", (old_receiver_credits + (no_of_credits * 100)));
            console.log("new_receiver_credits =", new_receiver_credits);
            assert.equal(old_receiver_credits + (no_of_credits * 100),new_receiver_credits, "Is Credits received in Lite Identity?");

        });

        it('[Different BVN] Verify successful credits transaction from ADI Token Account to Lite Token Account', function () {
            const senderAccount = adiTestData.adiAccounts.different_bvn.adiToken.bvnAccount0;
            const receiverAccount = liteTestData.liteAccounts.different_bvn.bvnAccount1;
            let no_of_credits = 5;

            const liteObj = new liteUtils();
            liteObj.add_tokens(receiverAccount.url, senderAccount.url);
            const old_receiver_credits = commonLib.get_credits(receiverAccount.identity);

            let addCreditsObj = new addCredits();
            addCreditsObj.add_credits(senderAccount.url, receiverAccount.url, no_of_credits);
            sleep(20000);

            const new_receiver_credits = commonLib.get_credits(receiverAccount.identity);

            console.log("old_receiver_credits =", old_receiver_credits);
            console.log("total old_receiver_credits =", (old_receiver_credits + (no_of_credits * 100)));
            console.log("new_receiver_credits =", new_receiver_credits);
            assert.isTrue(old_receiver_credits + (no_of_credits * 100) == new_receiver_credits, "Is Credits received in Lite Identity?");

        });

    });


});