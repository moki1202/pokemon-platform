const SearchBar = () => {
  return (
    <div className='flex items-center bg-white rounded-full p-1 text-black'>
      <input
        type='text'
        placeholder='Search...'
        className='flex-grow outline-none px-2 py-1 rounded-full'
      />
      <button className='bg-red-500 text-white px-4 py-1 rounded-full ml-2'>
        Search
      </button>
    </div>
  )
}
export default SearchBar
