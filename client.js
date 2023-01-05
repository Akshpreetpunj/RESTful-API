/* "StAuth10222: I Akshpreet Singh Punj, 000820040 certify that this material is my original work. 
  No other person's work has been used without due acknowledgement. 
  I have not made my work available to anyone else." 
*/

// Testing the REST API in server.js using axios
const axios = require('axios');

/* This function is used for testing the REST API */
async function test()
{
  // try-catch to handle any errors
  try {

    // Test #1 Cases
    
    /* 1. Execute two POST requests to insert two items into the collection. */

    // First POST request to the collection
    const response1 = await axios.post('http://localhost:3000/api', {
      title: 'Frozen',
      release_year: '2013',
      time_viewed: new Date('2017-09-11T05:22:46.200').toISOString().replace('T', ' ').substring(0,19),
    }).then(function(response1){
      console.log(response1.data);
    });

    // Second POST request to the collection
    const response2 = await axios.post('http://localhost:3000/api', {
      title: 'Black Panther',
      release_year: '2018',
      time_viewed: new Date('2019-11-07T08:14:32.200').toISOString().replace('T', ' ').substring(0,19),
    }).then(function(response2){
      console.log(response2.data);
    });

    /* 2. Execute a single item PUT request to modify a single item in the collection. */

    // PUT request to the single item (item 1) in the collection
    const response3 = await axios.put('http://localhost:3000/api/1', {
      title: 'The Godfather',
      release_year: '1972',
      time_viewed: new Date('2022-08-07T02:40:20.200').toISOString().replace('T', ' ').substring(0,19),
    }).then(function(response3){
      console.log(response3.data);
    });

    /* 3. Execute two separate item GET requests to check if each item inserted is correct */

    // First GET request to the item (item 1)
    const response4 = await axios.get('http://localhost:3000/api/1').then(function(response4){
      console.log(response4.data);

      // Checking the field values match 
      if (response4.data[0].title != "The Godfather"){
        console.log("FAILED TEST: The Godfather movie not found as the item!");
      }
    });
  
    // Second GET request to the item (item 2)
    const response5 = await axios.get('http://localhost:3000/api/2').then(function(response5){
      console.log(response5.data);

      // Checking the field values match 
      if (response5.data[0].title != "Black Panther"){
        console.log("FAILED TEST: Black Panther movie not found as the item!");
      }
    });

    // Test #2 Cases

    /* 1. Execute a single collection PUT request that replaces the collection with 4 new items. */

    // PUT request to the collection with 4 new items
    const response6 = await axios.put('http://localhost:3000/api', [
    {
      title: 'Iron Man 3',
      release_year: '2013',
      time_viewed: new Date('2015-01-21T12:45:06.200').toISOString().replace('T', ' ').substring(0,19),
    },
    {
      title: 'Minions',
      release_year: '2015',
      time_viewed: new Date('2018-10-13T09:25:56.200').toISOString().replace('T', ' ').substring(0,19),
    },
    {
      title: 'Joker',
      release_year: '2019',
      time_viewed: new Date('2020-10-03T04:11:27.200').toISOString().replace('T', ' ').substring(0,19),
    },
    {
      title: 'Toy Story 4',
      release_year: '2019',
      time_viewed: new Date('2022-02-05T08:15:19.200').toISOString().replace('T', ' ').substring(0,19),
    },
    ]).then(function(response6){
      console.log(response6.data);
    });

    /* 2. Execute a single collection GET request to check if all the items are correct. */

    // GET request to the collection
    const response7 = await axios.get('http://localhost:3000/api').then(function(response7){
      console.log(response7.data);

      // Checking the field values match (4 items)
      if (response7.data[0].title != "Iron Man 3") {
        console.log("FAILED TEST #1: Iron Man 3 movie not found as the 1st item!");
      }

      if (response7.data[1].title != "Minions") {
        console.log("FAILED TEST #2: Minions movie not found as the 2nd item!");
      }

      if (response7.data[2].title != "Joker") {
        console.log("FAILED TEST #3: Joker movie not found as the 3rd item!");
      }

      if (response7.data[3].title != "Toy Story 4") {
        console.log("FAILED TEST #4: Toy Story 4 movie not found as the 4th item!");
      }
    });

    /* 3. Execute a single item DELETE request to delete a single item from the collection. */

    // DELETE request to delete a single item (item 2) from the collection
    const response8 = await axios.delete('http://localhost:3000/api/2').then(function(response8){
      console.log(response8.data);
    });

    /* 4. Execute a single collection GET request to check if all the items are correct (3 items). */

    // GET request to the collection 
    const response9 = await axios.get('http://localhost:3000/api').then(function(response9){
      console.log(response9.data);

      // Checking the field values match (3 items)
      if (response9.data[0].title != "Iron Man 3") {
        console.log("FAILED TEST #1: Iron Man 3 movie not found as the 1st item!");
      }

      if (response9.data[1].title != "Joker") {
        console.log("FAILED TEST #2: Joker movie not found as the 2nd item!");
      }

      if (response9.data[2].title != "Toy Story 4") {
        console.log("FAILED TEST #3: Toy Story 4 movie not found as the 3rd item!");
      }
    });

    /* 5. Execute a single collection DELETE request to delete the entire collection. */

    // DELETE request to the entire collection
    const response10 = await axios.delete('http://localhost:3000/api').then(function(response10){
      console.log(response10.data);
    });

    /* Execute a single collection GET request to check if the collection is empty. */

    // GET request to check if the collection is empty
    const response11 = await axios.get('http://localhost:3000/api').then(function(response11){
      console.log(response11.data);

      // Checking if the collection is empty
      if (response11.data != "") {
        console.log("FAILED TEST: Collection is not empty");
      }
    });

    // printing the success message if all the test have passed
    console.log("\nALL TESTS SUCCESSFUL");

  } catch (error) {
    console.error(error);
  }	
}

// call our test function
test();