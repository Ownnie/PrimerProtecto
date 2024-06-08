import './index.css'

import { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Card from './components/Card'
import { db } from './data/db'

interface Item {
  id: number;
  quantity: number;
  price: number;
}

function App() {

  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [data] = useState(db)
  const [cart, setCart] = useState<Item[]>(initialCart)
  const MAX_ITEMS = 5
  const MIN_ITEMS = 1

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart])


  function addToCart(item: Item) {

    const itemExist = cart.findIndex(card => card.id === item.id)

    if (itemExist >= 0) {
      const updatedCart = [...cart]
      updatedCart[itemExist].quantity++
      setCart(updatedCart)
    } else {
      item.quantity = 1
      setCart([...cart, item])
    }

    saveLocalStorage()
  }

  function removeFromCart(id: any) {
    setCart(prevCart => prevCart.filter(card => card.id !== id))
  }

  function addToItem(item: Item) {
    const cartCopy = cart.map(itemCopy => {
      if (itemCopy.id === item.id && itemCopy.quantity < MAX_ITEMS) {
        return {
          ...itemCopy,
          quantity: itemCopy.quantity + 1
        }
      }
      return itemCopy
    })
    setCart(cartCopy)
  }

  function substractFromItem(item: Item) {
    if (item.quantity > MIN_ITEMS) {
      setCart(prevCart => prevCart.map(card => card.id === item.id ? { ...card, quantity: card.quantity-- } : card))
    } else {
      setCart(prevCart => prevCart.filter(card => card.id !== item.id))
    }
  }

  function clearCart() {
    setCart([]);
  }

  function saveLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        addToItem={addToItem}
        substractFromItem={substractFromItem}
        clearCart={clearCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((card: any) => (
            <Card
              key={card.id}
              card={card}
              cart={cart}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>

      <Footer />
    </>
  )
}

export default App