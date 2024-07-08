

  const bookmarkNameInput = document.getElementById("bookmarkName");
  const bookmarkURLInput = document.getElementById("bookmarkURL");
  const tableContent = document.getElementById("tableContent");
  const errorText = document.getElementById("errorText"); 
  
  let allBookMark = [];
  
  if (localStorage.getItem('allBookMark') !== null) {
    allBookMark = JSON.parse(localStorage.getItem('allBookMark'));
    displayData(allBookMark);
  }
  
  function addBookMark() {
    const siteName = bookmarkNameInput.value.trim();
    const siteUrl = bookmarkURLInput.value.trim();
    
    if (siteName === '' || siteUrl === '') {
      errorText.innerText = "Please fill out both name and URL fields.";
      return;
    }
    const urlPattern = /^(https?:\/\/)?([\w\d]+\.)+[a-z]{2,}([\w\d./?=%&\-_]*)$/i;
    if (!urlPattern.test(siteUrl)) {
      errorText.innerText = "Invalid URL. Please enter a valid URL starting with http:// or https://";
      return; 
    }
   
   let newBookMark = {
    siteName: bookmarkNameInput.value,
    siteUrl: bookmarkURLInput.value,
  }; 
    
    allBookMark.push(newBookMark);
    localStorage.setItem('allBookMark', JSON.stringify(allBookMark));
  
    console.log(allBookMark);
    displayData(allBookMark);
    clearInput();
  
  }

  function displayData(arr) {
    let cartona = "";
    for (let i = 0; i < arr.length; i++) {
      cartona += `
        <tr>
          <td>${i + 1}</td>
          <td>${arr[i].siteName}</td>
          <td><a class="btn btn-primary" href="${arr[i].siteUrl} " target="_blank" >Visit</a></td>
          <td><button class="btn btn-danger" onclick="deleteBookMark(${i})">Delete</button></td>
        </tr>
      `;
    }
    tableContent.innerHTML = cartona;
  }
  function deleteBookMark(index) {
    allBookMark.splice(index, 1);
    localStorage.setItem('allBookMark', JSON.stringify(allBookMark));
    displayData(allBookMark); 
  }
  function clearInput(){
    bookmarkNameInput.value="";
    bookmarkURLInput.value="";
    errorText.innerText = '';
  }
  