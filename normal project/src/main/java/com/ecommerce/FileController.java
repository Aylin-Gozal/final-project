package com.ecommerce;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.*;

@RestController
@RequestMapping("/api/files")
@Tag(name = "File controller")
public class FileController {
    private final Path uploadDirectory = Paths.get("uploads", "images").toAbsolutePath().normalize();
    @PostMapping(consumes = "multipart/form-data") public String upload(@RequestParam MultipartFile file) throws Exception { Files.createDirectories(uploadDirectory); String filename = Paths.get(file.getOriginalFilename()).getFileName().toString(); Files.copy(file.getInputStream(), uploadDirectory.resolve(filename), StandardCopyOption.REPLACE_EXISTING); return filename; }
    @GetMapping("/download/{filename:.+}") public ResponseEntity<Resource> download(@PathVariable String filename) throws Exception { Path file = uploadDirectory.resolve(filename).normalize(); if (!file.startsWith(uploadDirectory) || !Files.exists(file)) return ResponseEntity.notFound().build(); return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFileName() + "\"").body(new UrlResource(file.toUri())); }
}
