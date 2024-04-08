import { assert } from 'chai';

import * as commonLib from '../../cli/common.js';
import { burnToken } from '../../cli/transactions/burn_token/burnToken.js';
import { keyCommands } from '../../cli/transactions/key/keyCommands.js';
import { cliConstants } from '../../constants/cliConstants.js';
import adiTestData  from '../../constants/testAdiDataFile.js';
import { sleep } from '../../utils/utils.js';

describe('Key Label command', function () {
    describe('key relabelling Tests', function () {
        this.timeout(50000);
        it('[] Verify adding new label to existing keys(ed25519)', function () {
            const keyName = commonLib.random_name_generator();
            commonLib.generate_key(keyName);
            console.log("Key Name ::", keyName);
            sleep(5000);

            const newKeyName = 'Key_'+ commonLib.random_name_generator();
            let keyCommandsObj = new keyCommands();
            let output = keyCommandsObj.key_label_assign(keyName, newKeyName);

            console.log("Output >>> ", output);
           
        });

        it.skip('[] Verify export all keys command', function () {
            let keyCommandsObj = new keyCommands();
            let output = keyCommandsObj.export_all_keys();
            sleep(20000);

            console.log("Output >>> ", output);
            const res = output.keys;
            console.log("Key Length....", res.length);

            assert.isTrue(res.length!==0, "Private Keys are present" );
        });
        
        it('[] Verify export mnemonic command', function () {
            let keyCommandsObj = new keyCommands();
            let output = keyCommandsObj.export_mnemonic();
            
            console.log("Output >>> ", output);
            assert.isTrue(output.mnemonic!==null, "Mnemonic value is present");
        });

        it('[] Verify export seed command', function () {
            let keyCommandsObj = new keyCommands();
            let output = keyCommandsObj.export_seed();
            
            console.log("Output >>> ", output);
            assert.isTrue(output.seed!==null, "Seed value is present");
        });
    });

});

