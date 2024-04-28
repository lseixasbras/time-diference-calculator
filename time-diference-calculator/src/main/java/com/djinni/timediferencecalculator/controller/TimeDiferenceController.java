package com.djinni.timediferencecalculator.controller;

import com.djinni.timediferencecalculator.dto.LocationDTO;
import com.djinni.timediferencecalculator.dto.RequestTimeDiferenceDTO;
import com.djinni.timediferencecalculator.dto.TimeDiferenceDTO;
import com.djinni.timediferencecalculator.service.TimeDiferenceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/v1")
public class TimeDiferenceController {

    private final TimeDiferenceService timeDiferenceService;

    public TimeDiferenceController(TimeDiferenceService timeDiferenceService) {
        this.timeDiferenceService = timeDiferenceService;
    }
    @PostMapping("calculate")
    public ResponseEntity<?> login(@RequestBody RequestTimeDiferenceDTO request) {
        List<TimeDiferenceDTO> response = timeDiferenceService.calculateTimeDiference(request);
        return ResponseEntity.ok().body(response);
    }

  @GetMapping("location/{location}")
  public List<LocationDTO> login(@PathVariable("location") String location) {
        List<LocationDTO> response = timeDiferenceService.fetchLocations(location);
        return response;
    }
}
