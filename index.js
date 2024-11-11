// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent form from submitting and refreshing the page



  // Retrieve values from input fields
  const image = document.getElementById('image').value;
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;

  // Check if the input fields are not empty
  if (image && title && description) {
    // Create a user object
    const userDetails = {
      image: image,
      title: title,
      description: description
    };

    console.log(userDetails);
    axios.post("https://crudcrud.com/api/0eaeb20c1c384a9f9bf37812222b7ebb/users", userDetails)
      .then((res) => {
        console.log(res);
        // Display the updated users list
        displayUsers();
      })
      .catch((err) => console.log(err));
    
    // Clear input fields after submission
    document.getElementById('image').value = '';
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
  }
}

// Function to display users on the page
function displayUsers() {
  // Get the user list element (ul) from the DOM
  const userList = document.getElementById('user-list');

  // Clear the existing list to avoid duplication
  userList.innerHTML = '';

  axios.get("https://crudcrud.com/api/0eaeb20c1c384a9f9bf37812222b7ebb/users")
    .then((res) => {
      const blogs=res.data.length;
      document.getElementById('blog-num').innerText=`total blogs: ${blogs}`;


      for (let i = 0; i < res.data.length; i++) {
        const user = res.data[i];
        
        // Create a list item for each user
        const listItem = document.createElement('li');
 
        listItem.innerHTML = `
        <p><h1>${user.title}</h1></p>
        <img src="${user.image}" alt="Image from ${user.title}">
  
        <p>  ${user.description}</p>
      `;

        // Create a delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.style.marginLeft = '10px';

        // Add event listener to delete the user when the button is clicked
        deleteButton.addEventListener('click', function() {
          axios.delete(`https://crudcrud.com/api/0eaeb20c1c384a9f9bf37812222b7ebb/users/${user._id}`)
            .then((res) => {
              console.log('Deleted:', res);
              // Remove the list item from the DOM
              listItem.remove();
            })
            .catch((err) => console.log(err));
        });

        // Create an edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.style.marginLeft = '10px';

        // Add event listener to edit the user when the button is clicked
        editButton.addEventListener('click', function() {
          // Populate the form fields with existing user data
          document.getElementById('image').value = user.image;
          document.getElementById('title').value = user.title;
          document.getElementById('description').value = user.description;
          listItem.remove();
          // Optionally, delete the old user entry after populating form to edit
          axios.put(`https://crudcrud.com/api/0eaeb20c1c384a9f9bf37812222b7ebb/users/${user._id}`,{

            image: document.getElementById('image').value,
            title: getElementById('title').value,
            description: document.getElementById('description').value,
            
          })
          .then((res)=>{ 
            
            console.log(res)
             
          })
          .catch((err)=>console.log(err));
        })
        // Append the delete and edit buttons to the list item
        listItem.appendChild(deleteButton);
        listItem.appendChild(editButton);

        // Append the list item to the ul
        userList.appendChild(listItem);
      }
    })
    .catch((err) => console.log(err));
}

// Initialize the users list display when the page loads
window.onload = displayUsers;
