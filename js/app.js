// Hauptinitialisierung der App

document.addEventListener('DOMContentLoaded', () => {
    // Initialisiere UI
    updateExhaustDefaults();
    updateCarbDefault();
    updateSpeedDisplay();

    // Setup Event Listeners
    setupEventListeners();

    console.log('Puch Maxi Geschwindigkeitsrechner geladen');
});
