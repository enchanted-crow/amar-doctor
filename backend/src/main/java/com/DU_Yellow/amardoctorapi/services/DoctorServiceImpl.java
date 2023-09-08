package com.DU_Yellow.amardoctorapi.services;

import com.DU_Yellow.amardoctorapi.domain.Doctor;
import com.DU_Yellow.amardoctorapi.exceptions.DoctorAuthException;
import com.DU_Yellow.amardoctorapi.repositories.DoctorRepository;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.regex.Pattern;

@Transactional
@Service
public class DoctorServiceImpl implements DoctorService{

    @Autowired
    DoctorRepository doctorRepository;

    @Override
    public Doctor validateUser(String email, String password) throws DoctorAuthException {
        if(email != null) email = email.toLowerCase();
        Doctor doctor = doctorRepository.findByEmail(email);
        if(doctor == null){
            throw new DoctorAuthException("Invalid email/password");
        }
        if(!BCrypt.checkpw(password, doctor.getPassword()))
            throw new DoctorAuthException("Invalid email/password");
        return doctor;
    }

    @Override
    public Doctor registerUser(String email, String password) throws DoctorAuthException {
        Pattern pattern = Pattern.compile("^(.+)@(.+)$");
        if(email != null) email = email.toLowerCase();
        if(!pattern.matcher(email).matches())
            throw new DoctorAuthException("Invalid email format");
        long count = doctorRepository.countByEmail(email);
        if(count > 0)
            throw new DoctorAuthException("Email already in use");

        String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt(10));
        Doctor doctor = new Doctor();
        doctor.setEmail(email);
        doctor.setPassword(hashedPassword);
        return doctorRepository.save(doctor);
    }
}

