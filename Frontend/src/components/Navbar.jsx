import logo from '../assets/logo.png'

function Navbar() {
  return (
    <div className='flex items-center gap-3 p-4 bg-white shadow-md'>

      <img
        src={logo}
        alt='logo'
        className='w-14 h-14 rounded-full border-4 border-pink-400 object-cover shadow-lg'
      />

      <h1 className='text-3xl font-bold text-pink-500'>
        LogicMint
      </h1>

    </div>
  )
}

export default Navbar