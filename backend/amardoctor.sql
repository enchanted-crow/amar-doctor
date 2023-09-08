CREATE DATABASE amardoctordb;
\c amardoctordb
create table doctor(
   id integer primary key not null,
   email varchar(30) not null,
   password text not null
);

create table todo(
     id integer primary key not null,
     doctor_id integer not null,
     todo_name varchar(30) not null
);

alter table todo add constraint todo_users_fk
foreign key (doctor_id) references doctor(id);

