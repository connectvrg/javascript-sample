export const rcd1AdiTestData = {
    "adiAccounts": {
        "same_bvn": {
            "adi": {
                "account0": { //done
                    "name": "automationAdi537.acme",
                    "url": "acc://automationAdi537.acme",
                    "keyBook": "acc://automationAdi537.acme/book",
                    "keyPage": "acc://automationAdi537.acme/book/1",
                    "publicKey": "addKeyrcd15CYP",
                    "additionalKey" : "rcd1.key1.account1"
                },
                "account1": { //done
                    "name": "automationRcd001166.acme",
                    "url": "acc://automationRcd001166.acme",
                    "keyBook": "acc://automationRcd001166.acme/book",
                    "keyPage": "acc://automationRcd001166.acme/book/1",
                    "publicKey": "keyrcd18FD4",
                    "additionalKey": "rcd1.key1.account1"
                },
                "account2": {
                    "name": "automationRcd9876.acme",
                    "url": "acc://automationRcd9876.acme",
                    "keyBook": "acc://automationRcd9876.acme/book",
                    "keyPage": "acc://automationRcd9876.acme/book/1",
                    "publicKey": "keyrcd1DYBO",
                    "additionalKey": "rcd1.key1.account2"
                },
                "account3": {
                    "name": "automationRcd789990.acme",
                    "url": "acc://automationRcd789990.acme",
                    "keyBook": "acc://automationRcd789990.acme/book",
                    "keyPage": "acc://automationRcd789990.acme/book/1",
                    "publicKey": "keyrcd1VLFX",
                    "additionalKey": "rcd1.key1.account3"
                },
                "account4": {
                    "name": "automationRcd117755.acme",
                    "url": "acc://automationRcd117755.acme",
                    "keyBook": "acc://automationRcd117755.acme/book",
                    "keyPage": "acc://automationRcd117755.acme/book/1",
                    "publicKey": "keyrcd1CS5Y",
                    "additionalKey": ""
                },
                "account5": { //data write account
                    "name": "dataRcd11775566.acme",
                    "url": "acc://dataRcd11775566.acme",
                    "keyBook": "acc://dataRcd11775566.acme/book",
                    "keyPage": "acc://dataRcd11775566.acme/book/1",
                    "publicKey": "keyrcd13DZH",
                    "additionalKey": ""
                },
                "bvnAccount0": {
                    "name": "test-BVN0.acme",
                    "url": "acc://test-BVN0.acme",
                    "keyBook": "acc://test-BVN0.acme/book",
                    "keyPage": "acc://test-BVN0.acme/book/1",
                    "publicKey": "keyrcd1CMOJ",
                    "additionalKey": ""
                },
                "bvnAccount1": {
                    "name": "test-BVN1.acme",
                    "url": "acc://test-BVN1.acme",
                    "keyBook": "acc://test-BVN1.acme/book",
                    "keyPage": "acc://test-BVN1.acme/book/1",
                    "publicKey": "keyrcd1VXD8",
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
                    "name": "acc://automationRcd001166.acme/subAdi9UcuPcwPxk.acme",
                    "url": "acc://automationRcd001166.acme/subAdi9UcuPcwPxk.acme",
                    "keyBook": "acc://automationRcd001166.acme/subAdi9UcuPcwPxk.acme/book",
                    "keyPage": "acc://automationRcd001166.acme/subAdi9UcuPcwPxk.acme/book/1",
                    "publicKey": "Keyrcd1N6EF",
                    "additionalKey": "subKey001"
                },
                "account2": {
                    "name": "automationRcd001166.acme/subAdia2fIL72IK8.acme",
                    "url": "acc://automationRcd001166.acme/subAdia2fIL72IK8.acme",
                    "keyBook": "acc://automationRcd001166.acme/subAdia2fIL72IK8.acme/book",
                    "keyPage": "acc://automationRcd001166.acme/subAdia2fIL72IK8.acme/book/1",
                    "publicKey": "Keyrcd1LSTG",
                    "additionalKey": "subKey002"
                }
            },
            "adiToken": {
                "account1": { //done
                    "url": "acc://automationAdi537.acme/token848",
                    "signerKey" :"addKeyrcd15CYP"
                },
                "account2": { //done
                    "url": "acc://automationAdi537.acme/token585",
                    "signerKey" :"addKeyrcd1XFFW"
                },
                "customAccount1": { //done
                    "keyBook": "acc://automationAdi537.acme/book",
                    "url": "acc://automationAdi537.acme/CustomToken8wOT9",
                    "tokenIssuer": "acc://automationAdi537.acme/TokenIssuerVRG",
                    "signerKey" :"addKeyrcd15CYP"
                },
                "customAccount2":{ //done
                    "keyBook": "acc://automationAdi537.acme/book",
                    "url": "acc://automationAdi537.acme/CustomTokenQUIkb",
                    "tokenIssuer": "acc://automationAdi537.acme/TokenIssuerVRG",
                    "signerKey" :"addKeyrcd15CYP"
                  }, 
                  "customAccount3":{ //done
                    "keyBook": "acc://automationAdi537.acme/book",
                    "url": "acc://automationAdi537.acme/CustomTokendMPbc",
                    "tokenIssuer": "acc://automationAdi537.acme/TokenIssuerVRG",
                    "signerKey" :"addKeyrcd15CYP"
                  },
                "customAccount4": { 
                    "keyBook": "acc://automationAdi138.acme/book",
                    "url": "acc://automationAdi138.acme/CustomTokenE2b7g",
                    "tokenIssuer": "acc://automationAdi138.acme/TokenIssuerVRG",
                    "signerKey": "addKeyed255198OA8"
                },
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
                    "publicKey": "keyed25519PFOJ",
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
                    "url": "acc://test-BVN0.acme/token133",
                    "signerKey": "addKeyed25519GWI4"
                },
                "bvnAccount1": {
                    "url": "acc://automationAdi611.acme/token312",
                    "signerKey": "addKeyed25519U2VT"
                }
            },
            "customToken": {
                "customBvnAccount1": {
                    "keyBook": "acc://test-BVN0.acme/book",
                    "url": "acc://test-BVN0.acme/CustomTokenmYx67",
                    "tokenIssuer": "acc://test-BVN0.acme/TokenIssuerBVN0",
                    "signerKey": "addKeyed25519GWI4"
                },
                "customBvnAccount2": {
                    "keyBook": "acc://test-BVN0.acme/book",
                    "url": "acc://test-BVN0.acme/CustomTokencdD6N",
                    "tokenIssuer": "acc://test-BVN0.acme/TokenIssuerBVN0",
                    "signerKey": "addKeyed25519GWI4"
                },
                "customBvnAccount3": {
                    "keyBook": "acc://automationAdi611.acme/book",
                    "url": "acc://automationAdi611.acme/CustomTokenY0tx6",
                    "tokenIssuer": "acc://automationAdi611.acme/TokenIssuerBVN1",
                    "signerKey": "addKeyed25519U2VT"
                },
                "customBvnAccount4": {
                    "keyBook": "acc://automationAdi611.acme/book",
                    "url": "acc://automationAdi611.acme/CustomTokenmR5rL",
                    "tokenIssuer": "acc://automationAdi611.acme/TokenIssuerBVN1",
                    "signerKey": "addKeyed25519U2VT"
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