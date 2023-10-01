package com.DU_Yellow.amardoctorapi.services;

import com.DU_Yellow.amardoctorapi.domain.Doctor;
import com.DU_Yellow.amardoctorapi.domain.TimeSlot;
import com.DU_Yellow.amardoctorapi.exceptions.UserAuthException;
import com.DU_Yellow.amardoctorapi.exceptions.NotFoundException;
import com.DU_Yellow.amardoctorapi.repositories.DoctorRepository;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.io.*;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;
import java.net.HttpURLConnection;
import java.net.URL;


@Transactional
@Service
public class DoctorServiceImpl implements DoctorService {

    @Autowired
    DoctorRepository doctorRepository;

    private final String apiKey = "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"; //have to use git lock
    private final String apiUrl = "https://api.openai.com/v1/chat/completions";
    private final String model = "gpt-3.5-turbo";

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
    public Doctor registerUser(String email, String password, String name, String contact_no, String doctor_type, String department, String designation, String institution, String degrees, String chamber_location, String bmdc_registration_number, String bmdc_registration_year, String bio, Byte[] photo, List<TimeSlot> time_slot) throws UserAuthException {
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
    public Doctor getProfileById(Integer id) throws NotFoundException {
        Optional<Doctor> doctor = doctorRepository.findById(id);
        if (doctor.isPresent()) {
            return doctor.get();
        } else {
            throw new NotFoundException("Doctor not found");
        }
    }

    @Override
    public List<Doctor> findDoctorsByDepartment(String type, String departmentName) {
        return doctorRepository.findDoctorsByDoctorTypeIgnoreCaseAndDepartmentIgnoreCase(type, departmentName);
    }

    @Override
    public List<String> getDepartmentsByType(String type) {
        return doctorRepository.findDistinctDepartmentByDoctorTypeIgnoreCase(type);
    }


    @Override
    public void delete(Integer id){
        doctorRepository.deleteById(id);
    }

    @Override
    public List<String> getAllTypes() {
        return doctorRepository.findDistinctDoctorTypeBy();
    }

    @Override
    public List<TimeSlot> getTimeSlotById(String role, Integer id) {
        if(role.equals("doctor") || role.equals("patient") || role.equals("health_center")){
            return doctorRepository.findDistinctTimeSlotById(id);
        }
        else throw new UserAuthException("permission denied");
    }

    @Override
    public String getDepartmentSuggestion(String role, String problemDesc) {
        if(role.equals("patient")){
            String userInput = "provide the medical department names to be contacted for the following problem (Just mention the department names from this list [Medicine, Neuromedicine, Physical Medicine, Surgery, Neurosurgery, Pediatric Surgery, Orthopedic Surgery, Burn Plastic & Reconstructive Surgery, Dermatology, Nephrology, Psychiatry, Cardiology & CCU, Pediatrics, Medical Oncology, Gastroenterology, Radiology & Imaging, Anesthesiology, Traumatology, Urology, ENT, Ophthalmology, Gynae & Obstetrics, Transfusion Medicine, Pediatric Nephrology, Hepatology, Neurology, Oral & Maxillofacial Surgery, Children Dentistry, Conservative Dentistry & Endodontics, Orthodontics, Prosthodontics], no need for any description): " + problemDesc;

            try {
                URL obj = new URL(apiUrl);
                HttpURLConnection con = (HttpURLConnection) obj.openConnection();
                con.setRequestMethod("POST");
                con.setRequestProperty("Authorization", "Bearer " + apiKey);
                con.setRequestProperty("Content-Type", "application/json");

                // Build the request body
                String body = "{\"model\": \"" + model + "\", \"messages\": [{\"role\": \"user\", \"content\": \"" + userInput + "\"}]}";
                con.setDoOutput(true);
                try(OutputStream os = con.getOutputStream()) {
                    byte[] input = body.getBytes("utf-8");
                    os.write(input, 0, input.length);
                }


//                OutputStreamWriter writer = new OutputStreamWriter(con.getOutputStream());
//                writer.write(body);
//                writer.flush();
//                writer.close();




                // Get the response
                // Response from ChatGPT
                BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream()));
                String line;

                StringBuffer response = new StringBuffer();

                while ((line = br.readLine()) != null) {
                    response.append(line);
                }
                br.close();

                // calls the method to extract the message
                String sResponse = response.toString();
                int start = sResponse.indexOf("content")+ 11;

                int end = sResponse.indexOf("\"", start);

                return sResponse.substring(start, end);


//                BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
//                String inputLine;
//                StringBuffer response = new StringBuffer();
//                while ((inputLine = in.readLine()) != null) {
//                    response.append(inputLine);
//                }
//                in.close();
//
//                // returns the extracted contents of the response.
//                int startMarker = response.indexOf("content")+11; // Marker for where the content starts.
//                int endMarker = response.indexOf("\"", startMarker); // Marker for where the content ends.
//                return response.substring(startMarker, endMarker); // Returns the substring containing only the response.

            }
            catch (IOException e) {
                throw new RuntimeException(e);
            }
        }


        else throw new UserAuthException("permission denied");
    }
}

