package com.djinni.timediferencecalculator.dto;

import java.util.Map;
import java.util.Optional;

public record LocationDTO(
    Optional<String> adminCode1,
    String lng,
    int geonameId,
    String toponymName,
    Optional<String> countryId,
    String fcl,
    Optional<Long> population,
    Optional<String> countryCode,
    String name,
    String fclName,
    Optional<Map<String, String>> adminCodes1,
    Optional<String> countryName,
    String fcodeName,
    Optional<String> adminName1,
    String lat,
    String fcode) {}
