import network from "../../../constants/environment.js";
import { executeAccumulateCommand } from "../../common.js";

export class createDataAccount {
    // Create new data account
    //accumulate account create data [actor adi url] [key name[@key book or page]] 
    //  [adi data account url] --authority key book (optional) 
    create_data_account_from_adi(adi_url, key_name, adi_data_account, key_book = "") {
    console.log(">>>> create_data_account_from_adi");
       
        let parameters = `${adi_url} ${key_name} ${adi_data_account} `;
        if (key_book != ''){
            parameters = parameters + `--authority ${key_book} `;
        }
       
        const command = `account create data ${parameters} -s ${network} --use-unencrypted-wallet -j`;
        return executeAccumulateCommand(command);
    }

    // Create new lite data account creating a chain based upon a name list
    // accumulate account create data lite [origin] [key name[@key book or page]] [name_0] ... [name_n]
    create_data_account_from_lite(lite_account_url, key_name="", name="") {
        console.log(">>>> create_data_account_from_lite");
       
        let parameters = `${lite_account_url} `;
        if (key_name != ''){
            parameters = parameters + ` ${key_name} `;
        }
        if (name != ''){
            parameters = parameters + `${name} `;
        }
       
        const command = `account create data --lite ${parameters} -s ${network} --use-unencrypted-wallet -j`;
        return executeAccumulateCommand(command);
    }

}