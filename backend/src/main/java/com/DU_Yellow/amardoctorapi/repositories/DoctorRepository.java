package com.DU_Yellow.amardoctorapi.repositories;

import com.DU_Yellow.amardoctorapi.domain.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<Doctor, Integer> {
    long countByEmail(String email);
    Doctor findByEmail(String email);
}
