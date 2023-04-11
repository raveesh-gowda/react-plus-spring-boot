package com.example.server.repository;


import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.example.server.entity.User;

public interface UserRepository extends CrudRepository<User, Long> {
	 Optional<User> findByUsername(String username);
	// boolean existsByUsername(String username);
}