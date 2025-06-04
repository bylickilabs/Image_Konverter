const convertButton = document.getElementById('convertButton');
const downloadButton = document.getElementById('downloadButton');
const fileInput = document.getElementById('fileInput');
const formatSelect = document.getElementById('formatSelect');
const outputDiv = document.getElementById('output');

const createIconButton = document.getElementById('createIconButton');
const downloadIconButton = document.getElementById('downloadIconButton');
const iconFileInput = document.getElementById('iconFileInput');
const iconSizeInput = document.getElementById('iconSize');
const iconOutputDiv = document.getElementById('iconOutput');

// Bildformat Umwandlung
convertButton.addEventListener('click', () => {
    const file = fileInput.files[0];
    if (!file) {
        alert('Bitte wähle eine Bilddatei aus.');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const image = new Image();
        image.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);

            const outputFormat = formatSelect.value;
            const imageData = canvas.toDataURL(outputFormat);

            outputDiv.innerHTML = `<h3>Vorschau des Bildes:</h3><img src="${imageData}" alt="Bild Vorschau" width="200" />`;

            downloadButton.style.display = 'inline';
            downloadButton.onclick = () => {
                const a = document.createElement('a');
                a.href = imageData;
                a.download = 'converted_image.' + outputFormat.split('/')[1];
                a.click();
            };
        };
        image.src = e.target.result;
    };
    reader.readAsDataURL(file);
});

// Icon Erstellen
createIconButton.addEventListener('click', () => {
    const file = iconFileInput.files[0];
    if (!file) {
        alert('Bitte wähle eine Bilddatei für das Icon aus.');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const image = new Image();
        image.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const iconSize = parseInt(iconSizeInput.value, 10);
            canvas.width = iconSize;
            canvas.height = iconSize;
            ctx.drawImage(image, 0, 0, iconSize, iconSize);

            // Für Icons speichern wir das Bild im ICO-Format
            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);

                // Vorschau des Icons anzeigen
                iconOutputDiv.innerHTML = `<h3>Vorschau des Icons:</h3><img src="${url}" alt="Icon Vorschau" width="64" />`;

                downloadIconButton.style.display = 'inline';
                downloadIconButton.onclick = () => {
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'icon.ico';
                    a.click();
                };
            }, 'image/x-icon');
        };
        image.src = e.target.result;
    };
    reader.readAsDataURL(file);
});