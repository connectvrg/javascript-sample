
import { executeAccumulateCommand } from "../common.js";
import network from "../../constants/environment.js";
import { execute, sleep } from '../../utils/utils.js';
import { assert } from 'chai';

export class liteUtils {

    account_generate() {
        console.log(">>>>> account_generate");
        const command = `account generate -s ${network} --use-unencrypted-wallet -j`;
        return executeAccumulateCommand(command);
    }

    create_lite_account_with_key(keyName) {
        console.log(">>>>> create_lite_account_with_key");
        const command = `account generate key ${keyName} -s ${network} --use-unencrypted-wallet -j`;
        return executeAccumulateCommand(command);
    }

    add_tokens(fromAccount, toAccount) {
        console.log(">>>>> add_tokens");
        const command = `faucet ${fromAccount} ${toAccount} -s ${network} --use-unencrypted-wallet -j`;
        return executeAccumulateCommand(command);
    }

    get_token_balance(account) {
        console.log(">>> get_token_balance");
        const command = `get ${account} -s ${network} --use-unencrypted-wallet -j`;
        let result = executeAccumulateCommand(command);
        console.log(result);
        let balance = result['data']['balance'];
        console.log("Token Balance ::", balance);
        return balance;
    }

    get_credits_balance(account) {
        console.log(">>> get_credits_balance");
        const command = `get ${account} -s ${network} --use-unencrypted-wallet -j`;
        return executeAccumulateCommand(command);
    }


    //Used to create lite lite identity with 1000000000000000 ACME tokens
    create_lite_account(){
        let liteAccount = this.account_generate();
        let lite_account_url = liteAccount['liteAccount'];
        let lite_identity = liteAccount['name'];
        let public_key = liteAccount['publicKey'];
        console.log ("liteAccount >>> ", liteAccount);
        console.log ('publicKey ::', public_key);
        assert.isNotEmpty(public_key);
  
        for (let index = 0; index < 20; index++) {
          console.log("Count "+ index);
          this.add_tokens(lite_account_url, lite_account_url);
        }
       
        sleep(30000);
        
        let token_balance = this.get_token_balance(lite_account_url);
        assert.isTrue(token_balance > 0);
        let account = {"url" :lite_account_url , "identity": lite_identity, "publicKey": public_key};
        return account;
    }

}