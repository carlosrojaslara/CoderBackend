let form = document.getElementById('petForm');
const handleSubmit = (evt, form, route)=>{
    evt.preventDefault();
    let formData = new FormData(form);
    fetch(route,{
        method:"POST",
        body:formData
        }).then(result=>result.json()).then(json=>console.log(json))
}
form.addEventListener('submit',(e)=>handleSubmit(e,e.target,"/pets"))