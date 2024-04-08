import { assert } from 'chai';
import { exec_cmd, jyothi_exec, sleep } from '../../../utils/utils.js';
import { liteUtils } from '../../../cli/lite_account/liteUtils.js';
import { addCredits } from '../../../cli/transactions/add_credits/addCredits.js';
import * as commonLib from '../../../cli/common.js';
import adiTestData  from '../../../constants/testAdiDataFile.js';
import liteTestData  from '../../../constants/testLiteDataFile.js';

describe('Credits from ADI Token Account to Lite Identity', function () {
  describe('Single Signature', function () {
    this.timeout(90000);
    it('[] Verify successful credits transaction from ADI Token Account to Lite Identity', function () {
      const adiTokenAccount = adiTestData.adiAccounts.same_bvn.adiToken.account1;
      const liteTokenAccount = liteTestData.liteAccounts.same_bvn.account1;
      let no_of_credits = 5;

      successful_transfer(adiTokenAccount, liteTokenAccount, no_of_credits);
    });


    it('[] Verify successful credits transaction from ADI Token Account to Lite Identity with sufficient “max acme to spend” value', function () {
      const adiTokenAccount = adiTestData.adiAccounts.same_bvn.adiToken.account1;
      const liteTokenAccount = liteTestData.liteAccounts.same_bvn.account1;
      let no_of_credits = 5;
      let max_acme = 10;

      successful_transfer(adiTokenAccount, liteTokenAccount, no_of_credits, max_acme);
    });

    it('[] Verify successful credits transaction from ADI Token Account to Lite Identity with insufficient “max acme to spend” value', function () {
      const adiTokenAccount = adiTestData.adiAccounts.same_bvn.adiToken.account1;
      const liteTokenAccount = liteTestData.liteAccounts.same_bvn.account1;
      let no_of_credits = 200;
      let max_acme = 5;

      failed_transfer(adiTokenAccount, liteTokenAccount, no_of_credits, max_acme);
    });

  });


  function successful_transfer(senderAccount, receiverAccount, no_of_credits, max_acme=0){
    // const old_receiver_balance = commonLib.get_token_balance(receiverAccount.url);
    const liteObj = new liteUtils();
    liteObj.add_tokens(receiverAccount.url, senderAccount.url);
    const old_receiver_credits = commonLib.get_credits(receiverAccount.identity);

    let addCreditsObj = new addCredits();
    addCreditsObj.add_credits(senderAccount.url, receiverAccount.identity, no_of_credits, max_acme);
    sleep(20000);

    const new_receiver_credits = commonLib.get_credits(receiverAccount.identity);

    console.log("old_receiver_credits =", old_receiver_credits);
    console.log("total old_receiver_credits =", (old_receiver_credits + (no_of_credits * 100)));
    console.log("new_receiver_credits =", new_receiver_credits);
    assert.isTrue(old_receiver_credits + (no_of_credits * 100) == new_receiver_credits, "Is Credits received in Lite Identity?");
  };

  function failed_transfer(senderAccount, receiverAccount, no_of_credits, max_acme=0){
    const old_credits = commonLib.get_credits(receiverAccount.identity);

        const liteObj = new liteUtils();
        liteObj.add_tokens(senderAccount.url, senderAccount.url);

        let addCreditsObj = new addCredits();
        let result = addCreditsObj.add_credits(senderAccount.url, receiverAccount.identity, no_of_credits, max_acme);
        
        // assert.strictEqual(result.error,"amount of credits requested will not be satisfied by amount of acme to be spent" );
        const new_credits = commonLib.get_credits(receiverAccount.identity);
        assert.isTrue(old_credits == new_credits, "No change is receiver credits?");

  };
});

