package com.DU_Yellow.amardoctorapi;

import com.DU_Yellow.amardoctorapi.domain.Doctor;
import com.DU_Yellow.amardoctorapi.filters.AuthFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class AmarDoctorApiApplication {


	public static void main(String[] args) {
		SpringApplication.run(AmarDoctorApiApplication.class, args);
	}
//	@Bean
//	public FilterRegistrationBean<AuthFilter> filterRegistrationBean() {
//		FilterRegistrationBean<AuthFilter> registrationBean = new FilterRegistrationBean<>();
//		AuthFilter authFilter = new AuthFilter();
//		registrationBean.setFilter(authFilter);
//		registrationBean.addUrlPatterns("/api/doctor/profile");
//		registrationBean.addUrlPatterns("/api/doctor/delete");
//		registrationBean.addUrlPatterns("/api/doctor/timeSlot");
//		registrationBean.addUrlPatterns("/api/doctor/timeSlotById");
//		registrationBean.addUrlPatterns("/api/doctor/departmentSuggestion");
//
//
//		registrationBean.addUrlPatterns("/api/patient/profile");
//		registrationBean.addUrlPatterns("/api/patient/delete");
//
//		registrationBean.addUrlPatterns("/api/healthCenter/profile");
//		registrationBean.addUrlPatterns("/api/healthCenter/delete");
//		registrationBean.addUrlPatterns("/api/healthCenter/healthCenterSuggestion");
//
//		registrationBean.addUrlPatterns("/api/problem/create");
//		registrationBean.addUrlPatterns("/api/problem/problemById");
//		registrationBean.addUrlPatterns("/api/problem/problemsByPatient");
//
//		registrationBean.addUrlPatterns("/api/appointment/create");
//		registrationBean.addUrlPatterns("/api/appointment/appointmentById");
//		registrationBean.addUrlPatterns("/api/appointment/appointmentsByPatient");
//		registrationBean.addUrlPatterns("/api/appointment/appointmentsByDoctor");
//		registrationBean.addUrlPatterns("/api/appointment/appointmentsByHealthCenter");
//		registrationBean.addUrlPatterns("/api/appointment/updatePaymentStatus");
//		registrationBean.addUrlPatterns("/api/appointment/updateMeetingLink");
//
//		registrationBean.addUrlPatterns("/api/prescription/create");
//		return registrationBean;
//	}

}
