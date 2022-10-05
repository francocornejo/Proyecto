import twilio from 'twilio'

const accountSid = "AC947712e1e902fff59a68af1b3a1342e8"//process.env.ACCOUNT_SID 
const authToken = "609defe7b5cc48028a591636e7273a00"//process.env.ACCOUNT_TOKEN

const client = twilio(accountSid, authToken)

export default async function mainWhatsapp(body) {
    await client.messages.create({
       body: body,
       from: 'whatsapp:+14155238886',
       to: "whatsapp:+5491140330618"
     },(err, info)=>{
         if (err) {
             console.log("Este Error es de whatsapp: ", err)
         } else {
             console.log('whatsapp sent: ', info);
         }
     })
 }