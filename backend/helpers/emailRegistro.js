import nodemailer from "nodemailer";

const emailRegistro = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.HOST,
        port: process.env.PORT,
        auth: {
          user: process.env.USER,
          pass: process.env.PASS
        }
      });

      const {email, nombre, token} = datos;

      //Enviar email

      const info = await transport.sendMail({
        from: "APV - Administrador de pacientes de veterinaria",
        to: email,
        subject: "Confirma Tu Cuenta",
        text: 'COMPRUEBA TU CORREO',
        html: `<p>Hola${nombre}, comprueba tu cuenta en APV.</p>
        <p> tu cuenta ya esta lista solo debes de comprobarla en el siguiente enlace: <a href="${process.env.FRONT_END}/confirmar/${token}">Comprobar Cuenta</a> </p>
        <p> Si tu no creaste esta cuenta puedes ignorar este mesnaje </p>`
      })
}


export default emailRegistro;