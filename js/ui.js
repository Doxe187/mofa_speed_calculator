// UI-Update Funktionen

const elements = {
    zylinder: document.getElementById('zylinder'),
    vergaser: document.getElementById('vergaser'),
    vorne: document.getElementById('uebersetzung-vorne'),
    hinten: document.getElementById('uebersetzung-hinten'),
    auspuff: document.getElementById('auspuff'),
    speedResult: document.getElementById('speed-result'),
    warning: document.getElementById('warning'),
    warningText: document.querySelector('#warning .warning-text')
};

function updateSpeedDisplay() {
    const cylinderRaw = elements.zylinder.value;
    const cylinder = cylinderRaw === 'stock' ? 'stock' : parseInt(cylinderRaw);
    const cylinderNum = cylinderRaw === 'stock' ? 50 : cylinder;
    const carbIndex = parseInt(elements.vergaser.value);
    const front = parseInt(elements.vorne.value);
    const rear = parseInt(elements.hinten.value);
    const exhaustIndex = parseInt(elements.auspuff.value);

    const totalSpeed = calculateSpeed(cylinder, carbIndex, front, rear, exhaustIndex);
    elements.speedResult.textContent = totalSpeed;

    // Warnungen anzeigen
    const warnings = validateConfiguration(cylinderNum, carbIndex, exhaustIndex, totalSpeed);
    if (warnings.length > 0) {
        elements.warningText.innerHTML = warnings.join('<br>');
        elements.warning.classList.remove('hidden');
    } else {
        elements.warning.classList.add('hidden');
    }

    // Optionen einschränken, um unter 25 km/h zu vermeiden
    updateAvailableOptions();
}

function updateAvailableOptions() {
    const cylinderRaw = elements.zylinder.value;
    const cylinder = cylinderRaw === 'stock' ? 'stock' : parseInt(cylinderRaw);
    const carbIndex = parseInt(elements.vergaser.value);
    const front = parseInt(elements.vorne.value);
    const rear = parseInt(elements.hinten.value);
    const exhaustIndex = parseInt(elements.auspuff.value);

    // Prüfe hinteres Ritzel
    Array.from(elements.hinten.options).forEach(option => {
        const testRear = parseInt(option.value);
        const speed = calculateSpeed(cylinder, carbIndex, front, testRear, exhaustIndex);
        option.disabled = speed < 25;
    });

    // Prüfe vorderes Ritzel
    Array.from(elements.vorne.options).forEach(option => {
        const testFront = parseInt(option.value);
        const speed = calculateSpeed(cylinder, carbIndex, testFront, rear, exhaustIndex);
        option.disabled = speed < 25;
    });

    // Prüfe Vergaser
    Array.from(elements.vergaser.options).forEach(option => {
        const testCarbIndex = parseInt(option.value);
        const speed = calculateSpeed(cylinder, testCarbIndex, front, rear, exhaustIndex);
        option.disabled = speed < 25;
    });

    // Prüfe Auspuff
    Array.from(elements.auspuff.options).forEach(option => {
        const testExhaustIndex = parseInt(option.value);
        const speed = calculateSpeed(cylinder, carbIndex, front, rear, testExhaustIndex);
        option.disabled = speed < 25 || !isValidConfig(cylinder, testExhaustIndex);
    });

    // Prüfe Zylinder
    Array.from(elements.zylinder.options).forEach(option => {
        const testCylinderRaw = option.value;
        const testCylinder = testCylinderRaw === 'stock' ? 'stock' : parseInt(testCylinderRaw);
        const speed = calculateSpeed(testCylinder, carbIndex, front, rear, exhaustIndex);
        option.disabled = speed < 25 || !isValidConfig(testCylinder, exhaustIndex);
    });
}

function updateExhaustDefaults() {
    const cylinderRaw = elements.zylinder.value;
    const cylinderNum = cylinderRaw === 'stock' ? 50 : parseInt(cylinderRaw);
    const standardIndex = cylinderNum > 60 ? 2 : 1;
    const options = elements.auspuff.options;

    for (let i = 0; i < options.length; i++) {
        const base = options[i].textContent.replace(/ \(Standard\)/, '');
        options[i].textContent = i === standardIndex ? base + ' (Standard)' : base;
    }

    elements.auspuff.value = String(standardIndex);
}

function updateCarbDefault() {
    const cylinderRaw = elements.zylinder.value;
    const cylinderNum = cylinderRaw === 'stock' ? 50 : parseInt(cylinderRaw);
    const standardIndex = cylinderNum > 70 ? 3 : 0;
    const options = elements.vergaser.options;

    for (let i = 0; i < options.length; i++) {
        const base = options[i].textContent.replace(/ \(Standard\)/, '');
        options[i].textContent = i === standardIndex ? base + ' (Standard)' : base;
    }

    elements.vergaser.value = String(standardIndex);
}

function setupEventListeners() {
    elements.zylinder.addEventListener('change', () => {
        updateExhaustDefaults();
        updateCarbDefault();
        updateSpeedDisplay();
    });

    [elements.vergaser, elements.vorne, elements.hinten, elements.auspuff]
        .forEach(el => el.addEventListener('change', updateSpeedDisplay));
}
