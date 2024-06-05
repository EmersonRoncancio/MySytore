import nodemailer, { Transporter } from 'nodemailer'

interface sendMailOptions{
    to:string|string[]|undefined, //Receptora
    subject:string,//Titulo Mail
    htmlbody:string//Cntenido Mail
    attachments?:Attachment[]
}

interface Attachment{
    filename:string,
    path:string
}

export class EmailService{

    private transporter: Transporter

    constructor(emailService:string, emailRemitente:string, passwordRemitente: string){
        this.transporter = nodemailer.createTransport({ // crear tranportador de correo
            service: emailService, // tipo de servicio
            auth:{
                user: emailRemitente,// email que utiliza para enviar correos
                pass: passwordRemitente // llave secreta de email
            }
        })
    }

    async sendEmail(options:sendMailOptions):Promise<boolean>{

        const {to,subject,htmlbody,attachments = []} = options

        try {
            
            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlbody,
                attachments:attachments
            })


            console.log(sentInformation)

            return true
        } catch (error) {

            console.log(error)

            return false
        }
    }
}