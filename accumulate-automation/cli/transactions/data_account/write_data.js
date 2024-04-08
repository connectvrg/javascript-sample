import network from "../../../constants/environment.js";
import { executeAccumulateCommand } from "../../common.js";

export class writeToDataAccount {
    //Write entry to ADI data account.
    //accumulate data write [data account url] [signingKey]
    //--scratch (optional) [extid_0 (optional)] ... [extid_n (optional)] [data]
    write_data_to_adi_data_account(adi_data_account, signer_key, data_value, write_state="", sign_data_key="") {
        console.log(">>>> write_data_to_adi_data_account", adi_data_account);
       
        let parameters = `${adi_data_account} ${signer_key} "${data_value}" `;

        if (write_state != ""){
            parameters = parameters + ` --write-state `;
        }
        if (sign_data_key != ""){
            parameters = parameters + ` --sign-data ${sign_data_key} `;
        }
       
        const command = `data write ${parameters} -s ${network} --use-unencrypted-wallet -j`;
        return executeAccumulateCommand(command);
    }

    //Write entry to Lite data account.
    //accumulate data write-to [account url] [signing key] [lite data account]
    //[extid_0 (optional)] ... [extid_n (optional)] [data]
    write_data_to_lite_data_account(account_url, lite_data_account, data_value) {
        console.log(">>>> write_data_to_lite_data_account");
       
        let parameters = `${account_url} ${lite_data_account} "${data_value}" `;
       
        const command = `data write-to ${parameters} -s ${network} --use-unencrypted-wallet -j`;
        return executeAccumulateCommand(command);
    }

}