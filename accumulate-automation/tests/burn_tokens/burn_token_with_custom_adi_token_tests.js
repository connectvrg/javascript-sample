import { assert } from 'chai';

import * as commonLib from '../../cli/common.js';
import { burnToken } from '../../cli/transactions/burn_token/burnToken.js';
import adiTestData  from '../../constants/testAdiDataFile.js';
import { sleep } from '../../utils/utils.js';

describe('Burn Tokens with Custom ADI Token Account', function () {
    describe('Burn Tokens Tests', function () {
        this.timeout(50000);
        
        it('[] Verify burn tokens where Amount is a Positive Integer', function () {
            const account = adiTestData.adiAccounts.same_bvn.adiToken.customAccount2;
            const tokens_to_burn = 1;

            successful_transfer(account.url, account.signerKey ,tokens_to_burn);
        });

        it.skip('[] Verify burn tokens where Amount is Decimal', function () {
            const account = adiTestData.adiAccounts.same_bvn.adiToken.customAccount2;
            const tokens_to_burn = 1.5;

            successful_transfer(account.url, account.signerKey ,tokens_to_burn);
        });

        function successful_transfer(account,signerKey, tokens_to_burn ) {

            let old_balance = commonLib.get_token_balance(account);
            console.log("old_balance =", old_balance);

            let burnTokenObj = new burnToken();
            burnTokenObj.burn_token(account, signerKey, tokens_to_burn);
            sleep(10000);

            let new_balance = commonLib.get_token_balance(account);
            console.log("new_balance =", new_balance);

            console.log("Difference =", (old_balance - new_balance));
            
            assert.isTrue((old_balance - new_balance) == Number(tokens_to_burn), "Is Tokens burned as expected");

        };

        function failed_transfer(account,signerKey, tokens_to_burn ) {
            let old_balance = commonLib.get_token_balance(account);
            console.log("old_balance =", old_balance);

            let burnTokenObj = new burnToken();
            let output = burnTokenObj.burn_token(account, signerKey, tokens_to_burn);
            console.log("Output >>>>>>", output);
          };
    });

});

