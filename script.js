let countdownInterval;

function generateQRCode() {
    let name = document.getElementById("name").value;
    let upi = document.getElementById("upi").value;
    let amount = document.getElementById("amount").value;

    if (!upi) {
        document.getElementById("qrSection").style.display = "none";
        document.getElementById("downloadQR").style.display = "none";
        document.getElementById("resetQR").style.display = "none";
        return;
    }

    let upiData = `upi://pay?pa=${upi}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR`;

    document.getElementById("qrcode").innerHTML = "";
    new QRCode(document.getElementById("qrcode"), {
        text: upiData,
        width: 220,
        height: 220
    });

    startTimer(5 * 60);

    document.getElementById("qrSection").style.display = "block";
    document.getElementById("downloadQR").style.display = "inline-block";
    document.getElementById("resetQR").style.display = "inline-block";

    // Name, UPI ID, Amount আপডেট + শো করা
    document.getElementById("qrName").textContent = name;
    document.getElementById("qrUpi").textContent = upi;
    document.getElementById("qrAmount").textContent = amount;

    document.getElementById("qrDetails").classList.remove("hidden"); // টেক্সট শো করানো
}

function startTimer(duration) {
    let timer = duration, minutes, seconds;
    clearInterval(countdownInterval);
    countdownInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        seconds = seconds < 10 ? "0" + seconds : seconds;
        document.getElementById("countdown").textContent = minutes + ":" + seconds;
        if (--timer < 0) {
            clearInterval(countdownInterval);
            location.reload();
        }
    }, 1000);
}

function downloadQRCode() {
    let qrBox = document.getElementById("qrWrapper");

    html2canvas(qrBox, { scale: 2 }).then(canvas => {
        let link = document.createElement("a");
        link.download = "Josim_Payment_QR_Code.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}

function resetQR() {
    location.reload(); // QR Data Reset & Page Reload
}