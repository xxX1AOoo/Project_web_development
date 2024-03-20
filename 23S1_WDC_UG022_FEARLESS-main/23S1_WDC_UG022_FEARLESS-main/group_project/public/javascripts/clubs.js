function renderClubs() {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200){
            for(let data of JSON.parse(req.responseText)){
                /*
                <div class="club" id="clubs-container" style="overflow:auto">
                    <div class="club_image">
                        <dl>
                            <dt>
                                <img src="images/fitness_club.jpg" alt="fitness_club" width="100">
                            </dt>
                            <dd>Fitness club</dd>
                        </dl>
                    </div>
                */

                let club_div = document.createElement('DIV');
                let club_dl = document.createElement('DL');
                let club_dt = document.createElement('DT');
                let club_img = document.createElement('IMG');
                let club_dd = document.createElement('DD');

                club_div.classList.add("club_image");
                club_img.setAttribute('width', '100');
                club_img.classList.add('club-image');

                club_img.src = data.poster;
                club_dd.innerText = data.club_name;

                club_div.appendChild(club_dl);
                club_dl.appendChild(club_dt);
                club_dt.appendChild(club_img);
                club_dl.appendChild(club_dd);
                document.getElementById("clubs-container").appendChild(club_div);

                // club_dt.setAttribute('onclick', 'toClub()');

                club_dt.onclick = function(){
                    let id = data.club_id;
                    let req1 = new XMLHttpRequest();
                    req1.onreadystatechange = function(){
                        if(this.readyState === 4 && this.status === 200){
                            let clubdata = JSON.parse(this.responseText);
                            // console.log(clubdata);

                            document.getElementById('page-title').innerText = clubdata.data.club_name;
                            document.getElementById('page-img').src = clubdata.data.poster;
                            /*
                            <div class="div-margin">
                                <h1>Fitness club</h1>
                                <p>(club_id)</p>
                                <h3 class="paragraph">intro</h3>
                            </div>
                            */
                            let info_div = document.createElement('DIV');
                            let name_h1 = document.createElement('H1');

                            let info_id_p = document.createElement("P");
                            info_id_p.setAttribute("id", "club-id");
                            info_id_p.style.display = "none";
                            info_id_p.innerText = clubdata.data.club_id;


                            let intro_h3 = document.createElement('H3');
                            info_div.classList.add("div-margin");
                            intro_h3.classList.add("paragraph");
                            info_div.appendChild(name_h1);
                            info_div.appendChild(info_id_p);
                            info_div.appendChild(intro_h3);
                            document.getElementById("club-detail").appendChild(info_div);

                            name_h1.innerText = clubdata.data.club_name;
                            intro_h3.innerText = clubdata.data.intro;

                            /*
                            <div class="div-margin">
                                <h3 class="title_l">Contact us</h3>
                                <h2>Email: FitnessClub@163.com</h2>
                                <button type="button" id="join-button"
                                onclick="join()">Click to join us!!!</button>
                            </div>
                            */

                            let contact_div = document.createElement('DIV');
                            let contact_h3 = document.createElement('H3');
                            let email_h2 = document.createElement('H2');
                            let join_button = document.createElement('BUTTON');
                            contact_div.classList.add('div-margin');
                            contact_h3.classList.add('title_l');
                            join_button.setAttribute('id', 'join-button');
                            join_button.setAttribute('type', 'button');

                            contact_div.appendChild(contact_h3);
                            contact_div.appendChild(email_h2);
                            contact_div.appendChild(join_button);

                            contact_h3.innerText = 'Contact us';
                            email_h2.innerText = 'Email: ' + clubdata.data.email;
                            join_button.innerText = 'Click to join us!!!';
                            join_button.setAttribute("onclick", "join()");

                            document.getElementById("club-detail").appendChild(contact_div);

                            /*
                            <div id="post-update" class="div-margin">
                                <h3 class="title_l">Post</h3>
                                <!-- post test
                                <div class="post-margin">
                                    <h3>Hi</h3>
                                    <p>test</p>
                                    <p>(time)</p>
                                </div> -->
                            </div>
                            */

                            // posts banner
                            let allposts_div = document.createElement('DIV');
                            allposts_div.setAttribute('id', 'post-update');
                            allposts_div.classList.add("div-margin");

                            let posts_h3 = document.createElement('H3');
                            posts_h3.classList.add('title_l');
                            posts_h3.innerText = 'Post';

                            allposts_div.appendChild(posts_h3);
                            document.getElementById("club-posts").appendChild(allposts_div);

                            // get posts button
                            let get_posts_button = document.createElement("BUTTON");
                            get_posts_button.setAttribute("type", "button");
                            get_posts_button.setAttribute("id", "posts-button");
                            get_posts_button.style.margin= "0 50px";
                            get_posts_button.innerText = "View Posts";
                            get_posts_button.setAttribute("onclick", "getPosts();getMemberPosts()");
                            document.getElementById("club-posts").appendChild(get_posts_button);

                            // create updates button
                            let create_updates_button = document.createElement("BUTTON");
                            create_updates_button.setAttribute("type", "button");
                            create_updates_button.setAttribute("id", "create-button");
                            create_updates_button.style.margin= "0 50px";
                            create_updates_button.innerText = "Create Updates";
                            create_updates_button.setAttribute("onclick", "createUpdates()");
                            document.getElementById("club-posts").appendChild(create_updates_button);

                            /*
                            <div id="post-event" class="div-margin">
                                <h3 class="title_l">Event</h3>
                                <div class="post-margin">
                                    <h3>Get Your Fitness on Track</h3>
                                    <p>contents</p>
                                    <h3>Time: 6PM 20/05/2023</h3>
                                    <h3>Location: Fitness Center</h3>
                                </div>
                            </div>
                            */

                            // events banner
                            let allevents_div = document.createElement('DIV');
                            allevents_div.setAttribute('id', 'post-event');
                            allevents_div.classList.add("div-margin");

                            let events_h3 = document.createElement('H3');
                            events_h3.classList.add('title_l');
                            events_h3.innerText = 'Event';

                            allevents_div.appendChild(events_h3);
                            document.getElementById("club-detail").appendChild(allevents_div);

                            // all events
                            // events + share button ////////////////////////////////////
                            for (let index = 0; index < clubdata.data.events.length; index++) {
                                let event = clubdata.data.events[index];
                                let event_div = document.createElement('DIV');
                                event_div.classList.add("post-margin");

                                let event_name = document.createElement('H3');
                                event_name.classList.add("event-name-share");

                                let event_content = document.createElement('P');
                                event_content.classList.add("event-content-share");

                                let event_time = document.createElement('P');
                                let event_location = document.createElement('P');

                                let event_share_button = document.createElement("BUTTON");
                                event_share_button.setAttribute("type", "button");
                                event_share_button.style.margin = "0 50px";
                                // event_share_button.innerText = "";

                                event_share_button.classList.add("fa");
                                event_share_button.classList.add("fa-twitter");

                                event_share_button.onclick = function() {
                                    function truncateText(text, maxLength) {
                                        if (text.length > maxLength) {
                                            return text.slice(0, maxLength) + "...";
                                        }
                                        return text;
                                    }
                                    let reqb = new XMLHttpRequest();
                                    reqb.onreadystatechange = function (){
                                        if(req.readyState === 4 && req.status === 403){
                                            alert('NOT Logged In!');
                                        }
                                        if(this.readyState === 4 && this.status === 200){
                                            if((JSON.parse(this.responseText)).length <= 0){
                                                alert('NOT club manager');
                                            }
                                            if((JSON.parse(this.responseText))[0].is_manager){
                                                var url = encodeURIComponent(window.location.href);
                                                var title = document.getElementsByClassName("event-name-share")[index].innerText;
                                                var content = document.getElementsByClassName("event-content-share")[index].innerText;
                                                var truncatedTitle = truncateText(title, 30);
                                                var truncatedText = truncateText(content, 180);
                                                var sendTitle = encodeURIComponent(truncatedTitle);
                                                var text = encodeURIComponent(truncatedText);

                                                var shareUrl = "https://twitter.com/intent/tweet?url=" + url + "&text=" + sendTitle + text;
                                                window.open(shareUrl);
                                            } else {
                                                alert('NOT club manager');
                                            }
                                        }
                                    };
                                    reqb.open('GET', '/users/manager/eventShare/' + id, true);
                                    reqb.send();
                                };

                                event_name.innerText = event.event_name;
                                event_content.innerText = event.event_content;
                                event_time.innerText = event.time;
                                event_location.innerText = event.location;

                                event_div.appendChild(event_name);
                                event_div.appendChild(event_content);
                                event_div.appendChild(event_time);
                                event_div.appendChild(event_location);

                                event_div.appendChild(event_share_button);

                                document.getElementById("post-event").appendChild(event_div);
                            }
                            // /////////////////////////////////////////////////////////////////

                            // create events button
                            let create_events_button = document.createElement("BUTTON");
                            create_events_button.setAttribute("type", "button");
                            create_events_button.setAttribute("id", "create-events-button");
                            create_events_button.style.margin= "0 50px";
                            create_events_button.innerText = "Create Events";
                            create_events_button.setAttribute("onclick", "createEvents()");
                            document.getElementById("club-posts").appendChild(create_events_button);

                            // check members button
                            let members_button = document.createElement("BUTTON");
                            members_button.setAttribute("type", "button");
                            members_button.setAttribute("id", "members-button");
                            members_button.style.margin= "0 50px";
                            members_button.innerText = "Check Members";
                            members_button.setAttribute("onclick", "checkMembers()");
                            document.getElementById("club-posts").appendChild(members_button);

                            // check RSVP button
                            let rsvp_button = document.createElement("BUTTON");
                            rsvp_button.setAttribute("type", "button");
                            rsvp_button.setAttribute("id", "rsvp-button");
                            rsvp_button.style.margin= "0 50px";
                            rsvp_button.innerText = "Check Events Attending";
                            rsvp_button.setAttribute("onclick", "checkRSVP()");
                            document.getElementById("club-posts").appendChild(rsvp_button);
                        }
                        document.getElementById("clubs-container").style.display = "none";
                    };
                    req1.open('GET', "/clubs.html/" + id, true);
                    req1.send();
                };
            }
        }
    };
    req.open('GET', '/clubs');
    req.send();
}

