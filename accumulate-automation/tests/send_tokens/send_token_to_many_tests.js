import { assert } from 'chai';

import * as commonLib from '../../cli/common.js';
import { sendTokens } from '../../cli/transactions/send_tokens/sendTokens.js';
import { cliConstants } from '../../constants/cliConstants.js';
import adiTestData  from '../../constants/testAdiDataFile.js';
import { transaction } from '../../cli/transactions/tx/transaction.js';
import liteTestData  from '../../constants/testLiteDataFile.js';
import { sleep } from '../../utils/utils.js';

describe('Send Tokens To Multiple accounts Tests', function () {
    describe('With ACME Tokens', function () {
        this.timeout(1000000);
        it('[] Verify transfer of tokens from LTA to multiple accounts', function () {
            const senderAccount = adiTestData.adiAccounts.same_bvn.adiToken.account1;
            const receiverAccount1 =  adiTestData.adiAccounts.same_bvn.adiToken.account2;
            const receiverAccount2 =  adiTestData.adiAccounts.same_bvn.adiToken.account3;
            const tokens_to_receiverAccount1 = 10;
            const tokens_to_receiverAccount2 = 5;

            multiple_accounts(senderAccount.url, senderAccount.signerKey, receiverAccount1.url, receiverAccount2.url,tokens_to_receiverAccount1, tokens_to_receiverAccount2);
        });

        function multiple_accounts(fromAccount, signerKey, toAccount1, toAccount2, tokens_to_toAccount1, tokens_to_toAccount2  ) {

            let sender_old_balance = commonLib.get_token_balance(fromAccount);
            let receiver1_old_balance = commonLib.get_token_balance(toAccount1);
            let receiver2_old_balance = commonLib.get_token_balance(toAccount2);
            console.log("old_balance =", sender_old_balance);
            console.log("receiver1_old_balance =", receiver1_old_balance);
            console.log("receiver2_old_balance =", receiver2_old_balance);

            let payload = commonLib.construct_send_tokens_payload(toAccount1, toAccount2, tokens_to_toAccount1, tokens_to_toAccount2);
            sleep(5000);
  
            let transactionObj = new transaction();
            transactionObj.execute(fromAccount, signerKey, payload);
            sleep(20000);

            let sender_new_balance = commonLib.get_token_balance(fromAccount);
            let receiver1_new_balance = commonLib.get_token_balance(toAccount1);
            let receiver2_new_balance = commonLib.get_token_balance(toAccount2);
            console.log("Sender old_balance =", sender_old_balance);
            console.log("Sender new_balance =", sender_new_balance);
            console.log("receiver1_new_balance =", receiver1_new_balance);
            console.log("(receiver1_old_balance + Number(tokens_to_toAccount1) =", (receiver1_old_balance + Number(tokens_to_toAccount1)));
            console.log("receiver2_new_balance =", receiver2_new_balance);
            console.log("Difference =", (sender_old_balance - sender_new_balance));
            
            assert.isTrue((sender_old_balance - sender_new_balance)  == (Number(tokens_to_toAccount1)+ Number(tokens_to_toAccount2) ), "Is Tokens deducted from sender as expected");
            assert.isTrue(receiver1_new_balance == (receiver1_old_balance + Number(tokens_to_toAccount1)), "Is Tokens received in Account1 as expected");
            assert.isTrue(receiver2_new_balance == (receiver2_old_balance + Number(tokens_to_toAccount2)), "Is Tokens received as Account2 expected");
        };
    });

});

