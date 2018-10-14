## Remote Rinkeby Purchase

### For any client
1) Display the current price for Bitcoin and Ethereum every 60 seconds from Coinbase API.
2) Button for user to manually refresh price.

### Additional for client with MetaMask wallet for destination address
3) Button for user to transfer 5$ at current price of ether to another address using the rinkeby test network. 
4) Historical Data (console for now, need to add display)
5) Make Recommendations to user if they should buy.(buy or sell based on last up or down tick, need to elaborate)

### Server
In .env, add values for:
Your Infura access token (or token for another platform).
Address and private key of your sending wallet.
Address of your destination wallet (same as PROD_ADDRESS in App.js)

Run yarn install to build.
Run yarn start.

### Client
In App.js, change PROD_ADDRESS to the destination wallet (where you'll send the ether).
In App.js, add a remote server URL if you're using one (e.g. - myapi.awsinstance.com = example, does not exist).
To use local server, change LOCAL to true.

Run yarn to build.

After starting server, run yarn start.

Note: Requires MetaMask. If you have more than one wallet, make sure you're on the one that has PROD_ADDRESS, otherwise you won't see the Buy Ether button.

To make a purchase, hit the Buy Ether button and wait. A URL to the transaction hash will appear when the transaction is about done.

Adding Redux



