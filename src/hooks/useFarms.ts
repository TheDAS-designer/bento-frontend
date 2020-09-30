import { useContext } from 'react'
import { Context as FarmsContext } from '../contexts/bento_Farms'
// import { Context as FarmsContext } from '../contexts/Farms'

const useFarms = () => {
  const { farms } = useContext(FarmsContext)
  return [farms]
}

export default useFarms
