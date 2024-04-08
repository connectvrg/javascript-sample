import { execute} from "../../../utils/utils.js";
import { executeAccumulateCommand } from "../../common.js";
import network from "../../../constants/environment.js";

export class adiCreate {

    // Create new ADI from lite token account. 
    // When public key 1 is specified it will be assigned to the first page, otherwise the origin key is used.
    //accumulate adi create [origin-lite-account] [adi url to create] [public-key or key name] 
    // [key-book-name (optional)] [public key page 1 (optional)]  
    adi_from_lite_account(origin_account, adi_url, key_name, key_book_name='', key_page='') {
        console.log(">>>>> adi_from_lite_account ");
        let parameters = `${origin_account} ${adi_url} ${key_name} `;
        if (key_book_name != ''){
            parameters = parameters + `${key_book_name} `;
        }
        if (key_page != ''){
            parameters = parameters + `${key_page}`;
        }
        const command = `adi create ${parameters} -s ${network} --use-unencrypted-wallet -j`;
        return executeAccumulateCommand(command);
    }

    //Create new ADI for another ADI
    // accumulate adi create [origin-adi-url] [wallet signing key name] [key index (optional)] 
    // [key height (optional)] [adi url to create] [public key or wallet key name] 
    // [key book url (optional)] [public key page 1 (optional)] 
    adi_from_adi(origin_adi, signer_key_name, key_index=0, key_height=0, new_adi_url, key_name, key_book_url='', key_page='') {
        console.log(">>>>> adi_from_adi");
        let parameters = `${origin_adi} ${signer_key_name} `;
        if (key_index != 0){
            parameters = parameters + `${key_index} `;
        }
        if (key_height != 0){
            parameters = parameters + `${key_height} `;
        }
            
        parameters = parameters + `${new_adi_url} ${key_name} `;
        
        if (key_book_url != ''){
            parameters = parameters + `${key_book_url}`;
        }

        if (key_page != ''){
            parameters = parameters + `${key_page}`;
        }
        const command = `adi create ${parameters} -s ${network} --use-unencrypted-wallet -j`;
        return executeAccumulateCommand(command);
    }

  
  
   
}