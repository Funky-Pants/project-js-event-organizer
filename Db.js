var Event_db = {
    Events_collection: [],
    Clients_collection: [],

    Event_id: 1,
    Client_id: 1,
        
    Add_event: function(Event) {
        Event.id = this.Event_id;
        this.Events_collection.push(Event);
        this.Event_id++;
    },

    Add_client: function(Client) {
        Client.id = this.Client_id;
        this.Clients_collection.push(Client);
        this.Client_id++;
    },

    Get_event_by_id: function(Id) {
        for(var i = 0; i < this.Events_collection.length; i++) {
            var Current_event = this.Events_collection[i];
            if(Current_event.id == Id) {
                return Current_event;
            }
        }
    },

    Get_client_by_id: function(Id) {
        for(var i = 0; i < this.Clients_collection.length; i++) {
            var Current_client = this.Clients_collection[i];
            if(Current_client.id == Id) {
                return Current_client;
            }
        }
    }
};