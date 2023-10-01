package com.DU_Yellow.amardoctorapi.services;

import com.DU_Yellow.amardoctorapi.domain.HealthCenter;
import com.DU_Yellow.amardoctorapi.domain.Patient;
import com.DU_Yellow.amardoctorapi.domain.TimeSlot;
import com.DU_Yellow.amardoctorapi.exceptions.UserAuthException;

import java.util.List;

public interface HealthCenterService {
    HealthCenter validateUser(String email, String password) throws UserAuthException;

    HealthCenter registerUser(String email, String password, String name, String contact_no, String division, String district, String upozilla, Byte[] photo, List<TimeSlot> time_slot) throws UserAuthException;
    HealthCenter getProfileById(Integer id);
    //void updateProfile(Integer id, String email, String password, String name, String contact_no, String department, String qualification, String specialization, List<String> time_slot);
    void delete(Integer id);

    List<HealthCenter> getHealthCenterByDivision(String division);

    List<HealthCenter> getHealthCenterByDistrict(String district);

    List<HealthCenter> getHealthCenterByUpozilla(String upozilla);

    List<HealthCenter> getHealthCenterSuggestion(Patient patient);

    List<HealthCenter> getHealthCenterSuggestionByAddrr(String div, String dist, String upo);
}
