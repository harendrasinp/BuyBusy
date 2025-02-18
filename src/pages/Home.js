import React, { useEffect, useState } from 'react'
import homeStyle from "./Home.module.css"
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseInit';
import { GridLoader } from 'react-spinners';
import { useUserContext } from '../userContext';
import { toast } from 'react-toastify';
export const Home = () => {
    const {addtoCart,loadFechedData,setLoadFetchedData}=useUserContext()
    const [alldata, setAllData] = useState([]);
    const [fetchData, setFetchedData] = useState("");
    const [filterPrice, setFilterPrice] = useState(0);
    const [lodingstatus, setLoadingStatus] = useState(true)
    // -----------------------Hooks-----------------------------
    useEffect(() => {
        const fetchData = async () => {
            setLoadingStatus(true)
            const data = await getDocs(collection(db, "products"));
            const fetchdata = data.docs.map((item) => {
                return {
                    ...item.data(),
                    id:item.id
                }
            });
            setLoadingStatus(false)
            setAllData(fetchdata);
            setLoadFetchedData(fetchdata)
    };
    fetchData();
    },[]);
    useEffect(() => {
        if (fetchData === "") {
            setLoadFetchedData(alldata);
        }
        else {
            const fetchDt = alldata.filter((product) => product.title.toLowerCase().includes(fetchData.toLowerCase()));
            setLoadFetchedData(fetchDt)
        }
    },[fetchData,alldata]);
    useEffect(() => {
        if (filterPrice === 0) {
            return
        }
        else {
            const filterP = alldata.filter((product) => product.price <= filterPrice)
            setLoadFetchedData(filterP);
        }
    }, [filterPrice, alldata])
    // -----------------------functions-----------------------------------
    const strimTitle = (title) => {
        if (title.length > 5) {
            return title.substring(0, 25);
        }
    }
    // -------------------------return------------------------------------------
    return (
        <div className={homeStyle.countainer}>

            <div className={homeStyle.filterDiv}>
                <div className={homeStyle.fitlerContainer}>
                    <div className={homeStyle.filterTitle}>Filter</div>
                    <div className={homeStyle.priveDiv}>Price:{filterPrice}</div>
                    <div className={homeStyle.priceLine}>
                        <input type='range' min={5} max={25000} step={2} value={filterPrice} onChange={(e) => setFilterPrice(e.target.value)} />
                    </div>
                    <div className={homeStyle.titleCategory}>Category</div>
                    <div className={homeStyle.productSelection}>
                        <div><input type='checkbox'  />Man's Clothes</div>
                        <div><input type='checkbox' />Womens's Clothes</div>
                        <div><input type='checkbox' />Jwellary</div>
                        <div><input type='checkbox' />Electronics</div>
                    </div>
                </div>
            </div>
            <div className={homeStyle.searchBox}>
                <input placeholder='Search By Name' onChange={(e) => setFetchedData(e.target.value)} />
            </div>
            <div className={homeStyle.productContainer}>
                {lodingstatus ? <div className={homeStyle.spinner}><GridLoader loading={lodingstatus} color="#0b2b40" /></div>
                    : loadFechedData.map((product,index) => (
                        <div key={index} className={homeStyle.Card}>
                            <img src={product.image} alt='images' />
                            <div className={homeStyle.productName}>{strimTitle(product.title)}</div>
                            <div className={homeStyle.productPrice}>&#8377;{product.price}</div>
                            <div className={homeStyle.submitBtnDiv}>
                                <button type='submit'onClick={()=>addtoCart(product)}>Add To Cart</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
// filtered products
// const filteredProducts = products.filter((product) => {
//     const matchSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchPrice = product.price <= priceFilter;

//     const matchCategory = selectedCategories.length === 0 || selectedCategories.some((category) => product.category.toLowerCase() === category.toLowerCase());

//     return matchCategory && matchSearch && matchPrice;
// })
