import { assert } from 'chai';

import * as commonLib from '../../cli/common.js';
import { burnToken } from '../../cli/transactions/burn_token/burnToken.js';
import adiTestData  from '../../constants/testAdiDataFile.js';
import liteTestData  from '../../constants/testLiteDataFile.js';
import { sleep } from '../../utils/utils.js';

describe('Burn Tokens with Custom Lite Token Account', function () {
    describe('Burn Custom Tokens Tests', function () {
        this.timeout(50000);
        it('[] Verify burn tokens where Amount is a Positive Integer', function () {
            const liteAccount = liteTestData.liteAccounts.same_bvn.account2;
            const adiAccount = adiTestData.adiAccounts.same_bvn.adiToken.customAccount1;
            let tokenIssuer = adiAccount.tokenIssuer;
            const customLiteTokenAccount = liteAccount.identity + tokenIssuer.substr(5);
            const tokens_to_burn = 1;
            
            let signerKey = adiAccount.signerKey;
            successful_transfer(customLiteTokenAccount ,tokens_to_burn);
        });

        it.skip('[] Verify burn tokens where Amount is Decimal', function () {
            const liteAccount = liteTestData.liteAccounts.same_bvn.account2;
            const adiAccount = adiTestData.adiAccounts.same_bvn.adiToken.customAccount2;
            let tokenIssuer = adiAccount.tokenIssuer;
            const customLiteTokenAccount = liteAccount.identity + tokenIssuer.substr(5);
            const tokens_to_burn = 1.5;
            
            let signerKey = adiAccount.signerKey;
            successful_transfer(customLiteTokenAccount ,tokens_to_burn);
        });

        it('[] Verify burn tokens with incorrect value', function () {
            const liteAccount = liteTestData.liteAccounts.same_bvn.account2;
            const adiAccount = adiTestData.adiAccounts.same_bvn.adiToken.customAccount2;
            let tokenIssuer = adiAccount.tokenIssuer;
            const customLiteTokenAccount = liteAccount.identity + tokenIssuer.substr(5);
            const tokens_to_burn = -12;
            
            let signerKey = adiAccount.signerKey;

            failed_transfer(customLiteTokenAccount ,tokens_to_burn);
        });

        function successful_transfer(account, tokens_to_burn ) {
            let old_balance = commonLib.get_token_balance(account);
            console.log("old_balance =", old_balance);

            let burnTokenObj = new burnToken();
            burnTokenObj.burn_token(account, "", tokens_to_burn);
            sleep(10000);

            let new_balance = commonLib.get_token_balance(account);
            let new_credits = commonLib.get_credits(account);
            console.log("new_balance =", new_balance);
            console.log("Difference =", (old_balance - new_balance));
            
            assert.isTrue((old_balance - new_balance) == Number(tokens_to_burn), "Is Tokens burned as expected");

        };

        function failed_transfer(account, tokens_to_burn ) {
            let old_balance = commonLib.get_token_balance(account);
            console.log("old_balance =", old_balance);

            let burnTokenObj = new burnToken();
            let output = burnTokenObj.burn_token(account, "", tokens_to_burn);
            console.log("Output >>>>>>", output);
          };
    });

});

