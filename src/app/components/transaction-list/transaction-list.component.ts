import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  transactionList:any = [];
  currentPage:any = 1;
  totalCount = 0;
  rowsPerPage = 10;


  constructor(private walletService: WalletService, private router: Router) { }

  ngOnInit(): void {
    this.getAllTransactions();
  }

  pageChanged (pageNumber:any) {
    this.currentPage = pageNumber;
    this.getAllTransactions();
  }

  getAllTransactions(sortBy?: any) {
    const walletId = localStorage.getItem('walletId');
    const query  = { 
      currentPage: this.currentPage,
      sortBy
    }
    this.walletService.getAllTransactions(walletId, query).subscribe((resp:any) => {
      this.transactionList = resp?.data?.transactionList;
      this.totalCount = resp?.data?.totalCount;
    });
  }

  addTransaction() {
    this.router.navigate(['transaction']);
  }


  downloadCsv(): void {
    const filename = 'Transactions'
    const data = this.transactionList;
    const csvContent = this.convertToCsv(data);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  convertToCsv(data: any[]): string {
    const csvRows = [];
    // const headers = Object.keys(data[0]);
    const headers = ['amount', 'type', 'description', 'balance', 'date'];
    csvRows.push(headers.join(','));
    for (const row of data) {
      const values = headers.map(header => {
        const escaped = ('' + row[header]).replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(','));
    }
    return csvRows.join('\n');
  }

}
