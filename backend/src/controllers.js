/** @typedef {import("express").RequestHandler} Controller*/
import { Email } from "./db/models.js"
import { emailValidationJWT, validateEmailJWT } from "./lib/jwt.js"

/** @type {Controller} */
function apiRootController(_, response) {
    response.send("API Ok!")
}

/**
 * Body proporciona un objeto { address: {String} }
 * @type {Controller}
 */
function postEmail(request, response) {
    try {
        Email.create(request.body)
        const token = emailValidationJWT(request.body.address)
        console.log("URL validación:", `http://localhost:8000/validate/${token}`)
        response.sendStatus(200)
    } catch (expception) {
        
    }
}

/** @type {Controller} */
function validateEmail(request,response) {
    const datosJWT = validateEmailJWT(request.params.jwtToken)
    console.log(datosJWT)
    //TODO
    response.sendStatus(200) // Respuesta temporal
}

export {
    apiRootController,
    postEmail,
    validateEmail
}