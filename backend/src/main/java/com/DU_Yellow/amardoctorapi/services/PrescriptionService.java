package com.DU_Yellow.amardoctorapi.services;

import com.DU_Yellow.amardoctorapi.domain.Prescription;

public interface PrescriptionService {
    Prescription createPrescription(String role, Prescription prescription);
}
