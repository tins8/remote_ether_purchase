import React from 'react';
// eslint-disable-next-line
import Tachyons from 'tachyons/css/tachyons.min.css';
import '../css/App.css';
import { 
  getETH, getBalance, getHistoric, 
  extractPriceFields, buyETH, PROD_ADDRESS,
  ONE_SECOND, ONE_MINUTE, TWO_MINUTES  
} from '../utils/data.js';
import { Slot } from './Slot';
import Price from '../containers/Price';
import PriceDisplay from '../containers/PriceDisplay';
import { connect } from 'react-redux';

const Web3 = require('web3');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleBuy = this.handleBuy.bind(this);

    this.state = {
      date: new Date(),
      balance: 0,
      showWait: false,
      showTransactionHash: false,
      transactionHash: 0,
      buySignal: false,
      timeSet: [],
    };
  }
  
  componentDidMount() {
    this.pricesTick();
    this.showDate = setInterval(() => this.dateTick(), ONE_SECOND);
    this.showPrices = setInterval(() => this.pricesTick(), ONE_MINUTE);
    this.updateHistoric = setInterval(() => this.getHistoricPrices(), TWO_MINUTES);
    this.getHistoricPrices();
    this.getWalletBalance();
    this.validLocalAddress = false;

    window.addEventListener('load', () => {
      let web3 = window.web3;
      
      if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
          const localAddress = web3.utils.hexToNumberString(web3.currentProvider.publicConfigStore._state.selectedAddress);
          const remoteAddress = web3.utils.hexToNumberString(PROD_ADDRESS);
          if (localAddress === remoteAddress) {
            this.validLocalAddress = true;
          }
      }
    });
  }

  componentWillUnmount() {
    this.clearInterval(this.showDate);
    this.clearInterval(this.showPrices);
    this.clearInterval(this.updateHistoric);
  }

  compareAddresses() {
    let web3 = window.web3;
    web3 = new Web3(web3.currentProvider);
    const localAddress = web3.utils.hexToNumberString(web3.currentProvider.publicConfigStore._state.selectedAddress);
    const remoteAddress = web3.utils.hexToNumberString(PROD_ADDRESS);
    if (localAddress === remoteAddress) {
      this.validLocalAddress = true;
    }
  }

  dateTick() {
    this.setState({date: new Date()});
  }

  pricesTick() {
    getETH()
    .then( p => {
      this.setState({eth: parseFloat(p.response)});
    });
    this.getHistoricPrices();
  }
  
  getWalletBalance() {
    getBalance()
    .then( r => {
        this.setState({balance: r.response});
    });
  } 

  buyEther() {
    this.setState({ showWait: true });
    buyETH()
    .then(
      (result) => {
        this.setState({showWait: false});
        this.setState({transactionHash: result.response.transactionHash});
        this.setState({showTransactionHash: true});
        this.getWalletBalance();
      });
  }

  getHistoricPrices() {
    getHistoric()
    .then( result => {
        const t = extractPriceFields(result).slice(0,5);
        this.setState({timeSet: t});
        // CHECK PRICE MOVEMENT OVER LAST FIVE MINUTES
        if (this.state.timeSet[0].close > this.state.timeSet[1].close ) {
          this.setState({buySignal: true});
        } else {
          this.setState({buySignal: false});
        }
      });
  }

  handleRefresh = () => {
    this.pricesTick();
  }

  handleBuy = () => {
    this.buyEther();
  }

  setDataMaps = () => {
    let closeData = []
    let volumeData = [];
    let timeData = [];
    // eslint-disable-next-line
    this.state.timeSet.map( (t, i) => {
     const time = t.time.toLocaleTimeString('EN-US');
       if(i < 5) {
         closeData.push(t.close.toFixed(2));
         volumeData.push(t.volume.toFixed(2));
         timeData.push(time);
       }
       this.closeMap = closeData.map( (c, i) => {
         return (
           <div key={i}>{c}</div>
           );
       });
       this.volumeMap = volumeData.map( (v, i) => {
         return (
           <div key={i}>{v}</div>
           );
       });
       this.timeMap = timeData.map( (t, i) => {
         return (
           <div key={i}>{t}</div>
           );
       });
   });
  }
  
  render() {
    this.setDataMaps();
    return (
      <div className="mw9 center ph3-ns mv0">
        <div className="bg-white blue tl mt1 ph2 pv2">
          <div className="fw7 f3 mt3 mb0">
            ETH Price Movement {this.topVal}
            <Price></Price><br />
            <PriceDisplay refresh={this.handleRefresh} eth={this.state.eth}></PriceDisplay>
          </div>
        </div>
        <div className="cf ph1-ns">
          {/* TIME & PRICES  */}
          <Slot display={this.state.date.toLocaleTimeString('EN-US')} />
        </div>
        <div className="cf ph1-ns">
          <Slot label="Price" data={this.closeMap} />
          <Slot label="Volume" data={this.volumeMap} />
          <Slot label="Time" data={this.timeMap} />
        </div>
        <div className="pv3">
          <div className="f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-blue pointer" onClick={this.handleRefresh}>
            Refresh Price
          </div>
        </div>
        { this.validLocalAddress && (
          <div>
            <h3>Wallet Balance: ETH {this.state.balance}</h3>
            <div>
              { this.state.buySignal ? 'WAIT - uptick' : 'BUY - downtick or flat'}
            </div>
            <p />
            <div className="red">
            <h2>
              { this.state.showWait ? 'PURCHASE IN PROGRESS' : '' }
            </h2>
            </div>
              { this.state.showTransactionHash && this.state.transactionHash ? 
                <a href={`https://rinkeby.etherscan.io/tx/${this.state.transactionHash}`} target="_blank">Transaction Hash</a> : '' }
                <p />
          </div>
          )}
          { this.validLocalAddress && !this.state.showWait && (
             <div className="f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-blue pointer" onClick={this.handleBuy}>
              BUY ETH
            </div>
          )}
    </div>
    );
  }
}

export default connect(this.mapDispatchToProps)(App); 
