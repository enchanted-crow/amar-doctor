package com.DU_Yellow.amardoctorapi.repositories;

import com.DU_Yellow.amardoctorapi.domain.Patient;
import com.DU_Yellow.amardoctorapi.domain.Problem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProblemRepository extends JpaRepository<Problem, Integer> {
    Problem getProblemById(Integer id);
    List<Problem> getProblemsByPatient(Patient patient);
}
