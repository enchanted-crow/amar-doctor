package com.DU_Yellow.amardoctorapi.domain;

import jakarta.persistence.Embeddable;

@Embeddable
public class TimeSlot {
        private String time;
        private String max_count;

        public TimeSlot(String time, String max_count) {
                this.time = time;
                this.max_count = max_count;
        }

        public TimeSlot(){

        }

        public TimeSlot(String timeString) {
                // Parse the input time string and set the properties

                String[] parts = timeString.split("_");
                if (parts.length == 6) {
                        this.time = parts[0] + "_" + parts[1] + "_" + parts[2] + "_" + parts[3] + "_" + parts[4];
                        this.max_count = parts[5];
                } else {
                        // Handle invalid input format
                        throw new IllegalArgumentException("Invalid time slot format: " + timeString);
                }
        }

        public String getTime() {
                return time;
        }

        public void setTime(String time) {
                this.time = time;
        }

        public String getMax_count() {
                return max_count;
        }

        public void setMax_count(String max_count) {
                this.max_count = max_count;
        }
}
