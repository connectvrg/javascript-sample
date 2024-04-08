
import { executeAccumulateCommand } from "../../common.js";
import network from "../../../constants/environment.js";

export class dataAccountUtils {

    get_data_by_account(account_url) {
        console.log(">>>> get_data_by_account");

        let parameters = `${account_url} `;
        const command = `data get ${parameters} -s ${network} --use-unencrypted-wallet -j`;
        return executeAccumulateCommand(command);
    }

    get_data_by_entryHash(data_account_url, entryHashValue) {
        console.log(">>>> get_data_by_account");

        let parameters = `${data_account_url} ${entryHashValue} `;
        const command = `data get ${parameters} -s ${network} --use-unencrypted-wallet`;
        return executeAccumulateCommand(command);
    }

    get_data_list(data_account_url, startIndex = "", endIndex = "") {
        console.log(">>>> get_data_by_account");
        startIndex = (startIndex != "") ? startIndex : 0;
        endIndex = (endIndex != "") ? endIndex : 10;
        let parameters = `${data_account_url} ${startIndex}  ${endIndex} `;
        const command = `data get ${parameters} -s ${network} --use-unencrypted-wallet`;
        return executeAccumulateCommand(command);
    }
}