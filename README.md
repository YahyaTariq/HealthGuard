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
