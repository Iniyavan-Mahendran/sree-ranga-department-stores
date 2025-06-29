/**
 * Main Application Class
 * This is the entry point for our Spring Boot application
 * It starts the entire backend server
 */

package com.sreeranga;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class SreeRangaApplication {
    
    /**
     * Main method - starts the Spring Boot application
     * This is like pressing the "start" button for our server
     */
    public static void main(String[] args) {
        SpringApplication.run(SreeRangaApplication.class, args);
        System.out.println("🚀 Sree Ranga Department Stores Backend is running!");
        System.out.println("📚 API Documentation: http://localhost:8080/swagger-ui.html");
    }
}