export const createOrder = async (payload: any) => {
  const res = await fetch("http://localhost:5000/api/v1/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Order failed");
  }

  return res.json();
};