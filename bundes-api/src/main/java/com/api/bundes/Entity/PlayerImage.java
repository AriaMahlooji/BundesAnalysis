package com.api.bundes.Entity;

import jakarta.persistence.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Arrays;

@Document(collection = "players")
public class PlayerImage {
    @Id
    private String id;
    private String name;
    private byte[] image;

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    @Override
    public String toString() {
        return "PlayerImage{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", image=" + Arrays.toString(image) +
                '}';
    }
}
