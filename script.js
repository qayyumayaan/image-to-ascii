// JavaScript code to convert image to ASCII
document.getElementById('image-upload').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
        document.getElementById('preview').src = reader.result;
    };
    reader.readAsDataURL(file);
});

document.getElementById('convert-button').addEventListener('click', function () {
    const img = document.getElementById('preview');
    const asciiContainer = document.getElementById('ascii-container');
    const chars = ' .,:;i1tfLCG08@%&';

    // Clear previous ascii result
    asciiContainer.textContent = '';

    if (!img.src) {
        alert('Please select an image first.');
        return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 300;
    canvas.height = 150;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    let asciiStr = '';
    const pixelCount = canvas.width * canvas.height;
    for (let i = 0; i < pixelCount; i++) {
        const pixelIndex = i * 4;
        const brightness = 0.34 * data[pixelIndex] + 0.5 * data[pixelIndex + 1] + 0.16 * data[pixelIndex + 2];
        const charIndex = Math.min(Math.floor(brightness / 255 * chars.length), chars.length - 1);
        asciiStr += chars[charIndex];

        if (i % canvas.width === canvas.width - 1) {
            asciiStr += '\n';
        }
    }

    asciiContainer.textContent = asciiStr;
});

// Add copy to clipboard functionality
document.getElementById('copy-button').addEventListener('click', function () {
    const asciiContainer = document.getElementById('ascii-container');
    const textToCopy = asciiContainer.textContent;

    navigator.clipboard.writeText(textToCopy).then(() => {
        const copyButton = document.getElementById('copy-button');
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
            copyButton.textContent = 'Copy to Clipboard';
        }, 3000);
    }, () => {
        alert("Failed to copy. Please try again!");
    });
});