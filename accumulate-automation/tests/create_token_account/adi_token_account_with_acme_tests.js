import { assert } from 'chai';
import { sleep } from '../../utils/utils.js';
import { adiToken } from '../../cli/transactions/create_token/adiToken.js';
import { cliConstants } from '../../constants/cliConstants.js';
import adiTestData  from '../../constants/testAdiDataFile.js';
import * as commonLib from '../../cli/common.js';

describe('ADI Token Account with ACME ', function () {
  describe('', function () {
    this.timeout(120000);
    it.only('[] Verify ADI ACME Token Account creation using a Public Key', function () {
      // const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account6;
      const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account2;
      const newAdiAccountUrl = "acmeAutoToken" + Math.floor(Math.random() * 100);
   
      successful_creation(adiAccount, adiAccount.publicKey, newAdiAccountUrl);
    });

    function successful_creation(adiAccount, signerKeyName = "", newAdiTokenUrl = "", tokenUrl = "") {
      console.log(">>>> successful_transfer");
      console.log(">>>>>>>> adiAccount ", adiAccount);

      commonLib.load_credits(adiAccount.keyPage, 100);
      sleep(10000);
      let old_credits = commonLib.get_credits(adiAccount.keyPage);
     
      let adiTokenObj = new adiToken();
      let adiTokenAccount = adiTokenObj.create_adi_token_account(adiAccount, signerKeyName, newAdiTokenUrl, tokenUrl);
      console.log(">>>>>>>>>> adiTokenAccount ::", adiTokenAccount);
      sleep(10000);

      let output = commonLib.get_data_by_url(adiTokenAccount);
      console.log("Data >>>>", output.data);
      assert.equal(output.data.type,"tokenAccount", "Is ADI Token account present?");
      assert.equal(output.data.authorities[0].url,adiAccount.keyBook, "Is ADI Token account keyBook present?");
      assert.equal(output.data.tokenUrl, "acc://ACME", "ACME Tokens present?");

      let new_credits = commonLib.get_credits(adiAccount.keyPage);
      console.log("Old credits in ADI =", old_credits);
      console.log("New credits in ADI =", new_credits);
      assert.isTrue(old_credits-new_credits==cliConstants.FEE_CREATE_TOKEN_ACCOUNT * 100, "Expected Credits are deducted?");

    };

  });


});

