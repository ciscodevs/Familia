package com.u3.apifamilia.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.u3.apifamilia.model.Integrante;
import com.u3.apifamilia.repository.IntegranteRepository;

@RestController
@RequestMapping("/api/integrantes")
@CrossOrigin(origins = "${APP_CORS_ALLOWED_ORIGINS}")
public class IntegranteController {

    private final IntegranteRepository integranteRepository;

    public IntegranteController(IntegranteRepository integranteRepository) {
        this.integranteRepository = integranteRepository;
    }

    @GetMapping
    public List<Integrante> listarIntegrantes() {
        return integranteRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Integrante> obtenerIntegrante(@PathVariable Integer id) {
        return integranteRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Integrante crearIntegrante(@RequestBody Integrante integrante) {
        return integranteRepository.save(integrante);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarIntegrante(@PathVariable Integer id) {
        if (!integranteRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        integranteRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
