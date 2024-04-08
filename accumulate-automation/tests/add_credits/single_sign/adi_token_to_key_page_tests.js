import { assert } from 'chai';
import { execute, exec_cmd, jyothi_exec, sleep } from '../../../utils/utils.js';
import { addCredits } from '../../../cli/transactions/add_credits/addCredits.js';
import adiTestData  from '../../../constants/testAdiDataFile.js';
import * as commonLib from '../../../cli/common.js';
import { sendTokens } from '../../../cli/transactions/send_tokens/sendTokens.js';

console.log ("Adi Test Data ", adiTestData);
describe('Credits from ADI Token Account to Key Page within a Key Book of an ADI', function () {
    describe('Single Signature', function () {
        this.timeout(90000);
        it('[] Verify successful credits transaction from ADI Token Account to ADI Key Page', function () {
            console.log("Start Test" , adiTestData.adiAccounts);
            const senderAccount = adiTestData.adiAccounts.same_bvn.adiToken.account1;
            const receiverAccount = adiTestData.adiAccounts.same_bvn.adi.account3;
            let no_of_credits = 5;

            successful_transfer(senderAccount.url, senderAccount.signerKey, receiverAccount, no_of_credits);
        });

        it('[] Verify successful credits transaction from ADI Token Account to ADI Key Page with sufficient “max acme to spend” value', function () {
            const senderAccount = adiTestData.adiAccounts.same_bvn.adiToken.account1;
            const receiverAccount = adiTestData.adiAccounts.same_bvn.adi.account3;
            let no_of_credits = 1;
            let max_acme = 10;

            successful_transfer(senderAccount.url, senderAccount.signerKey, receiverAccount, no_of_credits, max_acme);
        });

        it('[] Credits transaction from ADI Token Account to ADI Key Page with insufficient “max acme to spend” value', function () {
            const senderAccount = adiTestData.adiAccounts.same_bvn.adiToken.account1;
            const receiverAccount = adiTestData.adiAccounts.same_bvn.adi.account2;
            let no_of_credits = 200;
            let max_acme = 5;

            failed_transfer(senderAccount.url, senderAccount.signerKey, receiverAccount, no_of_credits, max_acme);
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

    function failed_transfer(senderAccount, signerKey="", receiverAccount, no_of_credits, max_acme = 0) {
        console.log(">>>> failed_transfer");
        const old_receiver_credits = commonLib.get_credits(receiverAccount.keyPage);

        const sendTokensObj = new sendTokens();
        sendTokensObj.send_tokens_using_tx(senderAccount, signerKey, -1, -1, senderAccount, 100);

        let addCreditsObj = new addCredits();
        let result = addCreditsObj.add_credits(senderAccount, receiverAccount.keyPage, no_of_credits, max_acme);

        // assert.strictEqual(result.error, "amount of credits requested will not be satisfied by amount of acme to be spent");
        const new_receiver_credits = commonLib.get_credits(receiverAccount.keyPage);
        assert.isTrue(old_receiver_credits == new_receiver_credits, "No change is receiver credits?");
    };

});