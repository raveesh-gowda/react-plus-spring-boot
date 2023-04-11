package com.example.server.service;

import com.example.server.entity.Employee;
import com.example.server.exception.EntityNotFoundException;
import com.example.server.repository.EmployeeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@AllArgsConstructor
@Service
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;

    static Employee unwrapEmployee(Optional<Employee> entity, Long id) {
        if (entity.isPresent()) return entity.get();
        else throw new EntityNotFoundException(id, Employee.class);
    }

    @Override
    public List<Employee> getEmployees() {
        return (List<Employee>) employeeRepository.findAll();
    }

    @Override
    public Employee getEmployee(Long id) {
        Optional<Employee> employee = employeeRepository.findById(id);
        return unwrapEmployee(employee, id);
    }

    @Override
    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }

    @Override
    public Employee updateEmployee(Long id, Employee employee) {
        Employee emp = employeeRepository.findById(id).get();

        if (Objects.nonNull(employee.getFirstName())
                && !"".equalsIgnoreCase(
                employee.getFirstName())) {
            emp.setFirstName(
                    employee.getFirstName());
        }

        if (Objects.nonNull(employee.getLastName())
                && !"".equalsIgnoreCase(
                employee.getLastName())) {
            emp.setLastName(
                    employee.getLastName());
        }

        if (Objects.nonNull(employee.getDob())
        ) {
            emp.setDob(
                    employee.getDob());
        }

        if (Objects.nonNull(employee.getAge())
        ) {
            emp.setAge(
                    employee.getAge());
        }

        if (Objects.nonNull(employee.getContact())
                && !"".equalsIgnoreCase(
                employee.getContact())) {
            emp.setContact(
                    employee.getContact());
        }

        if (Objects.nonNull(employee.getEmail())
                && !"".equalsIgnoreCase(
                employee.getEmail())) {
            emp.setEmail(
                    employee.getEmail());
        }

        if (Objects.nonNull(employee.getFatherName())
                && !"".equalsIgnoreCase(
                employee.getFatherName())) {
            emp.setFatherName(
                    employee.getFatherName());
        }

        if (Objects.nonNull(employee.getMotherName())
                && !"".equalsIgnoreCase(
                employee.getMotherName())) {
            emp.setMotherName(
                    employee.getMotherName());
        }

        if (Objects.nonNull(employee.getAddress())
                && !"".equalsIgnoreCase(
                employee.getAddress())) {
            emp.setAddress(
                    employee.getAddress());
        }

        return employeeRepository.save(emp);
    }

    @Override
    public void deleteAll() {
        employeeRepository.deleteAll();
    }

}
