import { assert } from 'chai';
import { execute, exec_cmd, jyothi_exec, sleep } from '../../../utils/utils.js';
import { addCredits } from '../../../cli/transactions/add_credits/addCredits.js';
import { liteUtils } from '../../../cli/lite_account/liteUtils.js';
import adiTestData  from '../../../constants/testAdiDataFile.js';
import liteTestData  from '../../../constants/testLiteDataFile.js';
import * as commonLib from '../../../cli/common.js';
import { sendTokens } from '../../../cli/transactions/send_tokens/sendTokens.js';

describe('Credits from ADI Token Account to Key Page of Sub-ADI', function () {
    describe('Single Signature', function () {
        this.timeout(50000);
        it('[] Verify successful credits transaction from ADI Token Account to Sub-ADI Key Page', function () {
            console.log("Start Test" , adiTestData.adiAccounts);
            const senderAccount = adiTestData.adiAccounts.same_bvn.adiToken.account1;
            const receiverAccount = adiTestData.adiAccounts.same_bvn.sub_adi.account1;
            let no_of_credits = 5;

            successful_transfer(senderAccount.url, senderAccount.signerKey, receiverAccount, no_of_credits);
        });

        it('Verify successful credits transaction from Lite Token Account URL to Sub-ADI Key Page', function () {
            const senderAccount = liteTestData.liteAccounts.same_bvn.account1;
            const receiverAccount = adiTestData.adiAccounts.same_bvn.sub_adi.account1;
            let no_of_credits = 1;

            const old_credits = commonLib.get_credits(receiverAccount.keyPage);

            const liteObj = new liteUtils();
            liteObj.add_tokens(senderAccount.url, senderAccount.url);

            let addCreditsObj = new addCredits();
            addCreditsObj.add_credits(senderAccount.url, receiverAccount.keyPage, no_of_credits, 10);
            sleep(20000);

            const new_credits = commonLib.get_credits(receiverAccount.keyPage);
            console.log("No of credits ::", (no_of_credits* 100));
            assert.isTrue(old_credits + (no_of_credits* 100) == new_credits, "Is Expected Credits received in Key Page?");

        });

    });

    function successful_transfer(senderAccount, signerKey="", receiverAccount, no_of_credits, max_acme = 0) {
        console.log(">>>> successful_transfer");
        const old_receiver_credits = commonLib.get_credits(receiverAccount.keyPage);

        const sendTokensObj = new sendTokens();
        sendTokensObj.send_tokens_using_tx(senderAccount, signerKey, -1, -1, senderAccount, 100);

        let addCreditsObj = new addCredits();
        addCreditsObj.add_credits(senderAccount, receiverAccount.keyPage, no_of_credits, max_acme);
        sleep(20000);

        const new_receiver_credits = commonLib.get_credits(receiverAccount.keyPage);
        console.log("old_receiver_credits =", old_receiver_credits);
        console.log("total old_receiver_credits =", (old_receiver_credits + (no_of_credits * 100)));
        console.log("new_receiver_credits =", new_receiver_credits);
        assert.isTrue(old_receiver_credits + (no_of_credits * 100) == new_receiver_credits, "Is Credits received in Lite Identity?");
    };

    

});