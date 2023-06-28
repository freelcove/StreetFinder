package com.cafelcove.streetfinder.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

@RestController
public class WarmupController {

    // A thread-safe map to store the last access times
    private static final ConcurrentHashMap<String, Long> lastAccessTimes = new ConcurrentHashMap<>();
    // Cooldown period between warmup calls, in seconds
    private static final long COOLDOWN_SECONDS = 15;

    /**
     * A method to perform a warmup of the backend
     * @return a message indicating the result of the warmup
     */
    @GetMapping("/warmup")
    public String warmup() {
        long currentTime = System.currentTimeMillis();
        Long lastAccessTime = lastAccessTimes.get("warmup");

        // If a warmup was already performed in the last COOLDOWN_SECONDS, refuse the call
        if (lastAccessTime != null && (currentTime - lastAccessTime) < TimeUnit.SECONDS.toMillis(COOLDOWN_SECONDS)) {
            return "Warmup already performed recently. Please wait.";
        }

        // Store the current time as the last access time
        lastAccessTimes.put("warmup", currentTime);

        // Perform the warmup logic here...

        return "Backend is warmed up!";
    }
}

