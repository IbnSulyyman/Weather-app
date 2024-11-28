function setDate(value1, value2){
  const dateElement = document.getElementById(value1);
  const today = new Date();
  
  const formattedDate = today.toLocaleDateString(undefined, value2);

  dateElement.textContent = formattedDate;
};
setDate("js-day", {weekday: 'long'});
setDate("js-date", {day: 'numeric',  month: 'short',  year: 'numeric'});

  
