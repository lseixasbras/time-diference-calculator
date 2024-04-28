package com.djinni.timediferencecalculator.service;

import com.djinni.timediferencecalculator.dto.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static com.djinni.timediferencecalculator.utils.appConstants.*;

@Service
public class TimeDiferenceService {

    public List<TimeDiferenceDTO> calculateTimeDiference (RequestTimeDiferenceDTO request){

        List<TimeDiferenceDTO> timeDiferenceDTOList = new ArrayList<>();

        LocationTimezoneAPIResponse referenceTimeZone = fetchTimeZone(request.referenceLocation());

        for (LocationDTO loc : request.comparisonLocations()) {
            LocationTimezoneAPIResponse locTimeZone = fetchTimeZone(loc);
            int result = getTimeDifference(locTimeZone.timezoneId(), referenceTimeZone.timezoneId());
            TimeDiferenceDTO timeDiferenceDTO = new TimeDiferenceDTO(UUID.randomUUID(),loc.toponymName(),locTimeZone.timezoneId(),request.referenceLocation().toponymName(),referenceTimeZone.timezoneId(),result);
            timeDiferenceDTOList.add(timeDiferenceDTO);
        }

        return timeDiferenceDTOList;
    }

    public List<LocationDTO> fetchLocations(String name) {
        RestTemplate restTemplate = new RestTemplate();
        String url = GEO_NAMES_URL + "searchJSON?q=" + name + "&maxRows="  + GEO_RETURN_ROWS+ "&username="+ GEO_USER;
        LocationAPIResponse response = restTemplate.getForObject(url, LocationAPIResponse.class);
        return response.geonames();
    }

    public LocationTimezoneAPIResponse fetchTimeZone(LocationDTO loc) {
        RestTemplate restTemplate = new RestTemplate();
        String url = GEO_NAMES_URL + "timezoneJSON?lat=" + loc.lat() + "&lng="+loc.lng() + "&username="+ GEO_USER;
        LocationTimezoneAPIResponse response = restTemplate.getForObject(url, LocationTimezoneAPIResponse.class);
        return response;
    }

    public static int getTimeDifference(String timeZone1, String timeZone2) {
        ZoneId zone1 = ZoneId.of(timeZone1);
        ZoneId zone2 = ZoneId.of(timeZone2);

        ZonedDateTime now1 = ZonedDateTime.now(zone1);
        ZonedDateTime now2 = ZonedDateTime.now(zone2);

        // Get the offsets from UTC for each time zone
        int offset1 = zone1.getRules().getOffset(now1.toInstant()).getTotalSeconds();
        int offset2 = zone2.getRules().getOffset(now2.toInstant()).getTotalSeconds();

        // Calculate the time difference
        int timeDifference = (offset2 - offset1) / 3600; // Converting seconds to hours

        return timeDifference;
    }
}
