export const getDiscountedPrice = (
  price: number,
  discount?: any
) => {
  if (!discount) return price;

  if (discount.type === "PERCENTAGE") {
    return price - (price * discount.value) / 100;
  }

  if (discount.type === "FIXED") {
    return price - discount.value;
  }

  return price;
};