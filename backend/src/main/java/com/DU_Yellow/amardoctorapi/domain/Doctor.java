package com.DU_Yellow.amardoctorapi.domain;

import jakarta.persistence.*;

import java.util.List;


@Entity
@Table(name = "doctor")
public class Doctor {

    @Id
    @SequenceGenerator(
            name = "doctor_id_sequence",
            sequenceName = "doctor_id_sequence"
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "doctor_id_sequence"
    )

    private Integer id;
    private String email;
    private String password;

    private String name;
    private String contact_no;
    private String doctor_type;

    private String department;

    private String designation;

    private String institution;

    private String degrees;

    private String chamber_location;

    private Integer bmdc_registration_no;

    private Integer bmdc_registration_year;

    private String bio;

    private Byte[] photo;
    @ElementCollection
    private List<TimeSlot> time_slot;



    public Doctor() {
    }

    public Doctor(String email, String password, String name, String contact_no, String doctor_type, String department, String designation, String institution, String degrees, String chamber_location, Integer bmdc_registration_no, Integer bmdc_registration_year, String bio, Byte[] photo, List<TimeSlot> time_slot) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.contact_no = contact_no;
        this.doctor_type = doctor_type;
        this.department = department;
        this.designation = designation;
        this.institution = institution;
        this.degrees = degrees;
        this.chamber_location = chamber_location;
        this.bmdc_registration_no = bmdc_registration_no;
        this.bmdc_registration_year = bmdc_registration_year;
        this.bio = bio;
        this.photo = photo;
        this.time_slot = time_slot;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContact_no() {
        return contact_no;
    }

    public void setContact_no(String contact_no) {
        this.contact_no = contact_no;
    }

    public String getDoctor_type() {
        return doctor_type;
    }

    public void setDoctor_type(String doctor_type) {
        this.doctor_type = doctor_type;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getInstitution() {
        return institution;
    }

    public void setInstitution(String institution) {
        this.institution = institution;
    }

    public String getDegrees() {
        return degrees;
    }

    public void setDegrees(String degrees) {
        this.degrees = degrees;
    }

    public String getChamber_location() {
        return chamber_location;
    }

    public void setChamber_location(String chamber_location) {
        this.chamber_location = chamber_location;
    }

    public Integer getBmdc_registration_no() {
        return bmdc_registration_no;
    }

    public void setBmdc_registration_no(Integer bmdc_registration_no) {
        this.bmdc_registration_no = bmdc_registration_no;
    }

    public Integer getBmdc_registration_year() {
        return bmdc_registration_year;
    }

    public void setBmdc_registration_year(Integer bmdc_registration_year) {
        this.bmdc_registration_year = bmdc_registration_year;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public Byte[] getPhoto() {
        return photo;
    }

    public void setPhoto(Byte[] photo) {
        this.photo = photo;
    }

    public List<TimeSlot> getTime_slot() {
        return time_slot;
    }

    public void setTime_slot(List<TimeSlot> time_slot) {
        this.time_slot = time_slot;
    }

    @Override
    public String toString() {
        return "Doctor{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
