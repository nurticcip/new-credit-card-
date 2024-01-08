const name = document.querySelector('#name')
const number = document.querySelector('#card-number')
const date = document.querySelector('#expiry-date')
const cvv = document.querySelector('#cvv')
const add = document.querySelector('.add')
const save = document.querySelector('.save')
const delate = document.querySelector('.delete')
const cardName = document.querySelector('.card-name')
const infos = document.querySelector('.infos')
const addNew = document.querySelector('span')

number.addEventListener('input', () => {
    number.style.borderBottom = '' 
    let str = number.value;
	if (str.length > 19) {
		number.value = str.slice(0, 19);
	} else {
		str = str.replace(/-/g, '');
		let res = '';
		for (let i = 0; i < str.length; i++) {
			if (i !== 0 && i % 4 === 0) {
				res += '-';
			}
			res += str[i];
		}
		number.value = res;
	}
});

addNew.addEventListener('click', () => {
    name.focus( )
})

date.addEventListener('input', () => {
    let str = date.value;
    if (str.length > 7) {
      date.value = str.slice(0, 7);
    } else {
      let res = '';
      for (let i = 0; i < str.length; i++) {
        console.log(i);
        if (i === 2 && str.includes('/') !== true) {
          res += `/${str[i]}`;
        } else {
          res += str[i];
        }
      }
      date.value = res;
    }
});
  
cvv.addEventListener('input', () => {
    cvv.style.borderBottom = ''
	let str = cvv.value;
	if (str.length > 3) {
		cvv.value = str.slice(0, 3);
	}
});


add.addEventListener('click', () => {
    if (name.value.length !== 0 && number.value.length !== 0 && date.value.length !== 0 && cvv.value.length !== 0) {
        let object = {
            name: name.value,
            cardN: number.value,
            expiry: date.value,
            cvv: cvv.value,
        };

        let dataData = JSON.parse(localStorage.getItem('card')) || [];
        dataData.push(object);
        localStorage.setItem('card', JSON.stringify(dataData));
        getCard();

        number.value = ''
        name.value = ''
        date.value = ''
        cvv.value = ''

    } else {
        alert('Заполни все калонки!')
        name.value.length === 0 ? name.style.borderBottom = '1px solid red' :  name.style.borderBottom = '1px solid green'
        number.value.length !== 19 ? number.style.borderBottom = '1px solid red' : number.style.borderBottom = '1px solid green'
        date.value.length !== 7 ? date.style.borderBottom = '1px solid red' : date.style.borderBottom = '1px solid green'
        cvv.value.length !== 3 ? cvv.style.borderBottom = '1px solid red' : cvv.style.borderBottom = '1px solid green'
    }
    
})



function getCard() {
	infos.innerHTML = '';
	let getLocal = JSON.parse(localStorage.getItem('card')) || [];
	getLocal.forEach((el, idx) => {

        const infoCard = document.createElement('div')
        infoCard.setAttribute('class', 'info-card')

        const cardName = document.createElement('div')
        cardName.setAttribute('class', 'card-name')
        const nameH2 = document.createElement('h2')
        nameH2.innerHTML = 'Name'
        const nameH1 = document.createElement('h1')
        cardName.append(nameH2, nameH1)
        nameH1.innerHTML = el.name

        const till = document.createElement('div')
        till.setAttribute('class', 'till')
        const tillH2 = document.createElement('h2')
        tillH2.innerHTML = 'Valid Till'
        const tillH1 = document.createElement('h1')
        till.append(tillH2, tillH1)
        tillH1.innerHTML = el.expiry

        const cardIcon = document.createElement('div')
        cardIcon.setAttribute('class', 'card-icon')
        const remove = document.createElement('ion-icon')
        remove.name = 'trash-outline'
        const edit = document.createElement('ion-icon')
        edit.name = 'card-outline'

        remove.addEventListener('click', () => { delItem(idx) })
        
        edit.addEventListener('click', () => {
            name.value = el.name;
			number.value = el.cardN;
			date.value = el.expiry;
            cvv.value = el.cvv;
            save.style.display = 'block'
            add.style.display = 'none'
            save.addEventListener('click', () => {
                let getRemove = JSON.parse(localStorage.getItem('card')) || [];
                let object = {
                    name: name.value,
                    cardN: number.value,
                    expiry: date.value,
                    cvv: cvv.value
                };
                getRemove.splice(idx, 1, object);
				localStorage.setItem('card', JSON.stringify(getRemove));
                getCard();
                add.style.display = 'block'
                save.style.display = 'none'
            });
        })

        cardIcon.append(remove, edit)
        
        const cardHeader = document.createElement('div')
        cardHeader.setAttribute('class', 'card-header')
        const img = document.createElement('img')
        img.src = './img/info-card.svg'        
        
        cardHeader.append(img, cardIcon)

        const cardNumber = document.createElement('div')
        cardNumber.setAttribute('class', 'card-number')
        const numberH1 = document.createElement('h1')
        numberH1.setAttribute('class', 'number-h1')
        numberH1.innerHTML = el.cardN
        cardNumber.append(numberH1)
        
        const cardFooter = document.createElement('div')
        cardFooter.setAttribute('class', 'card-footer')
        cardFooter.append(cardName, till)

        infoCard.append(cardHeader, cardNumber, cardFooter)


        infos.append(infoCard)
        infoCard.style.margin = '10px 0'







        // const remove = document.createElement('div')
        // remove.setAttribute('class', 'remove')
        // const edit = document.createElement('div')
        // edit.setAttribute('class', 'edit')           
        // const nameH2 = document.createElement('div')
        // nameH2.setAttribute('class', 'name-h2')
        // const tillH2 = document.createElement('div')
        // tillH2.setAttribute('class', 'till-h2')
        // const expiryDate = document.createElement('div')
        // expiryDate.setAttribute('class', 'expiry-date')

        
        // const nameH1 = document.createElement('div')
        // nameH1.setAttribute('class', 'name-h1')
        // const numberH1 = document.createElement('div')
        // numberH1.setAttribute('class', 'number-h1')



        
	});
}

function delItem(n) {
	let removeForElem = JSON.parse(localStorage.getItem('card')) || [];
	removeForElem.splice(n, 1);
	localStorage.setItem('card', JSON.stringify(removeForElem));
	getCard();
}

getCard()