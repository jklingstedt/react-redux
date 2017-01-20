import React from 'react'
import { container, title, slogan } from './styles.css'

export default function Home (props) {
  return (
    <div className={container}>
      <p className={title}>
        {'Duckr'}
      </p>
      <p className={slogan}>
        {'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium delectus eaque, corrupti harum similique'}
      </p>
    </div>
  )
}
