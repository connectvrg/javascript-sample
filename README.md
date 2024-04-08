# accumulate-tests

Tbis project contains the automation scripts used for testing accumulate.

# How to execute the tests in local

    1. Clone the repo (git clone git@gitlab.com:accumulatenetwork/accumulate-tests.git)
    2. cd accumulate-tests
    3. npm install
    4. npm run test:<script_group_name> <network> <operating system> <key-type>
       
## In Windows

   npm run test:test_data "test" "windows" "ed25519"
   
   npm run test:test_data1 "kermit" "windows" "ed25519" // To generate a mocha report in local

## In Linux
   npm run test:test_data "beta" "linux" "ed25519"

## Supported <network>
    1.�test�
    2.�kermit� 
    3.�qa�
    4.�beta�

## Supported <script_group_name>
By specifying the "script group name" you can execute all CLI tests related to the transaction.

    "all_tests" -> All tests
    "across_bvn" -> To run tests across bvn
    "add_credits" ->  Add Credits tests
    "create_identity" ->  Create identity tests
    "create_key_book" ->  Create Key Book tests
    "create_key_page" ->  Create Key Page tests
    "update_key_page" ->  Update Key Page tests
    "create_token_account" ->  Create Token Account tests
    "data_account" ->  Data Account tests
    "burn_tokens" ->  Burn Tokens tests
    "token_issuer" ->  Token issuer tests
    "send_tokens" ->  Send Tokens tests
    "refund_scenarios" -> Refund scenarios Tests
    "issue_tokens" ->  Issue Tokens tests
    "auth_tests" ->  Auth tests
    
## How to execute tests in different environments

    1. Create test data using "test_data_creation_tests" file
    2. Update the test accounts in "testdata\ed25519\test*.Accounts" file
    3. Map the filename in "testLiteDataFile" or "testAdiDataFile"
    4. Execute the tests
