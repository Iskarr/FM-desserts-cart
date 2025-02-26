<div className="absolute left-1/2 transform -translate-y-[15px] -translate-x-1/2 z-0 rounded-full bg-[hsl(14,86,42)] border border-[hsl(14,86,42)] hover:bg-[hsl(14,86,42)] px-4 py-2 flex items-center space-x-2">
  <Button
    className="bg-transparent border border-white p-1 rounded-full"
    size="sm"
    onClick={() => handleDecrement(dessert)}
  >
    <Image
      src={"/assets/images/icon-decrement-quantity.svg"}
      width={10}
      height={10}
      alt="decrement quantity"
    />
  </Button>
  <span className="text-white font-bold">{cartItem.quantity}</span>
  <Button
    className="bg-transparent border border-white p-1 rounded-full"
    size="sm"
    onClick={() => handleIncrement(dessert)}
  >
    <Image
      src={"/assets/images/icon-increment-quantity.svg"}
      width={10}
      height={10}
      alt="increment quantity"
    />
  </Button>
</div>;
