import './index.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Card from './components/Card'
import { useCart } from './hooks/useCart'



function App() {

  const { data, cart, addToCart, removeFromCart, substractFromItem, addToItem, clearCart, isEmpty, cartTotal } = useCart()
  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        addToItem={addToItem}
        substractFromItem={substractFromItem}
        clearCart={clearCart}
        isEmpty={isEmpty}
        cartTotal={cartTotal}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((card: any) => (
            <Card
              key={card.id}
              card={card}
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