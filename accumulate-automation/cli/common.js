import { execute_accumulate, execute, sleep } from "../utils/utils.js";
import network from "../constants/environment.js";
import { liteUtils } from "./lite_account/liteUtils.js";
import { addCredits } from "./transactions/add_credits/addCredits.js";
import liteTestData  from '../constants/testLiteDataFile.js';
import * as crypto from "crypto";
import { getOperatingSystem } from "../constants/environment.js";
import { cliConstants } from "../constants/cliConstants.js";

export function generate_key(keyName) {
    console.log(">>>>> generate_key");
    const command = `key generate ${keyName} -s ${network} --use-unencrypted-wallet -j`;
    return executeAccumulateCommand(command);
};

// export function generate_btc_key(keyName="") {
//     console.log(">>>>> generate_key_for_btc");
//     const output = generate_custom_keys(cliConstants.KEY_BTC, keyName);
//     console.log("output ::", output);
//     return output;
// };

// export function generate_btc_legacy_key(keyName="") {
//     console.log(">>>>> generate_btc_legacy_key");
//     const output = generate_custom_keys(cliConstants.KEY_BTC_LEGACY, keyName);
//     console.log("output ::", output);
//     return output;
// };

// export function generate_rcd1_key(keyName="") {
//     console.log(">>>>> generate_key_for_rcd1");
//     const output = generate_custom_keys(cliConstants.KEY_RCD1, keyName);
//     console.log("output ::", output);
//     return output;
// };

// export function generate_key_for_eth(keyName="") {
//     console.log(">>>>> generate_key_for_eth");
//     const output = generate_custom_keys(cliConstants.KEY_ETH, keyName);
//     console.log("output ::", output);
//     return output;
// };

// export function generate_key_for_ed25519(keyName="") {
//     console.log(">>>>> generate_key_for_eth");
//     const output = generate_custom_keys(cliConstants.KEY_ED25519, keyName);
//     console.log("output ::", output);
//     return output;
// };

export function generate_custom_key(sigType, keyName = "") {
    console.log(">>>>> generate_custom_keys -- keyName ::", keyName);
    const command = `key generate --sigtype ${sigType} ${keyName} -s ${network} --use-unencrypted-wallet -j`;
    return executeAccumulateCommand(command);
};


export function get_data_by_url(url) {
    console.log(">>>>>>>>> get_data_by_url()");
    // sleep(10000);
    const command = `get ${url} -s ${network} --use-unencrypted-wallet -j --wait 1m`;
    return executeAccumulateCommand(command);
};

export function get_adi_directory_list(adiName, minCount, maxCount) {
    console.log(">>>>>>>>> get_adi_directory_list()");
    // sleep(10000);
    const command = `adi directory ${adiName} ${minCount} ${maxCount} -s ${network} --use-unencrypted-wallet -j`;
    return executeAccumulateCommand(command);
};


export function random_name_generator(charLength = 8) {
    console.log(">>>>> random_name_generator");
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < charLength; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    console.log("Random value is ::", text);
    return text;
}


export function get_private_key(keyName) {
    console.log(">>>>> get_private_key");
    const command = `key export private ${keyName} -s ${network} --use-unencrypted-wallet -j`;
    return executeAccumulateCommand(command);
}

export function get_credits(url) {
    console.log(">>>> get_credits ");
    let result = get_data_by_url(url);
    let credits = 0;
    if (result.type == "tokenAccount") {
        credits = result.data.balance;
    } else {
        credits = (result.data.creditBalance === undefined) ? 0 : result.data.creditBalance;
    }
    console.log("credits ::", credits);
    return Number(credits);
}

export function get_token_balance(url) {
    console.log(">>>> get_token_balance ");
    let result = get_data_by_url(url);
    let token_balance = result.data.balance;
    console.log("token_balance ::", token_balance);
    return Number(token_balance);
}

export function executeAccumulateCommand(commandToExecute) {
    console.log(">>>> executeAccumulateCommand");
    console.log("Operating system :", getOperatingSystem());

    let command = (getOperatingSystem() == "linux") ? `./accumulate ` : `accumulate `;
    try {
        const output = execute(command + `${commandToExecute}`);
        // console.log("output >>>", output.toString());
        let result = JSON.parse(output);
        console.log("Parsed Json ::", result);
        return result;
    } catch (e) {
        console.log("In catch block :", e.toString());
        return e.toString();
    }
}

export function load_credits(account, number_of_credits) {
    console.log(">>>> load_credits ", account);

    const liteAccount = liteTestData.liteAccounts.same_bvn.account1;
    // let liteUtilsObj = new liteUtils();
    // let liteTokenAccount = liteUtilsObj.create_lite_account();
    // console.log("liteTokenAccount >>>", liteTokenAccount);
    // sleep(20000);
    
    let addCreditsObj = new addCredits();
    addCreditsObj.add_credits(liteAccount.url, account, number_of_credits);
}

