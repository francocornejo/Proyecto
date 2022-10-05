import twilio from 'twilio'

const accountSid = "AC947712e1e902fff59a68af1b3a1342e8"//process.env.ACCOUNT_SID 
const authToken = "609defe7b5cc48028a591636e7273a00"//process.env.ACCOUNT_TOKEN

const client = twilio(accountSid, authToken)

export default async function envioSms(to,body) {
    await client.messages.create({
        body: body,
        from: '+19592711872',
        to: `+54${to}`
      },(err, info)=>{
          if (err) {
              console.log("Este Error es de mensajes: ", err)
          } else {
              console.log('sms sent: ', info);
          }
      })
  }

