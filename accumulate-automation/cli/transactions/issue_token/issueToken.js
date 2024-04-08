import { execute} from "../../../utils/utils.js";
import { executeAccumulateCommand } from "../../common.js";
import network from "../../../constants/environment.js";
import * as commonLib from "../../common.js";
import { assert } from "chai";

export class issueToken {

    // accumulate token issue [adi token url] [signer key name] [recipient url] [amount] [flags]
  issue_token(adi_token_url, signer_key="", recipient_url, amount) {
        console.log(">>>>> issue_token");
        let parameters = `${adi_token_url} ${signer_key} `;

        parameters = parameters + `${recipient_url} ${amount} `;
        const command = `token issue ${parameters} -s ${network} --use-unencrypted-wallet -j`;
        return executeAccumulateCommand(command);
    }

}