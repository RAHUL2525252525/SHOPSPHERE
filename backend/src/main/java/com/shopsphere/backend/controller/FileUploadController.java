package com.shopsphere.backend.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/api/upload")
@CrossOrigin("*")
public class FileUploadController {

    private static final String UPLOAD_DIR = "uploads/products/";

    @PostMapping(
            value = "/image",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public String uploadImage(
            @RequestParam("file") MultipartFile file)
            throws IOException {

        File folder = new File(UPLOAD_DIR);

        if (!folder.exists()) {
            folder.mkdirs();
        }

        String fileName =
                UUID.randomUUID() + "_" + file.getOriginalFilename();

        file.transferTo(new File(UPLOAD_DIR + fileName));

        return "http://localhost:8080/uploads/products/" + fileName;

    }

}