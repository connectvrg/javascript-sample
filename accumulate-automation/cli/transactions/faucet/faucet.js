import { executeAccumulateCommand } from "../../common.js";
import network from "../../../constants/environment.js";

export class faucet {
    
    execute_faucet(fromAccount, toAccount) {
        console.log(">>>>> execute_faucet");
        const command = `faucet ${fromAccount} ${toAccount} -s ${network} --use-unencrypted-wallet -j`;
        return executeAccumulateCommand(command);
    }
}