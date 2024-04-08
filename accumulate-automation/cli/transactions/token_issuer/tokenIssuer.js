import { execute, sleep } from "../../../utils/utils.js";
import { executeAccumulateCommand } from "../../common.js";
import network from "../../../constants/environment.js";
import * as commonLib from "../../common.js";
import { assert } from "chai";

export class tokenIssuer {

    // accumulate token create [origin adi or lite url] [adi signer key name (if applicable)] 
    // [token url] [symbol] [precision (0 - 18)] [supply limit] [properties URL (optional)] [flags]
    create_token_issuer(adiAccount, signerKeyName = "", tokenUrl="", symbol="", precision=0, supplyLimit=0) {
        console.log(">>>> create_token_issuer ", adiAccount);
        let attributes ={};

        assert.isTrue((tokenUrl !== ""),"Token Url is missing");
        assert.isTrue(symbol !== "","Symbol is missing");
        assert.isTrue(supplyLimit !== 0,"SupplyLimit is missing");

        if (adiAccount.url.indexOf(".acme") !== -1) {
            console.log("Given account is an ADI");

            attributes.account = adiAccount.url;

            assert.isTrue(signerKeyName !== "","signerKey is missing for ADI");
            attributes.signer_key = signerKeyName;

            let creditsInAdi = commonLib.get_data_by_url(adiAccount.url);
            console.log(">>>> creditsInAdi =", creditsInAdi);

            //Create credits for ADI Account
            // commonLib.load_credits(adiAccount.keyPage, 5000);
            const credits = commonLib.get_credits(adiAccount.keyPage);
            console.log("Credits available in ADI account :", adiAccount.keyPage, " is ", credits);
     
            if (tokenUrl == "") {
                tokenUrl = adiAccount.url + "/customToken" + Math.floor(Math.random() * 1000);
            } else {
                tokenUrl = adiAccount.url + "/" + tokenUrl;
            }
        }else{
            attributes.account = adiAccount.identity;
            attributes.signer_key = "";
        }

        attributes.tokenUrl = tokenUrl;
        attributes.symbol = symbol;

        precision = (precision===0) ? 0 : precision;
        attributes.precision = precision;
        attributes.supplyLimit = supplyLimit;

        console.log("Attributes of Token issuer =>", attributes);

        let parameters = `${attributes.account} `;

        parameters = parameters + ((attributes.signer_key !== "")?  `${attributes.signer_key} ` : "");

        parameters = parameters + `${attributes.tokenUrl} ${attributes.symbol} ${attributes.precision} ${attributes.supplyLimit} `;
        
        console.log ("Parameters ==>", parameters);
        const command = `token create ${parameters} -s ${network} --use-unencrypted-wallet -j`;
        executeAccumulateCommand(command);
        sleep(20000);

        let output = commonLib.get_data_by_url(attributes.tokenUrl);
        assert.equal(output.data.type, "tokenIssuer", "Is tokenIssuer present");
        assert.equal(output.data.url, attributes.tokenUrl, "Is Token url present");
        assert.equal(output.data.symbol, attributes.symbol, "Is symbol present");

        return output.data;
    }
}