function join() {
    let id = document.getElementById("club-id").innerText;
    let joindata = { clubid: id };
    let reqo = new XMLHttpRequest();
    reqo.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 403){
            alert('NOT Logged In!');
        }
        if(this.readyState === 4 && this.status === 200){
            console.log("member or not: " + this.responseText);
            if((JSON.parse(this.responseText)).length <= 0){
                let req = new XMLHttpRequest();
                req.onreadystatechange = function(){
                    if(this.readyState === 4 && this.status === 200){
                        alert("Welcome!");
                    } else if(this.readyState === 4 && this.status === 403){
                        alert('NOT Logged In!');
                    }
                };
                req.open('POST', '/users/join');
                req.setRequestHeader('Content-Type', 'application/json');
                req.send(JSON.stringify(joindata));
            } else {
                alert('You have joined the club!');
            }
        }
    };
    reqo.open('GET', '/users/checkjoined/' + id, true);
    reqo.send();

}

function getPosts() {
    let id = document.getElementById("club-id").innerText;
    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if(req.readyState === 4 && req.status === 200){
            for(let publicpost of JSON.parse(req.responseText)){
                let post_div = document.createElement('DIV');
                let post_title = document.createElement('H3');
                let post_content = document.createElement('P');
                let post_time = document.createElement('P');

                post_div.classList.add("post-margin");

                post_div.appendChild(post_title);
                post_div.appendChild(post_content);
                post_div.appendChild(post_time);

                post_title.innerText = publicpost.post_title;
                post_content.innerText = publicpost.post_content;
                post_time.innerText = publicpost.created;

                document.getElementById("post-update").appendChild(post_div);
            }
            document.getElementById("posts-button").style.display = "none";
        }
    };
    req.open('GET', '/posts.json/' + id, true);
    req.send();
}


