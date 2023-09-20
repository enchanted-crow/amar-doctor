package com.DU_Yellow.amardoctorapi.domain;

import jakarta.persistence.Embeddable;

@Embeddable
public class TimeSlot {
        private String time;
        private Integer max_count;

        public String getTime() {
                return time;
        }

        public void setTime(String time) {
                this.time = time;
        }

        public Integer getMax_count() {
                return max_count;
        }

        public void setMax_count(Integer max_count) {
                this.max_count = max_count;
        }
}
