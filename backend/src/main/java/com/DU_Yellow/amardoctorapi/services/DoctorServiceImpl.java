package com.DU_Yellow.amardoctorapi.services;

import com.DU_Yellow.amardoctorapi.domain.Doctor;
import com.DU_Yellow.amardoctorapi.domain.TimeSlot;
import com.DU_Yellow.amardoctorapi.exceptions.UserAuthException;
import com.DU_Yellow.amardoctorapi.exceptions.NotFoundException;
import com.DU_Yellow.amardoctorapi.repositories.DoctorRepository;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

@Transactional
@Service
public class DoctorServiceImpl implements DoctorService {

    @Autowired
    DoctorRepository doctorRepository;

    @Override
    public Doctor validateUser(String email, String password) throws UserAuthException {
        if(email != null) email = email.toLowerCase();
        Doctor doctor = doctorRepository.findByEmail(email);
        if(doctor == null){
            throw new UserAuthException("Invalid email/password");
        }
        if(!BCrypt.checkpw(password, doctor.getPassword()))
            throw new UserAuthException("Invalid email/password");
        return doctor;
    }

    @Override
    public Doctor registerUser(String email, String password, String name, String contact_no, String doctor_type, String department, String designation, String institution, String degrees, String chamber_location, Integer bmdc_registration_number, Integer bmdc_registration_year, String bio, Byte[] photo, List<TimeSlot> time_slot) throws UserAuthException {
        Pattern pattern = Pattern.compile("^(.+)@(.+)$");
        if(email != null) email = email.toLowerCase();
        if(!pattern.matcher(email).matches())
            throw new UserAuthException("Invalid email format");
        long count = doctorRepository.countByEmail(email);
        if(count > 0)
            throw new UserAuthException("Email already in use");

        String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt(10));
        Doctor doctor = new Doctor(email, hashedPassword, name, contact_no, doctor_type, department, designation, institution, degrees, chamber_location, bmdc_registration_number, bmdc_registration_year, bio, photo, time_slot);
        return doctorRepository.save(doctor);
    }

    @Override
    public Doctor viewProfileById(Integer id) throws NotFoundException {
        Optional<Doctor> doctor = doctorRepository.findById(id);
        if (doctor.isPresent()) {
            return doctor.get();
        } else {
            throw new NotFoundException("Doctor not found");
        }
    }

//    @Override
//    public void updateProfile(Integer id, String email, String password, String name, String contact_no, String department, String qualification, String specialization, List<String> time_slot){
//        Doctor doctor = doctorRepository.getReferenceById(id);
//        doctor.setEmail(email);
//        doctor.setName(name);
//        doctor.setContact_no(contact_no);
//        doctor.setDepartment(department);
//        doctor.setQualification(qualification);
//        doctor.setSpecialization(specialization);
//        doctor.setTime_slot(time_slot);
//
//        String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt(10));
//        doctor.setPassword(hashedPassword);
//        doctorRepository.save(doctor);
//
//    }

    @Override
    public void delete(Integer id){
        doctorRepository.deleteById(id);
    }
}

