package com.DU_Yellow.amardoctorapi.resources;

import com.DU_Yellow.amardoctorapi.domain.Patient;
import com.DU_Yellow.amardoctorapi.domain.Problem;
import com.DU_Yellow.amardoctorapi.services.PatientService;
import com.DU_Yellow.amardoctorapi.services.ProblemService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/problem")
public class ProblemResource {

    @Autowired
    ProblemService problemService;

    @Autowired
    PatientService patientService;

    @PostMapping("/create")  //create
    public ResponseEntity<Integer> createProblem(HttpServletRequest request, @RequestBody Map<String, Object> problemMap) {
        Integer id = (Integer) request.getAttribute("Id");
        String role = (String) request.getAttribute("role");

        Patient patient = patientService.getProfileById(role, id);
        String description = (String) problemMap.get("description");
        //handle docs;
        //List<Byte[]> document = (List<Byte[]>) problemMap.get("document");
        Byte[] document = null;

        Problem problem = new Problem(patient, description, document);
        Problem createdProblem = problemService.createProblem(role, problem);
        return ResponseEntity.ok(createdProblem.getId());


    }

    @GetMapping("/problemsByPatient") //read
    public List<Problem> getProblemById(HttpServletRequest request) {
        Integer patientId = (Integer) request.getAttribute("Id");
        String role = (String) request.getAttribute("role");
        Patient patient = patientService.getProfileById(role, patientId);
        return problemService.getProblemByPatient(role, patient);
    }

    @GetMapping("/problemById") //read
    public ResponseEntity<Problem> getProblemById(HttpServletRequest request, @RequestParam Integer problemId) {
        Integer patientId = (Integer) request.getAttribute("Id");
        String role = (String)  request.getAttribute("role");
        Patient patient = patientService.getProfileById(role, patientId);
        Problem problem = problemService.getProblemById(role, problemId );
        return new ResponseEntity<>(problem, HttpStatus.OK);
    }


}
