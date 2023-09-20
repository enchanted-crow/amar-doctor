package com.DU_Yellow.amardoctorapi.repositories;

import com.DU_Yellow.amardoctorapi.domain.Doctor;
import com.DU_Yellow.amardoctorapi.domain.HealthCenter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HealthCenterRepository extends JpaRepository<HealthCenter, Integer> {
    long countByEmail(String email);
    HealthCenter findByEmail(String email);


}
