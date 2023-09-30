package com.DU_Yellow.amardoctorapi.services;

import com.DU_Yellow.amardoctorapi.domain.Patient;
import com.DU_Yellow.amardoctorapi.domain.Problem;
import com.DU_Yellow.amardoctorapi.exceptions.UserAuthException;
import com.DU_Yellow.amardoctorapi.repositories.ProblemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class ProblemServiceImpl implements ProblemService{
    @Autowired
    ProblemRepository problemRepository;

    @Override
    public Problem createProblem(String role, Problem problem) throws UserAuthException {
        if(role.equals("patient")){
            return problemRepository.save(problem);
        }
        else{
            throw new UserAuthException("permission denied");
        }
    }

    @Override
    public List<Problem> getProblemByPatient(String role, Patient patient) {
        if(role.equals("patient")){
            return problemRepository.getProblemsByPatient(patient);
        }
        else{
            throw new UserAuthException("permission denied");
        }

    }

    @Override
    public Problem getProblemById(String role, Integer problemId) {
        if(role.equals("doctor") || role.equals("patient")){
            return problemRepository.getProblemById(problemId);
        }
        else{
            throw new UserAuthException("permission denied");
        }


    }


}
