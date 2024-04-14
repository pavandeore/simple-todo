window.onload = function(){
    let addButton = document.getElementById('add');
    let todos = document.getElementById('todos');
    let memeDiv = document.getElementById('meme-div');
    let storage = localStorage.getItem('store') || [];
    const memeUrls = [
        'https://media.makeameme.org/created/and-it-feel-5bec36.jpg',
        'https://i.imgflip.com/4hb499.png?a475776',
        'https://i.chzbgr.com/full/5671478784/h912E5930/feels-good-man',
    ]

    if(storage.length){
        storage = JSON.parse(storage);
        storage.forEach(element => {
            listCreator(element.value, element.done)
        });
    }

    function listCreator(_value, _checked = false){
        let li = document.createElement('div');
        let input = document.createElement('input');
        let span = document.createElement('span');
        span.innerText = _value;
        input.type = "checkbox";
        input.checked = _checked;
        input.classList.add("checkbox")
        li.appendChild(input);
        li.appendChild(span);

        todos.appendChild(li);
    }

    addButton.addEventListener("click", function(){
        let inp = document.getElementById('input');
        if(inp.value.trim()){
            listCreator(inp.value);

            let obj = { done: false };
            obj['value'] = inp.value
            storage.push(obj)

            localStorage.setItem('store', JSON.stringify(storage))
        }
    });

    let checkbox = document.querySelectorAll(".checkbox");
    checkbox.forEach(check => {
        check.addEventListener("change", function(e){
            let val = e.target.nextElementSibling.innerText;
            let checked = e.target.checked;

            storage.forEach(entry => {
                if(entry.value == val){
                    entry['done'] = checked;
                }
            })

            localStorage.setItem('store', JSON.stringify(storage));

            if(checked){
                let tempImg = document.createElement('img')
                tempImg.src = memeUrls[Math.floor(Math.random() * memeUrls.length)];
                tempImg.height = "170";
                tempImg.height = "170";
                memeDiv.appendChild(tempImg);
    
                setTimeout(() => {
                    memeDiv.innerHTML = "";
                }, 3000);
            }
        })
    })

}