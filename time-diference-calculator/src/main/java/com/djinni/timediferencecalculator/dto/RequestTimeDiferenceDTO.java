package com.djinni.timediferencecalculator.dto;

import java.util.List;

public record RequestTimeDiferenceDTO (
        List<LocationDTO> comparisonLocations,
        LocationDTO referenceLocation){
}