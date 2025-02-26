"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import desserts from "@/data/data.json";
import Cart from "@/components/cart/page";
import { useCart, Product } from "@/app/context/CartContext";

export default function DessertsPage() {
  const {
    handleAddToCart,
    handleIncrement,
    handleDecrement,
    cartItems,
    totalQuantity,
    totalAmount,
  } = useCart();

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center sm:block">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Left Column: Header & Desserts Grid */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-8 title-text text-center lg:text-left">
            Desserts
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {desserts.map((dessert: Product) => {
              const cartItem = cartItems.find(
                (item) => item.name === dessert.name
              );
              return (
                <div
                  key={dessert.name}
                  className="rounded-lg overflow-hidden bg-transparent"
                >
                  <div className="relative aspect-square">
                    <picture>
                      <source
                        media="(min-width: 1024px)"
                        srcSet={dessert.image.desktop}
                      />
                      <source
                        media="(min-width: 768px)"
                        srcSet={dessert.image.tablet}
                      />
                      <source
                        media="(max-width: 640px)"
                        srcSet={dessert.image.mobile}
                      />
                      <Image
                        src={dessert.image.mobile}
                        alt={dessert.name}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover rounded"
                      />
                    </picture>
                    {cartItem ? (
                      <div className="absolute left-1/2 transform -translate-y-[15px] -translate-x-1/2 z-0 rounded-full bg-[hsl(14,86%,42%)] border border-[hsl(14,86%,42%)] hover:bg-[hsl(14,86%,42%)] w-[148px] h-[40px] flex justify-between items-center">
                        <button
                          className="border border-white rounded-full p-1 py-2 m-2"
                          onClick={() => handleDecrement(dessert)}
                        >
                          <Image
                            src={"/assets/images/icon-decrement-quantity.svg"}
                            width={10}
                            height={10}
                            alt="decrement quantity"
                          />
                        </button>
                        <span className="text-white">{cartItem.quantity}</span>
                        <button
                          className="border border-white rounded-full p-1 m-2"
                          onClick={() => handleIncrement(dessert)}
                        >
                          <Image
                            src={"/assets/images/icon-increment-quantity.svg"}
                            width={10}
                            height={10}
                            alt="increment quantity"
                          />
                        </button>
                      </div>
                    ) : (
                      <Button
                        className="absolute left-1/2 transform -translate-y-[15px] -translate-x-1/2 z-0 rounded-full bg-white border border-[hsl(12,20%,44%)] hover:bg-white"
                        size="lg"
                        onClick={() => handleAddToCart(dessert)}
                      >
                        <Image
                          src="/assets/images/icon-add-to-cart.svg"
                          width={20}
                          height={20}
                          alt="add to cart"
                          style={{ width: "auto", height: "auto" }}
                        />
                        <p className="text-black">Add to Cart</p>
                      </Button>
                    )}
                  </div>
                  <div className="p-2 text-center">
                    <p className="text-sm rose-500 mt-12">{dessert.category}</p>
                    <h2 className="text-md font-bold rose-900">
                      {dessert.name}
                    </h2>
                    <p className="text-primary font-semibold red-font">
                      ${dessert.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Cart */}
        <Cart
          totalQuantity={totalQuantity}
          cartItems={cartItems}
          totalAmount={totalAmount}
        />
      </div>
    </div>
  );
}
