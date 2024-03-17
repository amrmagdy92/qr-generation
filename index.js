function isDarkMode() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}
if (isDarkMode()) {
    document.querySelector("html").setAttribute("data-bs-theme", window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
}

// TODO: implement download functionality

let qrOptions = {
    "width": 300,
    "height": 300,
    "data": "https://www.linkedin.com/in/amaa/",
    "margin": 0,
    "qrOptions": {
        "typeNumber": "0",
        "mode": "Byte",
        "errorCorrectionLevel": "H"
    },
    "imageOptions": {
        "hideBackgroundDots": true,
        "imageSize": 0.2,
        "margin": 0
    },
    "dotsOptions": {
        "type": "dots",
        "color": "#0a66c2"
    },
    "backgroundOptions": {
        "color": "#ffffff"
    },
    "image": "",
    "dotsOptionsHelper": {
        "colorType": {
            "single": true,
            "gradient": false
        },
        "gradient": {
            "linear": true,
            "radial": false,
            "color1": "#6a1a4c",
            "color2": "#6a1a4c",
            "rotation": "0"
        }
    },
    "cornersSquareOptions": {
        "type": "dot",
        "color": "#0a66c2"
    },
    "cornersSquareOptionsHelper": {
        "colorType": {
            "single": true,
            "gradient": false
        },
        "gradient": {
            "linear": true,
            "radial": false,
            "color1": "#000000",
            "color2": "#000000",
            "rotation": "0"
        }
    },
    "cornersDotOptions": {
        "type": "",
        "color": "#000000"
    },
    "cornersDotOptionsHelper": {
        "colorType": {
            "single": true,
            "gradient": false
        },
        "gradient": {
            "linear": true,
            "radial": false,
            "color1": "#000000",
            "color2": "#000000",
            "rotation": "0"
        }
    },
    "backgroundOptionsHelper": {
        "colorType": {
            "single": true,
            "gradient": false
        },
        "gradient": {
            "linear": true,
            "radial": false,
            "color1": "#ffffff",
            "color2": "#ffffff",
            "rotation": "0"
        }
    }
}

function validateFileSize(file) {
    if (file.size > 102400) {
        return false
    } else {
        return true
    }
}

function qrOptionsFactory(id) {
    return new Promise((resolve, reject) => {
        let element = document.getElementById(id)
        if (Object.keys(qrOptions).includes(element.id)) {
            if (element.id === "image") {
                let file = document.getElementById(id).files[0]
                if (validateFileSize(file)) {
                    imgBase64(file)
                    .then( result => {
                        qrOptions["image"] = result
                        resolve(JSON.stringify(qrOptions))
                    })
                    .catch( error => {
                        reject(error)
                    })
                } else {
                    alert("Image file should be less than or equal to 100 KB")
                    element.value = null
                }
            } else if (element.id === "dots-style") {
                qrOptions.dotsOptions.type = element.value
                resolve(JSON.stringify(qrOptions))
            } else if (element.id === "corner-square-style") {
                qrOptions.cornersSquareOptions.type = element.value
                resolve(JSON.stringify(qrOptions))
            } else if (element.id === "corner-dots-style") {
                qrOptions.cornersDotOptions.type = element.value
                resolve(JSON.stringify(qrOptions))
            } else if (element.id === "mode") {
                qrOptions.qrOptions.mode = element.value
                resolve(JSON.stringify(qrOptions))
            } else if (element.id === "correction-level") {
                qrOptions.qrOptions.errorCorrectionLevel = element.value
                resolve(JSON.stringify(qrOptions))
            } else if (element.id === "data") {
                qrOptions.data = element.value
                resolve(JSON.stringify(qrOptions))
            } else if (element.id === "height") {
                qrOptions.height = element.value
                resolve(JSON.stringify(qrOptions))
            } else if (element.id === "width") {
                qrOptions.width = element.value
                resolve(JSON.stringify(qrOptions))
            } else if (element.id === "margin") {
                qrOptions.margin = element.value
                resolve(JSON.stringify(qrOptions))
            } else if (element.id === "image-size") {
                qrOptions.imageOptions.imageSize = element.value
                resolve(JSON.stringify(qrOptions))
            } else if (element.id === "image-margin") {
                qrOptions.imageOptions.margin = element.value
                resolve(JSON.stringify(qrOptions))
            } else if (element.id === "qr-type") {
                qrOptions.qrOptions.typeNumber = element.value
                resolve(JSON.stringify(qrOptions))
            } else if (element.id === "hide-background") {
                qrOptions.imageOptions.hideBackgroundDots = element.checked
                resolve(JSON.stringify(qrOptions))
            }
        }
    })
}

document.getElementById("data").addEventListener("change", fetchQR("data"))
document.getElementById("dots-style").addEventListener("change", fetchQR("dots-style"))
document.getElementById("corner-square-style").addEventListener("change", fetchQR("corner-square-style"))
document.getElementById("corner-dots-style").addEventListener("change", fetchQR("corner-dots-style"))
document.getElementById("mode").addEventListener("change", fetchQR("mode"))
document.getElementById("correction-level").addEventListener("change", fetchQR("correction-level"))
document.getElementById("height").addEventListener("change", fetchQR("height"))
document.getElementById("width").addEventListener("change", fetchQR("width"))
document.getElementById("margin").addEventListener("change", fetchQR("margin"))
document.getElementById("image-size").addEventListener("change", fetchQR("image-size"))
document.getElementById("image-margin").addEventListener("change", fetchQR("image-margin"))
document.getElementById("qr-type").addEventListener("change", fetchQR("qr-type"))
document.getElementById("hide-background").addEventListener("change", fetchQR("hide-background"))

function fetchQR(id) {
    if (document.readyState == "complete") {
        qrOptionsFactory(id)
        .then( result => {
            const request = new XMLHttpRequest()
            request.withCredentials = true
            request.open('POST', "https://qr-generator-sqpd.onrender.com/api/v1/qr")
            request.setRequestHeader('Content-Type', 'application/json')
            request.addEventListener('load', function(event) {
                if (request.status === 200 && request.readyState === 4) {
                    let base64Response = JSON.parse(request.response).msg
                    $("#generated-qr").attr("src", `data:image/png;base64, ${base64Response}`)
                } else {
                    if (request.status == 400 && request.readyState === 4) {
                        console.log(request.response)
                        // TODO: Add proper error handling
                    }
                }
            })
            request.send(result)
        })
    }
}

function imgBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener("loadend", () => { resolve(reader.result) })
        reader.addEventListener("error", () => { reject(reader.error) })
    })
}

function removeSession(event) {
    event.preventDefault()
    event.returnValue = true
    const request = new XMLHttpRequest()
    request.withCredentials = true
    request.open('DELETE', "https://qr-generator-sqpd.onrender.com//api/v1/qr")
    request.setRequestHeader('Content-Type', 'application/json')
    request.addEventListener('load', function(event) {
        if (request.status === 200 && request.readyState === 4) {
            console.log(request.response)
        } else {
            if (request.status == 400 && request.readyState === 4) {
                console.log(request.response)
                // TODO: Add proper error handling
            }
        }
    })
    request.send()
}

window.addEventListener("beforeunload", (event) => {
    removeSession(event)
})