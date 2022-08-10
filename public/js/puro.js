
function createLi(item) {

    //Criação da LI
    let br = document.createElement("br")
    let ul = document.querySelector("#listinha")
    let p = document.createElement("p")
    let li = document.createElement("li")
    li.setAttribute('class', 'list-group-item list-group-item-dark')
    let div = document.createElement("div")
    div.setAttribute('id', 'botoes')

    //Botão de editar LI
    let buttonEdit = document.createElement("button")
    buttonEdit.setAttribute('id', 'buttonEdit')
    buttonEdit.setAttribute('class', 'btn btn-dark')
    buttonEdit.append('✏')

    //Botão de apagar LI
    let buttonTrash = document.createElement("button")
    buttonTrash.setAttribute('id', 'buttonTrash')
    buttonTrash.setAttribute('class', 'btn btn-dark')
    buttonTrash.append('🗑')
    li.append(div),
        div.append(buttonEdit),
        div.append(buttonTrash),
        p.append(item.Titulo)
    p.append(br)
    p.append(item.Texto)
    li.append(p)
    ul.append(li)

}

//Mostra os itens
async function getItems() {
    let items = fetch('http://localhost:3000/list').then(result => { return result.json() })

    let results = []
    await items.then((result) => {
        result.forEach(item => {
            results.push(item)
        })
    })

    await createList(results)
    console.log(results);


    let editButton = document.querySelectorAll('#buttonEdit')
    editButton.forEach((item, index) => {
        item.addEventListener('click', (event) => {
            edit(results[index]._id)

        })
    })

    let trashButton = document.querySelectorAll('#buttonTrash')
    trashButton.forEach((item, index) => {
        item.addEventListener('click', (event) => {
            apagar(results[index]._id)
        })
    })
}

//Atualiza
async function edit() {
    fetch(`http://localhost:3000/list/${id}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*'
        },
        body: JSON.stringify({ id: id }),
    }).then(results => {
    }).catch(() => {
        console.log('error')
    })
}


//DELETAR
async function apagar(id) {
    fetch(`http://localhost:3000/list/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*'
        },
        body: JSON.stringify({ id: id }),
    }).then(results => {
    }).catch(() => {
        console.log('error')
    })
}

async function createList(array) {
    array.forEach((item, index, array) => {
        createLi(item)
    })
}

getItems()


