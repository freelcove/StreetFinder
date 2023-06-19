package com.cafelcove.streetfinder.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

@RestController
public class WarmupController {

    private static final ConcurrentHashMap<String, Long> lastAccessTimes = new ConcurrentHashMap<>();
    private static final long COOLDOWN_SECONDS = 15; // 15 seconds

    @GetMapping("/warmup")
    public String warmup() {
        long currentTime = System.currentTimeMillis();
        Long lastAccessTime = lastAccessTimes.get("warmup");

        if (lastAccessTime != null && (currentTime - lastAccessTime) < TimeUnit.SECONDS.toMillis(COOLDOWN_SECONDS)) {
            return "Warmup already performed recently. Please wait.";
        }

        // Store the current time as the last access time.
        lastAccessTimes.put("warmup", currentTime);

        // Perform the warmup logic here.
        return "Backend is warmed up!";
    }
}
