package com.DU_Yellow.amardoctorapi.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "appointment")
public class Appointment {
    @Id
    @SequenceGenerator(
            name = "appointment_id_sequence",
            sequenceName = "appointment_id_sequence"
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "appointment_id_sequence"
    )
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "problem_id", referencedColumnName = "id")
    private Problem problem;
    @ManyToOne
    @JoinColumn(name = "doctor_id", referencedColumnName = "id")
    private Doctor doctor;
    @ManyToOne
    @JoinColumn(name = "health_center_id", referencedColumnName = "id")
    private HealthCenter healthCenter;
    @OneToOne
    @JoinColumn(name = "prescription_id", referencedColumnName = "id")
    private Prescription prescription;
    private String date_time;
    private String from_home;
    private String payment_status;
    private String meeting_link;

    public Appointment(Problem problem, Doctor doctor, HealthCenter healthCenter, Prescription prescription, String date_time, String from_home, String payment_status, String meeting_link) {
        this.problem = problem;
        this.doctor = doctor;
        this.healthCenter = healthCenter;
        this.prescription = prescription;
        this.date_time = date_time;
        this.from_home = from_home;
        this.payment_status = payment_status;
        this.meeting_link = meeting_link;
    }

    public Appointment() {

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Problem getProblem() {
        return problem;
    }

    public void setProblem(Problem problem) {
        this.problem = problem;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public HealthCenter getHealthCenter() {
        return healthCenter;
    }

    public void setHealthCenter(HealthCenter healthCenter) {
        this.healthCenter = healthCenter;
    }

    public Prescription getPrescription() {
        return prescription;
    }

    public void setPrescription(Prescription prescription) {
        this.prescription = prescription;
    }

    public String getDate_time() {
        return date_time;
    }

    public void setDate_time(String date_time) {
        this.date_time = date_time;
    }

    public String getFrom_home() {
        return from_home;
    }

    public void setFrom_home(String from_home) {
        this.from_home = from_home;
    }

    public String getPayment_status() {
        return payment_status;
    }

    public void setPayment_status(String payment_status) {
        this.payment_status = payment_status;
    }

    public String getMeeting_link() {
        return meeting_link;
    }

    public void setMeeting_link(String meeting_link) {
        this.meeting_link = meeting_link;
    }
}
