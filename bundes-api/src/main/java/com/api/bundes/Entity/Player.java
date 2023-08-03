package com.api.bundes.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "players")
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name="name")
    private String name;

    @OneToMany(mappedBy = "player")
    @JsonIgnore
    private List<PlaysIn> playsIn;

    public Integer getId() {
        return id;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<PlaysIn> getPlaysIn() {
        return playsIn;
    }

    @JsonIgnore
    public String getPlayerNameAbbreviation(String name) {
        if (name.split(" ").length == 1) {
            return name;
        }

        StringBuilder abbreviatedName = new StringBuilder();
        String[] nameParts = name.split(" ");

        for (int i = 0; i < nameParts.length; i++) {
            if (i != nameParts.length - 1) {
                abbreviatedName.append(nameParts[i].charAt(0)).append(". ");
            } else {
                abbreviatedName.append(nameParts[i]);
            }
        }

        return abbreviatedName.toString();
    }
}