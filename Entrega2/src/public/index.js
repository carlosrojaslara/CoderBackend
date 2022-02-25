const socket = io();
let form = document.getElementById('productForm');
form.addEventListener = ("submit",(evt)=>{
    evt.preventDefault();
    let data = new FormData(form);
    let sendObj={};
    data.forEach((val,key)=>sendObj[key]=val)
    socket.emit("sendProduct",sendObj)
    form.reset();
})
//     fetch(route,{
//         method:"POST",
//         body:formData
//         }).then(result=>result.json()).then(json=>console.log(json))
// }
// form.addEventListener('submit',(e)=>handleSubmit(e,e.target,"/pets"))
socket.on('productLog',data=>{
    console.log(data)
})