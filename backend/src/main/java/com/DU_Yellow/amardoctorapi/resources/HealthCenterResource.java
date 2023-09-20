package com.DU_Yellow.amardoctorapi.resources;

import com.DU_Yellow.amardoctorapi.Constant;
import com.DU_Yellow.amardoctorapi.domain.HealthCenter;
import com.DU_Yellow.amardoctorapi.domain.TimeSlot;
import com.DU_Yellow.amardoctorapi.repositories.HealthCenterRepository;
import com.DU_Yellow.amardoctorapi.services.HealthCenterService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("api/healthCenter")
public class HealthCenterResource {
    private final HealthCenterRepository hcRepository;
    public HealthCenterResource(HealthCenterRepository healthCenterRepository){
        this.hcRepository = healthCenterRepository;
    }


    @Autowired
    HealthCenterService hcService;

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

        List<Map<String, Object>> timeSlotList = (List<Map<String, Object>>) hcMap.get("time_slot");
        List<TimeSlot> timeSlots = new ArrayList<>();

        for (Map<String, Object> timeSlotMap : timeSlotList) {
            String time = (String) timeSlotMap.get("time");
            Integer maxCount = (Integer) timeSlotMap.get("max_count");

            TimeSlot timeSlot = new TimeSlot();
            timeSlot.setTime(time);
            timeSlot.setMax_count(maxCount);

            timeSlots.add(timeSlot);
        }

        HealthCenter hc = hcService.registerUser(email, password, name, contact_no, division, district, upozilla, photo, timeSlots);
        return new ResponseEntity<>(generateJWTToken(hc), HttpStatus.OK);

    }

    @GetMapping("/profile") //read
    public ResponseEntity<HealthCenter> viewProfileByToken(HttpServletRequest request) {
        Integer id = (Integer) request.getAttribute("Id");
        HealthCenter hc = hcService.viewProfileById(id);
        return new ResponseEntity<>(hc, HttpStatus.OK);
    }

    @DeleteMapping("/delete")  //delete
    public ResponseEntity<String> deleteDoctor(HttpServletRequest request){
        int id = (Integer) request.getAttribute("Id");
        hcService.delete(id);
        return new ResponseEntity<>("Profile Deleted", HttpStatus.OK);
    }







    private Map<String, String> generateJWTToken(HealthCenter hc) {
        long timestamp = System.currentTimeMillis();
        String token = Jwts.builder().signWith(SignatureAlgorithm.HS256, Constant.API_SECRET_KEY)
                .setIssuedAt(new Date(timestamp))
                .setExpiration(new Date(timestamp + Constant.TOKEN_VALIDITY))
                .claim("Id", hc.getId())
                .claim("email", hc.getEmail())
                .compact();
        Map<String, String> map = new HashMap<>();
        map.put("token", token);
        return map;
    }
}
