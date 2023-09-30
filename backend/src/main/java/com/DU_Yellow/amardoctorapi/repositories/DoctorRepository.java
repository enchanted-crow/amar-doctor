package com.DU_Yellow.amardoctorapi.repositories;

import com.DU_Yellow.amardoctorapi.domain.Doctor;
import com.DU_Yellow.amardoctorapi.domain.TimeSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DoctorRepository extends JpaRepository<Doctor, Integer> {
    long countByEmail(String email);
    Doctor findByEmail(String email);

    List<Doctor> findDoctorsByDoctorTypeIgnoreCaseAndDepartmentIgnoreCase(String doctorType, String department);
    @Query("SELECT DISTINCT d.department FROM Doctor d WHERE LOWER(d.doctorType) = LOWER(:type)")
    List<String> findDistinctDepartmentByDoctorTypeIgnoreCase(String type);
    @Query("SELECT DISTINCT d.doctorType FROM Doctor d")
    List<String> findDistinctDoctorTypeBy();

    @Query("SELECT DISTINCT d.timeSlot FROM Doctor d WHERE d.id = :id")
    List<TimeSlot> findDistinctTimeSlotById(Integer id);


}
