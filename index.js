function isDarkMode() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}
if (isDarkMode()) {
    document.querySelector("html").setAttribute("data-bs-theme", window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
}

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

function qrOptionsFactory(id) {
    let element = document.getElementById(id)
    if (Object.keys(qrOptions.options).includes(element.id)) {
        if (element.id == "image") {
            let file = document.getElementById(id).files[0]
            imgBase64(file)
                .then( result => {
                    qrOptions["options"]["image"] = result
                })
                .catch( error => {
                    console.log(error)
                })
        } else if (element.tagName === "select") {
            qrOptions[id] = element.value
        }
    }
    return JSON.stringify(qrOptions)
}

function fetchQR(id) {
    let generatedQROptions = qrOptionsFactory(id)
    const request = new XMLHttpRequest()
    request.open('POST', "http://127.0.0.1:5000/api/v1/qr")
    request.setRequestHeader('Content-Type', 'application/json')
    request.addEventListener('load', function(event) {
        if (request.status === 200 && request.readyState === 4) {
            let base64Response = JSON.parse(request.response).msg
            $("#image").attr("src", `data:image/png;base64, ${base64Response}`)
        } else {
            // TODO: error handling
        }
    })
    request.send(generatedQROptions)
}

function imgBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener("loadend", () => { resolve(reader.result) })
        reader.addEventListener("error", () => { reject(reader.error) })
    })
}