function getMemberPosts() {
    let id = document.getElementById("club-id").innerText;
    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if(req.readyState === 4 && req.status === 200){
            for(let memberpost of JSON.parse(req.responseText)){
                let post_div = document.createElement('DIV');
                let post_title = document.createElement('H3');
                let post_content = document.createElement('P');
                let post_time = document.createElement('P');

                post_div.classList.add("post-margin");

                post_div.appendChild(post_title);
                post_div.appendChild(post_content);
                post_div.appendChild(post_time);

                post_title.innerText = memberpost.post_title;
                post_content.innerText = memberpost.post_content;
                post_time.innerText = memberpost.created;

                document.getElementById("post-update").appendChild(post_div);

                document.getElementById("posts-button").style.display = "none";
            }
        }
    };
    req.open('GET', '/users/posts.json/' + id, true);
    req.send();
}

function createUpdates() {
    let data = `
    <div class="div-margin">
        <h3 class="title_l">Post Updates</h3>
        <br>
        <form class="div-margin>
            <label for="post-title" class="required">Title:</label>
            <input type="text" id="post-title" name="post-title" required><br><br>

            <label for="post-content" class="required">Content:</label><br>
            <textarea type="text" id="post-content" class="input-event" name="post-content" style="height:20vw;width:45vw;"required></textarea><br><br>

            <label for="post-private" class="required">Member-only</label>
            <input type="checkbox" id="post-private" name="post-private"><br><br>

            <input type="submit" value="Post" onclick="postUpdates()">
        </form>
    </div>`;

    let id = document.getElementById("club-id").innerText;
    let req = new XMLHttpRequest();
    req.onreadystatechange = function (){
        if(req.readyState === 4 && req.status === 200){
            let managerdata = JSON.parse(this.responseText);
            if(managerdata.length <= 0){
                alert('NOT club manager');
            }
            if(managerdata[0].is_manager){
                document.getElementById("create-posts").innerHTML = data;
            } else {
                alert('NOT club manager');
            }
        } else if(req.readyState === 4 && req.status === 403){
            alert('NOT Logged In!');
        }
    };
    req.open('GET', '/users/manager/renderPost/' + id, true);
    req.send();
}

