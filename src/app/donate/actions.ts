// En este caso esta función corre exclusivamente en el servidor, aunque se llame desde el formulario. Es como tener una API route integrada.
"use server";

import { createSingleProductPreference } from "@/lib/mercadopago";
import { createPurchase } from "@/lib/purchases";
import { redirect } from "next/navigation";

// Creamos la funcion del action que recibe una data (de tipo FormData)
export async function donateAction(data: FormData) {
  // Extraemos el nombre, mensaje y monto del formulario
  const name = data.get("name") as string;
  const message = data.get("message") as string;
  const amount = Number(data.get("amount"));
  const newPurchId = await createPurchase({ // Creamos una instancia de la funcion createPurchase que nos devuelve el id de la transaccion y le pasamos los datos del form
    from: name,
    amount,
    message: message,
  });

  // Luego creamos la preferencia de mercado pago
  const newPref = await createSingleProductPreference({
    productName: "Donation", // Le decimos el nombre del producto
    productDescription: message as string, // La descripcion
    productId: newPurchId, // El productId (extraido de newPurchId)
    productPrice: amount, // El monto
    transactionId: newPurchId, // Y la id de la transaccion (la misma que obtuvimos de newPurchId)
  });
  redirect(newPref.init_point); // Y por ultimo redirigimos al usuario a la pagina de la pasarela de pago (extraida de lo que nos devuelve el objeto de la newPref)
}