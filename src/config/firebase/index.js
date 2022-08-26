const admin = require("firebase-admin");
const uuid = require("uuid")

const serviceAccount = require("../../Private/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const keyRandom = () => {
    const newUuid = uuid.v4()
    return newUuid
}

module.exports = { admin, keyRandom }