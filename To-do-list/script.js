const getDb = () => JSON.parse (localStorage.getItem('todoList')) ?? []; 
const setDb = (Db) => localStorage.setItem('todoList', JSON.stringify(Db));

const creatItem = (tarefa, status,indice) => {
    const item = document.createElement('label');
    item.classList.add('item_todo');
    item.innerHTML = 
    `
    <input type="checkbox" ${status} data-indice=${indice}>
    <div>${tarefa}</div>
    <input type="button" value="X" data-indice=${indice}>
    `
    document.getElementById('list_body').appendChild(item);
}

 const clearTask= ()=> {
    const allList = document.getElementById('list_body');
    while (allList.firstChild){
        allList.removeChild(allList.lastChild);
    }
 } 

const atualization = () => {
    clearTask()
    const Db =  getDb();
    Db.forEach ((item, indice) => creatItem (item.tarefa, item.status,indice));
}

const newTask = (event) => {
    const texto = event.target.value;
    const tecla = event.key;
    if(tecla === 'Enter'){
        const Db = getDb();
        Db.push({'tarefa':texto,'status':''});
        setDb(Db);
        atualization();
        event.target.value = '';
    }
}

const removeItem = (indice)=>{
    const Db = getDb();
    Db.splice(indice,1);
    setDb(Db)
    atualization()
}

const attItem = (indice)=>{
    const Db = getDb();
    Db[indice].status = Db[indice].status === '' ? 'checked': '';
    setDb(Db);
    atualization();
}
const clickItem = (event) => {
    const element = event.target;
    if(element.type === 'button'){
    const indice = element.dataset.indice;
    removeItem(indice);
    }else if (element.type === 'checkbox'){
        const indice = element.dataset.indice;
        attItem(indice);
    }
}

document.getElementById('new_Item').addEventListener('keypress', newTask);
document.getElementById('list_body').addEventListener('click', clickItem);
atualization();