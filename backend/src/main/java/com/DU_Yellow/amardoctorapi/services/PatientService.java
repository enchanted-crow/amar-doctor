package com.DU_Yellow.amardoctorapi.services;

import com.DU_Yellow.amardoctorapi.domain.Patient;
import com.DU_Yellow.amardoctorapi.exceptions.UserAuthException;

public interface PatientService {
    Patient validateUser(String email, String password) throws UserAuthException;

    Patient registerUser(String email, String password, String name, String dob, String sex, String blood_group, String contact_no, String division, String district, String upozilla, Byte[] photo) throws UserAuthException;
    Patient getProfileById(String role, Integer id);
    void delete(Integer id);
}
