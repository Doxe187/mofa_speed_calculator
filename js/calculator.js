// Berechnungslogik für Geschwindigkeitsrechner

function calculateSpeed(cylinder, carbIndex, front, rear, exhaustIndex) {
    const cylinderNum = cylinder === 'stock' ? 50 : parseInt(cylinder);
    const baseSpeed = CONFIG.baseSpeeds[cylinder];

    const gearingBonus =
        (front - CONFIG.baseGearing.front) * CONFIG.gearingMultiplier.front +
        (CONFIG.baseGearing.rear - rear) * CONFIG.gearingMultiplier.rear;

    const effectiveCarbIndex = cylinderNum > 70 ? Math.min(carbIndex, CONFIG.carbMaxIndex70cc) : carbIndex;
    const carbBaseIndex = cylinderNum > 70 ? 3 : 0;
    const carbBonus = CONFIG.carbBonuses[effectiveCarbIndex] - CONFIG.carbBonuses[carbBaseIndex];

    const exhaustBaseIndex = cylinder === 'stock' ? 0 : (cylinderNum > 60 ? 2 : 1);
    const exhaustBonus = (exhaustIndex - exhaustBaseIndex) * CONFIG.exhaustStepBonus;

    return baseSpeed + gearingBonus + carbBonus + exhaustBonus;
}

function isValidConfig(cylinder, exhaustIndex) {
    const cylinderNum = cylinder === 'stock' ? 50 : parseInt(cylinder);
    // Vermeide gefährliche Kombinationen
    if (exhaustIndex === CONFIG.exhaustResoIndex && cylinderNum <= CONFIG.maxCylinderForReso) {
        return false;
    }
    if (exhaustIndex === 0 && cylinderNum >= 65) {
        return false;
    }
    return true;
}

function validateConfiguration(cylinderNum, carbIndex, exhaustIndex, speed) {
    const warnings = [];

    if (exhaustIndex === CONFIG.exhaustResoIndex && cylinderNum <= CONFIG.maxCylinderForReso) {
        warnings.push('28er Reso Auspuff auf keinen Fall mit diesem Zylinder fahren!');
    } else if (exhaustIndex === 0 && cylinderNum >= 65) {
        warnings.push('18er Auspuff auf keinen Fall mit diesem Zylinder fahren!');
    }

    if (cylinderNum <= 70 && carbIndex > CONFIG.carbMaxIndex70cc) {
        warnings.push('Ein Vergaser größer als 19 mm bringt keinen Geschwindigkeitsvorteil.');
    }

    if (speed < 25) {
        warnings.push('Diese Konfiguration ist leider nicht passend für ein Töffli (unter 25 km/h)!');
    }

    return warnings;
}

function findBestSetup(targetSpeed) {
    let bestConfig = null;
    let bestDiff = Infinity;

    for (const cylinder of CONFIG.cylinders) {
        for (let carbIndex = 0; carbIndex < CONFIG.carbBonuses.length; carbIndex++) {
            for (const front of CONFIG.frontSprockets) {
                for (const rear of CONFIG.rearSprockets) {
                    for (let exhaustIndex = 0; exhaustIndex < 4; exhaustIndex++) {
                        if (!isValidConfig(cylinder, exhaustIndex)) continue;

                        const speed = calculateSpeed(cylinder, carbIndex, front, rear, exhaustIndex);

                        // Ignoriere Konfigurationen unter 25 km/h (nicht töffli-tauglich)
                        if (speed < 25) continue;

                        const diff = Math.abs(speed - targetSpeed);

                        // Bevorzuge Konfigurationen die das Ziel leicht überschreiten
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

    return bestConfig;
}