function postUpdates(){
    let status = "";
    if(document.getElementById('post-private').checked){
        status = false;
    } else {
        status = true;
    }

    let postdata = {
        title: document.getElementById("post-title").value,
        content: document.getElementById("post-content").value,
        is_public: status
    };
    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if(req.readyState === 4 && req.status === 200){
            alert('Posted successfully');
        }
    };
    let id = document.getElementById("club-id").innerText;
    req.open('POST', '/users/manager/newpost/' + id, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(postdata));
}

function createEvents() {
    let eventdata = `
    <div class="div-margin">
        <h3 class="title_l">Post Events</h3>
        <br>
        <form class="div-margin>
            <label for="event-title" class="required">Title:</label>
            <input type="text" id="event-title" name="event-title" required><br><br>

            <label for="event-content" class="required">Content:</label><br>
            <textarea type="text" id="event-content" class="input-event" name="event-content" style="height:20vw;width:45vw;"required></textarea><br><br>

            <label for="event-time" class="required">Time:</label>
            <input type="text" id="event-time" name="event-time" required><br><br>

            <label for="event-location" class="required">Location:</label>
            <input type="text" id="event-location" name="event-location" required><br><br>

            <input type="submit" value="Post" onclick="postEvents();sendRSVP()">
        </form>
    </div>`;
    let id = document.getElementById("club-id").innerText;
    let req = new XMLHttpRequest();
    req.onreadystatechange = function (){
        if(req.readyState === 4 && req.status === 200){
            let managerdata = JSON.parse(this.responseText);
            if(managerdata.length <= 0){
                alert('NOT club manager');
            }
            if(managerdata[0].is_manager){
                document.getElementById("create-posts").innerHTML = eventdata;
            } else {
                alert('NOT club manager');
            }
        } else if(req.readyState === 4 && req.status === 403){
            alert('NOT Logged In!');
        }
    };
    req.open('GET', '/users/manager/renderPost/' + id, true);
    req.send();
}


