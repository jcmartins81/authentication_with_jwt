import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'
import path from "path";

const transport = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
    }
});

transport.use(
    'compile',
    hbs({
        viewEngine: {
            extName: './html',
            layoutsDir: 'views/email/',
            defaultLayout:'',
            partialsDir: 'views/partials/',
        },
        viewPath: path.resolve('./src/resources/mail/'),
        extName: '.html'
    })
)

export default transport