package com.DU_Yellow.amardoctorapi.domain;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "healthCenter")
public class HealthCenter {

    @Id
    @SequenceGenerator(
            name = "hc_id_sequence",
            sequenceName = "hc_id_sequence"
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "hc_id_sequence"
    )
    private Integer id;
    private String email;
    private String password;
    private String name;
    private String contact_no;
    private String division;
    private String district;
    private String upozilla;
    private Byte[] photo;

    @ElementCollection
    private List<TimeSlot> time_slot;

    public HealthCenter(){

    }

    public HealthCenter(String email, String password, String name, String contact_no, String division, String district, String upozilla, Byte[] photo, List<TimeSlot> time_slot) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.contact_no = contact_no;
        this.division = division;
        this.district = district;
        this.upozilla = upozilla;
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

    public List<TimeSlot> getTime_slot() {
        return time_slot;
    }

    public void setTime_slot(List<TimeSlot> time_slot) {
        this.time_slot = time_slot;
    }
}
