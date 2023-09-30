package com.DU_Yellow.amardoctorapi.repositories;

import com.DU_Yellow.amardoctorapi.domain.Doctor;
import com.DU_Yellow.amardoctorapi.domain.HealthCenter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HealthCenterRepository extends JpaRepository<HealthCenter, Integer> {
    long countByEmail(String email);
    HealthCenter findByEmail(String email);
    List<HealthCenter> findHealthCenterByDivisionIgnoreCase(String division);
    List<HealthCenter> findHealthCenterByDistrictIgnoreCase(String district);
    List<HealthCenter> findHealthCenterByUpozillaIgnoreCase(String upozilla);


}
