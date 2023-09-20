package com.DU_Yellow.amardoctorapi.services;

import com.DU_Yellow.amardoctorapi.domain.Patient;
import com.DU_Yellow.amardoctorapi.exceptions.UserAuthException;

import java.util.Date;

public interface PatientService {
    Patient validateUser(String email, String password) throws UserAuthException;

    Patient registerUser(String email, String password, String name, String dob, String sex, String blood_group, String contact_no, String division, String district, String upozilla, Byte[] photo) throws UserAuthException;
    Patient viewProfileById(Integer id);
    //void updateProfile(Integer id, String email, String password, String name, String contact_no, String department, String qualification, String specialization, List<String> time_slot);
    void delete(Integer id);
}
