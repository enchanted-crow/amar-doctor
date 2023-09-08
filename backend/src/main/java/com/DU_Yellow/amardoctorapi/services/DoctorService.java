package com.DU_Yellow.amardoctorapi.services;

import com.DU_Yellow.amardoctorapi.domain.Doctor;
import com.DU_Yellow.amardoctorapi.exceptions.DoctorAuthException;

public interface DoctorService {
    Doctor validateUser(String email, String password) throws DoctorAuthException;

    Doctor registerUser(String email, String password) throws DoctorAuthException;
}
