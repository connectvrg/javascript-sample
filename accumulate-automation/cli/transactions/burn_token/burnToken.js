import { execute} from "../../../utils/utils.js";
import { executeAccumulateCommand } from "../../common.js";
import network from "../../../constants/environment.js";
import * as commonLib from "../../common.js";
import { assert } from 'chai';

export class burnToken {

    // accumulate token burn [adi or lite token account] [adi signer key name (if applicable)] 
    // [amount] [flags]
    burn_token(origin_url, signer_key="", amount, flags="") {
        console.log(">>>>> burn_token");
        console.log("origin account ", origin_url);
        console.log("signer_key  ", signer_key);

        let parameters = `${origin_url} `;
        if (commonLib.isLiteAccount(origin_url) === false){
            console.log("Give account is an ADI")
            // assert.isTrue(signer_key!=="", "Signer key is must for an ADI account");
            parameters = parameters + `${signer_key} `;
        }
        
        parameters = parameters + `${amount} `;
        const command = `token burn ${parameters} -s ${network} --use-unencrypted-wallet -j`;
        return executeAccumulateCommand(command);
    }
   
}