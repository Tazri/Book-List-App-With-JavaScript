//Track Element 
let form = document.getElementById('form');
let authorInput = document.getElementById('author');
let bookInput = document.getElementById('book-name');
let yearInput = document.getElementById('year');
let bookList = document.getElementById('book-list');
let deleteBtn = document.getElementById('delete');
let cancelBtn = document.getElementById('cancel')
let msg = document.getElementById('msg');

//Add Event Listener For Add In Book List
form.addEventListener('submit',event=>{
    event.preventDefault();
    //Get Value From User Input
    let author = authorInput.value;
    let bookName = bookInput.value;
    let year = yearInput.value;
    
    //Condition is User Provide correct data
    if(!author.trim()){
        alert('Please Provide Author Name');
    }else if(author.length > 20){
        alert('Author Name should be lessthen 15 character');
    }else if(!bookName.trim()){
        alert('Please Provide Book Name');
    }else if(bookName > 100){
        alert('Book name should be lessthen 15 character');
    }else{
        //Create Tr with provide user data and append book list
        let tr = trGenerator(author,bookName,year);
        bookList.appendChild(tr);
        authorInput.value = '';
        bookInput.value = '';
        yearInput.value = '';
    }
})

//Edited Data
bookList.addEventListener('dblclick',event=>{
    let prevValue = event.target.textContent;
    //Show Input Field In Td Tag 
    let parent = event.target;
    parent.innerHTML = isNaN(Number(prevValue))? `<input type='text'>`: `<input type='number' min='0' max='2021'>`;
    //Select Input Field Add EventListener and update data
    let child = parent.children[0];
    
    //updatedata function
    child.addEventListener('keypress',event=>{
        if(event.keyCode == 13){
            if(!child.value.trim()){
                parent.innerHTML = prevValue;
            }else{
                parent.innerHTML = child.value;
            }
        }
    })
})

//Is delete mode on or not
let deleteMode = false;
deleteBtn.addEventListener('click',()=>{
    deleteMode = true;
    deleteBtn.style.display = 'none';
    cancelBtn.style.display = 'inline-block';
    msg.style.display = 'inline-block';
});

cancelBtn.addEventListener('click',event=>{
    deleteMode = false;
    deleteBtn.style.display = 'inline-block';
    cancelBtn.style.display = 'none';
    msg.style.display = 'none';
})


//Delete Data From Book List
bookList.addEventListener('click',event=> deleteMode && event.target.parentNode.remove());

//Tr Generator Function
function trGenerator(...elements){
    let data = elements.map(element => `<td>${element}</td>`).join(' ');
    let tr = document.createElement('tr');
    tr.innerHTML = data;
    return tr;
}

  