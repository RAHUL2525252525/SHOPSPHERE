package com.shopsphere.backend;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaController {

    @GetMapping({
        "/{path:^(?!api$)[^\\.]*}",
        "/{path:^(?!api$)[^\\.]*}/{sub:[^\\.]*}"
    })
    public String forward() {
        return "forward:/index.html";
    }
}
