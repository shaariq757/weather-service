

const form = document.querySelector('form');
const input = document.querySelector('input');
const mOne = document.querySelector('#mOne');
const mTwo = document.querySelector('#mTwo');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    const loc = input.value;
    mOne.textContent = 'Loading...'
    mTwo.textContent = ''
    fetch('/weather?address='+loc).then((res)=>{
        res.json().then((data)=>{
            if(data.error){
               mOne.textContent = data.error.info
            }
            else{
                console.log(data)
            mOne.textContent = data.location;
            mTwo.textContent = data.forecast;
            }
        })
    })
    
    
})