package com.DU_Yellow.amardoctorapi.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "problem")
public class Problem {
    @Id
    @SequenceGenerator(
            name = "problem_id_sequence",
            sequenceName = "problem_id_sequence"
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "problem_id_sequence"
    )
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "patient_id", referencedColumnName = "id")
    private Patient patient;
    private String description;
    private Byte[] document;

    public Problem(Patient patient, String description, Byte[] document) {
        this.patient = patient;
        this.description = description;
        this.document = document;
    }

    public Problem() {

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Byte[] getDocument() {
        return document;
    }

    public void setDocument(Byte[] document) {
        this.document = document;
    }
}
