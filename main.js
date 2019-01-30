// Add new events
Events_organizer.Add_new_event({
  Name: "The Rock making lutenica in Purvomai",
  Date: "2019.03.02", //yyyy.mm.dd
});

Events_organizer.Add_new_event({
  Name: "TEDxPlovdiv",
  Date: "2019.04.13", //yyyy.mm.dd
  Price: 49.99,
});

Events_organizer.Add_new_event({
  Name: "Babylon party",
  Date: "2019.04.12", //yyyy.mm.dd
  Price: 15,
  Is_for_adults: "18+",
});

Events_organizer.Add_new_event({
  Name: "Concert of 'Queen' on the opening of the bridge in Stara Zagora",
  Date: "2019.01.03", //yyyy.mm.dd
});

Events_organizer.Add_new_event({
  Name: "Mia Kalifa plays a trombone at the Rose Museum in Kazanlak",
  Date: "2019.05.27", //yyyy.mm.dd
  Price: 99.99,
  Is_for_adults: "18+",
});

Events_organizer.Add_new_event({
  Name: "Metallica and Mile Kitić of the Carnival in Gabrovo",
  Date: "2019.05.18", //yyyy.mm.dd
});

// Add new clients
Events_organizer.Add_new_client({
  Name: "Dimitar Donov",
  Age: 16,
  Gender: "M",  
  Money: 20, 
});

Events_organizer.Add_new_client({
  Name: "Atanas Pavlov",
  Age: 22,
  Gender: "M",
  Money: 500, 
});

Events_organizer.Add_new_client({
  Name: "Dimitar Mirchev",
  Age: 22,
  Gender: "M",
  Money: 100, 
});

Events_organizer.Add_new_client({
  Name: "Neli Yancheva",
  Age: 21,
  Gender: "F",
  Money: 200, 
});

Events_organizer.Add_new_client({
  Name: "Nedelina Malamova",
  Age: 26,
  Gender: "F",
  Money: 210, 
});

Events_organizer.Add_new_client({
  Name: "Viktoriya Kumanova",
  Age: 17,
  Gender: "F",
  Money: 50, 
});

//Delete events
Events_organizer.Delete_event(2);

//Add new event
Events_organizer.Add_new_event({
  Name: "Lil Pump opens a shop on Dimitrovgrad Sunday Market",
  Date: "2019.02.08", //yyyy.mm.dd
});

//Add clients to events
Events_organizer.Add_client_to_event(1, 2);
Events_organizer.Add_client_to_event(1, 3);
Events_organizer.Add_client_to_event(3, 4);
Events_organizer.Add_client_to_event(1, 4);
Events_organizer.Add_client_to_event(3, 1);


// Showing all clients that will visit specific event
Events_organizer.Show_client_list_for_event(1);
//Events_organizer.Show_client_list_for_event(1, "M"); //will show only the men

//Deleting client from event
Events_organizer.Remove_client_from_event(1, 2);

//Archieving event
Events_organizer.Archive_event(1);

//Show events info
Events_organizer.Show_events_info();