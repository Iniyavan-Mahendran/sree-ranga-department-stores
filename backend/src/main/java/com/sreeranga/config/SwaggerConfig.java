/**
 * Swagger Configuration
 * This sets up automatic API documentation for our backend
 * Developers can see all available endpoints and test them
 */

package com.sreeranga.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.Components;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    
    /**
     * Configure OpenAPI documentation
     * This creates a nice web page showing all our API endpoints
     */
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Sree Ranga Department Stores API")
                        .description("Complete e-commerce backend API for Sree Ranga Department Stores")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Sree Ranga Team")
                                .email("api@sreeranga.com")
                                .url("https://sreeranga.com"))
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT")))
                .addSecurityItem(new SecurityRequirement().addList("Bearer Authentication"))
                .components(new Components()
                        .addSecuritySchemes("Bearer Authentication",
                                new SecurityScheme()
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")
                                        .description("Enter JWT token")));
    }
}