import { assert } from 'chai';
import { execute, exec_cmd, jyothi_exec, sleep } from '../../../utils/utils.js';
import { liteUtils } from '../../../cli/lite_account/liteUtils.js';
import { addCredits } from '../../../cli/transactions/add_credits/addCredits.js';
import adiTestData  from '../../../constants/testAdiDataFile.js';
import liteTestData  from '../../../constants/testLiteDataFile.js';
import * as commonLib from '../../../cli/common.js';

describe('Credits from ACME Lite Token Account to Key Page within a Key Book of an ADI', function () {
    describe('Single Signature', function () {
        this.timeout(90000);
        it('[AC-1617] Verify successful credits transaction from Lite Token Account URL to ADI Key Page', function () {
            const senderAccount = liteTestData.liteAccounts.same_bvn.account1;
            const receiverAccount = adiTestData.adiAccounts.same_bvn.adi.account1;
            let no_of_credits =1;

            successful_transfer(senderAccount, receiverAccount, no_of_credits);
        });

        it('[AC-1618] Verify credits transaction to ADI Key Page with “max acme to spend” option if ACME value is more than the required value to create credits', function () {
            const senderAccount = liteTestData.liteAccounts.same_bvn.account1;
            const receiverAccount = adiTestData.adiAccounts.same_bvn.adi.account1;
            let no_of_credits = 1;
            let max_acme = 10;

            successful_transfer(senderAccount, receiverAccount, no_of_credits, max_acme);
        });

        it('[AC-1620]  Verify credits transaction to ADI Key Page with “number of credits wanted” option as a decimal value', function () {
            const senderAccount = liteTestData.liteAccounts.same_bvn.account1;
            const receiverAccount = adiTestData.adiAccounts.same_bvn.adi.account1;
            let no_of_credits = 1.5;
            let max_acme = 10;

            successful_transfer(senderAccount, receiverAccount, no_of_credits, max_acme);
        });

        it('[]  Verify credits transaction to ADI Key Page with “max acme to spend” option if ACME value is less than the required value to create credits', function () {
            const senderAccount = liteTestData.liteAccounts.same_bvn.account1;
            const receiverAccount = adiTestData.adiAccounts.same_bvn.adi.account1;
            let no_of_credits = 200;
            let max_acme = 1;

            failed_transfer(senderAccount, receiverAccount, no_of_credits, max_acme);
        });
      
    });

    function successful_transfer(senderAccount, receiverAccount, no_of_credits, max_acme=0){
        const old_credits = commonLib.get_credits(receiverAccount.keyPage);

            const liteObj = new liteUtils();
            liteObj.add_tokens(senderAccount.url, senderAccount.url);

            let addCreditsObj = new addCredits();
            addCreditsObj.add_credits(senderAccount.url, receiverAccount.keyPage, no_of_credits, max_acme);
            sleep(20000);

            const new_credits = commonLib.get_credits(receiverAccount.keyPage);
            console.log("No of credits ::", (no_of_credits* 100));
            console.log("new_credits ::", new_credits);
            assert.isTrue(old_credits + (no_of_credits* 100) == new_credits, "Is Expected Credits received in Key Page?");

      };

      function failed_transfer(senderAccount, receiverAccount, no_of_credits, max_acme=0){
        const old_credits = commonLib.get_credits(receiverAccount.keyPage);

            const liteObj = new liteUtils();
            liteObj.add_tokens(senderAccount.url, senderAccount.url);

            let addCreditsObj = new addCredits();
            let result = addCreditsObj.add_credits(senderAccount.url, receiverAccount.keyPage, no_of_credits, max_acme);
            
            // assert.strictEqual(result.error,"amount of credits requested will not be satisfied by amount of acme to be spent" );
            const new_credits = commonLib.get_credits(receiverAccount.keyPage);
            assert.isTrue(old_credits == new_credits, "No change is receiver credits?");

      };
    });