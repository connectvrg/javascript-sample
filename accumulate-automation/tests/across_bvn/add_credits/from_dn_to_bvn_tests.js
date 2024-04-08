import { assert } from 'chai';
import { sleep } from '../../../utils/utils.js';
import { liteUtils } from '../../../cli/lite_account/liteUtils.js';
import { addCredits } from '../../../cli/transactions/add_credits/addCredits.js';
import adiTestData from '../../../constants/testAdiDataFile.js';
import { sendTokens } from '../../../cli/transactions/send_tokens/sendTokens.js';
import liteTestData from '../../../constants/testLiteDataFile.js';
import * as commonLib from '../../../cli/common.js';

describe('Transactions from DN account to BVN', function () {
    describe('Single Signature', function () {
        this.timeout(90000);
        it('[DN To BVN] Verify successful credits transaction from ADI Token Account in DN to ADI Key Page in BVN', function () {
            const senderAccount = adiTestData.adiAccounts.dn.adiToken.dnAccount0;
            const receiverAccount = adiTestData.adiAccounts.different_bvn.adi.bvnAccount1;
            let no_of_credits = 5;

            const old_receiver_credits = commonLib.get_credits(receiverAccount.keyPage);
            const sendTokensObj = new sendTokens();
            sendTokensObj.send_tokens_using_tx(senderAccount.url, senderAccount.signerKey, -1, -1, senderAccount.url, 100);

            let addCreditsObj = new addCredits();
            addCreditsObj.add_credits(senderAccount.url, receiverAccount.keyPage, no_of_credits);
            sleep(20000);

            const new_receiver_credits = commonLib.get_credits(receiverAccount.keyPage);
            console.log("old_receiver_credits =", old_receiver_credits);
            console.log("total old_receiver_credits =", (old_receiver_credits + (no_of_credits * 100)));
            console.log("new_receiver_credits =", new_receiver_credits);
            assert.isTrue(old_receiver_credits + (no_of_credits * 100) == new_receiver_credits, "Is Credits received in Lite Identity?");

        });

        it('[DN To BVN] Verify successful credits transaction from ADI Token Account in DN to Lite Identity in BVN', function () {
            const senderAccount = adiTestData.adiAccounts.dn.adiToken.dnAccount0;
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
            assert.isTrue(old_receiver_credits + (no_of_credits * 100) == new_receiver_credits, "Is Credits received in Lite Identity?");

        });

        it('[DN To BVN] Verify successful credits transaction from ADI Token Account in DN to Lite Token Account in BVN', function () {
            const senderAccount = adiTestData.adiAccounts.dn.adiToken.dnAccount0;
            const receiverAccount = liteTestData.liteAccounts.different_bvn.bvnAccount0;
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

        it('[DN To BVN] Verify successful credits transaction from Lite Token Account URL in BVN to ADI Key Page of DN', function () {
            const senderAccount = liteTestData.liteAccounts.different_bvn.bvnAccount0;
            const receiverAccount = adiTestData.adiAccounts.dn.adi.dnAccount0;
      
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

    });


});