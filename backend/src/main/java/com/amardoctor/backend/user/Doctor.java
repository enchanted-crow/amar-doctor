package com.amardoctor.backend.user;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Doctor {
    private Integer id;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
}
