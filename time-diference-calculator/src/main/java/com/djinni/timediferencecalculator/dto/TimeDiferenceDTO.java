package com.djinni.timediferencecalculator.dto;

import java.util.UUID;

public record TimeDiferenceDTO (
        UUID id,
        String comparisonLocationName,
        String comparisonLocationTimeZone,
        String referenceLocationName,
        String referenceLocationNameTimeZone,
        int timeDifference){
}