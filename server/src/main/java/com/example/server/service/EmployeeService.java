package com.example.server.service;

import java.util.List;

import com.example.server.entity.Employee;

public interface EmployeeService {

    List<Employee> getEmployees();

    Employee getEmployee(Long id);

    Employee saveEmployee(Employee employee);

    void deleteEmployee(Long id);

    Employee updateEmployee(Long id, Employee employee);

    void deleteAll();

}
