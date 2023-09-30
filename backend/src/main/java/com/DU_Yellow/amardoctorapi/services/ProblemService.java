package com.DU_Yellow.amardoctorapi.services;

import com.DU_Yellow.amardoctorapi.domain.Patient;
import com.DU_Yellow.amardoctorapi.domain.Problem;

import java.util.List;

public interface ProblemService {
    Problem createProblem(String role, Problem problem);

    Problem getProblemById(String role, Integer problemId);

    List<Problem> getProblemByPatient(String role, Patient patient);
}
