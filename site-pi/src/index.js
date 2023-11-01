import React from 'react'
import ReactDOM from 'react-dom'
import './styles.css'
import hamburger from './hamburger.png'
import batata from './batata-frita.png'
import cafe from './cafe-xicara.png'
import axios from 'axios'
let cDate = new Date()
// const express = require('express')
// const exp = express()
function message(){
alert("Pedido enviado!!");
window.location = 'url_Of_Redirected_Page' // i.e. window.location='default.aspx'
}
function addb1(x){
    document.getElementById('valor1').innerHTML = parseInt(document.getElementById('valor1').innerHTML) + x
    document.getElementById('nitens1').innerHTML = parseInt(document.getElementById('nitens1').innerHTML) + 1
    total()
}
function addb2(x){
    document.getElementById('valor2').innerHTML = parseInt(document.getElementById('valor2').innerHTML) + x
    document.getElementById('nitens2').innerHTML = parseInt(document.getElementById('nitens2').innerHTML) + 1
    total()
}
function addb3(x){
    document.getElementById('valor3').innerHTML = parseInt(document.getElementById('valor3').innerHTML) + x
    document.getElementById('nitens3').innerHTML = parseInt(document.getElementById('nitens3').innerHTML) + 1
    total()
}
function total(){
    document.getElementById('total').innerHTML = parseInt(document.getElementById('valor1').innerHTML) + parseInt(document.getElementById('valor2').innerHTML) + parseInt(document.getElementById('valor3').innerHTML)
}
function removeb1(x){
    if(document.getElementById('valor1').innerHTML === 0){
        document.getElementById('valor1').innerHTML = 0
        document.getElementById('nitens1').innerHTML = 0
    }
    else{
    document.getElementById('valor1').innerHTML = parseInt(document.getElementById('valor1').innerHTML) - x
    document.getElementById('nitens1').innerHTML = parseInt(document.getElementById('nitens1').innerHTML) - 1
    total()
    }
}
function removeb2(x){
    if(document.getElementById('valor2').innerHTML === 0){
        document.getElementById('valor2').innerHTML = 0
        document.getElementById('nitens2').innerHTML = 0
    }
    else{
    document.getElementById('valor2').innerHTML = parseInt(document.getElementById('valor2').innerHTML) - x
    document.getElementById('nitens2').innerHTML = parseInt(document.getElementById('nitens2').innerHTML) - 1
    total()
    }
}
function removeb3(x){
    if(document.getElementById('valor3').innerHTML === 0){
        document.getElementById('valor3').innerHTML = 0
        document.getElementById('nitens3').innerHTML = 0
    }
    else{
    document.getElementById('valor3').innerHTML = parseInt(document.getElementById('valor3').innerHTML) - x
    document.getElementById('nitens3').innerHTML = parseInt(document.getElementById('nitens3').innerHTML) - 1
    total()
    }
}

let qtdhamburger = 0
let qtdbatata = 0
let qtdcafe = 0
let precototal = 0
const pedido = {}

/*
esqueleto do json:
{
    datahora: "2021-10-10 10:10:10",
    qtdhamburger: 0,
    qtdcafe: 0,
    qtdbatata: 0,
    precototal: 0,
    pronto: false
} 
*/

const App = () => {
    return(
        <>
    <div className="page-title">Seu Carrinho</div>
    <div className="content">
      <section>
        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Preço</th>
              <th>Quantidade</th>
              <th>Total</th>
              <th>-</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="product">
                  <img
                    src={hamburger}
                    alt="burgão"
                    width={120}
                    height={120}
                  />
                  <div className="info">
                    <div className="name">Nome do produto</div>
                    <div className="category">Categoria</div>
                  </div>
                </div>
              </td>
              <td>R$ 20</td>
              <td>
                <div className="qty">
                  <button onClick={() => removeb1(20)}>
                    <i className="bx bx-minus" />
                  </button>
                  <span id="nitens1">0</span>
                  <button onClick={() => addb1(20)}>
                    <i className="bx bx-plus" />
                  </button>
                </div>
              </td>
              <td>
                R$ <span id="valor1">0</span>
              </td>
            </tr>
            <tr>
              <td>
                <div className="product">
                  <img
                    src={cafe}
                    alt="cafezinho"
                    width={120}
                    height={120}
                  />
                  <div className="info">
                    <div className="name">Nome do produto</div>
                    <div className="category">Categoria</div>
                  </div>
                </div>
              </td>
              <td>R$ 10</td>
              <td>
                <div className="qty">
                  <button onClick={() => removeb2(10)}>
                    <i className="bx bx-minus" />
                  </button>
                  <span id="nitens2">0</span>
                  <button onClick={() => addb2(10)}>
                    <i className="bx bx-plus" />
                  </button>
                </div>
              </td>
              <td>
                R$ <span id="valor2">0</span>
              </td>
              <td></td>
            </tr>
            <tr>
              <td>
                <div className="product">
                  <img
                    src={batata}
                    alt="batata"
                    width={120}
                    height={120}
                  />
                  <div className="info">
                    <div className="name">Nome do produto</div>
                    <div className="category">Categoria</div>
                  </div>
                </div>
              </td>
              <td>R$ 12</td>
              <td>
                <div className="qty">
                  <button onClick={() => removeb3(12)}>
                    <i className="bx bx-minus" />
                  </button>
                  <span id="nitens3">0</span>
                  <button onClick={() => addb3(12)}>
                    <i className="bx bx-plus" />
                  </button>
                </div>
              </td>
              <td>
                R$ <span id="valor3">0</span>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </section>
      <aside>
        <div className="box">
          <header>Resumo da compra</header>
          <div className="info"></div>
          <footer>
            <span>Total</span>
            <span>
              R$ <span id="total">0</span>
            </span>
          </footer>
        </div>
        <button onClick={function finalizar(){
    let datahora = cDate.getDate() + "/" + (cDate.getMonth()+1) + " " + cDate.getHours() + ":" + cDate.getMinutes()
    let pronto = false
    qtdhamburger = parseInt(document.getElementById('nitens1').innerHTML)
    qtdcafe = parseInt(document.getElementById('nitens2').innerHTML)
    qtdbatata = parseInt(document.getElementById('nitens3').innerHTML)
    precototal = parseInt(document.getElementById('total').innerHTML)

    pedido.datahora = datahora
    pedido.qtdhamburger = qtdhamburger
    pedido.qtdcafe = qtdcafe
    pedido.qtdbatata = qtdbatata
    pedido.precototal = precototal
    pedido.pronto = pronto

    axios.post('http://localhost:4000/pedidos', pedido).then(res => {message()}).catch(err => {message()})
  }}
  >Finalizar Compra</button>
      </aside>
    </div>
    </>
    )
}

ReactDOM.render(
    <App />,
    document.querySelector("#root")
)