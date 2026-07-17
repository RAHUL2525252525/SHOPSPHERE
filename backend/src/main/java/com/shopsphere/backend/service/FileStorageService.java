package com.shopsphere.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileStorageService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Value("${app.base-url}")
    private String baseUrl;

    /**
     * Saves the given file under the upload directory with a unique name
     * and returns a public URL such as http://localhost:8080/uploads/xxx.jpg
     * Returns null if no file was supplied.
     */
    public String store(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return null;
        }

        try {
            Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
            Files.createDirectories(uploadPath);

            String originalName = StringUtils.cleanPath(
                    file.getOriginalFilename() == null ? "file" : file.getOriginalFilename()
            );
            String extension = "";
            int dotIndex = originalName.lastIndexOf('.');
            if (dotIndex >= 0) {
                extension = originalName.substring(dotIndex);
            }

            String storedName = UUID.randomUUID() + extension;
            Path targetPath = uploadPath.resolve(storedName);

            try (InputStream in = file.getInputStream()) {
                Files.copy(in, targetPath, StandardCopyOption.REPLACE_EXISTING);
            }

            return baseUrl + "/uploads/" + storedName;
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file: " + file.getOriginalFilename(), e);
        }
    }

    /**
     * Resolves the final image URL for a single image slot:
     * - if a new file was uploaded, that wins and gets stored on disk
     * - otherwise fall back to the pasted URL text field, ignoring
     *   local blob: preview URLs the frontend generates before upload
     */
    public String resolveImage(MultipartFile file, String pastedUrl) {
        String stored = store(file);
        if (stored != null) {
            return stored;
        }
        if (pastedUrl != null && !pastedUrl.isBlank() && !pastedUrl.startsWith("blob:")) {
            return pastedUrl;
        }
        return null;
    }
}
