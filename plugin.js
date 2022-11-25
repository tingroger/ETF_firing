window.onload = () => {
    setTimeout(() => {
        let title = document.querySelector('thead > tr')
        let titleItem = document.createElement('th')
        titleItem.innerText = 'mil'
        title.appendChild(titleItem)

        let table = document.querySelector('tbody')
        let trs = table.querySelectorAll('tr')
        for (let i = 0; i < trs.length; i++) {
            let td = document.createElement('td')
            td.innerHTML = 0
            trs[i].appendChild(td)
        }


        let btn = document.querySelector('input[value="Calculate"]')
        btn.onclick = () => {
            setTimeout(() => {
                for (let i = 0; i < trs.length; i++) {
                    let coefficient = window.localStorage.getItem('coefficient') || 1
                    console.log('coeficient: ' + coefficient)
                    let range = trs[i].querySelector('th')
                    range = parseFloat(range.innerHTML.split(" ")[0])
                    let tds = trs[i].querySelectorAll("td")
                    let drop = tds[3]
                    drop = parseFloat(drop.innerHTML.split(" ")[0])

                    let mil = drop * 10 * coefficient / range
                    tds[5].innerHTML = mil.toFixed(3)
                }
            }, 500)
        }

    }, 200)


    let settingBtn = document.querySelector('#open-settings')
    let loadcoefficient = () => {
        let settingContainer = document.querySelector('body > main > div.settings-modal.modal.show > div > form > div')
        let newField = document.createElement("div")
        newField.id = 'newsetting'
        newField.setAttribute('class', "field")
        let fieldP = document.createElement("p")
        fieldP.innerHTML = 'coefficient'
        let fieldInput = document.createElement("input")
        fieldInput.id = 'coefficient'
        fieldInput.type = "number"
        fieldInput.max = '1.00'
        fieldInput.min = '0'
        fieldInput.step = '0.01'
        fieldInput.value = window.localStorage.getItem('coefficient')
        let fieldLabel = document.createElement("label")
        fieldLabel.innerHTML = ' From 0 to 1'

        newField.appendChild(fieldP)
        newField.appendChild(fieldInput)
        newField.appendChild(fieldLabel)
        settingContainer.appendChild(newField)
    }

    settingBtn.onclick = () => {
        setTimeout(() => {
            if (window.localStorage.getItem('coefficient') === null) {
                window.localStorage.setItem('coefficient', 1)
                loadcoefficient()
            }

            if (document.querySelector("#newsetting") === null) {
                loadcoefficient()
            }

            let applyBtn = document.querySelector('input[value="Apply"]')
            applyBtn.onclick = () => {
                let fieldInput = document.querySelector('#coefficient')
                window.localStorage.setItem('coefficient', fieldInput.value)
            }
        }, 100)
    }
}