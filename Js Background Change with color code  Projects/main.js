
let div = null;

window.onload = () => {
	main();
};



function main(){
    const root = document.getElementById('root')
    const changeBtn = document.getElementById('change-btn')
    const output = document.getElementById('output')
    const copyBtn = document.getElementById ('copy-btn')

    changeBtn.addEventListener('click', function(){
    const bgColor = generateHEXColor();
        root.style.backgroundColor = bgColor;
        output.value = bgColor.substring(1);
    });

    copyBtn.addEventListener('click', function(){
        navigator.clipboard.writeText( `#${output.value}`);
        if (div !== null){
            div.remove();
            div = null;
        }
        if (isValidHEx(output.value)){
            
            generateToastMessage(`#${output.value} copied`);
        }else{
          alert('Invalid Color Code');
        }
       
    });
    output.addEventListener('keyup', function(e){
        
        const color = e.target.value
        if (color){
            output.value = color.toUpperCase();
        }
        if( isValidHEx(color)){
            root.style.backgroundColor = `#${color}`;
        }
    })
};



function generateHEXColor(){
    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);

    return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`
} 
function generateToastMessage(msg){
     div = document.createElement('div');
    div.innerText = msg;
    div.className = 'toast-message toast-message-slide-in';

    div.addEventListener ('click',function(){
        div.classList.remove('toast-message-slide-in');
        div.classList.add('toast-message-slide-out');

        div.addEventListener('animationend', function(){
            div.remove()
            div = null;
        });
    });
    
    document.body.appendChild(div);
}

/**
 * 
 * @param {string} color 
 */
function isValidHEx(color){
if (color.length !== 6) return false;



return /^[0-9A-Fa-f]{6}$/i.test(color);

}

// main();