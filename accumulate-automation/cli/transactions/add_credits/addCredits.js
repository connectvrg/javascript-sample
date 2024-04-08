import { execute } from "../../../utils/utils.js";
import network from "../../../constants/environment.js";
import { executeAccumulateCommand } from "../../common.js";
import * as commonLib from "../../common.js";

export class addCredits {
   
    // accumulate credits [origin token account] [key page or lite identity url] 
    // [number of credits wanted] [max acme to spend] [percent slippage (optional)] [flags]
    add_credits(fromAccount, toAccount, credits, maxAcme=0, slippage=0) {
        console.log(">>>> add_credits ");
        let parameters;

        let fromAccountData = commonLib.get_data_by_url(fromAccount);
        console.log("fromAccount >>>> ", fromAccount);
        console.log("fromAccountData =", fromAccountData);

        let signer_key ;
        if(typeof(fromAccountData.data.authorities) !== "undefined"){
            console.log("Data present");
            let keyPageData  = commonLib.get_data_by_url(fromAccountData.data.authorities[0].url +"/1");
            signer_key = keyPageData.data.keys[0].publicKey;
            console.log("signer key ::", signer_key);   
            signer_key = "key1.account1";
            parameters = `${fromAccount} ${signer_key} ${toAccount} ${credits} `;
        }else{
            parameters = `${fromAccount} ${toAccount} ${credits} `;
        }
       
        if (maxAcme != 0){
            parameters = parameters + `${maxAcme} `;
        }
        if (slippage != 0){
            parameters = parameters + `${slippage}`;
        }
        const command = `credits ${parameters} -s ${network} --use-unencrypted-wallet -j`;
        return executeAccumulateCommand(command);
    }

}