export function isLiteAccount(account) {
    console.log(">>>> isLiteAccount ", account);

    let output = this.get_data_by_url(account);
    console.log("output >>>", output);

    let result = (output.type === "liteTokenAccount" || output.type === "liteIdentity");
    console.log("Is lite account? ", result);
    return result;
}

export function construct_update_key_payload(oldKey, newKey, delegateValue="") {
    console.log(">>>> construct_update_key_payload ");
    const oldKeyDetails = get_private_key(oldKey);
    const newKeyDetails = get_private_key(newKey);
    const oldKeyHash = sha256(oldKeyDetails.publicKey);
    const newKeyHash = sha256(newKeyDetails.publicKey);
    console.log(">>> oldKey ::" , oldKey, " oldKeyHash ::", oldKeyHash);
    console.log(">>> newKey ::" , newKey, " newKeyHash ::", newKeyHash);

    let newValue = '{\"keyHash\": \"' + newKeyHash + '\" }';
    if(delegateValue!=""){
        newValue = '{\"delegate\": \"'+ delegateValue + '\", \"keyHash\": \"' + newKeyHash + '\"}';
    }

    let payload = '{\"type\": \"updateKeyPage\", \"operation\": [{ \"type\": \"update\", \"oldEntry\": {\"keyHash\": \"'+ oldKeyHash + '\"} ,\"newEntry\": ' + newValue +'}]}';
    console.log(">>> payload ::", payload);
    return payload;
}

export function construct_update_key_to_multiparty_payload(keypageUrl, oldKeyHash, newKeyHash, additionalKeyHash) {
    console.log(">>>> construct_updateAccountAuth_to_multiparty_payload ");

    let newValue = '';
    let payload = '{\"type\": \"updateKeyPage\", \"operation\": [{ \"type\": \"update\", \"oldEntry\": {\"keyHash\": \"'+ oldKeyHash + '\"} ,\"newEntry\": {\"keyHash\": \"' + newKeyHash + '\" }}, { \"type\": \"add\", \"entry\": {\"owner\": \"' + keypageUrl +'\", \"keyHash\": \"' + additionalKeyHash + '\"}}]}';
    console.log(">>> payload ::", payload);
    return payload;
}

export function construct_updateAccountAuth_to_multiparty_payload(authority1, operation1, authority2, operation2) {
    console.log(">>>> construct_updateAccountAuth_to_multiparty_payload ");

    let payload = '{\"type\": \"updateAccountAuth\", \"operations\": [{ \"type\": \"'+ operation1 +'\", \"authority\": \"' + authority1 + '\"} ,{ \"type\": \"'+ operation2 +'\", \"authority\": \"' + authority2 + '\"}]}';
    console.log(">>> payload ::", payload);
    return payload;
}

export function construct_threshold_payload(thresholdValue) {
    let payload = '{\"type\": \"updateKeyPage\", \"operation\": [{ \"type\": \"setThreshold\", \"threshold\": ' + thresholdValue + '}]}';
    return payload;
}

export function construct_send_tokens_payload(account1, account2, tokens_to_account1, tokens_to_account2) {
    let payload = '{ type: sendTokens, to: [ { url: \"' + account1 +'\", amount: \''+ tokens_to_account1 + '\' }, { url: \"' + account2 +'\", amount: \'' + tokens_to_account2 +'\' } ] }';
    return payload;
}

export function construct_issue_tokens_payload(account1, account2, tokens_to_account1, tokens_to_account2) {
    let payload = '{ type: issueTokens, to: [ { url: \"' + account1 +'\", amount: \''+ tokens_to_account1 + '\' }, { url: \"' + account2 +'\", amount: \'' + tokens_to_account2 +'\' } ] }';
    return payload;
}


export function get_public_key_hash(key) {
    console.log(">>>> get_public_key_hash ");
    const keyDetails = get_private_key(key);
    const keyHash = sha256(keyDetails.publicKey);
    return keyHash;
}

export function sha256(message) {
    console.log("Message ", message);
    console.log("To hex : ", toHex(message));
    return crypto.createHash('sha256').update(message, 'hex').digest('hex');
}

export function toHex(str) {
    var result = '';
    for (var i = 0; i < str.length; i++) {
        result += str.charCodeAt(i).toString(16);
    }
    return result;
}

// export async function sha256(message) {
//     // encode as UTF-8
//     const msgBuffer = new TextEncoder().encode(message);

//     // hash the message
//     const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

//     // convert ArrayBuffer to Array
//     const hashArray = Array.from(new Uint8Array(hashBuffer));

//     // convert bytes to hex string
//     const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
//     return hashHex;
// }