package com.DU_Yellow.amardoctorapi.services;

import com.DU_Yellow.amardoctorapi.domain.Doctor;
import com.DU_Yellow.amardoctorapi.domain.TimeSlot;
import com.DU_Yellow.amardoctorapi.exceptions.UserAuthException;

import java.util.List;

public interface DoctorService {
    Doctor validateUser(String email, String password) throws UserAuthException;

    Doctor registerUser(String email, String password, String name, String contact_no, String doctor_type, String department, String designation, String institution, String degrees, String chamber_location, String bmdc_registration_number, String bmdc_registration_year, String bio, Byte[] photo, List<TimeSlot> time_slot) throws UserAuthException;
    Doctor getProfileById(Integer id);
    //void updateProfile(Integer id, String email, String password, String name, String contact_no, String department, String qualification, String specialization, List<String> time_slot);
    public List<Doctor> findDoctorsByDepartment(String type, String departmentName);
    public List<String> getDepartmentsByType(String type);
    void delete(Integer id);

    List<String> getAllTypes();

    List<TimeSlot> getTimeSlotById(String role, Integer id);

    String getDepartmentSuggestion(String role, String problemDesc);
}
