const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { pool } = require("../config/dbConfig");
// const { Resend } = require('resend');

const nodemailer = require("nodemailer");

async function addUser(name, username, email, password) {
    const client = await pool.connect();
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await client.query(
            `INSERT INTO "user" (name, username, email, password)
            VALUES ($1, $2, $3, $4)`,
            [name, username, email, hashedPassword]
        );
        // console.log("Hello"+result.rows[0]);
    } finally {
        client.release();
    }
}


async function updateUser(username, avatar, location) {
    const client = await pool.connect();
    try {
        const result = await client.query(
            `UPDATE "user"
            SET avatar = $1, location = $2
            WHERE username = $3`,
            [avatar, location, username]
        );
    } finally {
        client.release();
    }
}


async function addDesc(username, description) {
    const client = await pool.connect();
    try {
        const result = await client.query(
            `UPDATE "user"
            SET userdescription = $1
            WHERE username = $2`,
            [description, username]
        );
    } finally {
        client.release();
    }
}


/*
used nodemailer in place of resend as it is not working for me needed domain name for production.
*/
// async function sendMail(email) {

//     const resend = new Resend('re_UsNHW37F_BALHnPKkzVjKummarKh7K79G');
//     const { data, error } = await resend.emails.send({
//         from: 'Acme <noreply@dribble.dev>',
//         to: [email],
//         subject: 'Hello World',
//         html: '<strong>It works!</strong>',
//     });

//     if (error) {
//         return console.error({ error });
//     }

//     console.log({ data });
// }
// re_UsNHW37F_BALHnPKkzVjKummarKh7K79G


async function Mail(email) {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'vivekshaurya77@gmail.com',
            pass: 'vddu hzlv xiaf ksbv',
        }
    });
    console.log(email);
    const mailOptions = {
        from: 'vivekshaurya77@gmail.com',
        to: [email],
        subject: 'Dribble Login confirmation',
        text: 'Thank You for loging in!',
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}



const register = (req, res) => {
    const { name, username, email, password } = req.body;
    console.log(req.body);
    addUser(name, username, email, password)
        .then(() => {
            res.status(200).json("User Created!");
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });

};

const userDescription = (req, res) => {
    const { username, description } = req.body;
    console.log(req.body);
    console.log(username, description);
    addDesc(username, description)
        .then(() => {

            res.status(200).json("Description Added!");
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
}


const create = (req, res) => {
    const { email, username, location, avatar } = req.body;
    console.log(req.body);
    console.log(email, username, avatar, location);
    updateUser(username, avatar, location)
        .then(() => {

            res.status(200).json("Avatar and Location Addded!");
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
}


const sendMail = (req, res) => {
    console.log("body" + req.body);
    const { email } = req.body;
    Mail(email);
    res.status(200).json("Confirmation Mail Sent!!");
}
module.exports = { register, create, sendMail, userDescription };
