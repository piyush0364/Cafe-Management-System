import { Injectable } from '@angular/core';
import { forkJoin, map, switchMap } from 'rxjs';
import { CartItem } from './cart.service';
import { CartService } from './cart.service';
import { PaymentService } from './payment.service';

/**
 * Facade that contains the checkout/payment orchestration.
 * Components stay thin: they pass view-model data and subscribe to the final outcome.
 */
@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  constructor(
    private paymentService: PaymentService,
    private cartService: CartService
  ) {}

  placeOrder(
    userId: number,
    paymentForm: Record<string, unknown>,
    cartItems: CartItem[],
    priceByProductId: Record<number, number>
  ) {
    const subtotal = cartItems.reduce((total, item) => {
      return total + (item.Price ?? 0) * item.Quantity;
    }, 0);

    return this.paymentService.processPayment(paymentForm).pipe(
      switchMap(({ PaymentId }) => {
        const orderData = {
          UserId: userId,
          TotalAmount: subtotal,
          Status: 'pending',
          PaymentId,
          OrderDate: new Date()
        };

        return this.paymentService.createOrder(orderData).pipe(
          switchMap(({ OrderId }) => {
            const orderItemRequests = cartItems.map((t) => {
              const price =
                priceByProductId[t.ProductId] ??
                t.Price ??
                0;

              return this.paymentService.createOrderItems({
                Quantity: t.Quantity,
                OrderId,
                ProductId: t.ProductId,
                Price: price
              });
            });

            return forkJoin(orderItemRequests).pipe(
              switchMap(() => {
                const deleteRequests = cartItems.map((t) =>
                  this.cartService.deleteCart(t.CartId)
                );
                return forkJoin(deleteRequests);
              }),
              map(() => void 0)
            );
          })
        );
      })
    );
  }
}

