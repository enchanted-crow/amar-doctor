package com.DU_Yellow.amardoctorapi.resources;

import com.DU_Yellow.amardoctorapi.domain.Appointment;
import com.DU_Yellow.amardoctorapi.domain.Patient;
import com.DU_Yellow.amardoctorapi.domain.Prescription;
import com.DU_Yellow.amardoctorapi.services.AppointmentService;
import com.DU_Yellow.amardoctorapi.services.PatientService;
import com.DU_Yellow.amardoctorapi.services.PrescriptionService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
@CrossOrigin
@RestController
@RequestMapping("api/prescription")
public class PrescriptionResource {
    @Autowired
    PrescriptionService prescriptionService;
    @Autowired
    PatientService patientService;
    @Autowired
    AppointmentService appointmentService;

    @PostMapping("/create")  //create
    public ResponseEntity<Integer> createPrescription(@RequestBody Map<String, Object> prescriptionMap) {
        String role = "doctor";

        Integer appointmentId = Integer.parseInt((String) prescriptionMap.get("appointment_id"));
        Appointment appointment = appointmentService.getAppointmentById(appointmentId);

        String document = (String) prescriptionMap.get("document");

        Prescription prescription = new Prescription(appointment, document);
        Prescription createdPrescription = prescriptionService.createPrescription(role, prescription);
        appointmentService.addPrescription(createdPrescription, appointmentId);
        return ResponseEntity.ok(createdPrescription.getId());


    }
}
