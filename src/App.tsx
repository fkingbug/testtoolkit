import React from 'react'
import PostContainer from './components/PostContainer'
import './App.css'
import PostContainer2 from './components/PostContainer2'

const App = () => {
  return (
    <div className='App'>
      <div style={{ display: 'flex' }}>
        <PostContainer />
        <PostContainer2 />
      </div>
    </div>
  )
}

export default App
