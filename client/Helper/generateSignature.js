const crypto = require("crypto");

export function generateSignature(date, accessKey, httpMethod, path, secretKey) {
    // Concatenate the required elements
    const stringToSign = `${date}${accessKey}${httpMethod.toUpperCase()}${path}`;

    // Create a signature with the secret key using HMAC-SHA1 algorithm
    const signature = crypto.createHmac("sha1", secretKey).update(stringToSign, "utf-8").digest("base64");

    return signature;
}
