export const btcAdiTestData = {
    "adiAccounts": {
        "same_bvn": {
            "adi": {
                "account1": { 
                    "name": "automationAdi506.acme",
                    "url": "acc://automationAdi506.acme",
                    "keyBook": "acc://automationAdi506.acme/book",
                    "keyPage": "acc://automationAdi506.acme/book/1",
                    "publicKey": "f9f7866f07f3d8cb53b14f1b7f9e35849bd588b9208fa6c6",
                    "additionalKey" : "key1.account1"
                },
                // "account1": { //With RCD1
                //     "name": "automationAdi311.acme",
                //     "url": "acc://automationAdi311.acme",
                //     "keyBook": "acc://automationAdi311.acme/book",
                //     "keyPage": "acc://automationAdi311.acme/book/1",
                //     "publicKey": "rajRCD1",
                //     "additionalKey" : "key1.account1"
                // },
                "account2": {
                    "name": "automationAdi65.acme",
                    "url": "acc://automationAdi65.acme",
                    "keyBook": "acc://automationAdi65.acme/book",
                    "keyPage": "acc://automationAdi65.acme/book/1",
                    "publicKey": "f9f7866f07f3d8cb53b14f1b7f9e35849bd588b9208fa6c6",
                    "additionalKey" : "key1.account2"
                },
                "account3": {
                    "name": "automationAdi718.acme",
                    "url": "acc://automationAdi718.acme",
                    "keyBook": "acc://automationAdi718.acme/book",
                    "keyPage": "acc://automationAdi718.acme/book/1",
                    "publicKey": "f9f7866f07f3d8cb53b14f1b7f9e35849bd588b9208fa6c6",
                    "additionalKey" : "key1.account3"
                },
                "account4": {
                    "name": "automationAdi293.acme",
                    "url": "acc://automationAdi293.acme",
                    "keyBook": "acc://automationAdi293.acme/book",
                    "keyPage": "acc://automationAdi293.acme/book/1",
                    "publicKey": "key4",
                    "additionalKey" : ""
                },
                "invalidAccount": {
                    "name": "automationAdi000.acme",
                    "url": "acc://automationAdi000.acme",
                    "keyBook": "acc://automationAdi000.acme/book",
                    "keyPage": "acc://automationAdi000.acme/book/1",
                    "publicKey": "key4",
                    "additionalKey" : ""
                }
            },
            "adiToken": {
                "account1": {
                    "url": "acc://automationAdi506.acme/token824",
                    "signerKey" :"key1.account1"
                },
                "account2": {
                    "url": "acc://automationAdi506.acme/token176",
                    "signerKey" :"key1.account1"
                },
                "customAccount1": {
                    "keyBook": "acc://automationAdi574.acme/book",
                    "url": "acc://automationAdi574.acme/CSoSK",
                    "tokenIssuer": "acc://automationAdi574.acme/TokenIssuerVRG",
                    "signerKey" :"smq1YeP2"
                },
                "customAccount2":{
                    "keyBook": "acc://automationAdi506.acme/book",
                    "url": "acc://automationAdi506.acme/CustomToken007",
                    "tokenIssuer": "acc://automationAdi506.acme/TokenIssuerVRG",
                    "signerKey" :"key1.account1"
                  },
                  "customAccount3":{
                    "keyBook": "acc://automationAdi506.acme/book",
                    "url": "acc://automationAdi506.acme/aYg4Q",
                    "tokenIssuer": "acc://automationAdi506.acme/TokenIssuerVRG",
                    "signerKey" :"key1.account1"
                  }
            }
        }
    }
}