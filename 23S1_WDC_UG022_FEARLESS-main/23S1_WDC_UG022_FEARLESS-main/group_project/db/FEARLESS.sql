/* mysql < db/FEARLESS.sql */
CREATE DATABASE FEARLESS;
USE FEARLESS;

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    pass VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    avatar VARCHAR(255) DEFAULT 'images/cat_profile.jpeg',
    email VARCHAR(255),
    is_admin BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (user_id)
);

CREATE TABLE Clubs (
    club_id INT AUTO_INCREMENT,
    club_name VARCHAR(255) NOT NULL UNIQUE,
    poster VARCHAR(255),
    intro TEXT,
    email VARCHAR(255),
    PRIMARY KEY (club_id)
);

CREATE TABLE Members (
    member_id INT AUTO_INCREMENT,
    is_manager BOOLEAN NOT NULL DEFAULT FALSE,
    user_id INT NOT NULL,
    club_id INT NOT NULL,
    PRIMARY KEY (member_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (club_id) REFERENCES Clubs(club_id) ON DELETE CASCADE
);

CREATE TABLE Posts (
    post_id INT AUTO_INCREMENT,
    post_title VARCHAR(255),
    post_content TEXT,
    is_public BOOLEAN NOT NULL DEFAULT TRUE,
    created DATETIME,
    author INT,
    club_id INT NOT NULL,
    PRIMARY KEY (post_id),
    FOREIGN KEY (author) REFERENCES Users(user_id) ON DELETE SET NULL,
    FOREIGN KEY (club_id) REFERENCES Clubs(club_id) ON DELETE CASCADE
);

CREATE TABLE Events (
    event_id INT AUTO_INCREMENT,
    event_name VARCHAR(255),
    event_content TEXT,
    time VARCHAR(255),
    location VARCHAR(255),
    club_id INT NOT NULL,
    PRIMARY KEY (event_id),
    FOREIGN KEY (club_id) REFERENCES Clubs(club_id) ON DELETE CASCADE
);

CREATE TABLE RSVP (
    RSVP_id INT AUTO_INCREMENT,
    is_attending BOOLEAN NOT NULL DEFAULT FALSE,
    event_id INT NOT NULL,
    club_id INT NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (RSVP_id),
    FOREIGN KEY (event_id) REFERENCES Events(event_id) ON DELETE CASCADE,
    FOREIGN KEY (club_id) REFERENCES Clubs(club_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);
