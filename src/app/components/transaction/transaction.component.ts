import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent implements OnInit {
  transactionForm: FormGroup = this.fb.group({
    amount: ['', [Validators.required]],
    description: [''],
    type: [true, [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private walletService: WalletService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('walletId')) {
      this.router.navigate(['setup']);
    }
  }

  executeTransaction() {
    const walletId = localStorage.getItem('walletId');
    if (this.transactionForm.invalid) {
      this.toastrService.error('Please Enter Required Values', 'Error', {
        timeOut: 3000,
      });
      return;
    }
    const payload = this.transactionForm.getRawValue();
    payload.type = payload.type == true ? 'CREDIT' : 'DEBIT';
    this.walletService.executeTransaction(payload, walletId).subscribe(
      (data) => {
        console.log('data', data);
        if (data) {
          this.toastrService.success('Wallet Created Successfully', 'Success', {
            timeOut: 3000,
          });
          this.viewAllTransactions();
        } else {
          this.toastrService.error('Something Went Wrong', 'Error', {
            timeOut: 3000,
          });
        }
      },
      (error) => {
        console.log('error', error);
        this.toastrService.error(
          error?.error || 'Something Went Wrong',
          'Error',
          {
            timeOut: 3000,
          }
        );
      }
    );
  }

  deleteWalletDetails() {
    const walletId = localStorage.getItem('walletId');
    this.walletService.deleteWalletDetails(walletId).subscribe((data) => {
      // console.log('data', data)
      if (data) {
        this.toastrService.success('Wallet Deleted Successfully', 'Success', {
          timeOut: 3000,
        });
        localStorage.removeItem('walletId');
        this.router.navigate(['setup']);
      }
    });
  }

  viewAllTransactions() {
    this.router.navigate(['transaction-list']);
  }
}
