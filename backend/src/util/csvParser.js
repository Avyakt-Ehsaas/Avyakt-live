import fs from "fs"
import csv from "csv-parser"

const parseCsvEmails = (filePath) => {
    return new Promise((resolve,reject) => {
        const emails = []

        fs.createReadStream(filePath)
        .pipe(csv())
        .on("data",(row) => {
            if(row.email){
                emails.push(row.email.trim())
            }
        })
        .on("end", () =>  resolve(emails))
        .on("error", reject)
    })
}

export default parseCsvEmails;