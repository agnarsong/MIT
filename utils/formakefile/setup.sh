SED_BIN=sed
if [[ "$OSTYPE" == "darwin"* ]]; then
    SED_BIN=gsed;
fi

PRIVATE_KEY=`yarn hardhat createWallet|grep "account privateKey"|awk '{print($3)}'`
${SED_BIN} -i "s/^PRIVATE_KEY=.*/PRIVATE_KEY=$PRIVATE_KEY/g" .env

RECEIVER_PRIVATE_KEY=`yarn hardhat createWallet|grep "account privateKey"|awk '{print($3)}'`
${SED_BIN} -i "s/^RECEIVER_PRIVATE_KEY=.*/RECEIVER_PRIVATE_KEY=$RECEIVER_PRIVATE_KEY/g" .env

if [ $1 ]
then 
    DEPLOY_PRIVATE_KEY=$1
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