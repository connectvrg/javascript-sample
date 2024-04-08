import { execute, sleep } from "../../../utils/utils.js";
import { executeAccumulateCommand } from "../../common.js";
import network from "../../../constants/environment.js";
import * as commonLib from "../../common.js";
import { assert } from "chai";

export class adiToken {

    // accumulate account create token [actor adi] [signing key name] [key index (optional)] 
    // [key height (optional)] [new token account url] [tokenUrl] [keyBook (optional)] [flags] 
    create_adi_token_account(adiAccount, signerKeyName="", newAdiTokenUrl = "", tokenUrl = "") {
        console.log(">>>> create_adi_token_account");
        let creditsInAdi = commonLib.get_data_by_url(adiAccount.keyPage);
        console.log(">>>> creditsInAdi =", creditsInAdi);

        const credits = commonLib.get_credits(adiAccount.keyPage);
        console.log("Credits available in ADI account :", adiAccount.keyPage, " is ", credits);

        if (newAdiTokenUrl == "") {
            newAdiTokenUrl = adiAccount.url + "/token" + Math.floor(Math.random() * 1000);
        }else{
            newAdiTokenUrl = adiAccount.url + "/" + newAdiTokenUrl;
        }
        if (tokenUrl == "") {
            tokenUrl = "acc://ACME";
        }

        let signer_key = (signerKeyName!="")? signerKeyName : adiAccount.publicKey;
        let attributes = {
            "adi": adiAccount.url,
            "signer_key": signer_key,
            "key_index": -1,
            "key_height": -1,
            "new_token_url": newAdiTokenUrl,
            "token_url": tokenUrl
        };

        let parameters = `${attributes.adi} ${attributes.signer_key} `;

        parameters = parameters + `${attributes.new_token_url} ${attributes.token_url} `;

        const command = `account create token ${parameters} -s ${network} --use-unencrypted-wallet -j`;
        let output = executeAccumulateCommand(command);
        // assert.isTrue(output.transactionHash!=='', "Is ADI Token account created successfully");
        // sleep(5000);

        // output = commonLib.get_data_by_url(attributes.new_token_url);
        // console.log(">>>> output.data =", output.data);
        // assert.isTrue(output.data!==undefined, "Account is created successfully");
        return newAdiTokenUrl;
    }
 
}