import { useState, useEffect, useMemo } from 'react'

import type { Card, Item } from '../types';

export const useCart = () => {

    const initialCart = (): Item[] => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }
    const [cart, setCart] = useState(initialCart)

    const MAX_ITEMS = 5
    const MIN_ITEMS = 1

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart])


    function addToCart(item: Card) {

        const itemExist = cart.findIndex(card => card.id === item.id)
        if (itemExist >= 0) {
            if (cart[itemExist].quantity >= MAX_ITEMS) return
            const updatedCart = [...cart]
            updatedCart[itemExist].quantity++
            setCart(updatedCart)
        } else {
            const newItem: Item = { ...item, quantity: 1 }
            setCart([...cart, newItem])
        }
    }

    function removeFromCart(id: Card['id']) {
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
        const cartCopy = cart.map(itemCopy => {
            if (itemCopy.id === item.id && itemCopy.quantity > MIN_ITEMS) {
                return {
                    ...itemCopy,
                    quantity: itemCopy.quantity - 1
                }
            }
            return itemCopy
        })
        setCart(cartCopy)
    }

    function clearCart() {
        setCart([]);
    }

    const isEmpty = useMemo(() => cart.length === 0, [cart])
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])


    return {
        cart,
        addToCart,
        removeFromCart,
        substractFromItem,
        addToItem,
        clearCart,
        isEmpty,
        cartTotal
    }
}