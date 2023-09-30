package com.DU_Yellow.amardoctorapi.services;

import com.DU_Yellow.amardoctorapi.domain.Patient;
import com.DU_Yellow.amardoctorapi.exceptions.UserAuthException;
import com.DU_Yellow.amardoctorapi.exceptions.NotFoundException;
import com.DU_Yellow.amardoctorapi.repositories.PatientRepository;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.server.DelegatingServerHttpResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.regex.Pattern;

@Transactional
@Service
public class PatientServiceImpl implements PatientService {
    @Autowired
    PatientRepository patientRepository;

    @Override
    public Patient validateUser(String email, String password) throws UserAuthException {
        if(email != null) email = email.toLowerCase();
        Patient patient = patientRepository.findByEmail(email);
        if(patient == null){
            throw new UserAuthException("Invalid email/password");
        }
        if(!BCrypt.checkpw(password, patient.getPassword()))
            throw new UserAuthException("Invalid email/password");
        return patient;
    }

    @Override
    public Patient registerUser(String email, String password, String name, String dob, String sex, String blood_group, String contact_no, String division, String district, String upozilla, Byte[] photo) throws UserAuthException {
        Pattern pattern = Pattern.compile("^(.+)@(.+)$");
        if(email != null) email = email.toLowerCase();
        if(!pattern.matcher(email).matches())
            throw new UserAuthException("Invalid email format");
        long count = patientRepository.countByEmail(email);
        if(count > 0)
            throw new UserAuthException("Email already in use");

        String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt(10));
        Patient patient = new Patient(email, hashedPassword, name, dob, sex, blood_group, contact_no, division,district,upozilla,photo);
        return patientRepository.save(patient);
    }

    @Override
    public Patient getProfileById(String role, Integer id) throws NotFoundException, UserAuthException {
        if(role.equals("doctor") || role.equals("health_center") || role.equals("patient")){
            Optional<Patient> patient = patientRepository.findById(id);
            if (patient.isPresent()) {
                return patient.get();
            } else {
                throw new NotFoundException("Patient not found");
            }
        }

        else {
            throw new UserAuthException("Permission denied");

        }


    }



    @Override
    public void delete(Integer id){
        patientRepository.deleteById(id);
    }
}
