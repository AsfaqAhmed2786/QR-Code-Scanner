const video = document.getElementById('video');
const scanButton = document.getElementById('scanButton');
const resultDiv = document.getElementById('result');

// Function to handle QR code scanning
async function scanQRCode() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        video.srcObject = stream;
        await video.play();

        const qrCodeDetector = new window.qrcode.QRCodeScanner();

        qrCodeDetector.detect(video, (result) => {
            if (result) {
                resultDiv.textContent = `QR Code Scanned: ${result}`;
                stream.getTracks().forEach(track => track.stop()); // Stop the video stream
            }
        });
    } catch (error) {
        console.error('Error accessing camera:', error);
        resultDiv.textContent = 'Error accessing camera. Please make sure you have granted camera permission.';
    }
}

// Event listener for the scan button
scanButton.addEventListener('click', scanQRCode);
