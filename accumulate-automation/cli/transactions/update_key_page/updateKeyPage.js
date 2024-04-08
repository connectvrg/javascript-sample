import { executeAccumulateCommand } from '../../common.js';
import network from "../../../constants/environment.js";

export class updateKeyPage {

    // accumulate page key update [key page url] [key name[@key book or page]] 
    // [old key name] [new public key or name] [flags]
    update_key_page(key_page_url, signer_key, old_key_name, new_key_to_update) {
        console.log(">>>>> update_key_page ", key_page_url + " " + signer_key);
        let parameters = `${key_page_url} ${signer_key} `;
        parameters = parameters + `${old_key_name} ${new_key_to_update} `;

        const command = `page key update ${parameters} -s ${network} --use-unencrypted-wallet -j`;
        return executeAccumulateCommand(command);;
    }
}
