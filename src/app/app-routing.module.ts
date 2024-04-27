import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalletSetupComponent } from './components/wallet-setup/wallet-setup.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'setup',
    pathMatch: 'full'
  },
  {
    path: 'setup',
    component: WalletSetupComponent,
  },
  {
    path: 'transaction',
    component: TransactionComponent,
  }, {
    path: 'transaction-list',
    component: TransactionListComponent,
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
