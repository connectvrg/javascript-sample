import { execute } from "../../../utils/utils.js";
import network from "../../../constants/environment.js";
import { executeAccumulateCommand } from "../../common.js";
import * as commonLib from "../../common.js";

export class authActions {
   
    //accumulate auth add [account url] [key name[@key book or page]]  [authority url] [flags]
    auth_add(accountUrl, keyName, authorityUrl) {
        console.log(">>>> auth_add ");
        let parameters = `${accountUrl} ${keyName} ${authorityUrl} `;
        const command = `auth add ${parameters} -s ${network} --use-unencrypted-wallet -j`;
        return executeAccumulateCommand(command);
    }

    //accumulate auth remove [account url] [key name[@key book or page]] [authority url or index (1-based)] [flags]
    auth_remove(accountUrl, keyName, authorityUrl) {
        console.log(">>>> auth_remove ");
        let parameters = `${accountUrl} ${keyName} ${authorityUrl} `;
        const command = `auth remove ${parameters} -s ${network} --use-unencrypted-wallet -j`;
        return executeAccumulateCommand(command);
    }

    // accumulate auth enable [account url] [key name[@key book or page]] [authority url or index (1-based)] [flags]
     auth_enable(accountUrl, keyName, authorityUrl) {
        console.log(">>>> auth_enable ");
        let parameters = `${accountUrl} ${keyName} ${authorityUrl} `;
        const command = `auth enable ${parameters} -s ${network} --use-unencrypted-wallet -j`;
        return executeAccumulateCommand(command);
    }

    // accumulate auth disable [account url] [key name[@key book or page]] [authority url or index (1-based)] [flags]
    auth_disable(accountUrl, keyName, authorityUrl) {
        console.log(">>>> auth_disable ");
        let parameters = `${accountUrl} ${keyName} ${authorityUrl} `;
        const command = `auth disable ${parameters} -s ${network} --use-unencrypted-wallet -j`;
        return executeAccumulateCommand(command);
    }
}