import { cliConstants } from "../constants/cliConstants.js";

let network = "";
const argLength = process.argv.length;
console.log("Arguments Length::", argLength);
console.log("Env : ", process.argv[argLength-3]);
console.log("OS : ", process.argv[argLength-2]);
if (process.argv[argLength-3] == "qa") {
    network = "https://qa.testnet.accumulatenetwork.io/v2";
} else if (process.argv[argLength-3] == "local") {
    network = "http://127.0.1.1:26660/v2";
} else if (process.argv[argLength-3] == "test") {
    network = "http://testnet.accumulatenetwork.io:16595/v2";
}else if (process.argv[argLength-3] == "kermit") {
    network = "https://kermit.accumulatenetwork.io/v2";
}
 else {
    network = "https://beta.testnet.accumulatenetwork.io/v2";
}

export default network;

let os ="windows";
export function getOperatingSystem(){
    if (process.argv[argLength-2] == "linux" ||process.argv[argLength-1] == "Linux"  || process.argv[argLength-1] == "LINUX") {
        os ="linux";
    } 
    return os;
}

let keyValue = cliConstants.KEY_ED25519;
export function getKeyPassedValue(){
    if (process.argv[argLength-1] == cliConstants.KEY_BTC || process.argv[argLength-1] == cliConstants.KEY_BTC_LEGACY || process.argv[argLength-1] == cliConstants.KEY_RCD1 || process.argv[argLength-1] == cliConstants.KEY_ETH) {
        keyValue = process.argv[argLength-1];
    } 
    console.log("Default key set :", keyValue)
    return keyValue;
}