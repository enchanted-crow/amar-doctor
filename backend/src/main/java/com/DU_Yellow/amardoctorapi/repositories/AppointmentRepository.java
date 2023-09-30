package com.DU_Yellow.amardoctorapi.repositories;

import com.DU_Yellow.amardoctorapi.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {
    List<Appointment> getAppointmentsByProblemPatient(Patient patient);
    List<Appointment> getAppointmentsByDoctor(Doctor doctor);
    List<Appointment> getAppointmentsByHealthCenter(HealthCenter healthCenter);
    @Query("SELECT a FROM Appointment a WHERE a.date_time = :dateTime")
    List<Appointment> getAppointmentsByDateTime(String dateTime);
}
