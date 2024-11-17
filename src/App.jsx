import './App.css'
import AsideNav from './components/asideNav'
import MainContent from './components/mainContent'

// import Track from './components/track'

function App() {
  return (
    <>
      {/* <p>Hello React</p> */}
      {/* <Track /> */}
      <main className='site'>
        <AsideNav />
        <MainContent />
      </main>
     
    </>
  )
}

export default App
