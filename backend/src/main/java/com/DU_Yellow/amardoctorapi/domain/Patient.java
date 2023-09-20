package com.DU_Yellow.amardoctorapi.domain;

import jakarta.persistence.*;

import java.util.Date;
@Entity
@Table(name = "patient")
public class Patient {
    @Id
    @SequenceGenerator(
            name = "patient_id_sequence",
            sequenceName = "patient_id_sequence"
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "patient_id_sequence"
    )

    private Integer id;
    private String email;
    private String password;
    private String name;
    private String dob;
    private String sex;
    private String blood_group;
    private String contact_no;
    private String division;
    private String district;
    private String upozilla;
    private Byte[] photo;

    public Patient(){

    }

    public Patient(String email, String password, String name, String dob, String sex, String blood_group, String contact_no, String division, String district, String upozilla, Byte[] photo) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.dob = dob;
        this.sex = sex;
        this.blood_group = blood_group;
        this.contact_no = contact_no;
        this.division = division;
        this.district = district;
        this.upozilla = upozilla;
        this.photo = photo;
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

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getBlood_group() {
        return blood_group;
    }

    public void setBlood_group(String blood_group) {
        this.blood_group = blood_group;
    }

    public String getContact_no() {
        return contact_no;
    }

    public void setContact_no(String contact_no) {
        this.contact_no = contact_no;
    }

    public String getDivision() {
        return division;
    }

    public void setDivision(String division) {
        this.division = division;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getUpozilla() {
        return upozilla;
    }

    public void setUpozilla(String upozilla) {
        this.upozilla = upozilla;
    }

    public Byte[] getPhoto() {
        return photo;
    }

    public void setPhoto(Byte[] photo) {
        this.photo = photo;
    }
}
