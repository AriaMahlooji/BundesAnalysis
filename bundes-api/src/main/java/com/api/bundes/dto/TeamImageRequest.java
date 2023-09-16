package com.api.bundes.dto;

public class TeamImageRequest {
    private String name;
    private String image;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public TeamImageRequest(String name, String image) {
        this.name = name;
        this.image = image;
    }
}
