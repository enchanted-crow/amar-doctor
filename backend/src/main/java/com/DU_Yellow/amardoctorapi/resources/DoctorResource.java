package com.DU_Yellow.amardoctorapi.resources;


import com.DU_Yellow.amardoctorapi.Constant;
import com.DU_Yellow.amardoctorapi.domain.Doctor;
import com.DU_Yellow.amardoctorapi.repositories.DoctorRepository;
import com.DU_Yellow.amardoctorapi.services.DoctorService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("api/doctor")
public class DoctorResource {
    private final DoctorRepository doctorRepository;
    public DoctorResource(DoctorRepository doctorRepository){
        this.doctorRepository = doctorRepository;
    }


    @Autowired
    DoctorService doctorService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginDoctor(@RequestBody Map<String, Object> doctorMap) {
        String email = (String) doctorMap.get("email");
        String password = (String) doctorMap.get("password");
        Doctor doctor = doctorService.validateUser(email, password);
        return new ResponseEntity<>(generateJWTToken(doctor), HttpStatus.OK);

    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registeDoctor(@RequestBody Map<String, Object> doctorMap) {
        String email = (String) doctorMap.get("email");
        String password = (String) doctorMap.get("password");
        Doctor doctor = doctorService.registerUser(email, password);
        System.out.println(doctor);
        return new ResponseEntity<>(generateJWTToken(doctor), HttpStatus.OK);

    }

    private Map<String, String> generateJWTToken(Doctor doctor) {
        long timestamp = System.currentTimeMillis();
        String token = Jwts.builder().signWith(SignatureAlgorithm.HS256, Constant.API_SECRET_KEY)
                .setIssuedAt(new Date(timestamp))
                .setExpiration(new Date(timestamp + Constant.TOKEN_VALIDITY))
                .claim("Id", doctor.getId())
                .claim("email", doctor.getEmail())
                .compact();
        Map<String, String> map = new HashMap<>();
        map.put("token", token);
        return map;
    }

}