function postEvents() {
    let eventdata = {
        title: document.getElementById("event-title").value,
        content: document.getElementById("event-content").value,
        time: document.getElementById("event-time").value,
        location: document.getElementById("event-location").value
    };
    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if(req.readyState === 4 && req.status === 200){
            alert('Posted successfully');
        }
    };
    let id = document.getElementById("club-id").innerText;
    req.open('POST', '/users/manager/newevent/' + id, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(eventdata));
}


function checkMembers() {
    let id = document.getElementById("club-id").innerText;
    let membertable = `
    <div class="div-margin">
        <h3>Check members</h3>
        <table id="members">
        <thead>
            <tr>
                <th>First name</th>
                <th>Last name</th>
            </tr>
        </thead>
        </table>
    </div>`;

    let req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            let managerdata = JSON.parse(this.responseText);
            if(managerdata.length <= 0){
                alert('NOT club manager');
            }
            if(managerdata[0].is_manager){
                document.getElementById("check-members").innerHTML = membertable;

                let req1 = new XMLHttpRequest();
                req1.onreadystatechange = function(){
                    if(this.readyState === 4 && this.status === 200){
                        let memberdata = JSON.parse(this.responseText);
                        for(let member of memberdata){
                            let tr = document.createElement('TR');
                            let td_first = document.createElement('TD');
                            let td_last = document.createElement('TD');

                            tr.appendChild(td_first);
                            tr.appendChild(td_last);
                            document.getElementById("members").appendChild(tr);

                            td_first.innerHTML = member.first_name;
                            td_last.innerHTML = member.last_name;
                        }
                    }
                };
                req1.open('GET', '/users/manager/members/' + id , true);
                req1.send();
            } else {
                alert('NOT club manager');
            }
        } else if(req.readyState === 4 && req.status === 403){
            alert('NOT Logged In!');
        }
    };
    req.open('GET', '/users/manager/renderPost/' + id, true);
    req.send();
}

function checkRSVP() {
    let id = document.getElementById("club-id").innerText;
    let checktable = `
    <div class="div-margin">
        <h3>Check Events Attending</h3>
        <table id="check-attend">
            <thead>
                <tr>
                    <th>Events</th>
                    <th>First name</th>
                    <th>Last name</th>
                </tr>
            </thead>
        </table>
    </div>`;

    let req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            let managerdata = JSON.parse(this.responseText);
            if(managerdata.length <= 0){
                alert('NOT club manager');
            }
            if(managerdata[0].is_manager){
                document.getElementById("RSVP").innerHTML = checktable;

                let req1 = new XMLHttpRequest();
                req1.onreadystatechange = function(){
                    if(this.readyState === 4 && this.status === 200){
                        let attenddata = JSON.parse(this.responseText);
                        for(let attendmember of attenddata){
                            let tr = document.createElement('TR');
                            let td_event = document.createElement('TD');
                            let td_first = document.createElement('TD');
                            let td_last = document.createElement('TD');

                            tr.appendChild(td_event);
                            tr.appendChild(td_first);
                            tr.appendChild(td_last);

                            td_event.innerHTML = attendmember.event_name;
                            td_first.innerHTML = attendmember.first_name;
                            td_last.innerHTML = attendmember.last_name;

                            document.getElementById("check-attend").appendChild(tr);
                        }
                    }
                };
                req1.open('GET', '/users/manager/checkattend/' + id , true);
                req1.send();
            } else {
                alert('NOT club manager');
            }
        } else if(req.readyState === 4 && req.status === 403){
            alert('NOT Logged In!');
        }
    };
    req.open('GET', '/users/manager/renderPost/' + id, true);
    req.send();
}