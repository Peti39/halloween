import { useState } from 'react'

//import './App.css'
import { Header } from './Header'
import { Listing } from './Listing'
import { Footer } from './Footer'
import { House } from './House'
import { useEffect } from 'react'
import { getHouseData, type House as HouseList } from './usersData'

function App() {
  const [houses, setHouses] = useState<HouseList[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchHouses() {
      try{
        const data = await getHouseData();
        setHouses(data);
      } catch (error) {
        console.error("Failed to fetch house data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchHouses();
  }, []);
  if (isLoading) {
    return <div><h1>Loading...</h1></div>;
  }

  return (
    <>
    <Header housesProp = {houses}/>
    <Listing housesProp = {houses}/>
    <Footer />
    </>
    
  )
}

export default App
