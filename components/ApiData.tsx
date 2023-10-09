"use client"
import Card from '@/components/card'
import { useEffect, useState } from 'react'
import Load from '@/components/load'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import PlanetFilter from './planetFilter'
import SearchInput from './searchInput'
import TWButton from './smallparts/TWButton'
import FilmFilter from './filmFilter'
import ErrorScreen from './error'

export default function ApiData() {
  // constants
  const { systemTheme } = useTheme()
  const ActualTheme = systemTheme == "dark" ? "searchrow" : "searchroww"
  const defaultURI = 'https://swapi.dev/api/people/'
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorserver, setError] = useState(false)
  const searchParams = useSearchParams()
  const [page, setPage] = useState(searchParams.get('page') || '1')
  const [lands, setLands] = useState([])
  const [planetFilter, setPlanet] = useState('')
  const [searchFilter, setSearch] = useState('')
  const [filmFilter, setFilm] = useState('')
  const router = useRouter()

  const fetchURL = () => {
    if (page) {
      return "https://swapi.dev/api/people/?page=" + page;
    }
    return null;
  }


  useEffect(() => {

    // API CALL
    setError(false)
    setLoading(true)
    fetch(fetchURL() || defaultURI)
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData)
        var tolands = []
        responseData.results.forEach(element => {
          var pos
          pos = tolands.indexOf(element.homeworld)
          if (!~pos) {
            tolands.push(element.homeworld)
          }
        })
        setLands(tolands)
        setLoading(false)
        setPlanet('all')

      })
      .catch((error) => {
        // Error
        console.error('Hiba történt az API lekérdezése közben:', error);
        setLoading(false);
        setError(true);
      })
  }, [page])



  if (loading) {
    // Loading Return
    return <Load />
  }

  if (errorserver) {
    // Return error component
    return <ErrorScreen setBackPage={() => {
      setPage('1')
      router.push('/?page=1')
      
    }}/>
  }
    //defult filter settings at page load
  if(planetFilter == ''){
    setPlanet('all')
  }
  if(filmFilter == ''){
    setFilm('all')
  }
  const searched = searchFilter === '' ? data.results : data.results.filter((record) => record.name.toLowerCase().includes(searchFilter))
  const filteredRecords = planetFilter === "all" ? searched : searched.filter((record) => record.homeworld === planetFilter);
  const filteredRecordsFinal = filmFilter === "all" ? filteredRecords : filteredRecords.filter((record) => record.films.includes(filmFilter));

  return (
    // main return
    <>
      {/* Search Bar */}
      <div className={`flex grid grid-cols-1 max-w-5xl w-full p-4 overflow-none mt-4 text-center ${ActualTheme}`}>
        <div className='flex grid md:grid-cols-5 grid-cols-1 md:gap-4 gap-y-4'>
          <SearchInput callback={(e)=> setSearch(e)} />
          <PlanetFilter planetList={lands} callBack={(e)=> setPlanet(e)}/>
          <FilmFilter callBackFilm={(e) => setFilm(e)}/>
        </div>
      </div>
      {/* Search Bar END */}
      <div className="mb-32 grid gap-5 sm: gap-1 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-2 lg:text-left my-8 overflow-none grid-cols-2">
        { filteredRecordsFinal.map((item, index) => (
          <Card
            characterName={item.name}
            imgUrl={`https://picsum.photos/seed/${item.name}/250/190/`}
            cardData={item} actualTheme={systemTheme} key={index}
          />
        ))} </div>
      {/* Pagination */}
      <div className={`flex grid grid-cols-1 max-w-5xl w-full p-4 overflow-none mt-8 text-center ${ActualTheme}`}>
        <div className='text-white'>
          {data.previous != null && <Link href={'/?page=' + (Number(page) - 1)} onClick={() => { 
            var prevpage = Number(page) - 1
            setPage(prevpage.toString())
          }}>
            <TWButton direction="prev" buttonText="Prev Page" />
            </Link>}

        {data.next != null && data.previous != null ? " | " : ""}
        
          {data.next != null && <Link href={'/?page=' + (Number(page) + 1)} onClick={() => { 
            var nextpage = Number(page) + 1
            setPage(nextpage.toString())
          }}>
          <TWButton direction="next" buttonText="Next Page" />
            </Link>}
        </div>
      </div>
      {/* Pagination END */}
    </>

  )
}
