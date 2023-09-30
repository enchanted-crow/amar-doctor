package com.DU_Yellow.amardoctorapi.services;

import com.DU_Yellow.amardoctorapi.domain.*;
import com.DU_Yellow.amardoctorapi.exceptions.NotFoundException;
import com.DU_Yellow.amardoctorapi.exceptions.UserAuthException;
import com.DU_Yellow.amardoctorapi.repositories.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class AppointmentServiceImpl implements AppointmentService{
    @Autowired
    AppointmentRepository appointmentRepository;

    @Override
    public Appointment createApppointment(String role, Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    @Override
    public Appointment getAppointmentById(Integer appointmentId) throws NotFoundException{
        Optional<Appointment> appointment = appointmentRepository.findById(appointmentId);
        if (appointment.isPresent()) {
            return appointment.get();
        } else {
            throw new NotFoundException("appointment not found");
        }
    }

    @Override
    public List<Appointment> getAppointmentByPatient(String role, Patient patient) throws UserAuthException {
        if(role.equals("patient")){
            return appointmentRepository.getAppointmentsByProblemPatient(patient);
        }
        else{
            throw new UserAuthException("permission denied");
        }


    }

    @Override
    public List<Appointment> getAppointmentByDoctor(String role, Doctor doctor) throws UserAuthException{
        if(role.equals("doctor"))
            return appointmentRepository.getAppointmentsByDoctor(doctor);
        else
            throw new UserAuthException("permission denied");
    }

    @Override
    public List<Appointment> getAppointmentByHealthCenter(String role, HealthCenter hc) {
        if(role.equals("health_center")){
            return appointmentRepository.getAppointmentsByHealthCenter(hc);
        }
        else
            throw new UserAuthException("permission denied");

    }

    @Override
    public void addPrescription(Prescription createdPrescription, Integer appointment_id) {
        Appointment appointment = appointmentRepository.getReferenceById(appointment_id);
        appointment.setPrescription(createdPrescription);
        appointmentRepository.save(appointment);
    }

    @Override
    public void updatePaymentStatus(String role, Integer appointmentId) throws UserAuthException{
        if(role.equals("health_center")){
            Appointment appointment = appointmentRepository.getReferenceById(appointmentId);
            appointment.setPayment_status("true");
            appointmentRepository.save(appointment);
        }
        else
            throw new UserAuthException("Permission denied");
    }

    @Override
    public void updateMeetingLink(String role, String dateTime, String meetingLink) {
        if(role.equals("doctor")){
            List<Appointment> appointments = appointmentRepository.getAppointmentsByDateTime(dateTime);
            for(Appointment appointment : appointments){
                appointment.setDate_time(meetingLink);
                appointmentRepository.save(appointment);

            }
        }
        else
            throw new UserAuthException("Permission denied");
    }
}
