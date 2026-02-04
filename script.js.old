const CONFIG = {
    baseGearing: { front: 13, rear: 45 },
    baseSpeeds: {
        stock: 30,
        50: 40,
        60: 45,
        65: 50,
        70: 55,
        72: 60,
        74: 70
    },
    gearingMultiplier: { front: 5, rear: 2 },
    carbBonuses: [0, 3, 6, 9, 10, 13, 14, 17, 20],
    carbMaxIndex70cc: 5,
    exhaustStepBonus: 4,
    exhaustResoIndex: 3,
    maxCylinderForReso: 65,
    cylinders: ['stock', '50', '60', '65', '70', '72', '74'],
    frontSprockets: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    rearSprockets: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52]
};

let isAutoSuggesting = false;

const elements = {
    zylinder: document.getElementById('zylinder'),
    vergaser: document.getElementById('vergaser'),
    vorne: document.getElementById('uebersetzung-vorne'),
    hinten: document.getElementById('uebersetzung-hinten'),
    auspuff: document.getElementById('auspuff'),
    speedResult: document.getElementById('speed-result'),
    warning: document.getElementById('warning'),
    warningText: document.querySelector('#warning .warning-text'),
    targetSpeed: document.getElementById('target-speed'),
    targetDifference: document.getElementById('target-difference'),
    differenceText: document.getElementById('difference-text')
};

