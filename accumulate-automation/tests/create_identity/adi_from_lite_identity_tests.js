import { assert, expect } from 'chai';
import { sleep } from '../../utils/utils.js';
import { liteUtils } from '../../cli/lite_account/liteUtils.js';
import { adiCreate } from '../../cli/transactions/adi_create/adiCreate.js';
import { addCredits } from '../../cli/transactions/add_credits/addCredits.js';
import { adiUtils } from '../../cli/adi_account/adiUtils.js';
import { cliConstants } from '../../constants/cliConstants.js';
import liteTestData  from '../../constants/testLiteDataFile.js';
import * as commonLib from '../../cli/common.js';

describe('ADI from Lite Identity', () => {
  describe('',function () {
    this.timeout(130000);

    it('[] Verify ADI Creation with public key', function () {
      const liteAccount = liteTestData.liteAccounts.same_bvn.account1;
      successful_creation(liteAccount);
    });

    it('[] Verify ADI Creation with public key and keybook', function () {
      const liteAccount = liteTestData.liteAccounts.same_bvn.account1;
      const keyName = liteAccount.name;
      const bookName = "myAutoBook";

      successful_creation(liteAccount, keyName, bookName);
    });

    //TO FIX
    // it.only('[] Verify ADI Creation with given key', function () {
    //   const liteAccount = liteTestData.liteAccounts.same_bvn.account1;
    //   const keyName = commonLib.random_name_generator();
    //   commonLib.generate_key(keyName);

    //   successful_creation(liteAccount, keyName);
    // });

    it('[] Verify ADI Creation with given key and keybook', function () {
      const liteAccount = liteTestData.liteAccounts.same_bvn.account1;
      const keyName = commonLib.random_name_generator();
      commonLib.generate_key(keyName);

      const bookName = "myAutoBook";
      successful_creation(liteAccount, keyName, bookName);
    });

    it('[] Verify ADI Creation without sufficient credits', function () {
      let liteObj = new liteUtils();
      const liteAccount = liteTestData.liteAccounts.same_bvn.account1;
      sleep(10000);

      const new_adi_url = "a.acme";
      let output = new adiCreate().adi_from_lite_account(liteAccount.identity, new_adi_url, liteAccount.publicKey);
      assert.isTrue(output.error.message.includes("has insufficient credits"));
    });

  });


  function successful_creation(liteAccount, key_name = "", bookName = "") {
    console.log(">>>> successful_transfer");
    console.log(">>>>>>>> liteAccount ", liteAccount.name);

    const senderAccount = liteTestData.liteAccounts.same_bvn.account2;
    let addCreditsObj = new addCredits();
    addCreditsObj.add_credits(liteAccount.url, liteAccount.identity, 6000, 6000);
    sleep(10000);

    let old_credits = commonLib.get_credits(liteAccount.identity);
    assert.isTrue(old_credits > Number(cliConstants.FEE_CREATE_IDENTITY) * 100, "Has sufficient credits");

    let adiUtilsObj = new adiUtils();
    let newAdiAccount = adiUtilsObj.create_adi_from_lite_account(liteAccount.url, key_name, bookName);
    console.log("newAdiAccount =", newAdiAccount);
    sleep(10000);

    bookName = (bookName == "") ? 'book' : bookName;

    const new_adi_key_page = 'acc://' + newAdiAccount + '/' + bookName + '/1';
    let output = commonLib.get_data_by_url(new_adi_key_page);
    assert.equal(output.data.url, new_adi_key_page, "Is New ADI key page present?");

    sleep(20000);
    let new_credits = commonLib.get_credits(liteAccount.identity );
    console.log("old_credits ->", old_credits);
    console.log("new_credits ->", new_credits);
    console.log("old_credits-new_credits ->", old_credits-new_credits);
    assert.equal(old_credits-new_credits,Number(cliConstants.FEE_CREATE_IDENTITY) * 100, cliConstants.FEE_CREATE_IDENTITY + " Credits is deducted as expected");
    expect(old_credits-new_credits).to.be.eq(Number(cliConstants.FEE_CREATE_IDENTITY) * 100);
  };
});

