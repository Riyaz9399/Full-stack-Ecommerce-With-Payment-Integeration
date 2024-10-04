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
            <HorizonalCardProduct category={"pulses"} heading={"Patanjali"} />
            <HorizonalCardProduct category={"DairyProducts"} heading={"Dairy Products"} />
            <HorizonalCardProduct category={"groceries"} heading={"Groceries"} />
            <HorizonalCardProduct category={"snacks"} heading={"Sancks "} />
            <HorizonalCardProduct category={"Spices"} heading={"Spices & Condiments"} />
            <HorizonalCardProduct category={"oil"} heading={"Find Your Perfect Oil"} />
            <HorizonalCardProduct category={"namkeen"} heading={"Namkeen & Snacks"} />

            {/* <VerticalCartProduct category={"toothpaste"} heading={"TootPaste"} /> */}
            {/* <VerticalCartProduct category={"BakeryItems"} heading={"Bakery Items"} /> */}
            <VerticalCartProduct category={"personalCare"} heading={"Personal Care"} />
            <VerticalCartProduct category={"tea"} heading={"Tea Categories"} />
            {/* <VerticalCartProduct category={"faceWash"} heading={"Cleanse & Refresh"} /> */}
            {/* <VerticalCartProduct category={"soap"} heading={"Soap Collection"} /> */}
            <VerticalCartProduct category={"biscuits"} heading={"Delicious Biscuits"} />
            <VerticalCartProduct category={"vermicelli"} heading={"Tasty Vermicelli"} />

    </div>
  )
}

export default Home

