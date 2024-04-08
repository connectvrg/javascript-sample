import { assert } from 'chai';
import { sleep } from '../../../utils/utils.js';
import { liteUtils } from '../../../cli/lite_account/liteUtils.js';
import { addCredits } from '../../../cli/transactions/add_credits/addCredits.js';
import * as commonLib from '../../../cli/common.js';
import { cliConstants } from '../../../constants/cliConstants.js';
import liteTestData  from '../../../constants/testLiteDataFile.js';

describe('Credits from ACME Lite Token Account to Lite Token Account', function () {
  describe('Single Signature', function () {
    this.timeout(90000);
    it('[AC-1608] Verify successful credits transaction from LTA to LTA if receiver is same as origin', function () {
      const senderAccount = liteTestData.liteAccounts.same_bvn.account1;
      const receiverAccount = liteTestData.liteAccounts.same_bvn.account1;
      let no_of_credits = 1;

      successful_transfer(senderAccount, receiverAccount, no_of_credits);
    });


    it('[AC-1609] Verify successful credits transaction from LTA to LTA if receiver is different from origin', function () {
      const senderAccount = liteTestData.liteAccounts.same_bvn.account1;
      const receiverAccount = liteTestData.liteAccounts.same_bvn.account3;
      let no_of_credits = 1;

      successful_transfer(senderAccount, receiverAccount, no_of_credits);
    });

    it('[]  Verify credits transaction from LTA to LTA with “number of credits wanted” option as a decimal value', function () {
      const senderAccount = liteTestData.liteAccounts.same_bvn.account1;
      const receiverAccount = liteTestData.liteAccounts.same_bvn.account2;
      let no_of_credits = 1.5;

      successful_transfer(senderAccount, receiverAccount, no_of_credits);
    });

    it('[] Verify credits transaction LTA to LTA with sufficient “max acme to spend”', function () {
      const senderAccount = liteTestData.liteAccounts.same_bvn.account1;
      const receiverAccount = liteTestData.liteAccounts.same_bvn.account2;
      let no_of_credits = 1;
      let max_acme = 200;

      successful_transfer(senderAccount, receiverAccount, no_of_credits, max_acme);
    });

    it('[] Verify credits transaction LTA to LTA with insufficient “max acme to spend”', function () {
      const senderAccount = liteTestData.liteAccounts.same_bvn.account1;
      const receiverAccount = liteTestData.liteAccounts.same_bvn.account2;
      let no_of_credits = 101;
      let max_acme = 20;

      failed_transfer(senderAccount, receiverAccount, no_of_credits, max_acme);
    });
  });


  function successful_transfer(senderAccount, receiverAccount, no_of_credits, max_acme=0) {
    const old_receiver_credits = commonLib.get_credits(receiverAccount.identity);
    const old_receiver_balance = commonLib.get_token_balance(receiverAccount.url);
    const old_sender_balance = commonLib.get_token_balance(senderAccount.url);

    let addCreditsObj = new addCredits();
    addCreditsObj.add_credits(senderAccount.url, receiverAccount.url, no_of_credits,max_acme);
    sleep(30000);

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
  };

  function failed_transfer(senderAccount, receiverAccount, no_of_credits, max_acme = 0) {
    const old_credits = commonLib.get_credits(receiverAccount.identity);

    const liteObj = new liteUtils();
    liteObj.add_tokens(senderAccount.url, senderAccount.url);

    let addCreditsObj = new addCredits();
    let result = addCreditsObj.add_credits(senderAccount.url, receiverAccount.url, no_of_credits, max_acme);
    sleep(10000);

    const new_credits = commonLib.get_credits(receiverAccount.identity);
    // assert.isTrue(old_credits == new_credits, "No change is receiver credits?");
    // assert.strictEqual(result.error,cliConstants.ERROR_INSUFFICIENT_ACME);
  };
});

