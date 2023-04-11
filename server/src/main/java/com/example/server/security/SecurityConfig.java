package com.example.server.security;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

import com.example.server.security.filter.AuthenticationFilter;
import com.example.server.security.filter.ExceptionHandlerFilter;
import com.example.server.security.filter.JWTAuthorizationFilter;
import com.example.server.security.manager.CustomAuthenticationManager;

import lombok.AllArgsConstructor;

import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
@AllArgsConstructor
public class SecurityConfig {

    private final CustomAuthenticationManager customAuthenticationManager;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        AuthenticationFilter authenticationFilter = new AuthenticationFilter(customAuthenticationManager);
        authenticationFilter.setFilterProcessesUrl("/user/login");
        http
                .cors()
                // New Line: the h2 console runs on a "frame". By default, Spring
                // Security prevents rendering within an iframe. This line disables
                // its prevention.
                .and()
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/h2/**").permitAll()
                .antMatchers(HttpMethod.GET, "/v3/**").permitAll()
                .antMatchers(HttpMethod.GET, "/swagger-ui/**").permitAll()
                .antMatchers(HttpMethod.POST, "/user/register").permitAll()
                .antMatchers(HttpMethod.POST, "/user/login").permitAll()
                // New Line: allows us to access the h2 console without the need to
                // authenticate. ' ** ' instead of ' * ' because multiple path levels
                // will follow /h2.
//                .antMatchers("/employees/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .addFilterBefore(new ExceptionHandlerFilter(), AuthenticationFilter.class)
                .addFilter(authenticationFilter)
                .addFilterAfter(new JWTAuthorizationFilter(), AuthenticationFilter.class)
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        ;

        http.headers().frameOptions().sameOrigin();

        return http.build();
    }

}