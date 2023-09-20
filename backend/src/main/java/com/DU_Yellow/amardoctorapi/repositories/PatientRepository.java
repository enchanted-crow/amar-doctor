package com.DU_Yellow.amardoctorapi.repositories;

import com.DU_Yellow.amardoctorapi.domain.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Integer> {
    long countByEmail(String email);
    Patient findByEmail(String email);


}
