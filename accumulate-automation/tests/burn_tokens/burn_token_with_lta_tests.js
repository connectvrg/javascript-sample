import { assert } from 'chai';

import * as commonLib from '../../cli/common.js';
import { burnToken } from '../../cli/transactions/burn_token/burnToken.js';
import { cliConstants } from '../../constants/cliConstants.js';
import liteTestData  from '../../constants/testLiteDataFile.js';
import { sleep } from '../../utils/utils.js';

describe('Burn Tokens with Lite Token Account', function () {
    describe('Burn Tokens Tests', function () {
        this.timeout(50000);
        it('[] Verify burn tokens where Amount is a Positive Integer', function () {
            const account = liteTestData.liteAccounts.same_bvn.account1;
            const tokens_to_burn = 10;

            successful_transfer(account, tokens_to_burn);
        });

        it('[] Verify burn tokens where Amount as Decimal', function () {
            const account = liteTestData.liteAccounts.same_bvn.account1;
            const tokens_to_burn = 10.50;
            
            successful_transfer(account, tokens_to_burn);
        });

         it('[] Verify burn tokens where Amount is a negative value', function () {
            const account = liteTestData.liteAccounts.same_bvn.account1;
            const tokens_to_burn = -20;
            
            failed_transfer(account.url, tokens_to_burn);
        });

        it('[] Verify burn tokens where LTA Not Constructed Properly', function () {
            const account = "acc://30167ce121f84a4eb0a92d050f230c1df27e4daaa61b222";
            const tokens_to_burn = 20;
            
            let burnTokenObj = new burnToken();
            let output = burnTokenObj.burn_token(account, "", tokens_to_burn);
            console.log("Output >>>>>>", output);

            assert.isTrue(output.error.includes(cliConstants.ERROR_INVALID_IDENTITY), "Error occurred");
        });

        it('[] Verify burn tokens with Insufficient ACME to burn', function () {
            const account = liteTestData.liteAccounts.same_bvn.account3;

            let token_balance = commonLib.get_token_balance(account.url);
            const tokens_to_burn = token_balance + 100;

            let burnTokenObj = new burnToken();
            let output = burnTokenObj.burn_token(account.url, "", tokens_to_burn);

            assert.isTrue(output.error.message.includes(cliConstants.ERROR_BURN_TOKENS), "Insufficient ACME tokens");
        });

        it('[] Verify burn tokens where LTA which does not exist', function () {
            const account = "acc://30167ce121f84a4eb0a92d050f230c1df27e4daaa6222225";
            const tokens_to_burn = 20;
            
            let burnTokenObj = new burnToken();
            let output = burnTokenObj.burn_token(account, "", tokens_to_burn);
            console.log("Output >>>>>>", output);

            assert.isTrue(output.error.includes(cliConstants.ERROR_INVALID_IDENTITY), "Error occurred");
        });

        function successful_transfer(account,tokens_to_burn ) {

            let old_balance = commonLib.get_token_balance(account.url);
            let old_credits = commonLib.get_credits(account.identity);
            console.log("old_balance =", old_balance);

            let burnTokenObj = new burnToken();
            burnTokenObj.burn_token(account.url, "", tokens_to_burn);
            sleep(10000);

            let new_balance = commonLib.get_token_balance(account.url);
            console.log("new_balance =", new_balance);
            console.log("Difference =", (old_balance - new_balance));

            let new_credits = commonLib.get_credits(account.identity);
            console.log("credits Difference =", (old_credits - new_credits));
           
            assert.isTrue((old_balance - new_balance) / 100000000 == Number(tokens_to_burn), "Is Tokens burned as expected");
            assert.isTrue((old_credits - new_credits) / 100 == Number(cliConstants.FEE_BURN_TOKENS), "Is Fee deducted for burning tokens");

        };

        function failed_transfer(account,tokens_to_burn ) {
            let old_balance = commonLib.get_token_balance(account);
            console.log("old_balance =", old_balance);

            let burnTokenObj = new burnToken();
            let output = burnTokenObj.burn_token(account, "", tokens_to_burn);
            console.log("Output >>>>>>", output);

            // let new_balance = commonLib.get_token_balance(account);
            // console.log("new_balance =", new_balance);
        
            // assert.isTrue(old_credits == new_credits, "No change is receiver credits?");
            // assert.strictEqual(result.error,cliConstants.ERROR_INSUFFICIENT_ACME);
          };
    });

});

