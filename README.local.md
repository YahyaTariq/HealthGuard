<<<<<<< HEAD
# Running the test network

You can use the `./network.sh` script to stand up a simple Fabric test network. The test network has two peer organizations with one peer each and a single node raft ordering service. You can also use the `./network.sh` script to create channels and deploy chaincode. For more information, see [Using the Fabric test network](https://hyperledger-fabric.readthedocs.io/en/latest/test_network.html). The test network is being introduced in Fabric v2.0 as the long term replacement for the `first-network` sample.

If you are planning to run the test network with consensus type BFT then please pass `-bft` flag as input to the `network.sh` script when creating the channel. Note that currently this sample does not yet support the use of consensus type BFT and CA together.
That is to create a network use:
```bash
./network.sh up -bft
```

To create a channel use:

```bash
./network.sh createChannel -bft
```

To restart a running network use:

```bash
./network.sh restart -bft
```

Note that running the createChannel command will start the network, if it is not already running.

Before you can deploy the test network, you need to follow the instructions to [Install the Samples, Binaries and Docker Images](https://hyperledger-fabric.readthedocs.io/en/latest/install.html) in the Hyperledger Fabric documentation.

## Using the Peer commands

The `setOrgEnv.sh` script can be used to set up the environment variables for the organizations, this will help to be able to use the `peer` commands directly.

First, ensure that the peer binaries are on your path, and the Fabric Config path is set assuming that you're in the `test-network` directory.

```bash
 export PATH=$PATH:$(realpath ../bin)
 export FABRIC_CFG_PATH=$(realpath ../config)
```

You can then set up the environment variables for each organization. The `./setOrgEnv.sh` command is designed to be run as follows.

```bash
export $(./setOrgEnv.sh Org2 | xargs)
```

(Note bash v4 is required for the scripts.)

You will now be able to run the `peer` commands in the context of Org2. If a different command prompt, you can run the same command with Org1 instead.
The `setOrgEnv` script outputs a series of `<name>=<value>` strings. These can then be fed into the export command for your current shell.

## Chaincode-as-a-service

To learn more about how to use the improvements to the Chaincode-as-a-service please see this [tutorial](./test-network/../CHAINCODE_AS_A_SERVICE_TUTORIAL.md). It is expected that this will move to augment the tutorial in the [Hyperledger Fabric ReadTheDocs](https://hyperledger-fabric.readthedocs.io/en/release-2.4/cc_service.html)


## Podman

*Note - podman support should be considered experimental but the following has been reported to work with podman 4.1.1 on Mac. If you wish to use podman a LinuxVM is recommended.*

Fabric's `install-fabric.sh` script has been enhanced to support using `podman` to pull down images and tag them rather than docker. The images are the same, just pulled differently. Simply specify the 'podman' argument when running the `install-fabric.sh` script. 

Similarly, the `network.sh` script has been enhanced so that it can use `podman` and `podman-compose` instead of docker. Just set the environment variable `CONTAINER_CLI` to `podman` before running the `network.sh` script:

```bash
CONTAINER_CLI=podman ./network.sh up
````

As there is no Docker-Daemon when using podman, only the `./network.sh deployCCAAS` command will work. Following the Chaincode-as-a-service Tutorial above should work. 


=======
**#HealthGuard: A Blockchain-Based Healthcare Records System**
HealthGuard leverages Hyperledger Fabric to create a secure, decentralized, and patient-centric platform for managing healthcare records. By combining a permissioned blockchain network, smart contracts (chaincode), and IPFS integration, HealthGuard enhances data privacy, integrity, and interoperability in healthcare data management.

Key Features:
Hyperledger Fabric Network:
A permissioned blockchain ensures that only authorized participants can join the network. It includes multiple organizations, peers, and orderers, enabling robust and scalable transaction processing.

Smart Contracts (Chaincode):
The chaincode enforces business logic for:
Patient registration
Access control (grant/revoke access to records)
Adding and retrieving medical data via IPFS hashes
Endorsement and validation policies to maintain data integrity


Off-Chain Storage with IPFS:
Large medical files are stored off-chain on IPFS, with only the file’s hash referenced on the blockchain. This approach reduces on-chain storage overhead, maintains data integrity, and ensures efficient retrieval of medical data.

Data Privacy & Security:
HealthGuard utilizes Hyperledger Fabric’s private data collections and TLS-secured communication channels. Patients maintain control over their records, deciding who can access their data, ensuring compliance with healthcare regulations.

Current Status
Blockchain Network:
The underlying Hyperledger Fabric setup is fully operational, including organizations, MSP configurations, and channel creation. Chaincode has been deployed and tested on the network.

Smart Contract Functionality:
Chaincode has been implemented and tested for patient registration, access control, and IPFS hash linking. Key operations have been validated through CLI interactions and Fabric SDKs.

Frontend (Work in Progress):
A user-friendly frontend interface is planned to streamline patient and provider interactions. Currently, the frontend is still under development. Users can interact with the network using CLI tools or SDK-based scripts.

Repository Structure
fabric-dev/: Configuration files, scripts, and artifacts for setting up the Hyperledger Fabric network.
chaincode/: Go-based chaincode implementing the system’s business logic.
scripts/: Utility scripts for network startup, chaincode deployment, and channel management.


Prerequisites:
Hyperledger Fabric Binaries & Docker:
Install Docker, Docker Compose, and Fabric binaries following the Fabric Installation Guide.

Go Language:
Required for developing and testing the chaincode.

Getting Started
To Set up the Fabric Network:
cd fabric-dev/fabric-samples/test-network
./network.sh up createChannel -c mychannel -ca


Deploy Chaincode:

./network.sh deployCC -ccn healthcare -ccp ../chaincode/healthcare -ccl go


Interact via CLI: Use peer chaincode invoke and peer chaincode query to:
Register a new patient
Grant/revoke access to records
Add medical data (IPFS hash linkage)
Example:

peer chaincode invoke -C mychannel -n healthcare -c '{"function":"RegisterPatient","Args":["patient1","John Doe"]}'


IPFS Integration: Store large medical files on IPFS and reference their IPFS hashes within the chaincode transactions for efficient and secure data retrieval.

Next Steps
Frontend Development:
The upcoming milestone is creating a React-based (or other framework) frontend to provide patients and providers with a simple interface. This will remove the need for CLI-based interactions.

Enhanced Features:
Consider adding more granular role-based access controls, audit trails, and integration with existing EHR systems.

Contributing
Contributions are welcome! Please open an issue or submit a pull request with any improvements, bug fixes, or feature requests.
>>>>>>> 6df14397148262de2388e347dcb535cd488fd887
