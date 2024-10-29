import { Component } from '@angular/core';
import { OrderitemService } from '../Service/orderitem.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../Service/product.service';
import { OrderService } from '../Service/order.service';
import { AuthService } from '../Service/auth.service';
import { PaymentService } from '../Service/payment.service';

@Component({
  selector: 'app-orderitem',
  templateUrl: './orderitem.component.html',
  styleUrl: './orderitem.component.css'
})
export class OrderitemComponent {
  itemId: string | null = null;
  pMap : any;
  pMap1 : any;
  pMap3: any;
  order : any;
  items : any;
  b : any;
 
  constructor(private ot : OrderitemService,private route: ActivatedRoute, private p : ProductService,private o : OrderService,
    private auth : AuthService,private pmt : PaymentService
  ) {}

  ngOnInit(): void {
    this.b = this.auth.isAdmin();
    this.route.paramMap.subscribe(params => {
      this.itemId = params.get('id'); 
      this.loadOrderItems();
      console.log(this.itemId);
    });
 }


 loadOrderItems(){

  this.ot.getOrderItemsbyNo(this.itemId).subscribe((res)=>{
         this.items = res;

         this.o.getOrderByNo(this.itemId).subscribe((res2)=>{
            this.order = res2;
            console.log(res2);
            this.p.getProducts().subscribe((res1)=>{
              const productMap = res1.reduce((acc, item) => {
                acc[item.ProductId] = item.Name;
                return acc;
              }, {} as { [key: number]: string });

              const productMap1 = res1.reduce((acc, item) => {
                acc[item.ProductId] = item.ImageUrl;
                return acc;
              }, {} as { [key: number]: string });

              this.pmt.getPayments().subscribe( (res4)=>{
                const paymentMap = res4.reduce((acc, item) => {
                  acc[item.PaymentId] = item.Address;
                  return acc;
                }, {} as { [key: number]: string });
                this.pMap3 = paymentMap;

              },(err)=>{
                console.log(err);
              })
           

              this.pMap = productMap;
              this.pMap1 = productMap1;
             },(err)=>{
              console.log(err);
             })
            
         },(err)=>{
          console.log(err);
         })

      

  },(err)=>{
    console.log(err);
  })

 }


}
