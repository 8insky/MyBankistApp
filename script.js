'use strict'


const account1 = {
    owner: 'Damian Ziubinski',
    movements: [200, 1000, -1000, -345, -799, 2300, 23, 222, 345, 23],
    interestRate : 1.2,
    pin: 1111
}

const account2 = {
    owner: 'Krzesimir Podhorski',
    movements: [400, -1890, 1000, 345, -799, 300, 15, 17],
    interestRate : 1.2,
    pin: 2222
}

const account3 = {
    owner: 'Jaś Dmoch',
    movements: [200, 5000, -10000, -3455, -799, 12300, 23],
    interestRate : 1.2,
    pin: 3333
}

const account4 = {
    owner: 'Paweł Turowski',
    movements: [200, 10, -1000, 345, 799, 300, 23],
    interestRate : 1.2,
    pin: 4444
}


const accounts = [account1, account2, account3, account4];

const app = document.querySelector('.app')
const movementsContainer = document.querySelector('.movementsContainer')
const loginInput = document.querySelector('.loginInput')
const passwordInput = document.querySelector('.passwordInput')
const loginMessage = document.querySelector('.welcomeMsg')
const loginBtn = document.querySelector('.loginBtn')
const balanceContainer = document.querySelector('.balance')
const summary = document.querySelector('.summary')
const insideAm = document.querySelector('.inside')
const outsideAm = document.querySelector('.out')
const interestAm = document.querySelector('.interest')


//DISLAY UI AND WELCOME MESSAGE


const displayMovements = function(acc){

    movementsContainer.innerHTML = ''

    acc.forEach((mov) => {

        const type = mov > 0 ? 'deposit' : 'withdrawal'
        const html = `
        <div class="movement movement-type-${type}">
        <div>${mov}EUR</div>
                    
                    
        </div>
        `

        movementsContainer.insertAdjacentHTML('afterbegin',html)
    })
}

displayMovements(account1.movements)

const createUsername = function(acc){
  acc.forEach((el) => {
    el.username = el.owner.toLowerCase().split(' ').map((el) => el[0]).join('')
  })

  console.log(acc)


}


const displayBalance = function(acc){
    summary.style.opacity = '100'
    const balance = acc.reduce((acc, el) => acc += el)
    balanceContainer.innerHTML = `Current balance: ${balance}EUR`


}

const displaySummary = function(acc){
    const insideAmmount = acc.filter((el) => el > 0).reduce((acc, el) => acc += el);
    console.log(insideAmmount)
    insideAm.innerHTML = `Inside: ${insideAmmount}EUR`
    const outsideAmmount = acc.filter((el) => el < 0).reduce((acc, el) => acc += el);
    console.log(outsideAmmount)
    outsideAm.innerHTML = `Out: ${outsideAmmount}EUR`
    console.log(insideAmmount + outsideAmmount)

    const interestAmount = acc.filter((el) => el > 0).map((el) => el * 1.2/100).filter((el) => el >= 1).reduce((acc, el) => acc += el, 0)
    interestAm.innerHTML = `Interest: ${Math.floor(interestAmount)}EUR`
}


let currentUser



const displayUI = (acc) => {
    displayMovements(acc.movements)
    displayBalance(acc.movements)
    displaySummary(acc.movements)

}

loginBtn.addEventListener('click', function(e){
    e.preventDefault()

    currentUser = accounts.find((el) => el.username === loginInput.value.trim());

    if(currentUser.pin === Number(passwordInput.value)){
        console.log(currentUser.owner.split(' ')[0])
       
        app.style.opacity = '100'
        loginMessage.innerHTML = `Hello ${currentUser.owner.split(' ')[0]}!`
        displayUI(currentUser)
    }else{
        alert('Wrong login or password!')
    }
    

    
})







createUsername(accounts)