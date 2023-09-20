package com.DU_Yellow.amardoctorapi.domain;

import jakarta.persistence.Lob;

public class Prescription {
    private Integer id;
    private Integer appointment_id;
    @Lob
    private byte[] document;
}
