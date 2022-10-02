/*
    controller file, edit this file to write your controller
*/

import config from "../configs/index.js"
import models from "../models/index.js"

export default {
    markContact: async (req, res, next) => {
        try {
            const dataContact = req.body.contact
            if(dataContact === null || dataContact === undefined) {
                return config.response(res, 400, [
                    {
                        filed : "contact",
                        message : "contact can't null or undefined"
                    }
                ])
            } else if(!Array.isArray(dataContact)) {
                return config.response(res, 400, [
                    {
                        filed : "contact",
                        message : "contact must be array"
                    }
                ])
            }

            for(const i in dataContact) {
                const findNumber = await models.markContact.findOne({ number : dataContact[i].number })
                if(findNumber === null) {
                    await models.markContact.create({
                        number : dataContact[i].number,
                        marked : dataContact[i].name
                    })
                } else {
                    let markArray = []
                    for(const l in findNumber.marked) {
                        if(findNumber.marked[l].toLowerCase() !== dataContact[i].name.toLowerCase()) {
                            markArray.push(findNumber.marked[l])
                        }
                    }

                    markArray.push(dataContact[i].name)
                    await models.markContact.updateOne({ number : findNumber.number }, {
                        marked : markArray
                    })
                }
            }
            
            config.response(res, 200, "success")
        } catch (error) {
            config.response(res, 400, error.message)
        }
    },

    findNumber : async (req, res, next) => {
        try {
            const searchNumber = req.body.number
            if(searchNumber === null || searchNumber === undefined) {
                return config.response(res, 400, [
                    {
                        filed : "number",
                        message : "number can't null or undefined"
                    }
                ])
            }

            const findNumbers = await models.markContact.findOne({ number : searchNumber }) 
            console.log("findNumbers" , findNumbers);
            if(findNumbers !== null) {
                config.response(res, 200, null, findNumbers)
            } else {
                config.response(res, 404, [
                    {
                        filed : "number",
                        message : `data with number ${searchNumber} not found in our database.`
                    }
                ])
            }
        } catch (error) {
            config.response(res, 400, error.message)
        }
    }
}
