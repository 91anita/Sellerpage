
async function submitdetails(event) {
    event.preventDefault()

    const sprice = event.target.sprice.value
    const pname = event.target.pname.value

    const obj = {
        sprice,
        pname
    }

    try {
        const response = await axios.post("https://crudcrud.com/api/a3f212160a354394b216a12c1dfa69df/admindata", obj)
        showuseronscreen(response.data)
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}

window.addEventListener("DOMContentLoaded", () => {
    axios
        .get("https://crudcrud.com/api/a3f212160a354394b216a12c1dfa69df/admindata")
        .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
                showuseronscreen(response.data[i])
            }
        })
        .catch((error) => {
            console.log(error)
        })
})

function showuseronscreen(obj) {
    let parentelem = document.getElementById("user")
    let childelem = document.createElement("li")
    childelem.textContent = obj.sprice + " - " + obj.pname

    let del = document.createElement("input")
    del.type = "button"
    del.value = "Delete Product"

    // let totalvalue = document.getElementById("total")
    // totalvalue.text=obj.sprice

    del.onclick = function() {
        axios
            .delete(`https://crudcrud.com/api/a3f212160a354394b216a12c1dfa69df/${obj._id}`)
            .then((response) => {
                parentelem.removeChild(childelem)
            })
            .catch((error) => {
                console.log(error)
            })
    };

    childelem.appendChild(del)
    parentelem.appendChild(childelem)
}