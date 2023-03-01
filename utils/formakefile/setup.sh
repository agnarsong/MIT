SED_BIN=sed
if [[ "$OSTYPE" == "darwin"* ]]; then
    SED_BIN=gsed;
fi

cp .$1.env .env

curl http://localhost:8081/addresses.json > address.json

Proxy__BVM_L1CrossDomainMessenger=`cat address.json | grep "Proxy__BVM_L1CrossDomainMessenger" | cut -d ":" -f 2 | cut -c 3-44`
${SED_BIN} -i "s/^Proxy__BVM_L1CrossDomainMessenger=.*/Proxy__BVM_L1CrossDomainMessenger=$Proxy__BVM_L1CrossDomainMessenger/g" .env

Proxy__BVM_L1StandardBridge=`cat address.json | grep "Proxy__BVM_L1StandardBridge" | cut -d ":" -f 2 | cut -c 3-44`
${SED_BIN} -i "s/^Proxy__BVM_L1StandardBridge=.*/Proxy__BVM_L1StandardBridge=$Proxy__BVM_L1StandardBridge/g" .env

TestBitToken=`cat address.json | grep "TestBitToken" | cut -d ":" -f 2 | cut -c 3-44`
${SED_BIN} -i "s/^TestBitToken=.*/TestBitToken=$TestBitToken/g" .env

Proxy__Sequencer=`cat address.json | grep "Proxy__Sequencer" | cut -d ":" -f 2 | cut -c 3-44`
${SED_BIN} -i "s/^Proxy__Sequencer=.*/Proxy__Sequencer=$Proxy__Sequencer/g" .env

rm -rf address.json



PRIVATE_KEY=`yarn hardhat createWallet|grep "account privateKey"|awk '{print($3)}'`
${SED_BIN} -i "s/^PRIVATE_KEY=.*/PRIVATE_KEY=$PRIVATE_KEY/g" .env

RECEIVER_PRIVATE_KEY=`yarn hardhat createWallet|grep "account privateKey"|awk '{print($3)}'`
${SED_BIN} -i "s/^RECEIVER_PRIVATE_KEY=.*/RECEIVER_PRIVATE_KEY=$RECEIVER_PRIVATE_KEY/g" .env

if [ $2 ]
then 
    DEPLOY_PRIVATE_KEY=$2
else
    DEPLOY_PRIVATE_KEY="ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
fi

${SED_BIN} -i "s/^DEPLOY_PRIVATE_KEY=.*/DEPLOY_PRIVATE_KEY=$DEPLOY_PRIVATE_KEY/g" .env

FINALIZE_PRIVATE_KEY=`yarn hardhat createWallet|grep "account privateKey"|awk '{print($3)}'`
${SED_BIN} -i "s/^FINALIZE_PRIVATE_KEY=.*/FINALIZE_PRIVATE_KEY=$FINALIZE_PRIVATE_KEY/g" .env

echo "Create Wallet and update .env have finished"
cat .env|grep '^PRIVATE_KEY\|^FINALIZE_PRIVATE_KEY'

echo "\n"
yarn hardhat transferETH

echo "\n"
yarn hardhat test test/new/mint_l1_BIT.ts

echo "\n"
yarn hardhat test test/new/d\&w_BIT.ts --grep "depositBIT 通过 l1 sb 合约"
