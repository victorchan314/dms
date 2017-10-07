function parseEmails(text) {
  //takes in string and returns array of valid email addresses
  //(separated by comma, semicolon, space, or combination)
  var emailRegex = /^[A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
  var split = text.split(/[\s;,]+/);
  var emailArray = [];
  for(i in split)
  {
     email = split[i];
     if(emailRegex.test(email))
     {
          emailArray.push(email);
     }
  }
  return emailArray;
}
