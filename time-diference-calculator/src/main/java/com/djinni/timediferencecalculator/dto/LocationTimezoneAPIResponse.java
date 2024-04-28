package com.djinni.timediferencecalculator.dto;

public record LocationTimezoneAPIResponse(
        String sunrise,
        double lng,
        String countryCode,
        int gmtOffset,
        int rawOffset,
        String sunset,
        String timezoneId,
        int dstOffset,
        String countryName,
        String time,
        double lat
) {}
