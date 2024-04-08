

export const cliConstants ={
    
    KEY_BTC : "btc",
    KEY_BTC_LEGACY : "btclegacy",
    KEY_ED25519 : "ed25519",
    KEY_ETH : "eth",
    KEY_RCD1 : "rcd1",

    FEE_CREATE_IDENTITY: 500,
    FEE_CREATE_TOKEN_ACCOUNT: 25,
    FEE_BURN_TOKENS : 0.1,
    FEE_ISSUE_TOKENS : 3,
    FEE_SEND_TOKENS : 3,
    FEE_CREATE_TOKEN : 5000,
    FEE_CREATE_KEY_BOOK: 100,
    FEE_CREATE_KEY_PAGE : 100,
    FEE_CREDITS_PER_ACME : 5.00,
    FEE_KEY_ACTION : 3,
    FEE_REFUND : 1,
    
    //Error Messages
    ERROR_INSUFFICIENT_ACME : "amount of credits requested will not be satisfied by amount of acme to be spent",
    ERROR_BURN_TOKENS : "cannot burn more tokens than is available in account",
    ERROR_RESOLVING_SIGNER_KEY : "cannot resolve signing key",
    ERROR_INSUFFICIENT_BALANCE : "insufficient balance",
    ERROR_SUPPLY_LIMIT : "cannot exceed supply limit",
    ERROR_FAILED_TO_CREATE : "failed to create",
    ERROR_FAILED_TO_GET_KEY : "failed to get key",
    ERROR_KEY_DOES_NOT_EXIST : "does not exist in wallet, nor is it a valid public key",
    ERROR_FAILED_TO_GET_KEY : "failed to get key for",
    ERROR_RESOLVING_SIGNING_KEY : "cannot resolve signing key",
    ERROR_INVALID_IDENTITY : "invalid lite identity",
    ERROR_DUPLICATE_KEYS : "duplicate keys: signing keys of a keypage must be unique",
    ERROR_NOT_AUTHORIZED : "is not authorized to sign updateKeyPage"
}
