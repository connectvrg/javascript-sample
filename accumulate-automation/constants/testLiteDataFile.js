import { btcLiteTestData } from "../testdata/btc/testLiteAccounts.js";
import { btclegacyLiteTestData } from "../testdata/btclegacy/testLiteAccounts.js";
import { ed25519LiteTestData } from "../testdata/ed25519/testLiteAccounts.js";
import { ethLiteTestData } from "../testdata/eth/testLiteAccounts.js";
import { rcd1LiteTestData } from "../testdata/rcd1/testLiteAccounts.js";
import { getKeyPassedValue } from "./environment.js";

 const testdata = {
    btc : {liteTestData:btcLiteTestData },
    btclegacy : {liteTestData:btclegacyLiteTestData},
    ed25519 : {liteTestData:ed25519LiteTestData},
    eth :  {liteTestData:ethLiteTestData },
    rcd1 :  {liteTestData:rcd1LiteTestData }

};

export default testdata[getKeyPassedValue()].liteTestData;