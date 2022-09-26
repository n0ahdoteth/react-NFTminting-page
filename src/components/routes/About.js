import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header'

const About = () => {
  return (
    <main>
        <Header />
        <Link to="/">Home</Link>
        <h1>About</h1>
    </main>
  )
}

export default About