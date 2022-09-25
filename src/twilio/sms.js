import twilio from 'twilio'

const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.ACCOUNT_TOKEN

const client = twilio(accountSid, authToken)

export default async function envioSms(to,body) {
    await client.messages.create({
        body: body,
        from: '+19592711872',
        to: `+54${to}`
      },(err, info)=>{
          if (err) {
              console.log(err)
          } else {
              console.log('sms sent: ', info);
          }
      })
  }

