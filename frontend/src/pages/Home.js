import React from 'react'
import CategoriesList from '../components/CategoriesList'
import BannerProduct from '../components/BannerProduct'
import HorizonalCardProduct from '../components/HorizonalCardProduct'
import VerticalCartProduct from '../components/VerticalCartProduct'

const Home = () => {
  return (
    <div >
    <CategoriesList/>
    <BannerProduct/>
    <HorizonalCardProduct category={"pulses"} heading={"patanjali"}/>
    <HorizonalCardProduct category={"salt"} heading={"Snacks"}/>
    <VerticalCartProduct  category={"toothpaste"} heading={"patanjali"} />
    <VerticalCartProduct  category={"tea"} heading={"patanjali"} />
    <VerticalCartProduct  category={"personal_care"} heading={"patanjali"} />
    </div>
  )
}

export default Home

