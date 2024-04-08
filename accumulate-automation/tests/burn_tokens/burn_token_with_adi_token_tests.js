import { assert } from 'chai';

import * as commonLib from '../../cli/common.js';
import { burnToken } from '../../cli/transactions/burn_token/burnToken.js';
import { cliConstants } from '../../constants/cliConstants.js';
import adiTestData  from '../../constants/testAdiDataFile.js';
import { sleep } from '../../utils/utils.js';

describe('Burn Tokens with ADI Token Account', function () {
    describe('Burn Tokens Tests', function () {
        this.timeout(50000);
        it('[] Verify burn tokens where Amount is a Positive Integer', function () {
            const account = adiTestData.adiAccounts.same_bvn.adiToken.account1;
            const tokens_to_burn = 1;

            successful_transfer(account.url, account.signerKey ,tokens_to_burn);
        });

        it('[] Verify burn tokens where Amount as Decimal', function () {
            const account = adiTestData.adiAccounts.same_bvn.adiToken.account1;
            const tokens_to_burn = 1.50;
            
            successful_transfer(account.url, account.signerKey ,tokens_to_burn);
        });

         it('[] Verify burn tokens where Amount is a negative value', function () {
            const account = adiTestData.adiAccounts.same_bvn.adiToken.account1;
            const tokens_to_burn = -20;
            
            failed_transfer(account.url, account.signerKey, tokens_to_burn);
        });

        it('[] Verify burn tokens with signer key', function () {
            const account = adiTestData.adiAccounts.same_bvn.adiToken.account1;
            const tokens_to_burn = 2;
            
            let burnTokenObj = new burnToken();
            let output = burnTokenObj.burn_token(account.url, account.signerKey, tokens_to_burn);
        });

        it('[] Verify burn tokens with Insufficient ACME to burn', function () {
            const account = adiTestData.adiAccounts.same_bvn.adiToken.account1;

            let token_balance = commonLib.get_token_balance(account.url);
            const tokens_to_burn = token_balance + 100;

            let burnTokenObj = new burnToken();
            let output = burnTokenObj.burn_token(account.url, account.signerKey, tokens_to_burn);

            assert.isTrue(output.error.message.includes(cliConstants.ERROR_BURN_TOKENS), "Insufficient ACME tokens");
        });

        it('[] Verify burn tokens where account does not exist', function () {
            const account = adiTestData.adiAccounts.same_bvn.adiToken.account1;
            const tokens_to_burn = 2;
            
            let burnTokenObj = new burnToken();
            let output = burnTokenObj.burn_token(account.url + "1", account.signerKey, tokens_to_burn);
            console.log("Output >>>>>>", output);

            assert.isTrue(output.error.includes(cliConstants.ERROR_FAILED_TO_GET_KEY), "Error occurred");
        });

        it.skip('[] Verify burn tokens from Sub-Adi-Token account where Amount is a Positive Integer', function () {
            const account = adiTestData.adiAccounts.same_bvn.subAdiToken.account1;
            const tokens_to_burn = 1;

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
            
            assert.isTrue((old_balance - new_balance) / 100000000 == Number(tokens_to_burn), "Is Tokens burned as expected");

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

