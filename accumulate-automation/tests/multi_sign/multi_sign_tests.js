import { assert } from 'chai';
import { sleep } from '../../utils/utils.js';
import { addCredits } from '../../cli/transactions/add_credits/addCredits.js';
import { cliConstants } from '../../constants/cliConstants.js';
import adiTestData from '../../constants/testAdiDataFile.js';
import liteTestData from '../../constants/testLiteDataFile.js';
import { transaction } from '../../cli/transactions/tx/transaction.js';
import { keyPageActions } from '../../cli/transactions/create_key_page/keyPageActions.js';
import { createKeyPage } from '../../cli/transactions/create_key_page/createKeyPage.js';
import * as commonLib from '../../cli/common.js';

describe('Multi sign Tests ', function () {
    describe('', function () {
        this.timeout(90000);

        it.only('[] Verify signing a transaction with multi signature', function () {
            const adiAccount = adiTestData.adiAccounts.same_bvn.adi.account2;
            const signerKey = adiAccount.publicKey;

            let keyBookData = commonLib.get_data_by_url(adiAccount.keyBook);
            console.log(">>> keyBookData ::", keyBookData.data);
            const pageCount = keyBookData.data.pageCount;
            console.log(">>> current page count =", Number(pageCount));

            let addCreditsObj = new addCredits();
            const liteAccount = liteTestData.liteAccounts.same_bvn.account1;
            let keyPage = keyBookData.data.url + "/" + (pageCount);
            console.log(">>>>>>>>>> VRG keyPage =", keyPage);
            addCreditsObj.add_credits(liteAccount.url, keyPage, Number(cliConstants.FEE_CREATE_KEY_PAGE) + 1200);
            sleep(10000);

            let old_credits = commonLib.get_credits(adiAccount.keyPage);
            assert.isTrue(old_credits >= Number(cliConstants.FEE_CREATE_KEY_PAGE) * 100, "KeyPage has sufficient credits");

            //Add a key for multi sig transactions
            const keyName1 = "CustomKey" + commonLib.random_name_generator(4);
            commonLib.generate_key(keyName1);
            let keyPageActionsObj = new keyPageActions();
            keyPageActionsObj.add_key_to_key_page(keyPage, signerKey, keyName1);

            //Add Threshold to Key Page
            let payload = commonLib.construct_threshold_payload(2);
            let transactionObj = new transaction();
            transactionObj.execute(keyPage, signerKey, payload);
            sleep(10000);
            
            //Verify the keys present in Key page
            let keyPageData = commonLib.get_data_by_url(keyPage);
            let totalKeysBeforeAdding = keyPageData.data.keys.length;
            console.log("totalKeysBeforeAdding ::", totalKeysBeforeAdding);

            //Add New key to Key Page
            const newKey =  "CustomKey" + commonLib.random_name_generator(4);
            commonLib.generate_key(newKey);
            let result = keyPageActionsObj.add_key_to_key_page(keyPage, signerKey, newKey);
            console.log("transactionHash ::", result.transactionHash);

            //Make sure the key is not added due to threshold
            keyPageData = commonLib.get_data_by_url(keyPage);
            let totalKeysBeforeSigning = keyPageData.data.keys.length;
            console.log("totalKeysBeforeSigning ::", totalKeysBeforeSigning);

            // assert.isTrue(totalKeysBeforeAdding === totalKeysBeforeSigning, " Key is Not added as it is a multi sig");

            //Sign the transaction
            transactionObj.sign(keyPage, keyName1, result.transactionHash);

            //Verify whether the key is added successfully to key page 
            keyPageData = commonLib.get_data_by_url(keyPage);
            let totalKeysAfterSigning = keyPageData.data.keys.length;
            console.log("totalKeysAfterSigning ::", totalKeysAfterSigning);
            assert.isTrue((Number(totalKeysBeforeAdding) + 1) === totalKeysAfterSigning, " Key is Added after multi sig");

            //Post activity - remove the newly added key
            result = keyPageActionsObj.remove_key_from_key_page(keyPage, signerKey, newKey);
        });


    });

    function successful_creation(adiAccount, signerKey, keyNames) {
        console.log(">>>> successful_creation");

        let keyBookData = commonLib.get_data_by_url(adiAccount.keyBook);
        console.log(">>> keyBookData ::", keyBookData.data);
        const pageCount = keyBookData.data.pageCount;
        console.log(">>> current page count =", Number(pageCount));

        let addCreditsObj = new addCredits();
        const liteAccount = liteTestData.liteAccounts.same_bvn.account1;
        let keyPage = keyBookData.data.url + "/" + (pageCount);
        console.log(">>>>>>>>>> VRG keyPage =", keyPage);
        addCreditsObj.add_credits(liteAccount.url, keyPage, Number(cliConstants.FEE_CREATE_KEY_PAGE) + 1200);
        sleep(10000);

        let old_credits = commonLib.get_credits(adiAccount.keyPage);
        assert.isTrue(old_credits >= Number(cliConstants.FEE_CREATE_KEY_PAGE) * 100, "KeyPage has sufficient credits");

        //Add a key for multi sig transactions
        const keyName1 = "Key1001";
        commonLib.generate_key(keyName1);
        let keyPageActionsObj = new keyPageActions();
        keyPageActionsObj.add_key_to_key_page(keyPage, signerKey, keyName1);

        //Add Threshold to Key Page
        let payload = commonLib.construct_threshold_payload(2);
        let transactionObj = new transaction();
        transactionObj.execute(keyPage, signerKey, payload);

        //Verify the keys present in Key page
        let keyPageData = commonLib.get_data_by_url(keyPage);
        let totalKeysBeforeAdding = keyPageData.data.keys.length;
        console.log("totalKeysBeforeAdding ::", totalKeysBeforeAdding);

        //Add New key to Key Page
        const newKey = "Key1010";
        commonLib.generate_key(newKey);
        let result = keyPageActionsObj.add_key_to_key_page(keyPage, signerKey, newKey);
        console.log("transactionHash ::", result.transactionHash);

        //Make sure the key is not added due to threshold
        keyPageData = commonLib.get_data_by_url(keyPage);
        let totalKeysBeforeSigning = keyPageData.data.keys.length;
        console.log("totalKeysBeforeSigning ::", totalKeysBeforeSigning);

        assert.isTrue(totalKeysBeforeAdding === totalKeysBeforeSigning, " Key is Not added as it is a multi sig");

        //Sign the transaction
        transactionObj.sign(keyPage, keyName1, result.transactionHash);

        //Verify whether the key is added successfully to key page 
        keyPageData = commonLib.get_data_by_url(keyPage);
        let totalKeysAfterSigning = keyPageData.data.keys.length;
        console.log("totalKeysAfterSigning ::", totalKeysAfterSigning);
        assert.isTrue((Number(totalKeysBeforeAdding) + 1) === totalKeysAfterSigning, " Key is Added after multi sig");

        //Post activity - remove the newly added key
        result = keyPageActionsObj.remove_key_from_key_page(keyPage, signerKey, newKey);

    };

    function failure_scenario(adiAccount, signerKey, keyNames) {
        let old_credits = commonLib.get_credits(adiAccount.keyPage);
        assert.isTrue(old_credits > Number(cliConstants.FEE_CREATE_KEY_PAGE) * 100, "KeyPage has sufficient credits");

        let createKeyPageObj = new createKeyPage();
        let output = createKeyPageObj.create_key_page(adiAccount.keyBook, signerKey, '', '', keyNames);
        sleep(5000);
        console.log(">>>>>>>> output =", output);
        return output;
    }
});

