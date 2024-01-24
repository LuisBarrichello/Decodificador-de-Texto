
const inputEncrypt = document.getElementById('message-encrypt');
const buttonEncrypt = document.querySelector('.button-encrypt');
const buttonDecrypt = document.querySelector('.button-decrypt');
const containeResult = document.querySelector('.container-result')
const containerIllustration = document.querySelector('.container-illustration')
const infosInitial = document.querySelector('.infos-initial')
const wrapperResult = document.querySelector('.wrapper-result')
const buttonCopy = document.querySelector('.button-copy')
const containerInput = document.querySelector('.container-input')
const alertInput = document.querySelector('.alert-input')


/* 
As "chaves" de criptografia que utilizaremos são:
A letra "e" é convertida para "enter"
A letra "i" é convertida para "imes"
A letra "a" é convertida para "ai"
A letra "o" é convertida para "ober"
A letra "u" é convertida para "ufat"

Requisitos:
- Deve funcionar apenas com letras minúsculas
- Não devem ser utilizados letras com acentos nem caracteres especiais
- Deve ser possível converter uma palavra para a versão criptografada e também retornar uma palavra criptografada para a versão original.
Por exemplo:
"gato" => "gaitober"
gaitober" => "gato"
*/

const keyLetter = {
    i: "imes",
    e: "enter",
    a: "ai",
    o: "ober",
    u: "ufat",
}

const transformText = (text, transformationFunction) => {
    const lettersTheText = text.split('');
    const transformedTextArray = lettersTheText.map(transformationFunction);
    return transformedTextArray.join('');
}

const encrypt = (textForEncrypt) => {
    if(!isValidInput(textForEncrypt)) {
        console.log('inavlido')
        inputEncrypt.style.border = '1px red solid'
        alertInput.style.display = 'inline'
        
        return
    } 

    inputEncrypt.style.border = 'none'
    alertInput.style.display = 'none'

    const encryptedText = transformText(textForEncrypt, letter => keyLetter[letter] || letter)

    showResult(encryptedText)

    return encryptedText
} 

const decrypt = (textForDecrypt) => {
    if(!isValidInput(textForDecrypt)) {
        console.log('inavlido')
        inputEncrypt.style.border = '1px red solid'
        alertInput.style.display = 'inline'
        
        return
    } 

    inputEncrypt.style.border = 'none'
    alertInput.style.display = 'none'

    const lettersTheTextForDecrypt = textForDecrypt.split('');
    
    lettersTheTextForDecrypt.map((letter, index) => {
        for (const key in keyLetter) {
            if(letter === key) {
                let maxRemove = keyLetter[key].length
                lettersTheTextForDecrypt.splice(index + 1, maxRemove - 1) 
            }
        }
    })

    const decryptedText = lettersTheTextForDecrypt.join('')

    showResult(decryptedText)
    return decryptedText;

}

const showResult = (encryptedText) => {

    const containerChildren = Array.from(containeResult.children);
    
    containerChildren.forEach((child) => {
        if (
            child === infosInitial || 
            child === containerIllustration
            ) {
            containeResult.removeChild(child);
        }
    })
    wrapperResult.style.display = 'flex'
    const spanTextResult = document.querySelector('.text-result')
    
    if(containeResult.contains(spanTextResult)) {
        spanTextResult.textContent = encryptedText;
    } else {
        wrapperResult.style.display = 'flex'
    }

}

const isValidInput = (input) => {
    const regex = /^[a-z ]+$/;
    return regex.test(input);
}


const copyText = () => {
    const textResult = document.querySelector('.text-result')

    const range = document.createRange();
    // Range é um objeto que representa um intervalo de nós do DOM (Document Object Model). Ele é frequentemente usado para seleção e manipulação de texto no DOM.

    range.selectNode(textResult);
    // seleciona o conteúdo completo do elemento especificado (textResult, neste caso) e coloca esse elemento no intervalo (range). Isso significa que o Range agora abrange o conteúdo do elemento textResult.

    window.getSelection().removeAllRanges(); 
    //getSelection() retorna um objeto Selection, que representa a seleção atual no documento.
    //removeAllRanges() é um método de Selection que remove todas as faixas de seleção existentes. Isso é feito para garantir que não haja seleções de texto anteriores interferindo na nova seleção.

    window.getSelection().addRange(range);
    // é um método de Selection que adiciona o intervalo (range) à seleção atual.
    
    document.execCommand('copy');
    //é um método obsoleto que executa um comando no documento. Neste caso, o comando 'copy' é usado para copiar o conteúdo do intervalo selecionado para a área de transferência.

    window.getSelection().removeAllRanges();
    // Limpa a seleção

    alert(`Texto copiado!`);
}

buttonEncrypt.addEventListener('click', () => encrypt(inputEncrypt.value))
buttonDecrypt.addEventListener('click', () => decrypt(inputEncrypt.value))
buttonCopy.addEventListener('click', copyText)