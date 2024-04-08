import network from "../../../constants/environment.js";
import { executeAccumulateCommand } from "../../common.js";
import {exec_cmd} from '../../../utils/utils.js';
export class keyCommands {
   
    //accumulate key export private [flags]
    export_private(keyName) {
        console.log(">>>> export_private ");
        let parameters = `${keyName} `;
        const command = `key export private ${parameters} -s ${network} --use-unencrypted-wallet -j`;
        return executeAccumulateCommand(command);
    }

    //accumulate key export all
    export_all_keys() {
        console.log(">>>> export_all_keys ");
        const command = `key export all -s ${network} --use-unencrypted-wallet -j`;
        return executeAccumulateCommand(command);
    }

     //accumulate key export mnemonic
     export_mnemonic() {
        console.log(">>>> export_mnemonic ");
        const command = `key export mnemonic -s ${network} --use-unencrypted-wallet -j`;
        return executeAccumulateCommand(command);
    }

    //accumulate key export seed
    export_seed() {
        console.log(">>>> export_seed ");
        const command = `key export seed -s ${network} --use-unencrypted-wallet -j`;
        return executeAccumulateCommand(command);
    }

    //accumulate key label assign [existing label/name] [new key label] [flags]
    key_label_assign(existingName, newKeyName) {
        console.log(">>>> key_label_assign ");
        let parameters = `${existingName} ${newKeyName} `;
        const command = `key label assign ${parameters} -s ${network} --use-unencrypted-wallet `;
        return executeAccumulateCommand(command);
    }

    //  accumulate key label rename [existing label/name] [new key name] [flags]
    key_label_rename(existingName, newKeyName) {
        console.log(">>>> key_label_rename ");
        let parameters = `${existingName} ${newKeyName} `;
        const command = `key label rename ${parameters} -s ${network} --use-unencrypted-wallet -j`;
        return executeAccumulateCommand(command);
    }

    // accumulate key label remove [existing label/name] [flags]
    key_label_remove(existingName) {
        console.log(">>>> key_label_remove ");
        let parameters = `${existingName} `;
        const command = `key label remove ${parameters} -s ${network} --use-unencrypted-wallet -j`;
        return executeAccumulateCommand(command);
    }
}