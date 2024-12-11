// server.js

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import cors
const { Gateway, Wallets } = require("fabric-network");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Use cors

// Load the network configuration
const ccpPath = path.resolve(__dirname, "connection-org1.json");
const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

// Create a new file system based wallet for managing identities.
const walletPath = path.join(process.cwd(), "wallet");

async function connectToNetwork() {
  const wallet = await Wallets.newFileSystemWallet(walletPath);

  // Check to see if we've already enrolled the user.
  const identity = await wallet.get("appUser");
  if (!identity) {
    console.log(
      'An identity for the user "appUser" does not exist in the wallet'
    );
    console.log("Enroll the user before retrying");
    return null;
  }

  // Create a new gateway for connecting to our peer node.
  const gateway = new Gateway();
  await gateway.connect(ccp, {
    wallet,
    identity: "appUser",
    discovery: { enabled: true, asLocalhost: false },
    sslProvider: "openSSL",
    verify: false, // Set to true in production
  });

  // Get the network (channel) our contract is deployed to.
  const network = await gateway.getNetwork("mychannel");

  // Get the contract from the network.
  const contract = network.getContract("healthcare");

  return { contract, gateway };
}

// Endpoint to invoke chaincode functions
app.post("/invoke", async (req, res) => {
  const { fcn, args } = req.body;

  try {
    const { contract, gateway } = await connectToNetwork();
    if (!contract) {
      res.status(500).send("Failed to connect to network");
      return;
    }

    await contract.submitTransaction(fcn, ...args);
    await gateway.disconnect();

    res.json({ message: "Transaction has been submitted" });
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to query chaincode functions
app.post("/query", async (req, res) => {
  const { fcn, args } = req.body;

  try {
    const { contract, gateway } = await connectToNetwork();
    if (!contract) {
      res.status(500).send("Failed to connect to network");
      return;
    }

    const result = await contract.evaluateTransaction(fcn, ...args);
    await gateway.disconnect();

    res.json({ result: JSON.parse(result.toString()) });
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({ error: error.message });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
