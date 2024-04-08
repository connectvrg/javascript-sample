import { assert } from 'chai';
import { sleep } from '../../../utils/utils.js';
import { liteUtils } from '../../../cli/lite_account/liteUtils.js';
import { addCredits } from '../../../cli/transactions/add_credits/addCredits.js';
import adiTestData from '../../../constants/testAdiDataFile.js';
import liteTestData from '../../../constants/testLiteDataFile.js';
import * as commonLib from '../../../cli/common.js';

describe('Credits from ACME Lite Token Account to Key Page within a Key Book of an ADI of different BVN', function () {
    describe('Single Signature', function () {
        this.timeout(50000);
        it('[Different BVN] Verify successful credits transaction from Lite Token Account URL to ADI Key Page', function () {
            const senderAccount = liteTestData.liteAccounts.different_bvn.bvnAccount0;
            const receiverAccount = adiTestData.adiAccounts.different_bvn.adi.bvnAccount1;
            let no_of_credits = 1;

            const old_credits = commonLib.get_credits(receiverAccount.keyPage);

            const liteObj = new liteUtils();
            liteObj.add_tokens(senderAccount.url, senderAccount.url);

            let addCreditsObj = new addCredits();
            addCreditsObj.add_credits(senderAccount.url, receiverAccount.keyPage, no_of_credits);
            sleep(20000);

            const new_credits = commonLib.get_credits(receiverAccount.keyPage);
            console.log("No of credits ::", (no_of_credits * 100));
            assert.isTrue(old_credits + (no_of_credits * 100) == new_credits, "Is Expected Credits received in Key Page?");
        });

        it('[Different BVN] Verify successful credits transaction from LTA to LI', function () {
            const senderAccount = liteTestData.liteAccounts.different_bvn.bvnAccount0;
            const receiverAccount = liteTestData.liteAccounts.different_bvn.bvnAccount1;
            let no_of_credits = 1;

            const old_credits = commonLib.get_credits(receiverAccount.identity);
            const liteObj = new liteUtils();
            liteObj.add_tokens(senderAccount.url, senderAccount.url);

            let addCreditsObj = new addCredits();
            addCreditsObj.add_credits(senderAccount.url, receiverAccount.identity, no_of_credits);
            sleep(20000);

            const new_credits = commonLib.get_credits(receiverAccount.identity);
            assert.isTrue(old_credits + (no_of_credits * 100) == new_credits, "Is Credits received in Lite Identity?");
        });

        it('[Different BVN]  Verify successful credits transaction from LTA to LTA ', function () {
            const senderAccount = liteTestData.liteAccounts.different_bvn.bvnAccount0;
            const receiverAccount = liteTestData.liteAccounts.different_bvn.bvnAccount1;
            let no_of_credits = 1;

            const old_receiver_credits = commonLib.get_credits(receiverAccount.identity);
            const old_receiver_balance = commonLib.get_token_balance(receiverAccount.url);
            const old_sender_balance = commonLib.get_token_balance(senderAccount.url);

            let addCreditsObj = new addCredits();
            addCreditsObj.add_credits(senderAccount.url, receiverAccount.url, no_of_credits);
            sleep(20000);

            const new_receiver_credits = commonLib.get_credits(receiverAccount.identity);
            const new_receiver_balance = commonLib.get_token_balance(receiverAccount.url);
            const new_sender_balance = commonLib.get_token_balance(senderAccount.url);

            console.log("old_sender_balance =", old_sender_balance);
            console.log("new_sender_balance =", new_sender_balance);
            console.log("old_receiver_balance =", old_receiver_balance);
            console.log("new_receiver_balance =", new_receiver_balance);
            console.log("old_receiver_credits =", old_receiver_credits);
            console.log("total old_receiver_credits =", (old_receiver_credits + (no_of_credits * 100)));
            console.log("new_receiver_credits =", new_receiver_credits);
            assert.isTrue(old_receiver_credits + (no_of_credits * 100) == new_receiver_credits, "Is Credits received in Lite Token Account?");

        });

    });


});