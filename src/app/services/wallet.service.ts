import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const WALLET_END_POINT = environment.apiEndPoint;

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private http: HttpClient) { }

  setupWallet(payload:any) {
    return this.http.post(WALLET_END_POINT + 'wallet/setup', payload);
  }

  deleteWalletDetails(walletId:any) {
    return this.http.delete(WALLET_END_POINT + 'wallet/delete/' +  walletId, {});
  }

  executeTransaction(payload:any, walletId:any) {
    return this.http.post(WALLET_END_POINT + 'transaction/add/' + walletId, payload);
  }

  getAllTransactions(walletId:any, query: any) {
    return this.http.get(WALLET_END_POINT + 'transaction/all/' + walletId, {params: query});
  }

}
