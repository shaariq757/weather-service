

const form = document.querySelector('form');
const input = document.querySelector('input');
const mOne = document.querySelector('#mOne');
const mTwo = document.querySelector('#mTwo');
const mThree = document.querySelector('#mThree');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    const loc = input.value;
    mOne.textContent = 'Loading...'
    mTwo.textContent = ''
    mThree.textContent = ''
    fetch('/weather?address='+loc).then((res)=>{
        res.json().then((data)=>{
            if(data.error){
               mOne.textContent = data.error
            }
            else{
            mOne.textContent = data.location;
            mTwo.textContent = data.forecast.desc;
            mThree.textContent ='It is currently '+ data.forecast.temp +' degrees.'+'It feels like '+data.forecast.feels+'. Chances of rain is '+data.forecast.precip;
            }
        })
    })
    
    
})