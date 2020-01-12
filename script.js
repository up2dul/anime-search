const input = document.getElementById('search-input')
const qty = document.getElementById('search-quantity')
const resultList = document.getElementById('result-list')

document.querySelector('form#search')
.addEventListener('submit', e => {
    e.preventDefault()
    let hasil = ''
    // shimmer loading
    for (let i = 0; i < qty.value; i++) {
        hasil += `<div class="col-lg-3 col-md-4 col-6 mb-3">
                    <div class="ph-item p-2">
                        <div class="ph-col-12 p-0">
                            <div class="ph-picture" style="height: 280px;"></div>
                            <div class="ph-row">
                                <div class="ph-col-12"></div>
                            </div>
                        </div>
                    </div>
                </div>`
    }
    resultList.innerHTML = hasil    
    fetch(`https://api.jikan.moe/v3/search/anime?q=${input.value}&limit=${qty.value}`)
    .then(response => response.json())
    .then(data => {
        let results = data.results
        let hasil = ''
        results.forEach(result => {
            hasil += `<div class="col-lg-3 col-md-4 col-6 mb-3">
                        <div class="card rounded">
                        <img src="${result.image_url}" class="card-img-top">
                            <div class="card-body p-2">
                                <h5 class="card-title font-weight-light text-dark">${result.title}</h5>
                                <a href="${result.url}" class="btn btn-sm btn-block btn-danger">View on MAL</a>
                            </div>
                        </div>
                    </div>`
        })
        resultList.innerHTML = hasil
    })
    .catch(error => console.log(error))
    input.value = ''
    qty.value = ''
})


// light and dark theme button
document.getElementById('btn-dark')
.addEventListener('click', e => {
    if (e.target.checked === true) {
        document.body.className = ''
        document.body.classList.add('bg-dark', 'text-light')
    }
})
document.getElementById('btn-light')
.addEventListener('click', e => {
    if (e.target.checked === true) {
        document.body.className = ''
        document.body.classList.add('bg-light', 'text-dark')
    }
})
