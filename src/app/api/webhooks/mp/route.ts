import { getPaymentById, WebhokPayload } from "@/lib/mercadopago";
import { confirmPurchase } from "@/lib/purchases";

// En este caso hacemos un POST directamente a nuestra api
export async function POST(request: Request, { params }) {
  // Obtenemos el payload de la request
  const body: WebhokPayload = await request.json();
  console.log("Webhook received", body); // Lo mostramos por consola

  // Extraemos del body el type y verificamos si fue payment (que sucedio con el pago)
  if (body.type === "payment") {
    // Si esa condicion se cumple ejecutamos getPaymentById y le pasamos el id de la data del body
    const mpPayment = await getPaymentById(body.data.id);
    if (mpPayment.status === "approved") { // Ahora verificamos si el pago fue aprovado
      console.log(`Payment ${mpPayment.id} approved`); // En caso afirmativo mostramos por consola
      const purchaseId = mpPayment.external_reference; // Extraemos el id de la compra

      await confirmPurchase(purchaseId); // Y ejecutamos confirmPurchase con el id (aqui iria la logica de mandarlo a la base de datos)
    } else if(mpPayment.status === "rejected"){ // En caso de que salga rechazada
      console.log(`Payment ${mpPayment.id} rejected`);
      const purchaseId = mpPayment.external_reference; // Extraemos el id de la compra

       // Y ejecutamos rejectPurchase con el id (aqui iria la logica de mandarlo a la base de datos y mandaria un correo al usuario)
      // await rejectPurchase(purchaseId);
    }
  }

  // Se le responde a MP siempre (si o si) para que no vuelva a llamar a este endpoint
  // con el mismo pago, aunque puede suceder
  return Response.json({ received: true });
}