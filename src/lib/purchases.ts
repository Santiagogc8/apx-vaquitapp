type Purchase = {
  id: string;
  from: string;
  amount: number;
  message: string;
  date: Date;
  status: string;
};
export async function getConfirmedPayments(): Promise<Purchase[]> {
  // Mock data
  return [
    {
      id: "1",
      from: "Pepito",
      amount: 33000,
      message: "Ahi te va mi aporte",
      date: new Date(),
      status: "confirmed",
    },
    {
      id: "2",
      from: "Juanita",
      amount: 54000,
      message: "Apoyo esta campaña",
      date: new Date(),
      status: "confirmed",
    },
    {
      id: "3",
      from: "Pepita",
      amount: 60000,
      message: "Ojalá que llegues",
      date: new Date(),
      status: "confirmed",
    },
  ];
}

// La funcion createPurchase obtiene un newPurchInput que es de tipo Purchase o "from" | "amount" | "message" (lo que le enviamos en el form) y regresa una promesa
export async function createPurchase(
  newPurchInput: Pick<Purchase, "from" | "amount" | "message">
): Promise<string> {
  const purchase = { // Crea el objeto purchase y le agrega un estado y una fecha
    ...newPurchInput,
    date: new Date(),
    status: "pending",
  };
  // guardamos esta nueva purchase en la db y devolvemos el id (este id normalmente es un uuid, pero en este caso es un 1234)
  return "1234";
}

// En esta funcion de confirmPurchase le pasamos el id
export function confirmPurchase(purchaseId: string) {
  // Y aqui confirmariamos la compra en la DB creando el registro en la db (o cambiando su estado a approved)
  console.log(`Purchase ${purchaseId} confirmed`);
  return true;
}