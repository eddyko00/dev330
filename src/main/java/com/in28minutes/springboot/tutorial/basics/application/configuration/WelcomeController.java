package com.in28minutes.springboot.tutorial.basics.application.configuration;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

//http://localhost:8080/index
@CrossOrigin(origins = "*", allowedHeaders = "*") // "http://localhost:8080")
@Controller
public class WelcomeController {

    @RequestMapping("/welcome")
    public String loginMessage() {
        return "welcome";
    }

    @RequestMapping("/index")
    public String indexMessage() {
        return "index";
    }


}
