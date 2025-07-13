const sendEmails = require('./sendmail/sendmail')

sendEmails()
.then(()=> console.log(`sent email!`))
.catch((err) => console.error(err))