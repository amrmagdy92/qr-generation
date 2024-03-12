function isDarkMode() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}
if (isDarkMode()) {
    document.querySelector("html").setAttribute("data-bs-theme", window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
}

// TODO: remove gradient color support for now
// TODO: check how to implement idleState
// TODO: check how to send only updates instead of the whole object
// TODO: remove the qrOptions variable as it's no longer needed

let qrOptions = {
    options: {
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
}

function validateFileSize(file) {
    if (file.size > 102400) {
        return false
    } else {
        return true
    }
}

// function mainOptionsFactory(width, height, data, margin, image) {
//     qrOptions.options.width = width
//     qrOptions.options.height = height
//     qrOptions.options.data = data
//     qrOptions.options.margin = margin
//     qrOptions.options.image = image
// }

// function dotsOptionsFactory(dotType, dotColor) {
//     qrOptions.options.dotsOptions = {
//         color: dotColor,
//         type: dotType
//     }
// }

// function cornerSquareOptionsFactory(cornerSquareType, cornerSquareColor) {
//     qrOptions.options.cornersSquareOptions = {
//         color: cornerSquareColor,
//         type: cornerSquareType
//     }
// }

// function cornerDotsOptionsFactory(style, color) {
//     qrOptions.options.cornersDotOptions = {
//         type: style,
//         color: color
//     }
// }

// function backgroundOptionsFactory() {}

// function imageOptionsFactory(hideDots, imgSize, imgMargin) {
//     qrOptions.options.imageOptions = {
//         hideBackgroundDots: hideDots,
//         imageSize: imgSize,
//         margin: imgMargin
//     }
// }

// function advQROptionsFactory(type, mode, correction) {
//     qrOptions.options.qrOptions = {
//         "typeNumber": type,
//         "mode": mode,
//         "errorCorrectionLevel": correction
//     }
// }

function qrOptionsFactory(id) {
    return new Promise((resolve, reject) => {
        let element = document.getElementById(id)
        if (Object.keys(qrOptions.options).includes(element.id)) {
            if (element.id === "image") {
                let file = document.getElementById(id).files[0]
                if (validateFileSize(file)) {
                    imgBase64(file)
                    .then( result => {
                        qrOptions["options"]["image"] = result
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
                qrOptions.options.dotsOptions.type = element.value
                resolve(JSON.stringify(qrOptions))
            } else if (element.id === "corner-square-style") {
                qrOptions.options.cornersSquareOptions.type = element.value
                resolve(JSON.stringify(qrOptions))
            } else if (element.id === "corner-dots-style") {
                qrOptions.options.cornersDotOptions.type = element.value
                resolve(JSON.stringify(qrOptions))
            } else if (element.id === "mode") {
                qrOptions.options.qrOptions.mode = element.value
                resolve(JSON.stringify(qrOptions))
            } else if (element.id === "correction-level") {
                qrOptions.options.qrOptions.errorCorrectionLevel = element.value
                resolve(JSON.stringify(qrOptions))
            } else if (element.id === "data") {
                qrOptions.options.data = element.value
                resolve(JSON.stringify(qrOptions))
            } else if (element.id === "height") {
                qrOptions.options.height = element.value
                resolve(JSON.stringify(qrOptions))
            } else if (element.id === "width") {
                qrOptions.options.width = element.value
                resolve(JSON.stringify(qrOptions))
            } else if (element.id === "margin") {
                qrOptions.options.margin = element.value
                resolve(JSON.stringify(qrOptions))
            } else if (element.id === "image-size") {
                qrOptions.options.imageOptions.imageSize = element.value
                resolve(JSON.stringify(qrOptions))
            } else if (element.id === "image-margin") {
                qrOptions.options.imageOptions.margin = element.value
                resolve(JSON.stringify(qrOptions))
            } else if (element.id === "qr-type") {
                qrOptions.options.qrOptions.typeNumber = element.value
                resolve(JSON.stringify(qrOptions))
            } else if (element.id === "hide-background") {
                qrOptions.options.imageOptions.hideBackgroundDots = element.checked
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
    qrOptionsFactory(id)
        .then( result => {
            const request = new XMLHttpRequest()
            request.open('POST', "http://127.0.0.1:5000/api/v1/qr")
            request.setRequestHeader('Content-Type', 'application/json')
            request.addEventListener('load', function(event) {
                if (request.status === 200 && request.readyState === 4) {
                    let base64Response = JSON.parse(request.response).msg
                    $("#generated-qr").attr("src", `data:image/png;base64, ${base64Response}`)
                } else {
                    // TODO: error handling
                }
            })
            request.send(result)
        })
}

function imgBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener("loadend", () => { resolve(reader.result) })
        reader.addEventListener("error", () => { reject(reader.error) })
    })
}