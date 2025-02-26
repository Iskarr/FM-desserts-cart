"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useCart } from "@/app/context/CartContext";

interface Product {
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  name: string;
  category: string;
  price: number;
  quantity?: number;
}

interface CartProps {
  totalQuantity: number;
  cartItems: Product[];
  totalAmount: number;
}

const Cart: React.FC<CartProps> = ({
  totalQuantity,
  cartItems,
  totalAmount,
}) => {
  const { handleRemoveItem } = useCart();

  return (
    <div className="mx-auto">
      {/* CART SUMMARY */}
      <div className="p-4 w-[350px] bg-white shadow-lg rounded mb-8">
        <header>
          <h2 className="text-xl font-bold mb-4 red-font">
            Your Cart ({totalQuantity})
          </h2>
        </header>
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center">
            <img
              src="/assets/images/illustration-empty-cart.svg"
              alt="Shopping Cart"
              width={200}
              height={200}
              loading="lazy"
              className="object-contain"
            />
            <p className="rose-500 mt-4">Your items will appear here</p>
          </div>
        ) : (
          <div className="divide-y divide-{color: hsl(14, 65%, 9%)} divide-opacity-50">
            {cartItems.map((item, index) => (
              <div key={index} className="py-4 flex flex-col">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold rose-900 text-sm mb-2">
                      {item.name}
                    </p>
                    <div className="flex items-center">
                      <span className="red-font font-bold text-sm mr-4">
                        {item.quantity}x
                      </span>
                      <span className="rose-300 text-sm">
                        @ ${item.price?.toFixed(2)}
                      </span>
                      <span className="rose-900 ml-2 text-sm">
                        = $
                        {((item.price ?? 0) * (item.quantity ?? 0)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    className="border border-[hsl(12,20%,44%)] rounded-full p-1"
                    onClick={() => handleRemoveItem(item)}
                  >
                    <img
                      src="/assets/images/icon-remove-item.svg"
                      width={10}
                      height={10}
                      alt="Remove item"
                      loading="lazy"
                    />
                  </button>
                </div>
              </div>
            ))}
            <hr className="opacity-90 rose-900" />
          </div>
        )}

        {/* Total Row */}
        <div className="flex justify-between items-center mt-4 m-2">
          <p className="rose-500">Total</p>
          <p className="font-bold rose-900 text-xl">
            ${totalAmount.toFixed(2)}
          </p>
        </div>

        {/* Carbon-Neutral Delivery */}
        <div className="flex items-center justify-start mt-4 mb-4 p-2 bg-[hsl(12,20%,92%)] rounded-md">
          <img
            src="/assets/images/icon-carbon-neutral.svg"
            width={20}
            height={20}
            loading="lazy"
            alt="Carbon Neutral"
          />
          <p className="rose-500 text-sm ml-2">
            This is a <span className="font-bold">carbon-neutral</span> delivery
          </p>
        </div>
        {/* Confirm Order Button using shadcn Dialog */}

        <Dialog>
          <DialogTrigger asChild>
            {totalQuantity > 0 ? (
              <button className="w-full red-button p-4">Confirm Order</button>
            ) : (
              <button className="w-full red-button p-4" disabled>
                Confirm Order
              </button>
            )}
          </DialogTrigger>
          <DialogContent className="p-6 bg-white rounded-lg shadow-lg max-w-lg">
            <div className="flex flex-col">
              <img
                src="/assets/images/icon-order-confirmed.svg"
                width={50}
                height={50}
                loading="lazy"
                alt="Confirm Order"
              />
              <DialogTitle className="text-3xl font-bold text-rose-900 mt-4">
                Order Confirmed
              </DialogTitle>
              <DialogDescription className="text-sm mt-2">
                We hope you enjoy your food!
              </DialogDescription>
            </div>
            {/* Order Box */}
            <div className="mt-6 bg-[hsl(13,31%,94%)] rounded-lg p-4">
              {cartItems.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="flex items-center justify-between py-4">
                    <div className="flex items-center">
                      <img
                        src={
                          item.image?.thumbnail ||
                          "/assets/images/default-thumbnail.png"
                        }
                        alt={item.name || "Dessert"}
                        width={40}
                        height={40}
                        loading="lazy"
                        className="rounded"
                      />
                      <div className="ml-4">
                        <p className="font-bold text-sm">{item.name}</p>
                        <p className="text-xs">
                          {item.quantity}x @ ${item.price?.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-rose-900">
                      ${((item.price ?? 0) * (item.quantity ?? 0)).toFixed(2)}
                    </p>
                  </div>
                  <hr className="opacity-90 rose-900" />
                </React.Fragment>
              ))}
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm">Order Total</p>
                <p className="text-lg font-bold text-rose-900">
                  ${totalAmount.toFixed(2)}
                </p>
              </div>
            </div>
            <button
              className="w-full red-button mt-8 p-8"
              onClick={() => window.location.reload()}
            >
              Start New Order
            </button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Cart;
