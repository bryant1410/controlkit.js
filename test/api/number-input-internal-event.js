import NumberInput from '../../src/component/NumberInput';

function main(){
    const input = new NumberInput();
    input.on('input',()=>{
        console.log('input',input.value);
    });
    input.on('change',()=>{
        console.log('change',input.value);
    });

    document.body.appendChild(input.element);
}

window.addEventListener('load',main);