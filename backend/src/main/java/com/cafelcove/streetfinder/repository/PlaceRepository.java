package com.cafelcove.streetfinder.repository;

import com.cafelcove.streetfinder.dto.PlaceDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.concurrent.ThreadLocalRandom;

@Repository
public class PlaceRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private int rowCount = -1;

    private final RowMapper<PlaceDTO> placeRowMapper = (rs, rowNum) -> {
        int id = rs.getInt("id");
        String name = rs.getString("name");
        BigDecimal latitude = rs.getBigDecimal("latitude");
        BigDecimal longitude = rs.getBigDecimal("longitude");
        return new PlaceDTO(id, name, latitude, longitude);
    };

    public PlaceDTO getRandomPlace() {
        if (rowCount == -1) {
            rowCount = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM Place", Integer.class);
        }

        int randomRow = ThreadLocalRandom.current().nextInt(0, rowCount);

        return jdbcTemplate.queryForObject("SELECT * FROM Place LIMIT 1 OFFSET ?", placeRowMapper, randomRow);
    }
}
