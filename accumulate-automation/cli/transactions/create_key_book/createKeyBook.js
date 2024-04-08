import { executeAccumulateCommand } from '../../common.js';
import network from "../../../constants/environment.js";

export class createKeyBook {

    // accumulate book create [origin adi url] [signing key name] [key index (optional)] 
    // [key height (optional)] [new key book url] 
    // [public key 1 (optional)] ... [public key hex or name n + 1 [flags]
    create_key_book(adi_url, key_name, key_index='',key_height='', new_key_book_url, public_key='') {
        console.log(">>>>> create_key_book");
        let parameters = `${adi_url} ${key_name} `;
        if (key_index != ''){
            parameters = parameters + `${key_index} `;
        }
        if (key_height != ''){
            parameters = parameters + `${key_height} `;
        }

        new_key_book_url = new_key_book_url.includes("acc://") ? new_key_book_url : adi_url + "/" + new_key_book_url;

        parameters = parameters + `${new_key_book_url} `;
        if (public_key != ''){
            parameters = parameters + `${public_key} `;
        }
        const command = `book create ${parameters} -s ${network} --use-unencrypted-wallet -j`;
        return executeAccumulateCommand(command);
    }
}
