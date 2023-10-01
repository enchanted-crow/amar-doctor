package com.DU_Yellow.amardoctorapi.resources;

import com.DU_Yellow.amardoctorapi.JWTUtility;
import com.DU_Yellow.amardoctorapi.domain.*;
import com.DU_Yellow.amardoctorapi.repositories.*;
import com.DU_Yellow.amardoctorapi.services.*;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("api/appointment")
public class AppointmentResource {
    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final ProblemRepository problemRepository;
    private final DoctorRepository doctorRepository;
    private final HealthCenterRepository healthCenterRepository;
    private final PrescriptionRepository prescriptionRepository;

    private JWTUtility jwtUtility = new JWTUtility();

    public AppointmentResource(AppointmentRepository appointmentRepository, PatientRepository patientRepository, ProblemRepository problemRepository, DoctorRepository doctorRepository, HealthCenterRepository healthCenterRepository, PrescriptionRepository prescriptionRepository) {
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
        this.problemRepository = problemRepository;
        this.doctorRepository = doctorRepository;
        this.healthCenterRepository = healthCenterRepository;
        this.prescriptionRepository = prescriptionRepository;
    }

    @Autowired
    AppointmentService appointmentService;
    @Autowired
    PatientService patientService;
    @Autowired
    ProblemService problemService;
    @Autowired
    DoctorService doctorService;
    @Autowired
    HealthCenterService healthCenterService;
    @Autowired
    PrescriptionService prescriptionService;

    @PostMapping("/create")  //create
    public ResponseEntity<Integer> createApppointment(@RequestParam String jwt, @RequestBody Map<String, Object> appointmentMap) {
        Integer id = (Integer) jwtUtility.getId(jwt);
        String role = "patient";
        Patient patient = patientService.getProfileById(role, id);

        Integer problemId = Integer.parseInt((String) appointmentMap.get("problem_id"));
        Problem problem = problemService.getProblemById(role, problemId);

        Integer doctorId = Integer.parseInt((String) appointmentMap.get("doctor_id")) ;
        Doctor doctor = doctorService.getProfileById(doctorId);

        Integer hcId = Integer.parseInt((String) appointmentMap.get("healthCenter_id")) ;
        HealthCenter hc = healthCenterService.getProfileById(hcId);

        Prescription prescription = null;
        String date_time = (String) appointmentMap.get("date_time");
        String from_home = (String) appointmentMap.get("from_home");
        String payment_status = (String) appointmentMap.get("payment_status");
        String meeting_link = (String) appointmentMap.get("meeting_link");

        Appointment appointment = new Appointment(problem, doctor, hc, null, date_time, from_home, "false", null);
        Appointment createdAppointment = appointmentService.createApppointment(role, appointment);

        return ResponseEntity.ok(createdAppointment.getId());


    }

    @GetMapping("/appointmentById") //read
    public ResponseEntity<Appointment> getAppointmentById(@RequestParam Integer appointmentId) {
        Appointment appointment = appointmentService.getAppointmentById(appointmentId);
        return new ResponseEntity<>(appointment, HttpStatus.OK);
    }

//    @GetMapping("/appointmentsByPatient") //read
//    public List<Appointment> getAllAppointmentByPatient(HttpServletRequest request) {
//        Integer patientId = (Integer) request.getAttribute("Id");
//        String role = (String) request.getAttribute("role");
//        Patient patient = patientService.getProfileById(role, patientId);
//        return appointmentService.getAppointmentByPatient(role, patient);
//    }
//
//    @GetMapping("/appointmentsByDoctor") //read
//    public List<Appointment> getAllAppointmentByDoctor(HttpServletRequest request) {
//        Integer doctorId = (Integer) request.getAttribute("Id");
//        String role = (String) request.getAttribute("role");
//        Doctor doctor = doctorService.getProfileById(doctorId);
//        return appointmentService.getAppointmentByDoctor(role, doctor);
//    }
//
//    @GetMapping("/appointmentsByHealthCenter") //read
//    public List<Appointment> getAllAppointmentByHealthCenter(HttpServletRequest request) {
//        Integer hcId = (Integer) request.getAttribute("Id");
//        String role = (String) request.getAttribute("role");
//        HealthCenter hc = healthCenterService.getProfileById(hcId);
//        return appointmentService.getAppointmentByHealthCenter(role, hc);
//    }

    @GetMapping("/appointmentsByPatient") //read
    public List<Appointment> getAllAppointmentByPatient(@RequestParam String jwt) {


        Integer patientId = (Integer) jwtUtility.getId(jwt);
        String role = "patient";
        Patient patient = patientService.getProfileById(role, patientId);
        return appointmentService.getAppointmentByPatient(role, patient);
    }

    @GetMapping("/appointmentsByDoctor") //read
    public List<Appointment> getAllAppointmentByDoctor(@RequestParam String jwt) {
        Integer doctorId = (Integer) jwtUtility.getId(jwt);
        String role = "doctor";
        Doctor doctor = doctorService.getProfileById(doctorId);
        return appointmentService.getAppointmentByDoctor(role, doctor);
    }

    @GetMapping("/appointmentsByHealthCenter") //read
    public List<Appointment> getAllAppointmentByHealthCenter(@RequestParam String jwt) {
        Integer hcId = (Integer) jwtUtility.getId(jwt);
        String role = "health_center";
        HealthCenter hc = healthCenterService.getProfileById(hcId);
        return appointmentService.getAppointmentByHealthCenter(role, hc);
    }

    @PutMapping("/updateMeetingLink")
    public ResponseEntity<String> updateMeetingLink(@RequestBody Map<String, String> meeting){
        String role = "doctor";
        String dateTime = (String) meeting.get("date_time") ;
        String meetingLink = (String) meeting.get("meeting_link");

        appointmentService.updateMeetingLink(role, dateTime, meetingLink);
        return new ResponseEntity<>(HttpStatus.OK);


    }

    @PutMapping("/updatePaymentStatus")
    public ResponseEntity<String> updatePaymentStatus(@RequestParam Integer appointmentId){

        String role = "health_center";
        appointmentService.updatePaymentStatus(role, appointmentId);
        return new ResponseEntity<>(HttpStatus.OK);


    }

}
