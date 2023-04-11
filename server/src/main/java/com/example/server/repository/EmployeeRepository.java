package com.example.server.repository;

import org.springframework.data.repository.CrudRepository;

import com.example.server.entity.Employee;

public interface EmployeeRepository extends CrudRepository<Employee, Long> {
}
