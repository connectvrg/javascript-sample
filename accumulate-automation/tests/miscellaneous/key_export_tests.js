import { assert } from 'chai';

import * as commonLib from '../../cli/common.js';
import { keyCommands } from '../../cli/transactions/key/keyCommands.js';
import { cliConstants } from '../../constants/cliConstants.js';
import adiTestData  from '../../constants/testAdiDataFile.js';
import { sleep } from '../../utils/utils.js';

describe('Key Export command', function () {
    describe('export command Tests', function () {
        this.timeout(50000);
        it('[] Verify export private key command', function () {
            const keyName = commonLib.random_name_generator();
            commonLib.generate_key(keyName);
            sleep(5000);

            let keyCommandsObj = new keyCommands();
            let output = keyCommandsObj.export_private(keyName);

            console.log("Output >>> ", output);
            assert.equal(keyName, output.name, "Key Name is present");
            assert.isTrue(output.privateKey!==null, "Private Key is present");
        });

        it('[] Verify export all keys command', function () {
            let keyCommandsObj = new keyCommands();
            let output = keyCommandsObj.export_all_keys();
            sleep(10000);
            // console.log("Output >>> ", output);
            // const res = output.keys;
            // console.log("Key Length....", res.length);

            // assert.isTrue(res.length!==0, "Private Keys are present" );
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

