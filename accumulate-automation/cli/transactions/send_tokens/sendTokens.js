import { execute} from "../../../utils/utils.js";
import { executeAccumulateCommand } from "../../common.js";
import network from "../../../constants/environment.js";
import * as commonLib from "../../common.js";
import { assert } from "chai";

export class sendTokens {

    //accumulate tx create [origin url] [signing key name] [key index (optional)] [key height (optional)] [to] [amount]
    send_tokens_using_tx(origin_url, signer_key="", key_index=-1, key_height=-1, toAccount, amount) {
        console.log(">>>>> send_tokens_using_tx");
        let parameters;

        let fromAccountData = commonLib.get_data_by_url(origin_url);
        console.log("fromAccountData =", fromAccountData);

        if(fromAccountData.type=="tokenAccount" || fromAccountData.type=="tokenIssuer"){
            console.log(">>>>>>>>>>> tokenAccount  & signer_key =", signer_key);
            assert.isTrue(signer_key!=="", "Signer key is required for Token Account");
            parameters = `${origin_url} ${signer_key} `;
        }else{
            console.log(">>>>>>>>>>> Without Signer key  ")
            parameters = `${origin_url} `;
        }
       
        if (key_index != -1){
            parameters = parameters + `${key_index} `;
        }
        if (key_height != -1){
            parameters = parameters + `${key_height}`;
        }
        parameters = parameters + `${toAccount} ${amount} `;
        const command = `tx create ${parameters} -s ${network} --use-unencrypted-wallet -j`;
        return executeAccumulateCommand(command);
    }

    add_tokens(fromAccount, toAccount) {
        console.log(">>>>> add_tokens");
        const command = `faucet ${fromAccount} ${toAccount} -s ${network} --use-unencrypted-wallet -j`;
        return executeAccumulateCommand(command);
    }
}