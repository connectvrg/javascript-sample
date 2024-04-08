export const ed25519AdiTestData = {
    "adiAccounts": {
        "same_bvn": {
            "adi": {
                "account0": { //BVN0
                    "name": "automationAdi138.acme",
                    "url": "acc://automationAdi138.acme",
                    "keyBook": "acc://automationAdi138.acme/book",
                    "keyPage": "acc://automationAdi138.acme/book/1 ",
                    "publicKey": "addKeyed255198OA8",
                    "additionalKey": "key1.account1"
                },
                "account1": { //BVN1
                    "name": "RajagopalIndia123.acme",
                    "url": "acc://RajagopalIndia123.acme",
                    "keyBook": "acc://RajagopalIndia123.acme/book",
                    "keyPage": "acc://RajagopalIndia123.acme/book/1 ",
                    "publicKey": "keyed25519HOFB",
                    "additionalKey": "key1.account1"
                },
                "account2": { //BVN2
                    "name": "RajagopalIndia456.acme",
                    "url": "acc://RajagopalIndia456.acme",
                    "keyBook": "acc://RajagopalIndia456.acme/book",
                    "keyPage": "acc://RajagopalIndia456.acme/book/1",
                    "publicKey": "keyed25519NIVS",
                    "additionalKey": "key1.account2"
                },
                "account3": { //BVN1
                    "name": "RajagopalIndia789.acme",
                    "url": "acc://RajagopalIndia789.acme",
                    "keyBook": "acc://RajagopalIndia789.acme/book",
                    "keyPage": "acc://RajagopalIndia789.acme/book/1",
                    "publicKey": "keyed25519VUOK",
                    "additionalKey": "key1.account3"
                },
                "account4": { //BVN2
                    "name": "automation9876542.acme",
                    "url": "acc://automation9876542.acme",
                    "keyBook": "acc://automation9876542.acme/book",
                    "keyPage": "acc://automation9876542.acme/book/1",
                    "publicKey": "keyed25519SE1F",
                    "additionalKey": ""
                },
                "account5": { //data write account - BVN0
                    "name": "automation987654210.acme",
                    "url": "acc://automation987654210.acme",
                    "keyBook": "acc://automation987654210.acme/book",
                    "keyPage": "acc://automation987654210.acme/book/1",
                    "publicKey": "keyed25519UYFS",
                    "additionalKey": ""
                },
                "account6": {
                    "name": "automationAdiSingleSig.acme",
                    "url": "acc://automationAdiSingleSig.acme",
                    "keyBook": "acc://automationAdiSingleSig.acme/book",
                    "keyPage": "acc://automationAdiSingleSig.acme/book/1",
                    "publicKey": "keyed25519TQ6E",
                    "additionalKey": ""
                },
                "account7": { //For Custom Account associated with LiteAccount1
                    "name": "automationCustomAdi1.acme",
                    "url": "acc://automationCustomAdi1.acme",
                    "keyBook": "acc://automationCustomAdi1.acme/book",
                    "keyPage": "acc://automationCustomAdi1.acme/book/1",
                    "publicKey": "keyed25519SAZ7",
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
                    "name": "test-BVN0.acme",
                    "url": "acc://test-BVN0.acme",
                    "keyBook": "acc://test-BVN0.acme/book",
                    "keyPage": "acc://test-BVN0.acme/book/1",
                    "publicKey": "keyed25519Z1R3",
                    "additionalKey": ""
                },
                "bvnAccount1": {
                    "name": "test-BVN1.acme ",
                    "url": "acc://test-BVN1.acme",
                    "keyBook": "acc://test-BVN1.acme/book",
                    "keyPage": "acc://test-BVN1.acme/book/1",
                    "publicKey": "keyed25519ADMM",
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
                    "url": "acc://automationAdi138.acme/token24",
                    "signerKey": "addKeyed255198OA8"
                },
                "account2": { //done1
                    "url": "acc://automationAdi138.acme/token943",
                    "signerKey": "addKeyed25519KP76"
                },
                "account3": { //done1
                    "url": "automationAdi138.acme/token382",
                    "signerKey": "addKeyed255198OA8"
                },
                "customAccount1": { //done1
                    "keyBook": "acc://automationAdi138.acme/book",
                    "url": "acc://automationAdi138.acme/CustomTokenzPadL",
                    "tokenIssuer": "acc://automationAdi138.acme/TokenIssuerVRG",
                    "signerKey": "addKeyed255198OA8"
                },
                "customAccount2": { //done1
                    "keyBook": "acc://automationAdi138.acme/book",
                    "url": "acc://automationAdi138.acme/CustomTokenDFQ2X",
                    "tokenIssuer": "acc://automationAdi138.acme/TokenIssuerVRG",
                    "signerKey": "addKeyed255198OA8"
                },
                "customAccount3": { //done
                    "keyBook": "acc://automationAdi222.acme/book",
                    "url": "acc://automationAdi222.acme/CustomTokenUT1nB",
                    "tokenIssuer": "acc://automationAdi222.acme/TokenIssuerVRG",
                    "signerKey": "keyed255197YLD"
                },
                "customAccount4": { //done1
                    "keyBook": "acc://automationAdi138.acme/book",
                    "url": "acc://automationAdi138.acme/CustomTokenE2b7g",
                    "tokenIssuer": "acc://automationAdi138.acme/TokenIssuerVRG",
                    "signerKey": "addKeyed255198OA8"
                },
                "customAccount5": { //Created from Adi7 & liteAccount1
                    "keyBook": "acc://automationCustomAdi1.acme/book",
                    "url": "acc://automationCustomAdi1.acme/CustomToken1w788",
                    "tokenIssuer": "acc://automationCustomAdi1.acme/TokenIssuerVRG",
                    "signerKey": "keyed25519SAZ7"
                },
                "customAccount6": { //Created from Adi7 & liteAccount1
                    "keyBook": "acc://automationCustomAdi1.acme/book",
                    "url": "acc://automationCustomAdi1.acme/CustomToken1aLmE",
                    "tokenIssuer": "acc://automationCustomAdi1.acme/TokenIssuerVRG",
                    "signerKey": "keyed25519SAZ7"
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
                    "name": "test-BVN0.acme",
                    "url": "acc://test-BVN0.acme",
                    "keyBook": "acc://test-BVN0.acme/book",
                    "keyPage": "acc://test-BVN0.acme/book/1",
                    "publicKey": "keyed25519Z1R3",
                    "additionalKey": ""
                },
                "bvnAccount1": {
                    "name": "test-BVN1.acme",
                    "url": "acc://test-BVN1.acme",
                    "keyBook": "acc://test-BVN1.acme/book",
                    "keyPage": "acc://test-BVN1.acme/book/1",
                    "publicKey": "keyed25519RAVL",
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
                    "url": "acc://test-BVN0.acme/token292",
                    "signerKey": "keyed25519Z1R3"
                },
                "bvnAccount1": {
                    "url": "acc://automationAdi90009.acme/token109",
                    "signerKey": "keyed25519BRV0"
                }
            },
            "customToken": {
                "customBvnAccount1": {
                    "keyBook": "acc://test-BVN0.acme/book",
                    "url": "acc://test-BVN0.acme/CustomTokenGDu1H",
                    "tokenIssuer": "acc://test-BVN0.acme/TokenIssuerVRG",
                    "signerKey": "keyed25519Z1R3"
                },
                "customBvnAccount2": {
                    "keyBook": "acc://test-BVN0.acme/book",
                    "url": "acc://test-BVN0.acme/CustomTokenqqqus",
                    "tokenIssuer": "acc://test-BVN0.acme/TokenIssuerVRG",
                    "signerKey": "keyed25519Z1R3"
                },
                "customBvnAccount3": {
                    "keyBook": "acc://automationAdi90009.acme/book",
                    "url": "acc://automationAdi90009.acme/CustomToken6qsWX",
                    "tokenIssuer": "acc://automationAdi90009.acme/TokenIssuerVRG",
                    "signerKey": "keyed25519BRV0"
                },
                "customBvnAccount4": {
                    "keyBook": "acc://automationAdi90009.acme/book",
                    "url": "acc://automationAdi90009.acme/CustomTokenKm8XP",
                    "tokenIssuer": "acc://automationAdi90009.acme/TokenIssuerVRG",
                    "signerKey": "keyed25519BRV0"
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
                "customBvnAccount2": {
                    "keyBook": "acc://test-dn.acme/book",
                    "url": "acc://test-dn.acme/CustomTokenI1Fbb",
                    "tokenIssuer": "acc://test-dn.acme/TokenIssuerDN0",
                    "signerKey": "keyed25519EW81"
                }
            }
        }
    }
}