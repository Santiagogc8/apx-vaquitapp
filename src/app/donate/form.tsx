"use client"; //  Esto le dice a react "Oye, a partir de este archivo (y sus hijos), necesito que envíes el JavaScript al navegador porque voy a usar interactividad (clicks, useState, useEffect)"
// El formulario necesita "use client" porque interactúa con el usuario antes de enviar nada.

// Importaciones
import { donateAction } from "./actions";
import styles from "./form.module.scss";

// Formlario comun
export function DonationForm() {
  return (
    <form
      className={styles.form}
      action={donateAction} // Le pasamos al action nuestra funcion de donateAction
    >
      <div className={styles.field}>
        <div className={styles.label}>Nombre</div>
        <input
          className={styles.textField}
          type="text"
          placeholder="Tu nombre"
          name="name"
        />
      </div>
      <div className={styles.field}>
        <div className={styles.label}>Mensaje</div>
        <textarea
          className={styles.textField}
          name="message"
          placeholder="Tu mensaje"
          rows={6}
        />
      </div>
      <div className={styles.field}>
        <div className={styles.label}>Monto</div>
        <input
          className={styles.textField}
          type="text"
          name="amount"
          placeholder="10000"
        />
      </div>

      <button
        type="submit" // Al hacer submit, ejecutamos el action (donateAction)
        className={styles.payButton}
      >
        Donar
      </button>
    </form>
  );
}
