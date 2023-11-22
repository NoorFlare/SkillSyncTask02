document.addEventListener("DOMContentLoaded", function () {
    var sizeInput = document.getElementById("size");
    var qrSizeInputs = document.getElementsByClassName("size-input");

    // Set initial values
    for (var i = 0; i < qrSizeInputs.length; i++) {
        qrSizeInputs[i].value = sizeInput.value;
    }

    // Add event listener for size input
    sizeInput.addEventListener("input", function () {
        for (var i = 0; i < qrSizeInputs.length; i++) {
            qrSizeInputs[i].value = sizeInput.value;
        }
    });  
});

////////////////////////////////////////////////////////////////////

//generate QR Code
function generateQRCode() {
    var input     = document.getElementById("qr-input").value;
    var size      = document.getElementById("size").value;
    var logoInput = document.getElementById("logo");
    var dotMode   = document.getElementById("dot-mode").value;
    var dotColor  = document.getElementById("dot-color").value;
    var bgColor   = document.getElementById("bg-color").value;

    // Check if input is not empty
    if (input.trim() !== "") {
        // Clear existing QR code
        document.getElementById("qr-code").innerHTML = "";

        // Check if a logo is selected
        if (logoInput.files.length > 0) {
            var logoFile = logoInput.files[0];

            // Read the logo file using FileReader
            var reader = new FileReader();
            reader.onload = function (e) {
            // Create a QRCodeWithLogo instance
            var qrcode = new QRCodeStyling( {
                data: input,
                width: size,
                height: size,
                image: e.target.result, // Set the image source to the base64-encoded logo
                dotsOptions: {
                    color: dotColor,
                    type: dotMode
                },
                backgroundOptions: {
                    color: bgColor
                }
            });

            // Append the QR code to the container
            qrcode.append(document.getElementById("qr-code"));
        };

        // Read the logo file as Data URL
        reader.readAsDataURL(logoFile);
    }
    else {
            // Create a QRCodeWithLogo instance without a logo
            var qrcode = new QRCodeStyling({
                data: input,
                width: size,
                height: size,
                dotsOptions: {
                    color: dotColor,
                    type: dotMode
                },
                backgroundOptions: {
                    color: bgColor
                }
            });

            // Append the QR code to the container
            qrcode.append(document.getElementById("qr-code"));
        }
        // Show download button
        document.getElementById("download-btn").style.display = "block";
    } 
    else {
        alert("Please enter a valid text or URL.");
    }
    // Event listeners for inputs
    document.getElementById("size").addEventListener("input", generateQRCode);
    document.getElementById("logo").addEventListener("change", generateQRCode);
    document.getElementById("dot-mode").addEventListener("change", generateQRCode);
    document.getElementById("dot-color").addEventListener("input", generateQRCode);
    document.getElementById("bg-color").addEventListener("input", generateQRCode);
}

///////////////////////////////////////////////////////////////////////////////////////

// Download QR Code
function downloadQRCode() {
    // Get the canvas element
    var canvas = document.getElementById("qr-code").querySelector("canvas");

    // Get the data URL of the canvas content (default format is PNG)
    var dataURL = canvas.toDataURL();

    // Create a temporary link element
    var downloadLink = document.createElement("a");

    // Set the download link attributes
    downloadLink.href = dataURL;
    downloadLink.download = "qrcode.png";

    // Append the link to the document and trigger a click to start the download
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}


     
     
