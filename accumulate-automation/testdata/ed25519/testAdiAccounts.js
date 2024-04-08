export const ed25519AdiTestData = {
    "adiAccounts": {
        "same_bvn": {
            "adi": {
                "account0": { //BVN0
                    "name": "kermitadiaccount1.acme",
                    "url": "acc://kermitadiaccount1.acme",
                    "keyBook": "acc://kermitadiaccount1.acme/book",
                    "keyPage": "acc://kermitadiaccount1.acme/book/1 ",
                    "publicKey": "kermit.key1",
                    "additionalKey": "key1.account1"
                },
                "account1": { //BVN0
                    "name": "kermitadiaccount2.acme",
                    "url": "acc://kermitadiaccount2.acme",
                    "keyBook": "acc://kermitadiaccount2.acme/book",
                    "keyPage": "acc://kermitadiaccount2.acme/book/1 ",
                    "publicKey": "kermit.key2",
                    "additionalKey": "key1.account1"
                },
                "account2": { //BVN0
                    "name": "kermitadiaccount4.acme",
                    "url": "acc://kermitadiaccount4.acme",
                    "keyBook": "acc://kermitadiaccount4.acme/book",
                    "keyPage": "acc://kermitadiaccount4.acme/book/1",
                    "publicKey": "kermit.key4",
                    "additionalKey": "key1.account1"
                },
                "account3": { //BVN0
                    "name": "kermitadiaccount5.acme",
                    "url": "acc://kermitadiaccount5.acme",
                    "keyBook": "acc://kermitadiaccount5.acme/book",
                    "keyPage": "acc://kermitadiaccount5.acme/book/1",
                    "publicKey": "kermit.key5",
                    "additionalKey": "key1.account1"
                },
                "account4": { //BVN1
                    "name": "kermitadiaccount3.acme",
                    "url": "acc://kermitadiaccount3.acme",
                    "keyBook": "acc://kermitadiaccount3.acme/book",
                    "keyPage": "acc://kermitadiaccount3.acme/book/1",
                    "publicKey": "kermit.key3",
                    "additionalKey": ""
                },
                "account5": { //data write account - BVN2
                    "name": "kermitadiaccount6.acme",
                    "url": "acc://kermitadiaccount6.acme",
                    "keyBook": "acc://kermitadiaccount6.acme/book",
                    "keyPage": "acc://kermitadiaccount6.acme/book/1",
                    "publicKey": "kermit.key6",
                    "additionalKey": ""
                },
                "account6": { //from acc://892c0fc5355f324b1d172453e41be38d55d7e9a7e9e10db1/ACME
                    "name": "kermitadiaccount6.acme",
                    "url": "acc://kermitadiaccount6.acme",
                    "keyBook": "acc://kermitadiaccount6.acme/book",
                    "keyPage": "acc://kermitadiaccount6.acme/book/1",
                    "publicKey": "kermit.key5",
                    "additionalKey": ""
                },
                "account7": { 
                    "name": "kermitadiaccount7.acme",
                    "url": "acc://kermitadiaccount7.acme",
                    "keyBook": "acc://kermitadiaccount7.acme/book",
                    "keyPage": "acc://kermitadiaccount7.acme/book/1",
                    "publicKey": "kermit.key5",
                    "additionalKey": ""
                },
                "account8": { 
                    "name": "automationAdi90009.acme",
                    "url": "acc://automationAdi90009.acme",
                    "keyBook": "acc://automationAdi90009.acme/book",
                    "keyPage": "acc://automationAdi90009.acme/book/1",
                    "publicKey": "keyed25519BRV0",
                    "additionalKey": ""
                },
                "bvnAccount0": {
                    "name": "testkermit-BVN0.acme",
                    "url": "acc://testkermit-BVN0.acme",
                    "keyBook": "acc://testkermit-BVN0.acme/book",
                    "keyPage": "acc://testkermit-BVN0/book/1",
                    "publicKey": "keyed255190QAU",
                    "additionalKey": ""
                },
                "bvnAccount1": {
                    "name": "testkermit-BVN1.acme",
                    "url": "acc://testkermit-BVN1.acme",
                    "keyBook": "acc://testkermit-BVN1.acme/book",
                    "keyPage": "acc://testkermit-BVN1.acme/book/1",
                    "publicKey": "keyed25519VYZR",
                    "additionalKey": ""
                },
                "invalidAccount": {
                    "name": "automationAdi000.acme",
                    "url": "acc://automationAdi000.acme",
                    "keyBook": "acc://automationAdi000.acme/book",
                    "keyPage": "acc://automationAdi000.acme/book/1",
                    "publicKey": "key4",
                    "additionalKey": ""
                }
            },
            "sub_adi": {
                "account1": {
                    "name": "automationAdi138.acme/subAdir4mzDLGKNg.acme",
                    "url": "acc://automationAdi138.acme/subAdir4mzDLGKNg.acme",
                    "keyBook": "acc://automationAdi138.acme/subAdir4mzDLGKNg.acme/book",
                    "keyPage": "acc://automationAdi138.acme/subAdir4mzDLGKNg.acme/book/1",
                    "publicKey": "Keyed25519NWC9",
                    "additionalKey": "subKey001"
                },
                "account2": {
                    "name": "automationAdi138.acme/subAdi1Bl10U60Tm.acme",
                    "url": "acc://automationAdi138.acme/subAdi1Bl10U60Tm.acme",
                    "keyBook": "acc://automationAdi138.acme/subAdi1Bl10U60Tm.acme/book",
                    "keyPage": "acc://automationAdi138.acme/subAdi1Bl10U60Tm.acme/book/1",
                    "publicKey": "Keyed25519G807",
                    "additionalKey": "subKey002"
                }
            },
            "adiToken": {
                "account1": { //done1
                    "url": "acc://kermitadiaccount1.acme/token175",
                    "signerKey": "kermit.key1"
                },
                "account2": { //done1
                    "url": "acc://kermitadiaccount1.acme/token854",
                    "signerKey": "kermit.key1"
                },
                "account3": { //done1
                    "url": "acc://kermitadiaccount1.acme/token182",
                    "signerKey": "kermit.key1"
                },
                "customAccount1": { //done1
                    "url": "acc://kermitadiaccount2.acme/CustomTokenuatuP",
                    "keyBook": "acc://kermitadiaccount2.acme/book",
                    "tokenIssuer": "acc://kermitadiaccount2.acme/TokenIssuerVRG",
                    "signerKey": "kermit.key2"
                },
                "customAccount2": { //done1
                    "keyBook": "acc://kermitadiaccount2.acme/book",
                    "url": "acc://kermitadiaccount2.acme/CustomTokene5yIP",
                    "tokenIssuer": "acc://kermitadiaccount2.acme/TokenIssuerVRG",
                    "signerKey": "kermit.key2"
                },
                "customAccount3": { //done
                    "keyBook": "acc://kermitadiaccount4.acme/book",
                    "url": "acc://kermitadiaccount4.acme/CustomTokenB7Ufk",
                    "tokenIssuer": "acc://kermitadiaccount4.acme/TokenIssuerVRG",
                    "signerKey": "kermit.key4"
                },
                "customAccount4": { //done1
                    "keyBook": "acc://kermitadiaccount2.acme/book",
                    "url": "acc://kermitadiaccount2.acme/CustomToken8JtIN",
                    "tokenIssuer": "acc://kermitadiaccount2.acme/TokenIssuerVRG",
                    "signerKey": "kermit.key2"
                },
                "customAccount5": { //
                    "keyBook": "acc://kermitadiaccount1.acme/book",
                    "url": "acc://kermitadiaccount1.acme/CustomTokenQ0fKJ",
                    "tokenIssuer": "acc://kermitadiaccount1.acme/TokenIssuerVRG",
                    "signerKey": "kermit.key1"
                },
                "customAccount6": { 
                    "keyBook": "acc://kermitadiaccount1.acme/book",
                    "url": "acc://kermitadiaccount1.acme/CustomTokenmhD9S",
                    "tokenIssuer": "acc://kermitadiaccount1.acme/TokenIssuerVRG",
                    "signerKey": "kermit.key1"
                }
            },
            "subAdiToken":{
                "account1": {
                    "url": "acc://automationAdi611.acme/subAdicgVm.acme/token898",
                    "signerKey": "Keyed25519O7WE"
                },
                "account2": {
                    "url": "acc://automationAdi611.acme/subAdicgVm.acme/token878",
                    "signerKey": "Keyed25519O7WE"
                }
                
            }
        },
        "different_bvn": {
            "adi": {
                "bvnAccount0": {
                    "name": "kermitadiaccount5.acme",
                    "url": "acc://kermitadiaccount5.acme",
                    "keyBook": "acc://kermitadiaccount5.acme/book",
                    "keyPage": "acc://kermitadiaccount5.acme/book/1",
                    "publicKey": "kermit.key5",
                    "additionalKey": "key1.account1"
                },
                "bvnAccount1": {
                    "name": "testkermit-BVN1.acme",
                    "url": "acc://testkermit-BVN1.acme",
                    "keyBook": "acc://testkermit-BVN1.acme/book",
                    "keyPage": "acc://testkermit-BVN1.acme/book/1",
                    "publicKey": "keyed25519VYZR",
                    "additionalKey": ""
                },
                "invalidAccount": {
                    "name": "automationAdi000.acme",
                    "url": "acc://automationAdi000.acme",
                    "keyBook": "acc://automationAdi000.acme/book",
                    "keyPage": "acc://automationAdi000.acme/book/1",
                    "publicKey": "key4",
                    "additionalKey": ""
                }
            },
            "adiToken": {
                "bvnAccount0": {
                    "url": "acc://kermitadiaccount1.acme/token175",
                    "signerKey": "kermit.key1"
                },
                "bvnAccount1": {
                    "url": "acc://testkermit-BVN1.acme/token987",
                    "signerKey": "keyed25519VYZR"
                }
            },
            "customToken": {
                "customBvnAccount1": {
                    "keyBook": "acc://kermitadiaccount2.acme/book",
                    "url": "acc://kermitadiaccount2.acme/CustomTokenuatuP",
                    "tokenIssuer": "acc://kermitadiaccount2.acme/TokenIssuerVRG",
                    "signerKey": "kermit.key2"
                },
                "customBvnAccount2": {
                    "keyBook": "acc://kermitadiaccount2.acme/book",
                    "url": "acc://kermitadiaccount2.acme/CustomTokene5yIP",
                    "tokenIssuer": "acc://kermitadiaccount2.acme/TokenIssuerVRG",
                    "signerKey": "kermit.key2"
                },
                "customBvnAccount3": {
                    "keyBook": "acc://kermitadiaccount4.acme/book",
                    "url": "acc://kermitadiaccount4.acme/CustomTokenB7Ufk",
                    "tokenIssuer": "acc://kermitadiaccount4.acme/TokenIssuerVRG",
                    "signerKey": "kermit.key4"
                },
                "customBvnAccount4": {
                    "keyBook": "acc://kermitadiaccount2.acme/book",
                    "url": "acc://kermitadiaccount2.acme/CustomToken8JtIN",
                    "tokenIssuer": "acc://kermitadiaccount2.acme/TokenIssuerVRG",
                    "signerKey": "kermit.key2"
                }
            }
        },
        "dn": {
            "adi": {
                "dnAccount0": {
                    "name": "test-dn.acme",
                    "url": "acc://test-dn.acme",
                    "keyBook": "acc://test-dn.acme/book",
                    "keyPage": "acc://test-dn.acme/book/1",
                    "publicKey": "keyed25519DVUS",
                    "additionalKey": "key1.account1"
                },
                "invalidAccount": {
                    "name": "automationAdi000.acme",
                    "url": "acc://automationAdi000.acme",
                    "keyBook": "acc://automationAdi000.acme/book",
                    "keyPage": "acc://automationAdi000.acme/book/1",
                    "publicKey": "key4",
                    "additionalKey": ""
                }
            },
            "adiToken": {
                "dnAccount0": {
                    "url": " acc://test-dn.acme/token583",
                    "signerKey": "keyed25519DVUS"
                },
                "dnAccount1": {
                    "url": "acc://test-dn.acme/token788",
                    "signerKey": "keyed25519DVUS"
                }
            },
            "customToken": {
                "customDnAccount1": {
                    "keyBook": "acc://test-dn.acme/book",
                    "url": "acc://test-dn.acme/CustomTokenKyP1q",
                    "tokenIssuer": "acc://test-dn.acme/TokenIssuerDN0",
                    "signerKey": "keyed25519EW81"
                },
                "customDnAccount2": {
                    "keyBook": "acc://test-dn.acme/book",
                    "url": "acc://test-dn.acme/CustomTokenI1Fbb",
                    "tokenIssuer": "acc://test-dn.acme/TokenIssuerDN0",
                    "signerKey": "keyed25519EW81"
                }
            }
        }
    }
}