function calculateSpeed() {
    const cylinderRaw = elements.zylinder.value;
    const cylinder = cylinderRaw === 'stock' ? 'stock' : parseInt(cylinderRaw);
    const cylinderNum = cylinderRaw === 'stock' ? 50 : cylinder;
    const carbIndex = parseInt(elements.vergaser.value);
    const front = parseInt(elements.vorne.value);
    const rear = parseInt(elements.hinten.value);
    const exhaustIndex = parseInt(elements.auspuff.value);

    const baseSpeed = CONFIG.baseSpeeds[cylinder];

    const gearingBonus =
        (front - CONFIG.baseGearing.front) * CONFIG.gearingMultiplier.front +
        (CONFIG.baseGearing.rear - rear) * CONFIG.gearingMultiplier.rear;

    const effectiveCarbIndex = cylinderNum > 70 ? Math.min(carbIndex, CONFIG.carbMaxIndex70cc) : carbIndex;
    const carbBaseIndex = cylinderNum > 70 ? 3 : 0;
    const carbBonus = CONFIG.carbBonuses[effectiveCarbIndex] - CONFIG.carbBonuses[carbBaseIndex];

    const exhaustBaseIndex = cylinderNum > 60 ? 2 : 1;
    const exhaustBonus = (exhaustIndex - exhaustBaseIndex) * CONFIG.exhaustStepBonus;

    const totalSpeed = baseSpeed + gearingBonus + carbBonus + exhaustBonus;

    elements.speedResult.textContent = totalSpeed;

    // Target speed comparison
    const targetSpeed = parseInt(elements.targetSpeed.value);
    if (targetSpeed && targetSpeed > 0) {
        const difference = totalSpeed - targetSpeed;
        if (difference >= 0) {
            elements.differenceText.innerHTML = `<span class="success-icon">✓</span> Ziel erreicht! <strong>+${difference} km/h</strong> über Wunschgeschwindigkeit`;
            elements.targetDifference.className = 'target-difference success';
        } else {
            elements.differenceText.innerHTML = `<span class="error-icon">✗</span> Noch <strong>${Math.abs(difference)} km/h</strong> bis zur Wunschgeschwindigkeit`;
            elements.targetDifference.className = 'target-difference error';
        }
        elements.targetDifference.classList.remove('hidden');
    } else {
        elements.targetDifference.classList.add('hidden');
    }

    const warnings = [];
    if (exhaustIndex === CONFIG.exhaustResoIndex && cylinderNum <= CONFIG.maxCylinderForReso) {
        warnings.push('28er Reso Auspuff auf keinen Fall mit diesem Zylinder fahren!');
    } else if (exhaustIndex === 0 && cylinderNum >= 65) {
        warnings.push('18er Auspuff auf keinen Fall mit diesem Zylinder fahren!');
    }
    if (cylinderNum <= 70 && carbIndex > CONFIG.carbMaxIndex70cc) {
        warnings.push('Ein Vergaser größer als 19 mm bringt keinen Geschwindigkeitsvorteil.');
    }
    const warningMsg = warnings.join('<br>');

    if (warningMsg) {
        elements.warningText.innerHTML = warningMsg;
        elements.warning.classList.remove('hidden');
    } else {
        elements.warning.classList.add('hidden');
    }
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

function calculateSpeedForConfig(cylinder, carbIndex, front, rear, exhaustIndex) {
    const cylinderNum = cylinder === 'stock' ? 50 : parseInt(cylinder);
    const baseSpeed = CONFIG.baseSpeeds[cylinder];

    const gearingBonus =
        (front - CONFIG.baseGearing.front) * CONFIG.gearingMultiplier.front +
        (CONFIG.baseGearing.rear - rear) * CONFIG.gearingMultiplier.rear;

    const effectiveCarbIndex = cylinderNum > 70 ? Math.min(carbIndex, CONFIG.carbMaxIndex70cc) : carbIndex;
    const carbBaseIndex = cylinderNum > 70 ? 3 : 0;
    const carbBonus = CONFIG.carbBonuses[effectiveCarbIndex] - CONFIG.carbBonuses[carbBaseIndex];

    const exhaustBaseIndex = cylinderNum > 60 ? 2 : 1;
    const exhaustBonus = (exhaustIndex - exhaustBaseIndex) * CONFIG.exhaustStepBonus;

    return baseSpeed + gearingBonus + carbBonus + exhaustBonus;
}

function isValidConfig(cylinder, exhaustIndex) {
    const cylinderNum = cylinder === 'stock' ? 50 : parseInt(cylinder);
    // Avoid dangerous combinations
    if (exhaustIndex === CONFIG.exhaustResoIndex && cylinderNum <= CONFIG.maxCylinderForReso) {
        return false;
    }
    if (exhaustIndex === 0 && cylinderNum >= 65) {
        return false;
    }
    return true;
}

function suggestSetup(targetSpeed) {
    if (!targetSpeed || targetSpeed <= 0 || isAutoSuggesting) return;

    let bestConfig = null;
    let bestDiff = Infinity;

    // Try to find the best configuration
    for (const cylinder of CONFIG.cylinders) {
        for (let carbIndex = 0; carbIndex < CONFIG.carbBonuses.length; carbIndex++) {
            for (const front of CONFIG.frontSprockets) {
                for (const rear of CONFIG.rearSprockets) {
                    for (let exhaustIndex = 0; exhaustIndex < 4; exhaustIndex++) {
                        if (!isValidConfig(cylinder, exhaustIndex)) continue;

                        const speed = calculateSpeedForConfig(cylinder, carbIndex, front, rear, exhaustIndex);
                        const diff = Math.abs(speed - targetSpeed);

                        // Prefer configurations that slightly exceed target over those that fall short
                        const adjustedDiff = speed >= targetSpeed ? diff : diff + 2;

                        if (adjustedDiff < bestDiff) {
                            bestDiff = adjustedDiff;
                            bestConfig = { cylinder, carbIndex, front, rear, exhaustIndex, speed };
                        }
                    }
                }
            }
        }
    }

    if (bestConfig) {
        isAutoSuggesting = true;
        elements.zylinder.value = bestConfig.cylinder;
        updateExhaustDefaults();
        updateCarbDefault();
        elements.vergaser.value = String(bestConfig.carbIndex);
        elements.vorne.value = String(bestConfig.front);
        elements.hinten.value = String(bestConfig.rear);
        elements.auspuff.value = String(bestConfig.exhaustIndex);
        isAutoSuggesting = false;
        calculateSpeed();
    }
}

elements.zylinder.addEventListener('change', () => {
    updateExhaustDefaults();
    updateCarbDefault();
    calculateSpeed();
});

[elements.vergaser, elements.vorne, elements.hinten, elements.auspuff]
    .forEach(el => el.addEventListener('change', calculateSpeed));

elements.targetSpeed.addEventListener('input', () => {
    const targetSpeed = parseInt(elements.targetSpeed.value);
    if (targetSpeed && targetSpeed > 0) {
        suggestSetup(targetSpeed);
    } else {
        calculateSpeed();
    }
});

updateExhaustDefaults();
updateCarbDefault();
calculateSpeed();
