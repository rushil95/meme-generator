import React from 'react'
import Header from './components/Header'
import MemeGenerator from './components/MemeGenerator'

export default function App() {
    return (
        <div className='app-container'>
            <Header />
            <MemeGenerator />
        </div>
    )
}