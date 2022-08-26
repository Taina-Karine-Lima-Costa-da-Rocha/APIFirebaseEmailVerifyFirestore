const express = require("express")
const nodemailer = require("nodemailer")
const { getAuth } = require("firebase-admin/auth")

const routers = express.Router()

const { admin, keyRandom } = require("../config/firebase")

const dbFirebase = admin.firestore()

const outro = () => {
    getAuth().generateEmailVerificationLink("gacaj77782@ukgent.com")
}

routers.get("/", (req, res) => {
    return res.status(200).json({ msg: "Foi com as rotas" })
})

const mailOptions = {
    from: '@gmail.com', // sender address
    to: '@ukgent.com', // receiver (use array of string for a list)
    subject: 'Subject of your email', // Subject line
    html: '<p>Your html here este email é de teste</p>'// plain text body
};

const transporter = nodemailer.createTransport({
    service:"gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "@gmail.com",
        pass: ""
    }, tls: {
        rejectUnauthorized: false
    }

})
//
routers.get("/envi", async (req, res) => {
    const mailset = await transporter.sendMail(mailOptions, (err, info) => {
        try {
            if (err) {
                console.log(err)
            } else {
                console.log(info);
            }
        } catch (error) {
            console.log("aqui ha um erro *")
            console.log(error)
        }
    });

    console.log(mailset)

    return res.status(200).json({ msg: "pode ter erro" })
})

module.exports = routers;