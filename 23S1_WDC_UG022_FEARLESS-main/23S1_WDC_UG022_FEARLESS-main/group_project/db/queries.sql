/* mysql --database FEARLESS < db/queries.sql */

/* sign up to create new users and protect user's password */
/*
INSERT INTO Users (
    username,
    pass,
    first_name,
    last_name,
    email,
    is_admin
) VALUES (
    'admin',
    'apass',
    'Admin',
    'Y',
    'sqy137@outlook.com',
    TRUE
);
*/
/* user_id: 2, username: manager, full name: Alice M */
/*
INSERT INTO Users (
    username,
    pass,
    first_name,
    last_name,
    email,
    is_admin
) VALUES (
    'manager',
    'mpass',
    'Alice',
    'M',
    'alice@example.com',
    FALSE
);
*/
/* user_id: 3, username: member, full name: Bob Smith */
/*
INSERT INTO Users (
    username,
    pass,
    first_name,
    last_name,
    email,
    is_admin
) VALUES (
    'member',
    'mpass',
    'Bob',
    'Smith',
    'bob@example.com',
    FALSE
);
*/

/* Clubs */
/* club_id: 1, Fitness Club */
INSERT INTO Clubs (
    club_name,
    poster,
    intro,
    email
) VALUES (
    'Fitness Club',
    'images/fitness_club3.jpg',
    "Welcome to the Fitness Club, where we believe that a healthy body leads to a healthy mind!
    Our club is a vibrant and inclusive community dedicated to promoting fitness, wellness, and overall well-being among students.
    With a wide range of activities and programs tailored specifically for students, we aim to create a supportive and energetic environment
    that fosters physical fitness, mental resilience, and personal growth. Whether you're a beginner or an experienced fitness enthusiast,
    our expert trainers and passionate members will inspire and motivate you on your journey towards a stronger, happier, and more confident you.
    Join us today and embrace a lifestyle that prioritizes your health and success!",
    '3354807369@qq.com'
);

/* club_id: 2, Game Club */
INSERT INTO Clubs (
    club_name,
    poster,
    intro,
    email
) VALUES (
    'Game Club',
    'images/gameclub.jpeg',
    "Welcome to our game club!",
    'GameClub@example.com'
);

/* Posts */
/* post_id: 1, Fitness club */
INSERT INTO Posts (
    post_title,
    post_content,
    is_public,
    created,
    club_id
) VALUES (
    'Public 1',
    'Welcome to Fitness Club!',
    TRUE,
    CURRENT_TIMESTAMP(),
    1
);

/* post_id: 2 Fitness club */
INSERT INTO Posts (
    post_title,
    post_content,
    is_public,
    created,
    club_id
) VALUES (
    'member-only 1',
    'some contents',
    FALSE,
    CURRENT_TIMESTAMP(),
    1
);

/* post_id: 3 Game club */
INSERT INTO Posts (
    post_title,
    post_content,
    is_public,
    created,
    club_id
) VALUES (
    'game puclic 1',
    'some contents',
    TRUE,
    CURRENT_TIMESTAMP(),
    2
);


/* Events */
/* event_id: 1 */
INSERT INTO Events (
    event_name,
    event_content,
    time,
    location,
    club_id
) VALUES (
    'Get Your Fitness on Track',
    "Looking to kickstart your fitness journey?
Our expert trainers will provide you with a personalized fitness assessment, including body composition, cardiovascular fitness, strength, and flexibility.
They will then work with you to create a customized workout plan that fits your goals, schedule, and abilities.
You'll also receive expert advice on nutrition and lifestyle habits to support your fitness journey.
Don't wait to get on track towards a healthier, happier you - sign up for our event today!",
    '3PM, Sunday, 02 July 2023',
    'Fitness Center',
    1
);

INSERT INTO Events (
    event_name,
    event_content,
    time,
    location,
    club_id
) VALUES (
    '2',
    "some event details",
    '3PM, Friday, 30 June 2023',
    'Fitness Center',
    1
);

INSERT INTO Events (
    event_name,
    event_content,
    time,
    location,
    club_id
) VALUES (
    'Game event',
    "some event details",
    '7PM, Friday, 30 June 2023',
    'Game Center',
    2
);
