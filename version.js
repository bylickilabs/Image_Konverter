// Die lokale Version der Anwendung (diese könnte z.B. aus einer `version.json` kommen)
const localVersion = "1.0.0"; // Beispiel-Version

// URL zum GitHub Release API-Endpunkt
const githubApiUrl = "https://api.github.com/repos/bylickilabs/releases/latest";

// Überprüfe auf Updates
async function checkForUpdates() {
    try {
        const response = await fetch(githubApiUrl);
        if (!response.ok) {
            throw new Error("Fehler beim Abrufen der Releases von GitHub");
        }

        const data = await response.json();
        const latestVersion = data.tag_name; // Das neueste Release (z.B. "v1.0.1")

        // Vergleiche die Versionen
        if (localVersion !== latestVersion) {
            // Wenn eine neue Version verfügbar ist, zeige eine Benachrichtigung
            document.getElementById("updateNotification").style.display = "block";
        }
    } catch (error) {
        console.error("Fehler bei der Update-Überprüfung:", error);
    }
}

// Rufe die Funktion auf, wenn die Seite geladen wird
window.onload = checkForUpdates;