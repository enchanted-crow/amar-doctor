package com.DU_Yellow.amardoctorapi.services;

import com.DU_Yellow.amardoctorapi.domain.Prescription;
import com.DU_Yellow.amardoctorapi.exceptions.UserAuthException;
import com.DU_Yellow.amardoctorapi.repositories.PrescriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class PrescriptionServiceImpl implements PrescriptionService{
    @Autowired
    PrescriptionRepository prescriptionRepository;
    @Override
    public Prescription createPrescription(String role, Prescription prescription) throws UserAuthException{
        if(role.equals("doctor"))
            return prescriptionRepository.save(prescription);
        else
            throw new UserAuthException("permission denied");
    }
}
