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
    // TODO: getElementById and based on the tag type, extract the value
    // TODO: update qrOptions based on the id and value
    // TODO: After changing the value return the updated options
    return JSON.stringify(qrOptions)
}

function fetchQR() {
    let qrOptions = qrOptionsFactory() // TODO: check how to pass the id to this function from fetchQR
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
    request.send(qrOptions)
}

// TODO: Add event listeners to all elements with editable class and use fetchQR() as the function to be executed