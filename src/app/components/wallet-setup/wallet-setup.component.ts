import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-wallet-setup',
  templateUrl: './wallet-setup.component.html',
  styleUrls: ['./wallet-setup.component.css']
})
export class WalletSetupComponent implements OnInit {

  walletForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    balance: ['', [Validators.required]]
  });


  constructor(    private fb: FormBuilder, private walletService: WalletService,     private toastrService: ToastrService,     private router: Router, 
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('walletId')) {
      this.router.navigate(['transaction']);
    }
  }

  setupWallet() {
    if(this.walletForm?.invalid) {
      this.toastrService.error('Please Enter Required Values', "Error",{
        timeOut:3000
      });
      return;
    }

    const payload = this.walletForm.getRawValue();
    this.walletService.setupWallet(payload).subscribe((resp:any) => {
      if(resp) {
        localStorage.setItem('walletId', resp?.data?._id)
        this.toastrService.success('Wallet Created Successfully', "Success",{
          timeOut:3000
        });
        this.router.navigate(['transaction']);
      } else  {
        this.toastrService.error('Something Went Wrong', "Error",{
          timeOut:3000
        });
      }
    });
  }

}
