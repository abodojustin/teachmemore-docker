import CryptoJS from "crypto-js";


export const encrypt = (data:any) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), process.env.AES_KEY).toString();
}


export const decrypt = (data:any) => {
    const p =  (CryptoJS.AES.decrypt((data), process.env.AES_KEY));
    var decryptedData = JSON.parse(p.toString(CryptoJS.enc.Utf8));
    return decryptedData;
}