// All data types are strings here as we will always send string data from frontend to backend

export interface Doctor {
  id: string | null;
  email: string | null;
  password: string | null;
  name: string | null;
  contact_no: string | null;
  doctor_type: string | null;
  department: string | null;
  designation: string | null;
  institution: string | null;
  degrees: string | null;
  chamber_location: string | null;
  bmdc_registration_no: string | null;
  bmdc_registration_year: string | null;
  bio: string | null;
  photo: string[] | null;
  time_slot: TimeSlot[] | null;
}

export interface TimeSlot {
  time: string | null;
  max_count: string | null
}

export interface Appointment {
  problem_id: string | null;
  doctor_id: string | null;
  helath_center_id: string | null;
  prescription_id: string | null;
  date_time: string | null;
  from_home: boolean | null;
  payment_status: boolean | null;
  meeting_link: string | null;
}

export interface HealthCenter {
  id: string | null;
  email: string | null;
  password: string | null;
  name: string | null;
  contact_no: string | null;
  division: string | null;
  district: string | null;
  upozilla: string | null;
  photo: number[] | null;
  time_slot: TimeSlot[] | null;
}

export interface Prescription {
  id: string | null;
  appointment_id: string | null;
  document: number[] | null;
}

export interface Patient {
  id: string | null;
  email: string | null;
  password: string | null;
  name: string | null;
  dob: string | null;
  sex: string | null;
  blood_group: string | null;
  contact_no: string | null;
  division: string | null;
  district: string | null;
  upozilla: string | null;
  photo: number[] | null;
}

export interface Problem {
  id: number | null;
  patient_id: number | null;
  description: string | null;
  document: number[][] | null;
}
