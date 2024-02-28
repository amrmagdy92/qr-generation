function fetchQR() {
    let qrOptions = JSON.stringify({
        "options": {
            "width": 300,
            "height": 300,
            "data": "https://www.facebook.com/",
            "image": "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
            "dotsOptions": {
                "color": "#4267b2",
                "type": "rounded"
            },
            "backgroundOptions": {
                "color": "#e9ebee"
            },
            "imageOptions": {
                "crossOrigin": "anonymous",
                "margin": 20
            }
        }
    })
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