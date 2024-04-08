import { assert } from 'chai';
import { sleep } from '../../utils/utils.js';

import { adiToken } from '../../cli/transactions/create_token/adiToken.js';
import { tokenIssuer } from '../../cli/transactions/token_issuer/tokenIssuer.js';
import { cliConstants } from '../../constants/cliConstants.js';
import adiTestData  from '../../constants/testAdiDataFile.js';
import * as commonLib from '../../cli/common.js';

describe('ADI Token Account with Custom Token ', function () {
  describe('', function () {
    this.timeout(120000);
   
    it('[] Verify ADI Custom Token Account creation using a Key Name without naming a Key Book', function () {
      const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account6;

      let issuerName = 'TokenIssuer' + commonLib.random_name_generator(3);
      let symbolName = "RAJ_TOKEN";
      let precision = 0;
      let supplyLimit = 100000; 
      const newAdiAccountUrl = "customAutoToken" + Math.floor(Math.random() * 100);

      const keyName = commonLib.random_name_generator();
      commonLib.generate_key(keyName);

      successful_creation(adiAccount, adiAccount.publicKey, issuerName,symbolName, precision,supplyLimit, newAdiAccountUrl,keyName );
    });


    it('[] Verify ADI Custom Token Account creation using a Key Name with a Key Book', function () {
      const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account6;

      let issuerName = 'TokenIssuer' + commonLib.random_name_generator(3);
      let symbolName =  "RAJ_TOKEN";
      let precision = 0;
      let supplyLimit = 100000; 
      const newAdiAccountUrl = "customAutoToken" + Math.floor(Math.random() * 1000);

      const keyName = commonLib.random_name_generator();
      commonLib.generate_key(keyName);

      let keyBook = "rajBook"+ Math.floor(Math.random() * 100);

      successful_creation(adiAccount, adiAccount.publicKey, issuerName,symbolName, precision,supplyLimit, newAdiAccountUrl,keyName, keyBook );
    });

    it('[] Verify ADI Custom Token Account creation using a Public Key without naming a Key Book', function () {
      const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account6;

      let issuerName = 'TokenIssuer' + commonLib.random_name_generator(3);
      let symbolName = "ACME";
      let precision = 0;
      let supplyLimit = 100000; 
      const newAdiAccountUrl = "customAutoToken" + Math.floor(Math.random() * 1000);

      successful_creation(adiAccount, adiAccount.publicKey, issuerName,symbolName, precision,supplyLimit, newAdiAccountUrl );
    });

   
    it('[] Verify ADI Custom Token Account creation using a Public Key with a Key Book', function () {
      const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account6;

      let issuerName = 'TokenIssuer' + commonLib.random_name_generator(3);
      let symbolName =  "RAJ_TOKEN";
      let precision = 0;
      let supplyLimit = 100000; 
      const newAdiAccountUrl = "customAutoToken" + Math.floor(Math.random() * 1000);
      let keyBook = "rajBook"+ Math.floor(Math.random() * 100);

      successful_creation(adiAccount, adiAccount.publicKey, issuerName,symbolName, precision,supplyLimit, newAdiAccountUrl, adiAccount.publicKey, keyBook );

    });

    function successful_creation(adiAccount, signerKeyName, issuerName,symbolName, precision,supplyLimit, newAdiAccountUrl, customkey="", keybook=""  ) {
      // commonLib.load_credits(adiAccount.keyPage, cliConstants.FEE_CREATE_IDENTITY + cliConstants.FEE_CREATE_TOKEN_ACCOUNT);
      commonLib.load_credits(adiAccount.keyPage, 5025);
      sleep(10000);

      let tokenIssuerObj = new tokenIssuer();
      let tokenIssuerAccount = tokenIssuerObj.create_token_issuer(adiAccount, signerKeyName,issuerName, symbolName,precision,supplyLimit);

      assert.equal(tokenIssuerAccount.type, "tokenIssuer", "Is a Token issuer?");
      assert.isTrue(tokenIssuerAccount.url.includes(issuerName), "Is issuer url present");
      assert.equal(tokenIssuerAccount.symbol, symbolName, "Is symbol present");
      
      let old_credits = commonLib.get_credits(adiAccount.keyPage);
      let adiTokenObj = new adiToken();
      let newAdiToken = adiTokenObj.create_adi_token_account(adiAccount,signerKeyName, newAdiAccountUrl , tokenIssuerAccount.url);
      sleep(20000);

      const result = commonLib.get_data_by_url(newAdiToken);
      const adiTokenAccount = result.data;

      assert.equal(adiTokenAccount.type, "tokenAccount", "Is a Token Account?");
      assert.isTrue(adiTokenAccount.url.includes(newAdiAccountUrl),"Is newAdiAccountUrl is present?");
      assert.equal(adiTokenAccount.tokenUrl, tokenIssuerAccount.url, "Is Token issuer url is correct?");

      let new_credits = commonLib.get_credits(adiAccount.keyPage);
      console.log("old_credits =>", old_credits);
      console.log("new_credits =>", new_credits);
      assert.isTrue(old_credits-new_credits==cliConstants.FEE_CREATE_TOKEN_ACCOUNT * 100, "Expected Credits are deducted?");

    };

  });


});

