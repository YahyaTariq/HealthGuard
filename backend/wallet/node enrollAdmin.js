const FabricCAServices = require('fabric-ca-client');
const { Wallets } = require('fabric-network');
const path = require('path');

const enrollAdmin = async () => {
    try {
        const caURL = 'http://localhost:7054'; // Replace with your CA URL
        const ca = new FabricCAServices(caURL);

        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);

        const identity = await wallet.get('Admin@org1.example.com');
        if (identity) {
            console.log('Admin already exists in the wallet');
            return;
        }

        const enrollment = await ca.enroll({
            enrollmentID: 'admin',
            enrollmentSecret: 'adminpw',
        });

        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'Org1MSP',
            type: 'X.509',
        };

        await wallet.put('Admin@org1.example.com', x509Identity);
        console.log('Admin enrolled successfully');
    } catch (error) {
        console.error(`Failed to enroll admin: ${error}`);
    }
};

enrollAdmin();
