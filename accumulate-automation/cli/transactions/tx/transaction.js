import { execute } from "../../../utils/utils.js";
import { executeAccumulateCommand } from "../../common.js";
import network from "../../../constants/environment.js";
import * as commonLib from "../../common.js";
import { assert } from "chai";

export class transaction {

    get(txid) {
        console.log(">>>>> get transaction details ", txid);
        const command = `tx get ${txid} -s ${network} --use-unencrypted-wallet -j`;
        return executeAccumulateCommand(command);
    }

    // Create new token tx
    // accumulate tx create [token account url] [signing key ] [to] [amount] 
    create(origin_url, signer_key="", toAccount, amount) {
        console.log(">>>>> create tx");
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
       
        parameters = parameters + `${toAccount} ${amount} `;
        const command = `tx create ${parameters} -s ${network} --use-unencrypted-wallet -j`;
        return executeAccumulateCommand(command);
    }

    // Execute an arbitrary transaction
    // accumulate tx execute [origin url] [signing key name] [payload]  
    // accumulate tx execute [lite account url] [payload] 
    execute(origin_url, signer_key="", payload) {
        console.log(">>>>> tx execute ");
        let parameters= `${origin_url} `;

        let fromAccountData = commonLib.get_data_by_url(origin_url);
        console.log("fromAccountData =", fromAccountData);

        if(signer_key !=""){
            parameters = parameters + `${signer_key} `;
        }

        parameters = parameters + `\"${payload}\" `;
        const command = `tx execute ${parameters} -s ${network} --use-unencrypted-wallet -j`;
        return executeAccumulateCommand(command);
    }

    execute_test(origin_url, signer_key="", payload) {
        console.log(">>>>> tx execute ");
        let parameters= `${origin_url} `;

        let fromAccountData = commonLib.get_data_by_url(origin_url);
        console.log("fromAccountData =", fromAccountData);

        if(signer_key !=""){
            parameters = parameters + `${signer_key} `;
        }

        parameters = parameters + `\'${payload}\' `;
        const command = `tx execute ${parameters} -s ${network} --use-unencrypted-wallet -j`;
        return executeAccumulateCommand(command);
    }

    // Sign a pending transaction
    sign(origin_url, signer_key, txid) {
        console.log(">>>>> tx sign ");
        let parameters = `${origin_url} ${signer_key} ${txid} `;
        const command = `tx sign ${parameters} -s ${network} --use-unencrypted-wallet -j`;
        return executeAccumulateCommand(command);
    }
}