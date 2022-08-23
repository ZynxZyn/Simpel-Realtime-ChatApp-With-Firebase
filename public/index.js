// InitializeApplication
const firebaseConfig = {
  // Your config here
};
firebase.initializeApp(firebaseConfig)

// Ask for username
let name = prompt('What is your name?')

// Send Message And Sendername to firebase
function sendMessage(){
  //Check for username
  if(!name){
    return name = prompt("What is your name?")
  }
  let message = document.querySelector(".messageValues").value;
  
  // Add message and senderName to database
  firebase.database().ref('messages').push().set({
    "senderName" : name,
    "message" : message
  });

  return false;
}

// Delete Message and Sendername from database
function deleteMessage(self){
  let messageId = self.getAttribute("data-id");

  firebase.database().ref("messages").child(messageId).remove();
}

//Event when child removed in firebase
firebase.database().ref("messages").on("child_removed", function(snapshot){
  //Create a text when message has been deleted
  html = "";
  html += "<p style='font-style:italic'><span>";
    html += "This message has been deleted"
  html += "</span></p>"
  document.getElementById("messages-" + snapshot.key).innerHTML = html
});

// Event when child added in firebase
firebase.database().ref('messages').on('child_added', function(snapshot){
  // Display a message in chatbox
  let html = "";
  if(snapshot.val().senderName == name){
    html += "<p id='messages-" + snapshot.key + "'><span>";
  }else
  html += "<p id='messages-" + snapshot.key + "'><span>";
    if(snapshot.val().senderName == name){
      html += "<button data-id ='" + snapshot.key +"' onclick='deleteMessage(this);'>";
        html += "Delete"
      html += "</button>"
    }
    html += snapshot.val().senderName + ": " + snapshot.val().message;
  html += "</span></p>";

  document.getElementById("chatbox").innerHTML += html
})
