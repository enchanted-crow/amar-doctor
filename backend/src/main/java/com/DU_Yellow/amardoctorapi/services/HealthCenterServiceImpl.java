package com.DU_Yellow.amardoctorapi.services;

import com.DU_Yellow.amardoctorapi.domain.HealthCenter;
import com.DU_Yellow.amardoctorapi.domain.Patient;
import com.DU_Yellow.amardoctorapi.domain.TimeSlot;
import com.DU_Yellow.amardoctorapi.exceptions.NotFoundException;
import com.DU_Yellow.amardoctorapi.exceptions.UserAuthException;
import com.DU_Yellow.amardoctorapi.repositories.HealthCenterRepository;
import com.DU_Yellow.amardoctorapi.repositories.PatientRepository;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

@Transactional
@Service
public class HealthCenterServiceImpl implements HealthCenterService{
    @Autowired
    HealthCenterRepository hcRepository;

    @Override
    public HealthCenter validateUser(String email, String password) throws UserAuthException {
        if(email != null) email = email.toLowerCase();
        HealthCenter hc = hcRepository.findByEmail(email);
        if(hc == null){
            throw new UserAuthException("Invalid email/password");
        }
        if(!BCrypt.checkpw(password, hc.getPassword()))
            throw new UserAuthException("Invalid email/password");
        return hc;
    }

    @Override
    public HealthCenter registerUser(String email, String password, String name, String contact_no, String division, String district, String upozilla, Byte[] photo, List<TimeSlot> time_slot) throws UserAuthException {
        Pattern pattern = Pattern.compile("^(.+)@(.+)$");
        if(email != null) email = email.toLowerCase();
        if(!pattern.matcher(email).matches())
            throw new UserAuthException("Invalid email format");
        long count = hcRepository.countByEmail(email);
        if(count > 0)
            throw new UserAuthException("Email already in use");

        String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt(10));
        HealthCenter hc = new HealthCenter(email, hashedPassword, name, contact_no, division,district,upozilla,photo,time_slot);
        return hcRepository.save(hc);
    }

    @Override
    public HealthCenter viewProfileById(Integer id) throws NotFoundException {
        Optional<HealthCenter> hc = hcRepository.findById(id);
        if (hc.isPresent()) {
            return hc.get();
        } else {
            throw new NotFoundException("health Center not found");
        }
    }



    @Override
    public void delete(Integer id){
        hcRepository.deleteById(id);
    }
}
