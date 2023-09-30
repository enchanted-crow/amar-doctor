package com.DU_Yellow.amardoctorapi.services;

import com.DU_Yellow.amardoctorapi.domain.*;

import java.util.List;

public interface AppointmentService {
    Appointment createApppointment(String role, Appointment appointment);

    Appointment getAppointmentById (Integer appointmentId);

    List<Appointment> getAppointmentByPatient(String role, Patient patient);

    List<Appointment> getAppointmentByDoctor(String role, Doctor doctor);

    List<Appointment> getAppointmentByHealthCenter(String role, HealthCenter hc);

    void addPrescription(Prescription createdPrescription, Integer appointment_id);

    void updatePaymentStatus(String role, Integer appointmentId);

    void updateMeetingLink(String role, String dateTime, String meetingLink);
}
