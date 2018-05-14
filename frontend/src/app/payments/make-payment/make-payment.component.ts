import { Component, OnInit, HostListener } from '@angular/core';
import { PaymentService } from '../payment.service';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {ApiService} from '../../api.service';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.css']
})
export class MakePaymentComponent implements OnInit {

  handler: any;
  amount = 500;

  constructor(private paymentSvc: PaymentService, private http: HttpClient, private apiService:ApiService) { }

  ngOnInit() {
    this.handler = StripeCheckout.configure({
      key: environment.stripeKey,
      image: '../../assets/img/logoBandiGare.png',
      locale: 'auto',
      token: token => {

        this.apiService.makePayment(this.amount,token.id)

        this.paymentSvc.processPayment(token, this.amount)
      }
    });
  }


  handlePayment() {
    this.handler.open({
      name: 'BandiGare',
      excerpt: 'Abbonamento per il servizio',
      amount: this.amount
    });
  }

  @HostListener('window:popstate')
    onPopstate() {
      this.handler.close()
    }


}
