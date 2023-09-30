package com.DU_Yellow.amardoctorapi.resources;

import com.DU_Yellow.amardoctorapi.Constant;
import com.DU_Yellow.amardoctorapi.domain.Patient;
import com.DU_Yellow.amardoctorapi.services.PatientService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("api/patient")
public class PatientResource {

    @Autowired
    PatientService patientService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, Object> patientMap) {
        String email = (String) patientMap.get("email");
        String password = (String) patientMap.get("password");
        Patient patient = patientService.validateUser(email, password);

        return new ResponseEntity<>(generateJWTToken(patient), HttpStatus.OK);

    }

    @PostMapping("/register")  //create
    public ResponseEntity<Map<String, String>> register(@RequestBody Map<String, Object> patientMap) {
        String email = (String) patientMap.get("email");
        String password = (String) patientMap.get("password");
        String name = (String) patientMap.get("name");
        String dob = (String) patientMap.get("dob");
        String sex = (String) patientMap.get("sex");
        String blood_group = (String) patientMap.get("blood_group");
        String contact_no = (String) patientMap.get("contact_no");
        String division = (String) patientMap.get("division");
        String district = (String) patientMap.get("district");
        String upozilla = (String) patientMap.get("upozilla");

        Byte[] photo = new Byte[]{};
        Object objectValue = patientMap.get("photo");
        if (objectValue instanceof Byte[]) {
            photo = (Byte[]) objectValue;
        }
        else {
            photo = null;
        }

        Patient patient = patientService.registerUser(email,password,name,dob,sex,blood_group,contact_no,division,district,upozilla,photo);
        return new ResponseEntity<>(generateJWTToken(patient), HttpStatus.OK);

    }

    @GetMapping("/profile") //read
    public ResponseEntity<Patient> viewProfileByToken(HttpServletRequest request) {
        Integer id = (Integer) request.getAttribute("Id");
        String role = (String) request.getAttribute("role");
        Patient patient = patientService.getProfileById(role, id);
        return new ResponseEntity<>(patient, HttpStatus.OK);
    }


    @DeleteMapping("/delete")  //delete
    public ResponseEntity<String> delete(HttpServletRequest request){
        int id = (Integer) request.getAttribute("Id");
        patientService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/viewProfile") //by doctors and hc and patient
    public ResponseEntity<Patient> viewProfileById(HttpServletRequest request, @RequestParam Integer id) {
        String role = (String) request.getAttribute("role");

        Patient patient = patientService.getProfileById(role, id);
        return new ResponseEntity<>(patient, HttpStatus.OK);
    }



    private Map<String, String> generateJWTToken(Patient patient) {
        long timestamp = System.currentTimeMillis();
        String token = Jwts.builder().signWith(SignatureAlgorithm.HS256, Constant.API_SECRET_KEY)
                .setIssuedAt(new Date(timestamp))
                .setExpiration(new Date(timestamp + Constant.TOKEN_VALIDITY))
                .claim("Id", patient.getId())
                .claim("email", patient.getEmail())
                .claim("role", "patient")
                .compact();
        Map<String, String> map = new HashMap<>();
        map.put("token", token);
        return map;
    }

}
