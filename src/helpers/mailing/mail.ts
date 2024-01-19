import nodemail from 'nodemailer';

const html = (content:any) => {
    return `    
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            ${content}
        </body>
        </html>
    `;
}

const mailInfoFormat = (obj:any) => {

    const content = `
        <h1>${obj.title}</h1>

        <p>
            ${obj.text}
        </p>


        <footer>
            <span>
                ${obj.signature}
            <span>
        </footer>    
    `;

    return html(content);
    
}


export function sendMail(receiver:string, subject:string, content:Object) {

    const transporter = nodemail.createTransport({
        host: "smtp.gmail.com",
        service: 'gmail',
        auth: {
            type: "login", // default
            user : process.env.MAIL_SERVER,
            pass : process.env.PASSWORD_MAIL_SERVER
        },
        tls: {
          rejectUnauthorized: false
      }
    });

    var options = {
        from: process.env.MAIL_SERVER,
        to: receiver,
        subject,
        html: mailInfoFormat(content)
    };

    transporter.sendMail(options, (err, info) => {
        if (err) {
            console.log(err);            
            return false;
        } else {
            console.log("success : " + info.response);            
            return true;
        }
    });

}