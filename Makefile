# 后续补充从接口获取数据，生成.env
init:
	$(eval env ?= local)
	@cp .$(env).env .env

setup:
	./utils/formakefile/setup.sh $(DPK)

accounts:
	yarn hardhat customAccounts

depositBIT:

depositERC20:

depositETH:
	

help:
	@printf "$(CLR_BROWN)$(CLR_BOLD)Usage$(CLR_RESET):\n"
	@printf "$(CLR_GREEN)$(CLR_BOLD)  make init$(CLR_RESET)                    : Init env file\n"
	@printf "$(CLR_GREEN)$(CLR_BOLD)  make setup$(CLR_RESET)                   : Create Wallet and transfer ETH for gasfee\n"
	@printf "$(CLR_GREEN)$(CLR_BOLD)  make accounts$(CLR_RESET)                : Show accounts\n"


## envs
L2GETH_BIN          := mantle/l2geth/build/bin/geth
GAS_ORACLE_BIN      := mantle/gas-oracle/gas-oracle
BATCH_SUBMITTER_BIN := mantle/batch-submitter/batch-submitter
TSS_BIN             := mantle/tss/tss
SHELL               := /bin/bash
CODE_BASE           := $(PWD)
DATA_DIR            := local/data
LOGS_DIR            := local/logs

