// Basiskonfiguration für den Geschwindigkeitsrechner
const CONFIG = {
    baseGearing: { front: 13, rear: 45 },
    baseSpeeds: {
        stock: 32,
        50: 37,
        60: 42,
        65: 50,
        70: 55,
        72: 65,
        74: 70
    },
    gearingMultiplier: { front: 3, rear: 2 },
    carbBonuses: [0, 3, 6, 9, 10, 13, 14, 17, 20],
    carbMaxIndex70cc: 5,
    exhaustStepBonus: 10,
    exhaustResoIndex: 3,
    maxCylinderForReso: 60,
    cylinders: ['stock', '50', '60', '65', '70', '72', '74'],
    frontSprockets: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    rearSprockets: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52]
};
