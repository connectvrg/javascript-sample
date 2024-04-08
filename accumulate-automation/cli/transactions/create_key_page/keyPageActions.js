import { executeAccumulateCommand } from '../../common.js';
import network from "../../../constants/environment.js";

export class keyPageActions {


    add_key_to_key_page(key_page_url, signer_key, new_key) {
        console.log(">>>>> add_key_to_key_page ");
        let parameters = `${key_page_url} ${signer_key} ${new_key} `;

        const command = `page key add ${parameters} -s ${network} --use-unencrypted-wallet -j`;
        return executeAccumulateCommand(command);;
    }

    remove_key_from_key_page(key_page_url, signer_key, key_to_be_removed) {
        console.log(">>>>> remove_key_from_key_page ");
        let parameters = `${key_page_url} ${signer_key} ${key_to_be_removed} `;

        const command = `page key remove ${parameters} -s ${network} --use-unencrypted-wallet -j`;
        return executeAccumulateCommand(command);;
    }


    // accumulate page lock [key page url] [key name[@key book or page]]  [flags]
    lock_key_page(key_page_url, signer_key) {
        console.log(">>>>> lock_key_page ");
        let parameters = `${key_page_url} ${signer_key} `;

        const command = `page lock ${parameters} -s ${network} --use-unencrypted-wallet -j`;
        return executeAccumulateCommand(command);;
    }

    // accumulate page unlock [key page url] [key name[@key book or page]] [flags]
    unlock_key_page(key_page_url, signer_key) {
        console.log(">>>>> unlock_key_page ");
        let parameters = `${key_page_url} ${signer_key} `;

        const command = `page unlock ${parameters} -s ${network} --use-unencrypted-wallet -j`;
        return executeAccumulateCommand(command);;
    }
}
