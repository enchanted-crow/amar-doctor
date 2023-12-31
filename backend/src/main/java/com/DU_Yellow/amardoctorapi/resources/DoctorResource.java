package com.DU_Yellow.amardoctorapi.resources;


import com.DU_Yellow.amardoctorapi.Constant;
import com.DU_Yellow.amardoctorapi.JWTUtility;
import com.DU_Yellow.amardoctorapi.domain.Doctor;
import com.DU_Yellow.amardoctorapi.domain.TimeSlot;
import com.DU_Yellow.amardoctorapi.services.DoctorService;
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
@RequestMapping("api/doctor")
public class DoctorResource {
    JWTUtility jwtUtility = new JWTUtility();

    @Autowired
    DoctorService doctorService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, Object> doctorMap) {
        String email = (String) doctorMap.get("email");
        String password = (String) doctorMap.get("password");
        Doctor doctor = doctorService.validateUser(email, password);
        return new ResponseEntity<>(generateJWTToken(doctor), HttpStatus.OK);

    }

    @PostMapping("/register")  //create
    public ResponseEntity<Map<String, String>> register(@RequestBody Map<String, Object> doctorMap) {
        String email = (String) doctorMap.get("email");
        String password = (String) doctorMap.get("password");
        String name = (String) doctorMap.get("name");
        String contact_no = (String) doctorMap.get("contact_no");
        String doctor_type = (String) doctorMap.get("doctor_type");
        String department = (String) doctorMap.get("department");
        String designation = (String) doctorMap.get("designation");
        String institution = (String) doctorMap.get("institution");
        String degrees = (String) doctorMap.get("degrees");
        String chamber_location = (String) doctorMap.get("chamber_location");

        String bmdc_registration_no = (String) doctorMap.get("bmdc_registration_no");
        String bmdc_registration_year = (String) doctorMap.get("bmdc_registration_year");

        String bio = (String) doctorMap.get("bio");

        Byte[] photo = new Byte[]{};
        Object objectValue = doctorMap.get("photo");
        if (objectValue instanceof Byte[]) {
            photo = (Byte[]) objectValue;
        }
        else {
            photo = null;
        }

        String jsonString = (String) doctorMap.get("time_slot");

        try {
            ObjectMapper objectMapper = new ObjectMapper();

            // Use TypeReference to specify the target data structure (in this case, List)
            List<TimeSlot> timeSlots = objectMapper.readValue(jsonString, new TypeReference<List<TimeSlot>>() {});
            Doctor doctor = doctorService.registerUser(email, password, name, contact_no, doctor_type, department, designation, institution, degrees, chamber_location, bmdc_registration_no, bmdc_registration_year, bio, photo, timeSlots);
            return new ResponseEntity<>(generateJWTToken(doctor), HttpStatus.OK);

        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;

    }

    @GetMapping("/profile") //read
    public ResponseEntity<Doctor> viewProfileByToken(HttpServletRequest request) {
        Integer id = (Integer) request.getAttribute("Id");
        Doctor doctor = doctorService.getProfileById(id);
        return new ResponseEntity<>(doctor, HttpStatus.OK);
    }

    @DeleteMapping("/delete")  //delete
    public ResponseEntity<String> delete(HttpServletRequest request){
        int id = (Integer) request.getAttribute("Id");
        doctorService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/viewProfile")
    public ResponseEntity<Doctor> viewProfileById(@RequestParam Integer id) {
        Doctor doctor = doctorService.getProfileById(id);
        return new ResponseEntity<>(doctor, HttpStatus.OK);
    }

    @GetMapping("/types")
    public List<String> getAllTypes() {
        return doctorService.getAllTypes();
    }

    @GetMapping("/departmentsByType")
    public List<String> getDepartmentsByType(@RequestParam String type) {
        return doctorService.getDepartmentsByType(type);
    }


    @GetMapping("/doctorsByDepartmentAndType")
    public List<Doctor> getDoctorsByDepartment(@RequestParam String type, @RequestParam String dept) {
        return doctorService.findDoctorsByDepartment(type, dept);
    }

    @GetMapping("/timeSlot") //read
    public ResponseEntity<List<TimeSlot>> getTimeSlotByJWT(@RequestParam String jwt) {
        Integer id = (Integer) jwtUtility.getId(jwt);
        String role = "doctor";
        List<TimeSlot> timeSlots = doctorService.getTimeSlotById(role, id);
        return new ResponseEntity<>(timeSlots, HttpStatus.OK);
    }

    @GetMapping("/timeSlotById") //read
    public ResponseEntity<List<TimeSlot>> getTimeSlotByJWT(@RequestParam Integer id) {
        //Integer user_id = (Integer) request.getAttribute("Id");
        String role = "doctor";
        List<TimeSlot> timeSlots = doctorService.getTimeSlotById(role, id);
        return new ResponseEntity<>(timeSlots, HttpStatus.OK);
    }



    @GetMapping("/departmentSuggestion") //read
    public String getDepartmentSuggestion(@RequestParam String problem) {
        //String role = (String) request.getAttribute("role");
        String role = "patient";
        //String problem_desc = (String) problem.get("problem");
        String suggestion = doctorService.getDepartmentSuggestion(role, problem);
        return suggestion;
    }




    private Map<String, String> generateJWTToken(Doctor doctor) {
        long timestamp = System.currentTimeMillis();
        String token = Jwts.builder().signWith(SignatureAlgorithm.HS256, Constant.API_SECRET_KEY)
                .setIssuedAt(new Date(timestamp))
                .setExpiration(new Date(timestamp + Constant.TOKEN_VALIDITY))
                .claim("Id", doctor.getId())
                .claim("email", doctor.getEmail())
                .claim("role", "doctor")
                .compact();
        Map<String, String> map = new HashMap<>();
        map.put("token", token);
        return map;
    }

}
