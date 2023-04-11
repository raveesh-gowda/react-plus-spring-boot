package com.example.server.web;


import com.example.server.exception.ErrorResponse;
import com.example.server.service.EmployeeService;
import com.example.server.entity.Employee;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/employees")
@Tag(name = "Employees", description = "CRUD based operations on the employees")
@CrossOrigin(origins = "*")
public class EmployeeController {

    @Autowired
    EmployeeService employeeService;

    @GetMapping("/all")
    @ApiResponse(responseCode = "200", description = "Successful retrieval of employees", content = @Content(array = @ArraySchema(schema = @Schema(implementation = Employee.class))))
    @Operation(summary = "Retrieve employees", description = "Provides a list of all employees")
    public ResponseEntity<List<Employee>> getEmployees() {
        return new ResponseEntity<>(employeeService.getEmployees(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "404", description = "Employee doesn't exist", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "200", description = "Successful retrieval of employee", content = @Content(schema = @Schema(implementation = Employee.class))),
    })
    @Operation(summary = "Get employee by id", description = "Returns a employee based on an id")
    public ResponseEntity<Employee> getEmployee(@PathVariable Long id) {
        return new ResponseEntity<>(employeeService.getEmployee(id), HttpStatus.OK);
    }

    @PostMapping("/create")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Successful creation of employee"),
            @ApiResponse(responseCode = "400", description = "Bad request: unsuccessful submission", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @Operation(summary = "Create employee", description = "Creates a employee from the provided payload")
    public ResponseEntity<Employee> saveEmployee(@Valid @RequestBody Employee employee) {
        employeeService.saveEmployee(employee);
        return new ResponseEntity<>(employeeService.saveEmployee(employee), HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful updation of employee"),
            @ApiResponse(responseCode = "400", description = "Bad request: unsuccessful submission", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @Operation(summary = "Updates employee", description = "Updates a employee from the provided payload")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @Valid @RequestBody Employee employee) {
        employeeService.updateEmployee(id, employee);
        return new ResponseEntity<Employee>(employeeService.updateEmployee(id, employee), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "404", description = "Employee doesn't exist", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "200", description = "Successful deletion of employee", content = @Content(schema = @Schema(implementation = Employee.class))),
    })
    @Operation(summary = "Deletes employee", description = "Deletes an employee based on id")
    public ResponseEntity<HttpStatus> deleteStudent(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/delete/all")
    @ApiResponse(responseCode = "200", description = "Successful deletion of employees", content = @Content(array = @ArraySchema(schema = @Schema(implementation = Employee.class))))
    @Operation(summary = "Delete all employees", description = "Deletes a list of all employees")
    public ResponseEntity<HttpStatus> deleteStudent() {
        employeeService.deleteAll();
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
