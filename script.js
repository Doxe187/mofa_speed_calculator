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
    maxCylinderForReso: 65
};

const CARB_LABELS = ['12 mm', '14 mm', '15 mm', '17 mm', '17.5 mm', '19 mm', '19.5 mm', '21 mm', '24 mm'];
const EXHAUST_LABELS = ['18er', '22er', '28er', '28er Reso'];

const RECOMMENDATIONS = [
    { label: '35 km/h', setups: [
        { cylinder: 'stock', carb: 0, front: 13, rear: 45, exhaust: 1 }
    ]},
    { label: '40 km/h', setups: [
        { cylinder: '50', carb: 2, front: 12, rear: 45, exhaust: 1 }
    ]},
    { label: '45 km/h', setups: [
        { cylinder: '50', carb: 2, front: 13, rear: 45, exhaust: 1 }
    ]},
    { label: '50 km/h', setups: [
        { cylinder: '50', carb: 2, front: 12, rear: 45, exhaust: 2 },
        { cylinder: '65', carb: 2, front: 12, rear: 45, exhaust: 1 }
    ]},
    { label: '55–60 km/h', setups: [
        { cylinder: '50', carb: 2, front: 15, rear: 45, exhaust: 2 },
        { cylinder: '65', carb: 2, front: 12, rear: 45, exhaust: 2 },
        { cylinder: '65', carb: 3, front: 12, rear: 45, exhaust: 2 }
    ]},
    { label: '65–70 km/h', setups: [
        { cylinder: '65', carb: 2, front: 15, rear: 45, exhaust: 2 },
        { cylinder: '65', carb: 3, front: 15, rear: 45, exhaust: 2 }
    ]},
    { label: '75 km/h', setups: [
        { cylinder: '72', carb: 7, front: 15, rear: 45, exhaust: 2 }
    ]},
    { label: '80+ km/h', setups: [
        { cylinder: '74', carb: 8, front: 15, rear: 45, exhaust: 2 }
    ]}
];

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

elements.zylinder.addEventListener('change', () => {
    updateExhaustDefaults();
    updateCarbDefault();
    calculateSpeed();
});

[elements.vergaser, elements.vorne, elements.hinten, elements.auspuff]
    .forEach(el => el.addEventListener('change', calculateSpeed));

function renderRecommendations() {
    const container = document.getElementById('recommendations-list');
    container.innerHTML = RECOMMENDATIONS.map((rec, cardIdx) =>
        `<div class="rec-card">
            <div class="rec-speed-badge">${rec.label}</div>
            <div class="rec-setups">
                ${rec.setups.map((setup, setupIdx) => {
                    const cylLabel = setup.cylinder === 'stock' ? 'Original 50 ccm' : setup.cylinder + ' ccm';
                    return `<div class="rec-setup">
                        <div class="rec-setup-details">
                            <span>Zylinder: <strong>${cylLabel}</strong></span>
                            <span>Vergaser: <strong>${CARB_LABELS[setup.carb]}</strong></span>
                            <span>Übersetzung: <strong>${setup.front}/${setup.rear}</strong></span>
                            <span>Auspuff: <strong>${EXHAUST_LABELS[setup.exhaust]}</strong></span>
                        </div>
                        <button class="rec-apply-btn" data-card="${cardIdx}" data-setup="${setupIdx}">Anwenden</button>
                    </div>`;
                }).join('')}
            </div>
        </div>`
    ).join('');
}

function applySetup(setup) {
    elements.zylinder.value = setup.cylinder;
    updateExhaustDefaults();
    updateCarbDefault();
    elements.vergaser.value = String(setup.carb);
    elements.vorne.value = String(setup.front);
    elements.hinten.value = String(setup.rear);
    elements.auspuff.value = String(setup.exhaust);
    calculateSpeed();
}

document.getElementById('recommendations-list').addEventListener('click', (e) => {
    const btn = e.target.closest('.rec-apply-btn');
    if (!btn) return;
    const cardIdx = parseInt(btn.dataset.card);
    const setupIdx = parseInt(btn.dataset.setup);
    applySetup(RECOMMENDATIONS[cardIdx].setups[setupIdx]);
});

updateExhaustDefaults();
updateCarbDefault();
calculateSpeed();
renderRecommendations();
