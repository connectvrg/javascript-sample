import { btcAdiTestData } from "../testdata/btc/testAdiAccounts.js";
import { btclegacyAdiTestData } from "../testdata/btclegacy/testAdiAccounts.js";
import { ed25519AdiTestData } from "../testdata/ed25519/testAdiAccounts.js";
import { ethAdiTestData } from "../testdata/eth/testAdiAccounts.js";
import { rcd1AdiTestData } from "../testdata/rcd1/testAdiAccounts.js";

// import { btcLiteTestData } from "../testdata/btc/testLiteAccounts";
// import { btclegacyLiteTestData } from "../testdata/btclegacy/testLiteAccounts.js";
// import { ed25519LiteTestData } from "../testdata/ed25519/testLiteAccounts.js";
// import { ethLiteTestData } from "../testdata/eth/testLiteAccounts.js";
// import { rcd1LiteTestData } from "../testdata/rcd1/testLiteAccounts.js";

import { getKeyPassedValue } from "./environment.js";

 const testdata = {
    btc : {adiTestData:btcAdiTestData },
    btclegacy : {adiTestData:btclegacyAdiTestData},
    ed25519 : {adiTestData:ed25519AdiTestData},
    eth :  {adiTestData:ethAdiTestData },
    rcd1 :  {adiTestData:rcd1AdiTestData }

};

export default testdata[getKeyPassedValue()].adiTestData;