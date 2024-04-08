import { executeAccumulateCommand } from '../../common.js';
import network from "../../../constants/environment.js";

export class createKeyPage {

    //  accumulate page create [origin key book url] [signing key name] 
    // [key index (optional)] [key height (optional)] [public key 1] ... 
    // [public key hex or name n + 1] [flags]
    create_key_page(origin_key_book, signer_key, key_index = '', key_height = '', keyNames) {
        console.log(">>>>> create_key_page ", signer_key, "  ", keyNames);
        let parameters = `${origin_key_book} ${signer_key} `;
        if (key_index != '') {
            parameters = parameters + `${key_index} `;
        }
        if (key_height != '') {
            parameters = parameters + `${key_height} `;
        }

        for (var i = 0; i < keyNames.length; i++) {
            parameters = parameters + keyNames[i] + ` `;
        }

        const command = `page create ${parameters} -s ${network} --use-unencrypted-wallet -j`;
        return executeAccumulateCommand(command);;
    }
}
