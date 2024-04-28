package com.djinni.timediferencecalculator.dto;

import java.util.List;

public record LocationAPIResponse(
        int totalResultsCount,
        List<LocationDTO> geonames){
}
