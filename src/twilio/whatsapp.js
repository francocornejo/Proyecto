import twilio from 'twilio'

const accountSid = process.env.ACCOUNT_SID 
const authToken = process.env.ACCOUNT_TOKEN

const client = twilio(accountSid, authToken)

export default async function mainWhatsapp(body) {
    await client.messages.create({
       body: body,
       from: 'whatsapp:+14155238886',
       to: "whatsapp:+5491140330618"
     },(err, info)=>{
         if (err) {
             console.log(err)
         } else {
             console.log('whatsapp sent: ', info);
         }
     })
 }