## color codes
CLR_RESET := \e[0m
CLR_RESET_UNDERLINE := \e[24m
CLR_RESET_REVERSE := \e[27m
CLR_DEFAULT := \e[39m
CLR_DEFAULTB := \e[49m
CLR_BOLD := \e[1m
CLR_BRIGHT := \e[2m
CLR_UNDERSCORE := \e[4m
CLR_REVERSE := \e[7m
CLR_BLACK := \e[30m
CLR_RED := \e[31m
CLR_GREEN := \e[32m
CLR_BROWN := \e[33m
CLR_BLUE := \e[34m
CLR_MAGENTA := \e[35m
CLR_CYAN := \e[36m
CLR_WHITE := \e[37m

envfile := envs/$(MAKECMDGOALS).env

ifneq (,$(wildcard $(envfile)))
	include $(envfile)
	export $(shell sed 's/=.*//' $(envfile))
endif

start-test:
	@echo $(env_file)
	env | grep AAA

## build tasks
build: precheck-codebase build-l2geth build-gas-oracle build-batch-submitter build-deployer-dtl build-tss build-proxyd

build-l2geth:
	@echo Building l2geth ...
	cd mantle/l2geth && make geth

build-gas-oracle:
	@echo Building gas-oracle ...
	cd mantle/gas-oracle && make gas-oracle

build-batch-submitter:
	@echo Building batch-submitter ...
	cd mantle/batch-submitter && make batch-submitter

build-deployer-dtl:
	@echo Building deployer and dtl ...
	cd mantle && yarn && yarn cache clean && yarn build
 
build-tss:
	@echo Building tss ...
	cd mantle/tss && make build

build-proxyd:
	@echo Building proxyd ...
	cd mantle/proxyd && make proxyd

build-mantle-test: precheck-codebase
	@echo Build mantle-test
	cd mantle-test && yarn && yarn build

init-tss: build-mantle-test
	$(eval ENV := local)
	cp envs/initTss.local.env mantle-test/.local.env
	cd mantle-test && \
		npx hardhat tssInit --threshold 2 --network btl1 \
		--privatekeylist '[8e09231cd4e10460b4b4b0b291055ba5d2c900daed32642b47bca8c034c895ef,00f75cacb3ff9b4ed18e093dbbf6f7e7188060fabfb352d2253ea0e26f96a3eb,de87f566d458c0e53eb866cadd4e8e39a83cb8e20801e57e1fb55a3e4107027b,32a79d56c34105915ad71b6e0fc52b4cd6e7212dfa7b4dd0b24602282ee605ef]'


init-balance-l1eth:
	$(eval HARDHAT0_PKEY := 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80)
	$(eval HARDHAT0_ADDR := 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266)
	@cat accounts.txt | \
		awk -F '0x' -v pk=$(HARDHAT0_PKEY) -v addr=$(HARDHAT0_ADDR) \
		'{ \
			if($$0) { \
				"cast b --rpc-url http://hardhat:9545 0x"$$2 |& getline b; \
				if(b==0) {  \
					"cast s --private-key "pk" --from "addr" --rpc-url http://hardhat:9545 --value "10^19" 0x"$$2 |& getline rs; \
					printf "%-14s0ETH. Send 10ETH from hardhat account #0.\n", $$1 \
				} \
			} \
		}'
	@sleep 1
	@echo
	@printf "Run\e[32m\e[1m make balance\e[0m to check the current balance.\n"

init-balance-l1bit:
	$(eval HARDHAT0_PKEY := 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80)
	$(eval HARDHAT0_ADDR := 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266)
	$(eval L1_BIT_ADDRESS := 0xdf3BD218A936A92be5e43592143ecc7a33cef514)
	@echo "Mint 10000BIT for HARDHAT0 ..."
	@cast s --rpc-url http://hardhat:9545 --private-key $(HARDHAT0_PKEY) --from $(HARDHAT0_ADDR) \
		$(L1_BIT_ADDRESS) "mint(uint256)" `echo 10^22 | bc` > /dev/null
	@cat accounts.txt | \
		awk -F '0x' -v pk=$(HARDHAT0_PKEY) -v addr=$(HARDHAT0_ADDR) -v contract=$(L1_BIT_ADDRESS) \
		'{ \
			if($$0) { \
				"cast 2d `cast c --rpc-url http://hardhat:9545 "contract" \"balanceOf(address)\" 0x"$$2"`" |& getline b; \
				if(b==0) {  \
					"cast s --private-key "pk" --from "addr" --rpc-url http://hardhat:9545 "contract" \"transfer(address,uint256)\" 0x"$$2 10^20  |& getline rs; \
					printf "%-14s0BIT. Send 100BIT from hardhat account #0.\n", $$1 \
				} \
			} \
		}'
	@sleep 1
	@echo
	@printf "Run\e[32m\e[1m make balance\e[0m to check the current balance.\n"

reinit:

## start/stop service tasks
start-postgres:
	$(eval WORK_DIR := $(DATA_DIR)/postgres)

start-l1geth:
	$(eval WORK_DIR := $(DATA_DIR)/l1geth)
	@geth \
		--datadir $(WORK_DIR) \
		--keystore $(WORK_DIR)/keystore \
		--http --http.port 9545 \
		--http.vhosts '*' --http.corsdomain '*' \
		--http.api personal,eth,net,web3,debug,txpool \
		--ws --ws.api personal,eth,net,web3,debug,txpool \
		--dev --dev.period 1 \
		--password $(WORK_DIR)/password.txt \
		--gcmode archive

start-hardhat:
	cd mantle/ops/docker/hardhat && yarn && \
	yarn start --port 9545 >> $(CODE_BASE)/$(LOGS_DIR)/hardhat.log 2>&1

start-deployer:
	$(eval WORK_DIR := $(DATA_DIR)/deployer)
	rm -rf mantle/packages/contracts/deployments/local/
	cd mantle/packages/contracts && ../../ops/scripts/deployer.sh >> $(CODE_BASE)/$(LOGS_DIR)/deployer.log 2>&1

start-dtl:
	$(eval WORK_DIR := $(DATA_DIR)/dtl)
	$(eval export DATA_TRANSPORT_LAYER__DB_PATH := $(PWD)/$(WORK_DIR))
	test -d $(DATA_TRANSPORT_LAYER__DB_PATH) || mkdir -p $(DATA_TRANSPORT_LAYER__DB_PATH)
	cd mantle/packages/data-transport-layer && ../../ops/scripts/dtl.sh >> $(CODE_BASE)/$(LOGS_DIR)/dtl.log 2>&1

start-l2geth:
	$(eval WORK_DIR := $(DATA_DIR)/l2geth)
	@test -d $(WORK_DIR) || (mkdir -p $(WORK_DIR) && echo pwd > $(WORK_DIR)/password.txt )
	@test -d $(WORK_DIR)/geth || \
		$(L2GETH_BIN) account import --datadir $(WORK_DIR) --password $(WORK_DIR)/password.txt <(echo $(BLOCK_SIGNER_KEY)) && \
		$(L2GETH_BIN) --datadir $(WORK_DIR) init mantle/packages/contracts/genesis/state-dump.latest.json
	$(L2GETH_BIN) \
		--datadir $(WORK_DIR) \
		--password $(WORK_DIR)/password.txt \
		--allow-insecure-unlock \
		--unlock $(BLOCK_SIGNER_ADDRESS) \
		--mine --miner.etherbase $(BLOCK_SIGNER_ADDRESS) >> $(CODE_BASE)/$(LOGS_DIR)/l2geth.log 2>&1

start-gas-oracle:
	$(GAS_ORACLE_BIN) >> $(CODE_BASE)/$(LOGS_DIR)/gas-oracle.log 2>&1

start-batch-submitter:
	$(BATCH_SUBMITTER_BIN) >> $(CODE_BASE)/$(LOGS_DIR)/batch-submitter.log 2>&1

start-tssmanager:
	$(eval WORK_DIR := $(DATA_DIR)/tssmanager)
	$(eval export TSS_MANAGER_DB_DIR := $(PWD)/$(WORK_DIR)/db)
	@test -d $(TSS_MANAGER_DB_DIR) || mkdir -p $(TSS_MANAGER_DB_DIR)
	$(TSS_BIN) manager -c mantle/ops/config/tss-manager-config.toml >> $(CODE_BASE)/$(LOGS_DIR)/tssmanager.log 2>&1

start-tssnode0:
	$(eval WORK_DIR := $(DATA_DIR)/tssnode0)
	$(eval export TSS_NODE_BASE_DIR := $(PWD)/$(WORK_DIR))
	$(eval export TSS_NODE_DB_DIR := $(PWD)/$(WORK_DIR)/db)
	$(eval export TSS_NODE_P2P_PORT := 8000)
	$(eval export TSS_NODE_PRIVATE_KEY := 8e09231cd4e10460b4b4b0b291055ba5d2c900daed32642b47bca8c034c895ef)
	$(eval export TSS_NODE_BOOTSTRAP_PEERS := /ip4/127.0.0.1/tcp/8001/p2p/16Uiu2HAmKfKjF8NZQSiX34K61tC1UDs5S5KmuXdUo5sV2Grws9DR,/ip4/127.0.0.1/tcp/8002/p2p/16Uiu2HAmPd2aH86WmaRKbzmS9znvGJ4zbYDbYkcoqek6UVK7k8cW,/ip4/127.0.0.1/tcp/8003/p2p/16Uiu2HAm5nwe45HDYR6hBDpXq5cXKG3jnUYHppWx8jRNF71izex8)
	@test -d $(TSS_NODE_DB_DIR) || mkdir -p $(TSS_NODE_DB_DIR)
	$(TSS_BIN) node -c mantle/ops/config/tss-node-config.toml >> $(CODE_BASE)/$(LOGS_DIR)/tssnode0.log 2>&1
start-tssnode1:
	$(eval WORK_DIR := $(DATA_DIR)/tssnode1)
	$(eval export TSS_NODE_BASE_DIR := $(PWD)/$(WORK_DIR))
	$(eval export TSS_NODE_DB_DIR := $(PWD)/$(WORK_DIR)/db)
	$(eval export TSS_NODE_P2P_PORT := 8001)
	$(eval export TSS_NODE_PRIVATE_KEY := 00f75cacb3ff9b4ed18e093dbbf6f7e7188060fabfb352d2253ea0e26f96a3eb)
	$(eval export TSS_NODE_BOOTSTRAP_PEERS := /ip4/127.0.0.1/tcp/8000/p2p/16Uiu2HAm4GxbCVcQU6a3MvHeAXz6GaxSVwoVZuEzDPNkLdzZ7V9v,/ip4/127.0.0.1/tcp/8002/p2p/16Uiu2HAmPd2aH86WmaRKbzmS9znvGJ4zbYDbYkcoqek6UVK7k8cW,/ip4/127.0.0.1/tcp/8003/p2p/16Uiu2HAm5nwe45HDYR6hBDpXq5cXKG3jnUYHppWx8jRNF71izex8)
	@test -d $(TSS_NODE_DB_DIR) || mkdir -p $(TSS_NODE_DB_DIR)
	$(TSS_BIN) node -c mantle/ops/config/tss-node-config.toml >> $(CODE_BASE)/$(LOGS_DIR)/tssnode1.log 2>&1
start-tssnode2:
	$(eval WORK_DIR := $(DATA_DIR)/tssnode2)
	$(eval export TSS_NODE_BASE_DIR := $(PWD)/$(WORK_DIR))
	$(eval export TSS_NODE_DB_DIR := $(PWD)/$(WORK_DIR)/db)
	$(eval export TSS_NODE_P2P_PORT := 8002)
	$(eval export TSS_NODE_PRIVATE_KEY := de87f566d458c0e53eb866cadd4e8e39a83cb8e20801e57e1fb55a3e4107027b)
	$(eval export TSS_NODE_BOOTSTRAP_PEERS := /ip4/127.0.0.1/tcp/8000/p2p/16Uiu2HAm4GxbCVcQU6a3MvHeAXz6GaxSVwoVZuEzDPNkLdzZ7V9v,/ip4/127.0.0.1/tcp/8001/p2p/16Uiu2HAmKfKjF8NZQSiX34K61tC1UDs5S5KmuXdUo5sV2Grws9DR,/ip4/127.0.0.1/tcp/8003/p2p/16Uiu2HAm5nwe45HDYR6hBDpXq5cXKG3jnUYHppWx8jRNF71izex8)
	@test -d $(TSS_NODE_DB_DIR) || mkdir -p $(TSS_NODE_DB_DIR) 
	$(TSS_BIN) node -c mantle/ops/config/tss-node-config.toml >> $(CODE_BASE)/$(LOGS_DIR)/tssnode2.log 2>&1
start-tssnode3:
	$(eval WORK_DIR := $(DATA_DIR)/tssnode3)
	$(eval export TSS_NODE_BASE_DIR := $(PWD)/$(WORK_DIR))
	$(eval export TSS_NODE_DB_DIR := $(PWD)/$(WORK_DIR)/db)
	$(eval export TSS_NODE_P2P_PORT := 8003)
	$(eval export TSS_NODE_PRIVATE_KEY := 32a79d56c34105915ad71b6e0fc52b4cd6e7212dfa7b4dd0b24602282ee605ef)
	$(eval export TSS_NODE_BOOTSTRAP_PEERS := /ip4/127.0.0.1/tcp/8000/p2p/16Uiu2HAm4GxbCVcQU6a3MvHeAXz6GaxSVwoVZuEzDPNkLdzZ7V9v,/ip4/127.0.0.1/tcp/8001/p2p/16Uiu2HAmKfKjF8NZQSiX34K61tC1UDs5S5KmuXdUo5sV2Grws9DR,/ip4/127.0.0.1/tcp/8002/p2p/16Uiu2HAmPd2aH86WmaRKbzmS9znvGJ4zbYDbYkcoqek6UVK7k8cW)
	@test -d $(TSS_NODE_DB_DIR) || mkdir -p $(TSS_NODE_DB_DIR)
	$(TSS_BIN) node -c mantle/ops/config/tss-node-config.toml >> $(CODE_BASE)/$(LOGS_DIR)/tssnode3.log 2>&1

up: start

start: 
	mkdir -p local/logs
	@printf "$(CLR_GREEN)$(CLR_BOLD)Starting hardhat ...$(CLR_RESET)\n"
	@screen -dmS mantle.start-hardhat make start-hardhat
	sleep 8
	@make init-balance-l1eth
	@sleep 3
	@printf "$(CLR_GREEN)$(CLR_BOLD)Starting deployer...$(CLR_RESET)\n"
	@screen -dmS mantle.start-deployer make start-deployer
	sleep 50
	@printf "$(CLR_GREEN)$(CLR_BOLD)Starting dtl...$(CLR_RESET)\n"
	@screen -dmS mantle.start-dtl make start-dtl
	@printf "$(CLR_GREEN)$(CLR_BOLD)Starting l2geth...$(CLR_RESET)\n"
	@screen -dmS mantle.start-l2geth make start-l2geth
	@printf "$(CLR_GREEN)$(CLR_BOLD)Starting gas-oracle ...$(CLR_RESET)\n"
	@screen -dmS mantle.start-gas-oracle make start-gas-oracle
	@printf "$(CLR_GREEN)$(CLR_BOLD)Starting batch-submitter ...$(CLR_RESET)\n"
	@screen -dmS mantle.start-batch-submitter make start-batch-submitter
	@make init-balance-l1bit
	@sleep 3
	@printf "$(CLR_GREEN)$(CLR_BOLD)Starting tssmanager ...$(CLR_RESET)\n"
	@screen -dmS mantle.start-tssmanager make start-tssmanager
	@for i in `seq 0 3`; do \
		printf "$(CLR_GREEN)$(CLR_BOLD)Starting tssnode$$i ...$(CLR_RESET)\n"; \
		screen -dmS mantle.start-tssnode$$i make start-tssnode$$i; \
	done
	@printf "$(CLR_GREEN)$(CLR_BOLD)Init tss ...$(CLR_RESET)\n"
	@make init-tss

ps:
	@for session in `screen -ls | grep mantle | awk '{print $$1}' | awk -F. '{print $$3}'`; do \
		printf "$(CLR_GREEN)$(CLR_BOLD)$$session running ...$(CLR_RESET)\n"; \
	done 
	@echo
	@printf "To stop service, use $(CLR_GREEN)$(CLR_BOLD)make stop$(CLR_RESET)\n"

down: stop

stop:
	@for session in `screen -ls | grep mantle | awk '{print $$1}'`; do \
		printf "$(CLR_RED)Stopping $$session ...$(CLR_RESET)\n"; \
		pid=`echo $$session | cut -d. -f1`; \
		pkill -P $$pid; \
	done
## misc tasks
precheck: precheck-codebase
	@command -v cast > /dev/null || printf "cast not found. Install to your PATH: https://github.com/foundry-rs/foundry/releases\\n"
	@command -v jq > /dev/null || printf "jq not found. Install: $(CLR_GREEN)brew install jq$(CLR_RESET)\n"
	@command -v gawk > /dev/null || printf "gnu-awk not found. Install: $(CLR_GREEN)brew install gawk$(CLR_RESET)\n"
	@command -v postgres > /dev/null || printf "postgres(for blockscout) not found. Install: $(CLR_GREEN)brew install postgres$(CLR_RESET)\n"

precheck-codebase:
	@test -d mantle || printf "repo mantle not found. Checkout code from https://github.com/mantlenetworkio/mantle.git and make a soft link $(CLR_GREEN)ln -s /path/to/mantle . $(CLR_RESET)\n"
	@test -d mantle-test || printf "repo mantle not found. Checkout code from https://github.com/mantlenetworkio/mantle-test.git and make a soft link $(CLR_GREEN)ln -s /path/to/mantle-test . $(CLR_RESET)\n"

info:

tssinfo:
	$(eval ENV := local)
	@printf "$(CLR_GREEN)$(CLR_BOLD)getTssGroupInfo:$(CLR_RESET)\n\n"
	@cd mantle-test && \
		npx hardhat getTssGroupInfo --contract 0x36fCf02Fc651c0b7ef2ECA446Dd2405364F85337 --network btl1

balance:
	$(eval L1_BIT_ADDRESS := 0xdf3BD218A936A92be5e43592143ecc7a33cef514)
	@cat accounts.txt | \
		awk -F '0x' -v bitAddress=$(L1_BIT_ADDRESS) \
		'{ \
			if($$0) { \
				"cast b --rpc-url http://hardhat:9545 0x"$$2" | cast fw" |& getline ETHBalance; \
				"cast 2d `cast c --rpc-url http://hardhat:9545 "bitAddress" \"balanceOf(address)\" 0x"$$2"` | cast fw" |& getline BITBalance; \
				printf "\033[33m\033[1m%-14s\033[0m \033[32m\033[1m0x%s\033[0m \033[33m\033[1m %8.2fETH\033[0m  \033[33m\033[1m %8.2fBIT\033[0m\n", $$1, $$2, ETHBalance, BITBalance; \
			} \
		}'

addresses:
	@echo 
	@for json in mantle/packages/contracts/deployments/local/*.json; do f=`basename $$json`; a=`jq -r .address $$json`; printf "\e[33m\e[1m%-38s\e[0m \e[32m\e[1m$$a\n\e[0m" $${f%.*} ; done

endpoints:
	@echo
	@cat endpoints.txt | awk '{ if($$0) {printf "\033[33m\033[1m%-16s\033[0m" "\033[32m\033[1m %s \033[0m\n", $$1, $$2} }'

## clean tasks
clean: clean-data

clean-all: clean-data clean-logs

clean-data: stop
	@printf "$(CLR_RED)$(CLR_BOLD)Clearing $(DATA_DIR) ... $(CLR_RESET)\n"
	@rm -rf $(DATA_DIR)

clean-logs:
	@for log in $(LOGS_DIR)/*.log; do \
		printf "$(CLR_BROWN)$(CLR_BOLD)Clearing $$log ... $(CLR_RESET)\n"; \
		echo -n > $$log; \
	done
