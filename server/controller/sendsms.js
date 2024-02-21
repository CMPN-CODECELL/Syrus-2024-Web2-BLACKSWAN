const { Twilio } = require('twilio');

require('dotenv').config();

Twilio_SID = "AC4306edf4e8604ddf61326f2473697951";
Twilio_AUTH = "9d8a8537708f712f94eb2dfd57691880";


const client = require('twilio')(Twilio_SID,Twilio_AUTH);


const sendsms =  (async (body,sender_no) =>{

let msgopt = {
    from: process.env.Twilio_from,
    to : sender_no,
    body



}

try {
    const msg = await client.messages.create(msgopt);
    console.log(msg);

} catch (error) {
    console.log(error);
    
}

})

module.exports={sendsms}
