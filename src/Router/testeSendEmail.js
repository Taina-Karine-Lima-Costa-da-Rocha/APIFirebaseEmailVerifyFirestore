const express = require("express")
const { getApp } = require("firebase-admin/app")
const nodeMailer = require("nodemailer")

const routers = express.Router()

const { admin, keyRandom } = require("../config/firebase/index")

/*==================================================*/

// const mailOptions = {
//     from: 'meuteste.teste.6ma1l@gmail.com', // sender address
//     to: 'rinabey883@rxcay.com', // receiver (use array of string for a list)
//     subject: 'Email teste de Maclaurin do pc taina', // Subject line
//     html: '<p>Este é um email de teste Maclaurim mandou isso </p>'// plain text body
// };

// const transporter = nodeMailer.createTransport({
//     service: "gmail",
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false,
//     auth: {
//         user: "meuteste.teste.6ma1l@gmail.com",
//         pass: "ntkypyhouzhexsic"
//     }, tls: {
//         rejectUnauthorized: false
//     }

// })
// //
// routers.get("/envi", async (req, res) => {
//     const mailset = await transporter.sendMail(mailOptions, (err, info) => {
//         try {
//             if (err) {
//                 console.log(err)
//             } else {
//                 console.log(info);
//             }
//         } catch (error) {
//             console.log("aqui ha um erro *")
//             console.log(error)
//         }
//     });

//     console.log(mailset)

//     return res.status(200).json({ msg: "pode ter erro" })
// })

/*==================================================*/

routers.post("/verificationLink", async (req, res) => {
    const userData = req.body;
    console.log("daddos da req body *")
    console.log(userData)

    const mailerTRansporter = nodeMailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "meuteste.teste.6ma1l@gmail.com",
            pass: "ntkypyhouzhexsic"
        }, tls: {
            rejectUnauthorized: false
        }

    })

    try {

        const actionCodeSettings = {
            url: `https://ce8nti.csb.app/`,
            handleCodeInApp: true
        }

        const generateLinkToEmail = await admin.auth().generateEmailVerificationLink(userData.email, actionCodeSettings)

        const newMailOptions = {
            from: 'meuteste.teste.6ma1l@gmail.com', // sender address
            to: userData.email, // receiver (use array of string for a list)
            subject: 'Email para verificação de usuario ', // Subject line
            Text: `este é uma verificação de email`,
            html: `<a href="${generateLinkToEmail}">${generateLinkToEmail}</a>`
        };

        console.log(generateLinkToEmail)

        mailerTRansporter.sendMail(newMailOptions, (err, info) => {
            if (err) {
                console.log(err)
            } else {
                console.log(info)
            }
        })

        return res.status(200).json({ message: 'Email successfully sent' })

    } catch (error) {
        const message = error.message
        if (error.code === 'auth/user-not-found') {
            return res.status(404).json({ message })
        }
        if (error.code === 'auth/invalid-continue-uri') {
            return res.status(401).json({ message })
        }
        res.status(500).json({ message })
    }


    return res.status(201).json({ msg: "final" })
})

routers.post("/getuser", async (req, res) => {
    const { email } = req.body
    try {
        const userDatas = await admin.auth().getUserByEmail(email)
            .then((userRecord) => {
                // See the UserRecord reference doc for the contents of userRecord.
                console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
                return res.status(200).json(userRecord.toJSON())
            })
            .catch((error) => {
                console.log('Error fetching user data:', error);
                return res.status(200).json({ msg: error })
            });
    } catch (error) {
        return res.status(400).json({ message: error })
    }
})


module.exports = routers;