import { assert } from 'chai';
import { sleep } from '../../../utils/utils.js';
import { liteUtils } from '../../../cli/lite_account/liteUtils.js';
import { addCredits } from '../../../cli/transactions/add_credits/addCredits.js';
import liteTestData  from '../../../constants/testLiteDataFile.js';
import * as commonLib from '../../../cli/common.js';

describe('Credits from ACME Lite Token Account to Lite Identity', function () {
  describe('Single Signature', function () {
    this.timeout(90000);
    it('[] Verify successful credits transaction from LTA to LI if receiver is same as origin', function () {
      const senderAccount = liteTestData.liteAccounts.same_bvn.account1;
      const receiverAccount = liteTestData.liteAccounts.same_bvn.account2;
      let no_of_credits = 1;

      successful_transfer(senderAccount,receiverAccount, no_of_credits );
    });


    it('[] Verify successful credits transaction from LTA to LI if receiver is different from origin', function () {
      const senderAccount = liteTestData.liteAccounts.same_bvn.account1;
      const receiverAccount = liteTestData.liteAccounts.same_bvn.account3;
      let no_of_credits = 1;

      successful_transfer(senderAccount,receiverAccount, no_of_credits );
    });

    it.skip('[]  Verify credits transaction from LTA to LI with “number of credits wanted” option as a decimal value', function () {
      const senderAccount = liteTestData.liteAccounts.same_bvn.account1;
      const receiverAccount = liteTestData.liteAccounts.same_bvn.account2;
      let no_of_credits = 1.5;

      successful_transfer(senderAccount, receiverAccount, no_of_credits);
    });

    it('[]  Verify credits transaction LTA to LI with sufficient “max acme to spend”', function () {
      const senderAccount = liteTestData.liteAccounts.same_bvn.account1;
      const receiverAccount = liteTestData.liteAccounts.same_bvn.account2;
      let no_of_credits = 5;
      let max_acme = 200;

      successful_transfer(senderAccount, receiverAccount, no_of_credits, max_acme);
    });

    it('[]  Verify credits transaction LTA to LI with insufficient “max acme to spend”', function () {
      const senderAccount = liteTestData.liteAccounts.same_bvn.account1;
      const receiverAccount = liteTestData.liteAccounts.same_bvn.account2;
      let no_of_credits = 20;
      let max_acme = 2;

      failed_transfer(senderAccount, receiverAccount, no_of_credits, max_acme);
    });

  });

  function successful_transfer(senderAccount, receiverAccount, no_of_credits, max_acme=0){
    const old_credits = commonLib.get_credits(receiverAccount.identity);

    const liteObj = new liteUtils();
    liteObj.add_tokens(senderAccount.url, senderAccount.url);

    let addCreditsObj = new addCredits();
    addCreditsObj.add_credits(senderAccount.url, receiverAccount.identity, no_of_credits, max_acme);
    sleep(30000);

    const new_credits = commonLib.get_credits(receiverAccount.identity);
    console.log("old_credits >>", (old_credits + (no_of_credits* 100)));
    console.log("new_credits >>", new_credits);
    assert.isTrue(old_credits + (no_of_credits* 100) == new_credits, "Is Credits received in Lite Identity?");
  };

  function failed_transfer(senderAccount, receiverAccount, no_of_credits, max_acme = 0) {
    const old_credits = commonLib.get_credits(receiverAccount.identity);

    const liteObj = new liteUtils();
    liteObj.add_tokens(senderAccount.url, senderAccount.url);

    let addCreditsObj = new addCredits();
    let result = addCreditsObj.add_credits(senderAccount.url, receiverAccount.identity, no_of_credits, max_acme);
    // assert.strictEqual(result.error, "amount of credits requested will not be satisfied by amount of acme to be spent");
    const new_credits = commonLib.get_credits(receiverAccount.identity);
    assert.isTrue(old_credits == new_credits, "No change is receiver credits?");

  };
});

