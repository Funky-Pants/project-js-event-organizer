var Events_organizer = {

    //Add events
    Add_new_event: function(Event_info) {
                
        if(Event_info.Is_for_adults == undefined) {
            Event_info.Is_for_adults = "No";
        }

        if(Event_info.Price == undefined) {
            Event_info.Price = "0";
        }

        var Event = {
            Name: Event_info.Name,
            Date: new Date(Event_info.Date),
            Price: Event_info.Price,
            Is_for_adults: Event_info.Is_for_adults,
            Is_archived: false,
            Total_income: 0,
            Clients_collection: [],
        }

        Event_db.Add_event(Event);

        console.log("Event successfully added: " + Event.Name);
        console.log("----------------------------------------------------------");
    },   

    //Delete events
    Delete_event: function(Event_id) {
        for(var i = 1; i < Event_db.Events_collection.length; i++) {
            var Event = Event_db.Events_collection[i];

            if(Event.id == Event_id) {
                if(Event.Is_archived) {
                    console.log("Event with name '" + Event.Name + "' can't be deleted because is archieved.");
                    console.log("----------------------------------------------------------");
                    return;
                }

                console.log("Event successfully deleted: " + Event.Name);
                console.log("----------------------------------------------------------");
                Event_db.Events_collection.splice(i, 1);
                return;
            }
        }

        console.log("Did not found an event!");
        console.log("----------------------------------------------------------");
    },

    //Archieve events
    Archive_event: function(Event_id) {
        
        var Event = Event_db.Get_event_by_id(Event_id);

        //Checks for existing event
        if(Event == undefined) {
            console.log("Събитието не беше намерено.");
            console.log("----------------------------------------------------------");
            return;
        }

        Event.Is_archived = true;
        console.log("Event " + Event.Name + " was successfully archieved.");
        console.log("----------------------------------------------------------");
    },
    
    //Events info
    Show_events_info: function(Event_id){
        
        Event = Event_db.Get_event_by_id(Event_id);

        var Event_info_age = "";
        var Event_info_price = "";
        var Event_archieved = "";

        for (var i = 0; i < Event_db.Events_collection.length; i++){
            var Event = Event_db.Events_collection[i];

            //Checks for event restiction
            if(Event.Is_for_adults == "18+"){
                Event_info_age ="*";
            }
            else {
                Event_info_age ="#";
            }

            //Check for event price
            if(Event.Price > 0){
                Event_info_price ="$";
            }
            else{
                Event_info_price ="!";
            }

            //Checks for event is archieved or no
            if(Event.Is_archived == true){
                Event_archieved = "~";
            }
            else{
                Event_archieved = "";
            }

            console.log(Event_info_age + Event.id + ". " + Event_archieved + Event_info_price + Event.Name + ", Date: " + Event.Date + ", Price: $" + Event.Price + ", Total income: $" + Event.Total_income + ", Age restriction: " + Event.Is_for_adults);
            console.log("----------------------------------------------------------");
        }
        
    },

    //Add clients
    Add_new_client: function(Client_info) {
        
        var Client = {
            Name: Client_info.Name,
            Age: Client_info.Age,
            Gender: Client_info.Gender,
            Money: Client_info.Money,
            Visited_events: 0,
            Vip: false,
        }

        Event_db.Add_client(Client);
        console.log("Client successfully added: " + Client.Name + ", Age: " + Client.Age + ", Gender: " + Client.Gender + ", Money: $" + Client.Money);
        console.log("----------------------------------------------------------");
    },

    //Add clients to events
    Add_client_to_event: function(Event_id, Client_id) {
        Event = Event_db.Get_event_by_id(Event_id);
        Client = Event_db.Get_client_by_id(Client_id);

        //Checks for existing event
        if(Event == undefined) {
            console.log("No event found.");
            console.log("----------------------------------------------------------");
            return;
        }

        //Checks for existing client
        if(Client == undefined) {
            console.log("No client found.");
            console.log("----------------------------------------------------------");
            return;
        }

        //Checks for archieved event
        if(Event.Is_archived) {
            console.log("Can't add the client to this event: '" + Event.Name + "'. It's archieved.");
            console.log("----------------------------------------------------------");
            return;
        }

        if(Event != undefined && Client != undefined) {
            //Checks if the event is for adults
            if(Event.Is_for_adults) {
                if(Client.Age < 18) {
                    console.log("Event with name " + Event.Name + " is for adults only. " + Client.Name + " is " + Client.Age + " years old.");
                    console.log("----------------------------------------------------------");
                    return;
                }
            }

            //Checks if the event paid
            if(Event.Price > 0) {
                //Checks if the the client has enough money
                if(Client.Money > Event.Price) {
                    Client.Money -= Event.Price;
                    Event.Total_income += Event.Price;
                }
                else {
                    console.log("Client " + Client.Name + " doesn't have enough money to attend " + Event.Name + ".");
                    console.log("----------------------------------------------------------");
                    return;
                }
            }

            Client.Visited_events++;

            Event.Clients_collection.push(Client);
            console.log("Client with name " + Client.Name + " is going to " + Event.Name + ".");
            console.log("----------------------------------------------------------");
        }
    },

    //Showing all clients for specific event
    Show_client_list_for_event: function(Event_id, Gender) {
        var Event = Event_db.Get_event_by_id(Event_id);

        //Checks for existing event
        if(Event == undefined) {
            console.log("No event found.");
            console.log("----------------------------------------------------------");
            return;
        }

        for(var i = 0; i < Event.Clients_collection.length; i++) {
            var Client = Event.Clients_collection[i];
            if(Gender == undefined || Client.Gender == Gender) {
                console.log("Event " + Event.Name + " will be visited by " + Client.Name + ".");
                console.log("----------------------------------------------------------");
            }
        }
    },

    //Delete client from event
    Remove_client_from_event: function(Event_id, Client_id) {

        var Event = Event_db.Get_event_by_id(Event_id);

        //Checks for existing event
        if(Event == undefined) {
            console.log("No event found.");
            console.log("----------------------------------------------------------");
            return;
        }

        //Checks if the event is archieved
        if(Event.Is_archived) {
            console.log("Error: You can't delete clients from " + Event.Name + ", bacause is archieved.");
            console.log("----------------------------------------------------------");
            return;
        }

        for(var i = 0; i < Event.Clients_collection.length; i++) {

            //Checks which client to delete
            if(Event.Clients_collection[i].id == Client_id) {
                Event.Clients_collection.splice(i, 1);

                //Giving the money back
                var Client = Event_db.Get_client_by_id(Client_id);
                Client.Money += Event.Price;
                Client.Visited_events--;

                //Taking his money from the event
                Event.Total_income -= Event.Price;

                console.log("Client " + Client.Name + " was successfully delete from " + Event.Name + ".");
                console.log("----------------------------------------------------------");
                return;
            }

            console.log("Couldn't find this client in the event's list.");
        }
    },
};