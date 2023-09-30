package com.DU_Yellow.amardoctorapi.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "prescription")
public class Prescription {
    @Id
    @SequenceGenerator(
            name = "prescription_id_sequence",
            sequenceName = "prescription_id_sequence"
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "prescription_id_sequence"
    )
    private Integer id;
    @OneToOne
    @JoinColumn(name = "appointment_id", referencedColumnName = "id")
    @JsonIgnore
    private Appointment appointment;

    private String document;

    public Prescription(Appointment appointment, String document) {
        this.appointment = appointment;
        this.document = document;
    }

    public Prescription() {

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Appointment getAppointment() {
        return appointment;
    }

    public void setAppointment(Appointment appointment) {
        this.appointment = appointment;
    }

    public String getDocument() {
        return document;
    }

    public void setDocument(String document) {
        this.document = document;
    }
}
