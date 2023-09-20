package com.DU_Yellow.amardoctorapi.domain;

import jakarta.persistence.Lob;

import java.util.List;

public class Problem {
    private Integer id;
    private Integer patient_id;
    private String description;
    @Lob
    private List<Byte[]> document;
}
