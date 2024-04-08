import { assert } from 'chai';
import { execute, exec_cmd, jyothi_exec, sleep } from '../../utils/utils.js';

import { tokenIssuer } from '../../cli/transactions/token_issuer/tokenIssuer.js';
import { cliConstants } from '../../constants/cliConstants.js';
import adiTestData  from '../../constants/testAdiDataFile.js';
import * as commonLib from '../../cli/common.js';

describe('Token issuer with Origin as ADI ', function () {
    describe('', function () {
        this.timeout(1000000);

        it('[] Verify Token issuer creation using a Public Key without naming a Key Book', function () {
            const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account0;

            let issuerName = 'TokenIssuer' + commonLib.random_name_generator(3);
            let symbolName = "RAJ_TOKEN";
            let precision = 0;
            let supplyLimit = 100000;
            const newAdiAccountUrl = "customAutoToken" + Math.floor(Math.random() * 100);

            successful_creation(adiAccount, adiAccount.publicKey, issuerName, symbolName, precision, supplyLimit, newAdiAccountUrl);
        });

        function successful_creation(adiAccount, signerKeyName, issuerName, symbolName, precision, supplyLimit, newAdiAccountUrl, customkey = "", keybook = "") {
            commonLib.load_credits(adiAccount.keyPage, 200);
            sleep(10000);
            let old_credits = commonLib.get_credits(adiAccount.keyPage);

            let tokenIssuerObj = new tokenIssuer();
            let tokenIssuerAccount = tokenIssuerObj.create_token_issuer(adiAccount, signerKeyName, issuerName, symbolName, precision, supplyLimit);

            assert.equal(tokenIssuerAccount.type, "tokenIssuer", "Is a Token issuer?");
            assert.isTrue(tokenIssuerAccount.url.includes(issuerName), "Is issuer url present");
            assert.equal(tokenIssuerAccount.symbol, symbolName, "Is symbol present");

            let new_credits = commonLib.get_credits(adiAccount.keyPage);
            console.log("Old Credits =>", old_credits);
            console.log("New Credits =>", new_credits);
            console.log("Difference =>", (old_credits - new_credits));
            console.log("Expected =", Number(cliConstants.FEE_CREATE_TOKEN * 100));
            assert.isTrue((old_credits - new_credits) == Number(cliConstants.FEE_CREATE_TOKEN * 100), "Expected Credits are deducted?");
        };

    });


});

