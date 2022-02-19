import { Component } from '@angular/core';
import {
  Link,
  ImmutableXClient,
  ImmutableMethodResults,
  ETHTokenType,
} from '@imtbl/imx-sdk';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-imx';

  //   link = new Link(process.env['REACT_APP_ROPSTEN_LINK_URL']);
  link = new Link('https://link.ropsten.x.immutable.com');

  client: any;
  walletConnected: any;
  walletAddress: any;
  balance: any;

  async linkSetup(): Promise<void> {
    // const publicApiUrl: string = process.env['REACT_APP_ROPSTEN_ENV_URL'] ?? '';
    const publicApiUrl = 'https://api.ropsten.x.immutable.com/v1';
    this.client = await ImmutableXClient.build({ publicApiUrl });

    const res = await this.link.setup({});
    this.walletConnected = true;
    this.walletAddress = res.address;

    console.log(`res is ${JSON.stringify(res)}`);

    console.log(`walletConnected is ${this.walletConnected}`);
    console.log(`walletAddress ${this.walletAddress}`);

    this.balance = await this.client.getBalance({
      user: res.address,
      tokenAddress: 'eth',
    });

    console.log(`balance is ${JSON.stringify(this.balance)}`);

    localStorage.setItem('address', res.address);
  }

  async depositETH() {
    const res = await this.link.deposit({
      type: ETHTokenType.ETH,
      amount: '0.025',
    });

    console.log(res);
  }

  sellNFT() {
    let sellAmount = (<HTMLInputElement>document.getElementById('sellAmount'))
      .value;
    let tokenId = (<HTMLInputElement>document.getElementById('tokenId')).value;
    let tokenAddress = (<HTMLInputElement>(
      document.getElementById('tokenAddress')
    )).value;

    console.log(sellAmount);
    console.log(tokenId);
    console.log(tokenAddress);

    this.link
      .sell({
        amount: sellAmount,
        tokenId: tokenId,
        tokenAddress: tokenAddress,
      })
      .then((res: any) => {
        console.log(res);
      });
  }
}
