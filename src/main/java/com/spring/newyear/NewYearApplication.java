package com.spring.newyear;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
public class NewYearApplication {

	public static void main(String[] args) {
		SpringApplication.run(NewYearApplication.class, args);
	}

	@GetMapping
	@RequestMapping("/helloworld")
	public String helloWorld() {
		String result = "Hello World!";
		return result;
	}


}
