package com.example.server.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "employees")
@Getter
@Setter
@RequiredArgsConstructor
@NoArgsConstructor(force = true)
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank(message = "first name cannot be blank")
    @NonNull
    @Column(nullable = false, unique = true)
    private String firstName;

    @NotBlank(message = "last name cannot be blank")
    @NonNull
    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false)
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate dob;

    @Column(nullable = false)
    private int age;

    @Column(nullable = false)
    private String contact;

    @NotBlank(message = "email cannot be blank")
    @NonNull
    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String fatherName;

    @Column(nullable = false)
    private String motherName;

    @Column(nullable = false)
    private String address;

    public Employee(String firstName, String lastName, String email, String contact, int age, String fatherName, String motherName, String address, LocalDate dob) {
    }
}
