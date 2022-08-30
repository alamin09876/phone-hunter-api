const loadPhones = async(searchText, datalimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, datalimit)
}
const displayPhones = (phones, datalimit) =>{
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = ``;
    // display 20 phones only
    const showAll = document.getElementById('show-all');
    if(datalimit && phones.length > 10){
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none')
    }
    else{
        showAll.classList.add('d-none')
    }
    // No phone found ...show  alert message
    const noPhone = document.getElementById('no-found-message');
    if(phones.length === 0){
        noPhone.classList.remove('d-none');
    }
    else{
        noPhone.classList.add('d-none');
    }

    phones.forEach(phone =>{        
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <button onclick = "phoneDitals('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneModal">Show details</button>
        </div>
      </div>
        `
        phoneContainer.appendChild(phoneDiv);
    })
    toggleSpinner(false);
}

const searchingProcess = (datalimit) =>{
    toggleSpinner(true);
    const phoneField = document.getElementById('phone-field');
    const phoneText = phoneField.value;
    loadPhones(phoneText, datalimit);
}
document.getElementById('btn-search').addEventListener('click', function(){
    searchingProcess(10);
})
document.getElementById('phone-field').addEventListener('keypress', function (e) {
    
    if (e.key === 'Enter') {
        searchingProcess(10);
    }
})

const toggleSpinner = isLoading =>{
    const loaderSectio = document.getElementById('loader')
    if(isLoading){
        loaderSectio.classList.remove('d-none')
    }
    else{
        loaderSectio.classList.add('d-none')
    }
}

document.getElementById('btn-show-all').addEventListener('click', function(){
    searchingProcess();
})

const phoneDitals = async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    photeDetails(data.data)

}

const photeDetails = phone =>{
    console.log(phone)
    const phoneModal = document.getElementById('phoneModalLabel');
    phoneModal.innerText = phone.name;
    const relaseDate = document.getElementById('realise-date');
    relaseDate.innerHTML = `
    <p>Release Date : ${phone.releaseDate ? phone.releaseDate : "no relase date found"}</p>
    <p>Release Date : ${phone.mainFeatures.displaySize}</p>
    <p>Release Date : ${phone.mainFeatures.storage}</p>
    `
}
// loadPhones('apple');