package com.DU_Yellow.amardoctorapi.resources;


import com.DU_Yellow.amardoctorapi.Constant;
import com.DU_Yellow.amardoctorapi.domain.Doctor;
import com.DU_Yellow.amardoctorapi.domain.TimeSlot;
import com.DU_Yellow.amardoctorapi.repositories.DoctorRepository;
import com.DU_Yellow.amardoctorapi.services.DoctorService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
@CrossOrigin
@RestController
@RequestMapping("api/doctor")
public class DoctorResource {
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

        List<Map<String, Object>> timeSlotList = (List<Map<String, Object>>) doctorMap.get("time_slot");
        List<TimeSlot> timeSlots = new ArrayList<>();

        for (Map<String, Object> timeSlotMap : timeSlotList) {
            String time = (String) timeSlotMap.get("time");
            String maxCount = (String) timeSlotMap.get("max_count");

            TimeSlot timeSlot = new TimeSlot();
            timeSlot.setTime(time);
            timeSlot.setMax_count(maxCount);

            timeSlots.add(timeSlot);
        }

        Doctor doctor = doctorService.registerUser(email, password, name, contact_no, doctor_type, department, designation, institution, degrees, chamber_location, bmdc_registration_no, bmdc_registration_year, bio, photo, timeSlots);
        return new ResponseEntity<>(generateJWTToken(doctor), HttpStatus.OK);

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
    public List<Doctor> getDoctorsByDepartment(@RequestParam String type, @RequestParam String departmentName) {
        return doctorService.findDoctorsByDepartment(type, departmentName);
    }

    @GetMapping("/timeSlot") //read
    public ResponseEntity<List<TimeSlot>> getTimeSlotByJWT(HttpServletRequest request) {
        Integer id = (Integer) request.getAttribute("Id");
        String role = (String) request.getAttribute("role");
        List<TimeSlot> timeSlots = doctorService.getTimeSlotById(role, id);
        return new ResponseEntity<>(timeSlots, HttpStatus.OK);
    }

    @GetMapping("/timeSlotById") //read
    public ResponseEntity<List<TimeSlot>> getTimeSlotByJWT(HttpServletRequest request, @RequestParam Integer id) {
        //Integer user_id = (Integer) request.getAttribute("Id");
        String role = (String) request.getAttribute("role");
        List<TimeSlot> timeSlots = doctorService.getTimeSlotById(role, id);
        return new ResponseEntity<>(timeSlots, HttpStatus.OK);
    }

    @GetMapping("/departmentSuggestion") //read
    public ResponseEntity<String> getDepartmentSuggestion(HttpServletRequest request, @RequestBody Map<String, String> problem) {
        String role = (String) request.getAttribute("role");
        String problem_desc = (String) problem.get("problem");
        String suggestion = doctorService.getDepartmentSuggestion(role, problem_desc);
        return new ResponseEntity<>(suggestion, HttpStatus.OK);
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
