package com.DU_Yellow.amardoctorapi.resources;

import com.DU_Yellow.amardoctorapi.Constant;
import com.DU_Yellow.amardoctorapi.JWTUtility;
import com.DU_Yellow.amardoctorapi.domain.Doctor;
import com.DU_Yellow.amardoctorapi.domain.HealthCenter;
import com.DU_Yellow.amardoctorapi.domain.Patient;
import com.DU_Yellow.amardoctorapi.domain.TimeSlot;
import com.DU_Yellow.amardoctorapi.services.HealthCenterService;
import com.DU_Yellow.amardoctorapi.services.PatientService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.*;
@CrossOrigin
@RestController
@RequestMapping("api/healthCenter")
public class HealthCenterResource {

    JWTUtility jwtUtility = new JWTUtility();

    @Autowired
    HealthCenterService hcService;
    @Autowired
    PatientService patientService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, Object> hcMap) {
        String email = (String) hcMap.get("email");
        String password = (String) hcMap.get("password");
        HealthCenter hc = hcService.validateUser(email, password);
        return new ResponseEntity<>(generateJWTToken(hc), HttpStatus.OK);

    }

    @PostMapping("/register")  //create
    public ResponseEntity<Map<String, String>> register(@RequestBody Map<String, Object> hcMap) {
        String email = (String) hcMap.get("email");
        String password = (String) hcMap.get("password");
        String name = (String) hcMap.get("name");
        String contact_no = (String) hcMap.get("contact_no");
        String division = (String) hcMap.get("division");
        String district = (String) hcMap.get("district");
        String upozilla = (String) hcMap.get("upozilla");

        Byte[] photo = new Byte[]{};
        Object objectValue = hcMap.get("photo");
        if (objectValue instanceof Byte[]) {
            photo = (Byte[]) objectValue;
        }
        else {
            photo = null;
        }

        String jsonString = (String) hcMap.get("time_slot");

        try {
            ObjectMapper objectMapper = new ObjectMapper();

            // Use TypeReference to specify the target data structure (in this case, List)
            List<TimeSlot> timeSlots = objectMapper.readValue(jsonString, new TypeReference<List<TimeSlot>>() {});
            HealthCenter hc = hcService.registerUser(email, password, name, contact_no, division, district, upozilla, photo, timeSlots);
            return new ResponseEntity<>(generateJWTToken(hc), HttpStatus.OK);

        } catch (IOException e) {
            e.printStackTrace();
        }



//        List<Map<String, Object>> timeSlotList = (List<Map<String, Object>>) hcMap.get("time_slot");
//        List<TimeSlot> timeSlots = new ArrayList<>();
//
//        for (Map<String, Object> timeSlotMap : timeSlotList) {
//            String time = (String) timeSlotMap.get("time");
//            String maxCount = (String) timeSlotMap.get("max_count");
//
//            TimeSlot timeSlot = new TimeSlot();
//            timeSlot.setTime(time);
//            timeSlot.setMax_count(maxCount);
//
//            timeSlots.add(timeSlot);
//        }
    return null;

    }

    @GetMapping("/profile") //read
    public ResponseEntity<HealthCenter> viewProfileByToken(HttpServletRequest request) {
        Integer id = (Integer) request.getAttribute("Id");
        HealthCenter hc = hcService.getProfileById(id);
        return new ResponseEntity<>(hc, HttpStatus.OK);
    }

    @DeleteMapping("/delete")  //delete
    public ResponseEntity<String> deleteHealthCenter(HttpServletRequest request){
        int id = (Integer) request.getAttribute("Id");
        hcService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/viewProfile")
    public ResponseEntity<HealthCenter> viewProfileById(@RequestParam Integer id) {
        HealthCenter hc = hcService.getProfileById(id);
        return new ResponseEntity<>(hc, HttpStatus.OK);
    }

    @GetMapping("/healthCentersByDivision")
    public List<HealthCenter> getHealthCentersByDivision(@RequestParam String division) {
        return hcService.getHealthCenterByDivision(division);
    }

    @GetMapping("/healthCentersByDistrict")
    public List<HealthCenter> getHealthCentersByDistrict(@RequestParam String district) {
        return hcService.getHealthCenterByDistrict(district);
    }


    @GetMapping("/healthCentersByUpozilla")
    public List<HealthCenter> getHealthCentersByUpozilla(@RequestParam String upozilla) {
        return hcService.getHealthCenterByUpozilla(upozilla);
    }

    @GetMapping("/healthCenterSuggestion")
    public List<HealthCenter> getHealthCentersSuggestion(@RequestParam String jwt) {
        Integer id = (Integer) jwtUtility.getId(jwt);
        String role = "patient";
        Patient patient = patientService.getProfileById(role, id);
        return hcService.getHealthCenterSuggestion(patient);
    }


    @GetMapping("/hcByAddrss")
    public List<HealthCenter> getHealthCentersSugg(@RequestParam String div, @RequestParam String dist, @RequestParam String upo) {

        return hcService.getHealthCenterSuggestionByAddrr(div, dist, upo);
    }





    private Map<String, String> generateJWTToken(HealthCenter hc) {
        long timestamp = System.currentTimeMillis();
        String token = Jwts.builder().signWith(SignatureAlgorithm.HS256, Constant.API_SECRET_KEY)
                .setIssuedAt(new Date(timestamp))
                .setExpiration(new Date(timestamp + Constant.TOKEN_VALIDITY))
                .claim("Id", hc.getId())
                .claim("email", hc.getEmail())
                .claim("role", "health_center")
                .compact();
        Map<String, String> map = new HashMap<>();
        map.put("token", token);
        return map;
    }
}
