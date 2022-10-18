const bcrypt = require("bcrypt")
// async function hashPassword(plainText) {
//     await bcrypt.genSalt(10, async (err,salt)=>{
//         await bcrypt.hash(plainText,salt,(err,hash)=>{
//             if(!err){
//                 console.log(hash);
//                 return hash
//             }
//             throw new Error("Problem hashing password")
//         })
//     })
// }
// function verifyPassword(plainText,correctHash){
//     bcrypt.compare(plainText,correctHash,(err,result)=>{
//         if(result){
//             return true
//         }
//         return false
//     })
// }
async function hashPassword(plaintextPassword) {
    return await bcrypt.hash(plaintextPassword, 10)
}
 
// compare password
async function verifyPassword(plaintextPassword, hash) {    
    return await bcrypt.compare(plaintextPassword, hash)
}
module.exports = {hashPassword,verifyPassword}