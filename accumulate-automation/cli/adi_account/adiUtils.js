import { liteUtils } from '../lite_account/liteUtils.js';
import { addCredits } from '../transactions/add_credits/addCredits.js';
import { adiCreate } from '../transactions/adi_create/adiCreate.js';
// import { adiToken } from '../transactions/create_token_account/adiToken.js';
import * as commonLib from '../common.js';
import { sleep } from '../../utils/utils.js';
import { assert } from 'chai';
import { cliConstants } from '../../constants/cliConstants.js';

export class adiUtils {

    // Create new ADI from lite token account. 
    // When public key 1 is specified it will be assigned to the first page, otherwise the origin key is used.
    // accumulate adi create [origin-lite-account] [adi url to create] [public-key or key name] 
    //[key-book-name (optional)] [public key page 1 (optional)] 
    create_adi_from_lite_account(liteIdentityValue = "", key_name = "", key_book_name = "", key_page = "", new_adi_name = "") {
        console.log(">>>> create_adi_from_lite_account - new_adi_name=", new_adi_name);
        let liteAccount, lite_account_url, key_value, public_key, key_book_value, key_page_value;

        let liteObj = new liteUtils();

        if (liteIdentityValue != "") {
            console.log("Lite account is passed");
            if (liteIdentityValue.indexOf("ACME") !== -1) {
                lite_account_url = liteIdentityValue;
            } else {
                lite_account_url = 'acc://' + liteIdentityValue + '/ACME';
            }
            console.log('lite_account_url', lite_account_url);
            let privateKeyOutput = commonLib.get_private_key(key_name);
            console.log(">>>>>>privateKeyOutput =", privateKeyOutput);
            public_key = "AC12c9qBicxUiUF53CECSJxAmEGuRF6XsGDYG2eFoudpoX9EQz1zD";
        }
        else {
            liteAccount = liteObj.create_lite_account();
            lite_account_url = liteAccount.url;
            public_key = liteAccount.publicKey;
        }

        key_value = (key_name != "") ? key_name : public_key;

        let new_adi_url;
        let adiCreateObj = new adiCreate();
        if(new_adi_name!=""){
            new_adi_url = new_adi_name;
        }else{
            new_adi_url = "automationAdi" + Math.floor(Math.random() * 1000) + ".acme";
        }
        console.log("New ADI Name ::", new_adi_url);

        key_book_value = (key_book_name != "") ? new_adi_url + "/" + key_book_name : '';
        key_page_value = (key_page != "") ? new_adi_url + "/" + key_book_name + "/" + key_page : '';

        adiCreateObj.adi_from_lite_account(lite_account_url, new_adi_url, key_value, key_book_value, key_page_value);
        return new_adi_url;
    }

    create_adi_from_adi_token_account(adiTokenAccount, key_name, new_adi_url, key_name_for_adi, key_book_name="", key_page = "") {
        console.log(">>>> create_adi_from_adi_token_account");
        let  key_book_value, key_page_value;

        let adiTokenAccountData = commonLib.get_data_by_url(adiTokenAccount);
        console.log("adiTokenAccountData -->", adiTokenAccountData);
        const balance = adiTokenAccountData.data.balance;
        
        let urlValue = adiTokenAccountData.data.url;
        let subValue = urlValue.substr(0, urlValue.indexOf(".acme"));

        const parentADIKeybook = subValue + ".acme/book";
        let parentADIData = commonLib.get_data_by_url(parentADIKeybook + "/1");
        const credits = parentADIData.data.creditBalance;
        console.log("parentADIData credits =",credits);
        assert.isTrue(credits > 500, "Have sufficient credits for ADI Creation");

        key_book_value = (key_book_name != "") ? new_adi_url + "/" + key_book_name : '';
        key_page_value = (key_page != "") ? new_adi_url + "/" + key_book_name + "/" + key_page : '';

        let adiCreateObj = new adiCreate();
        adiCreateObj.adi_from_adi(adiTokenAccount, key_name, new_adi_url, key_name_for_adi, key_book_value, key_page_value);
        sleep(20000);
        
        let output = commonLib.get_data_by_url(new_adi_url);
        console.log(">>>> output.data =", output.data);
        assert.isTrue(output.data!=undefined, "Account is created successfully");
        assert.isTrue(output.data.url.includes(new_adi_url), "ADI is created successfully");
        return new_adi_url;
    }

    // Create new ADI for another ADI
    // accumulate adi create [origin-adi-url] [wallet signing key name] [key index (optional)] 
    // [key height (optional)] [adi url to create] [public key or wallet key name]
    // [key book url (optional)] [public key page 1 (optional)] 
    create_adi_from_adi_account(adiAccount, key_name, new_adi_url, key_name_for_adi, key_book_name="", key_page = "") {
        console.log(">>>> create_adi_from_adi_account");
        let  key_book_value, key_page_value;

        let adiAccountData = commonLib.get_data_by_url(adiAccount);
        console.log("adiAccountData -->", adiAccountData);

        let urlValue = adiAccountData.data.url;
        let subValue = urlValue.substr(0, urlValue.indexOf(".acme"));

        const adiKeybook = subValue + ".acme/book";
        let parentADIData = commonLib.get_data_by_url(adiKeybook + "/1");

        let creditsInKeyPage = commonLib.get_data_by_url(adiKeybook + "/1");
        const credits = creditsInKeyPage.data.creditBalance;
        console.log("creditsInKeyPage =",credits);
        assert.isTrue(credits > cliConstants.FEE_CREATE_IDENTITY, "Have sufficient credits for ADI Creation");

        key_book_value = (key_book_name != "") ? new_adi_url + "/" + key_book_name : '';
        key_page_value = (key_page != "") ? new_adi_url + "/" + key_book_name + "/" + key_page : '';

        let adiCreateObj = new adiCreate();
        adiCreateObj.adi_from_adi(adiAccount, key_name, new_adi_url, key_name_for_adi, key_book_value, key_page_value);
        sleep(20000);
        
        let output = commonLib.get_data_by_url(new_adi_url);
        console.log(">>>> output.data =", output.data);
        assert.isTrue(output.data!=undefined, "Account is created successfully");
        assert.isTrue(output.data.url.includes(new_adi_url), "ADI is created successfully");
        return new_adi_url;
    }

}