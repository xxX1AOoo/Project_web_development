function getEvents() {
    /*
    <div class="post-margin">
        <h3 id="fitness-event-title">Get Your Fitness on Track</h3>
        <p>contents</p>
        <h3 id="fitness-event-time">Time: 6PM 20/05/2023</h3>
        <h3 id="fitness-event-location">Location: Fitness Center</h3>
    </div>
    */
    let req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if(req.readyState === 4 && req.status === 200){
            let eventdata = JSON.parse(req.responseText);
            for(let event of eventdata){
                let event_div = document.createElement('DIV');
                event_div.classList.add("post-margin");

                let event_name = document.createElement('H3');
                let event_content = document.createElement('PRE');
                let event_time = document.createElement('P');
                let event_location = document.createElement('P');
                let event_more = document.createElement('P');


                event_name.innerText = event.event_name;
                event_content.innerText = event.event_content;
                event_time.innerText = 'Time: ' + event.time;
                event_location.innerText = 'Location: ' + event.location;
                event_more.innerText = 'By ' + event.club_name;

                event_div.appendChild(event_name);
                event_div.appendChild(event_content);
                event_div.appendChild(event_time);
                event_div.appendChild(event_location);
                event_div.appendChild(event_more);

                document.getElementById("event-container").appendChild(event_div);
            }
        }
    };

    req.open('GET', '/events.json');
    req.send();
}
