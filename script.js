var total=0;
async function submitdetails(event) {
    event.preventDefault()

    const sprice = event.target.sprice.value
    const pname = event.target.pname.value

    const obj = {
        sprice,
        pname
    }

    try {
        const response = await axios.post("https://crudcrud.com/api/8c0dbd0385004bc9a8da7d653c179b90/admindata", obj)
        showuseronscreen(response.data)
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}

window.addEventListener("DOMContentLoaded", async() => {
    async function getdetails(){
    try{
        const response =await axios.get("https://crudcrud.com/api/8c0dbd0385004bc9a8da7d653c179b90/admindata")
            for (let i = 0; i < response.data.length; i++) {
                showuseronscreen(response.data[i])
            }
        }
        catch(error){
            console.log(error)
        }
    }
    getdetails()
})
async function deleteProduct(obj,parentelem,childelem)
{
    try{
        const response=await axios.delete(`https://crudcrud.com/api/8c0dbd0385004bc9a8da7d653c179b90/admindata/${obj._id}`)
        parentelem.removeChild(childelem)
    }
    catch(error){
        console.log(error)
    }
    
}

function showuseronscreen(obj) {
    total+=parseInt(obj.sprice)
   
    let parentelem = document.getElementById("user")
    let childelem = document.createElement("li")
    childelem.textContent = obj.sprice + " - " + obj.pname

    let del = document.createElement("input")
    del.type = "button"
    del.value = "Delete Product"

   

    del.onclick = function() {
        deleteProduct(obj,parentelem,childelem)
    };

    childelem.appendChild(del)
    parentelem.appendChild(childelem)
    showtotalprice()
    
    
    
}
function showtotalprice()
{
    const parentelem=document.getElementById('total');
    const childelem=`<h3>Total Price of Products: Rs ${total}
    </h3>`

parentelem.innerHTML = childelem;
}
function deleteproduct(){
    total-=parseInt(obj.sprice)
    const parentelem=document.getElementById('total');
    const childelem=`<h3>Total Price of Products: Rs ${total}
    </h3>`

parentelem.innerHTML = childelem;
}