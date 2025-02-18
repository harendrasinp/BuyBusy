import React, { useEffect, useState } from 'react'
import homeStyle from "./Home.module.css"
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseInit';
import { GridLoader } from 'react-spinners';
import { useUserContext } from '../userContext';
export const Home = () => {
    const {addtoCart,loadFechedData,setLoadFetchedData}=useUserContext()
    const [searchQuery, setSearchQuery] = useState("");
    const [filterPrice, setFilterPrice] = useState(10000);
    const [lodingstatus, setLoadingStatus] = useState(true)

    const[selectedCategories,setSelectCategories]=useState([]);
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
            setLoadFetchedData(fetchdata)
    };
    fetchData();
    },[setLoadFetchedData]);
    // -----------------------functions-----------------------------------
    const strimTitle = (title) => {
        if (title.length > 5) {
            return title.substring(0, 25);
        }
    }
    const isCategorySelected=(category)=>{
            return selectedCategories.includes(category);
    }
    const handleCategoryFilter=(e)=>{
        const category=e.target.value;
        if(selectedCategories.includes(category)){
            setSelectCategories(selectedCategories.filter((c)=>c!==category))
        }
        else{
            setSelectCategories([...selectedCategories,category])
        }
    }

    const filterProduct=loadFechedData.filter((product)=>{
        const matchSearch=product.title.toLowerCase().includes(searchQuery.toLowerCase()) || product.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchPrice=product.price<=filterPrice;
        const matchCategory=selectedCategories.length===0 || selectedCategories.some((category)=>category.toLowerCase()===product.category.toLowerCase())
        return matchCategory && matchPrice && matchSearch;
    })
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
                        <div><input type='checkbox' value={"men's clothing"} checked={isCategorySelected("men's clothing")} onChange={handleCategoryFilter}/> Men's Clothes</div>
                        <div><input type='checkbox' value={ "women's clothing"} checked={isCategorySelected("women's clothing")} onChange={handleCategoryFilter}/> Womens's Clothes</div>
                        <div><input type='checkbox' value={"jewelery"} checked={isCategorySelected("jewelery")} onChange={handleCategoryFilter}/> Jewelery</div>
                        <div><input type='checkbox' value={"electronics"} checked={isCategorySelected("electronics")} onChange={handleCategoryFilter}/> Electronics</div>
                    </div>
                </div>
            </div>
            <div className={homeStyle.searchBox}>
                <input placeholder='Search Product' type='search' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <div className={homeStyle.productContainer}>
                {lodingstatus ? <div className={homeStyle.spinner}><GridLoader loading={lodingstatus} color="#0b2b40" /></div>
                    : filterProduct.map((product) => (
                        <div key={product.id} className={homeStyle.Card}>
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



// import React, { useEffect, useState } from "react";
// import homeStyle from "./Home.module.css";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../firebase/firebaseInit";
// import { GridLoader } from "react-spinners";
// import { useUserContext } from "../userContext";

// export const Home = () => {
//     const { addtoCart, loadFechedData, setLoadFetchedData } = useUserContext();
//     const [searchQuery, setSearchQuery] = useState("");
//     const [filterPrice, setFilterPrice] = useState(10000);
//     const [loadingStatus, setLoadingStatus] = useState(true);
//     const [selectedCategories, setSelectCategories] = useState([]);

//     // ----------------------- Fetch Data from Firebase -----------------------------
//     useEffect(() => {
//         const fetchData = async () => {
//             setLoadingStatus(true);
//             try {
//                 const data = await getDocs(collection(db, "products"));
//                 const fetchdata = data.docs.map((item) => ({
//                     ...item.data(),
//                     id: item.id
//                 }));
//                 setLoadFetchedData(fetchdata);
//             } catch (error) {
//                 console.error("Error fetching products:", error);
//             } finally {
//                 setLoadingStatus(false);
//             }
//         };

//         fetchData(); // ✅ Call function inside useEffect
//     }, [setLoadFetchedData]);

//     // ----------------------- Helper Functions -----------------------------
//     const strimTitle = (title) => {
//         return title.length > 25 ? title.substring(0, 25) + "..." : title;
//     };

//     const isCategorySelected = (category) => {
//         return selectedCategories.includes(category);
//     };

//     const handleCategoryFilter = (e) => {
//         const category = e.target.value;
//         setSelectCategories((prev) =>
//             prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
//         );
//     };

//     // ----------------------- Filtering Products -----------------------------
//     const filteredProducts = loadFechedData.filter((product) => {
//         const matchSearch =
//             product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             product.category.toLowerCase().includes(searchQuery.toLowerCase());
//         const matchPrice = product.price <= filterPrice;
//         const matchCategory =
//             selectedCategories.length === 0 ||
//             selectedCategories.some((category) => category.toLowerCase() === product.category.toLowerCase());

//         return matchCategory && matchPrice && matchSearch;
//     });

//     // ----------------------- UI Rendering -----------------------------
//     return (
//         <div className={homeStyle.countainer}>
//             <div className={homeStyle.filterDiv}>
//                 <div className={homeStyle.fitlerContainer}>
//                     <div className={homeStyle.filterTitle}>Filter</div>
//                     <div className={homeStyle.priveDiv}>Price: {filterPrice}</div>
//                     <div className={homeStyle.priceLine}>
//                         <input
//                             type="range"
//                             min={5}
//                             max={25000}
//                             step={2}
//                             value={filterPrice}
//                             onChange={(e) => setFilterPrice(Number(e.target.value))}
//                         />
//                     </div>

//                     <div className={homeStyle.titleCategory}>Category</div>
//                     <div className={homeStyle.productSelection}>
//                         <div>
//                             <input
//                                 type="checkbox"
//                                 value={"men's clothing"}
//                                 checked={isCategorySelected("men's clothing")}
//                                 onChange={handleCategoryFilter}
//                             />{" "}
//                             Men's Clothes
//                         </div>
//                         <div>
//                             <input
//                                 type="checkbox"
//                                 value={"women's clothing"}
//                                 checked={isCategorySelected("women's clothing")}
//                                 onChange={handleCategoryFilter}
//                             />{" "}
//                             Women's Clothes
//                         </div>
//                         <div>
//                             <input
//                                 type="checkbox"
//                                 value={"jewelery"}
//                                 checked={isCategorySelected("jewelery")}
//                                 onChange={handleCategoryFilter}
//                             />{" "}
//                             Jewelry
//                         </div>
//                         <div>
//                             <input
//                                 type="checkbox"
//                                 value={"electronics"}
//                                 checked={isCategorySelected("electronics")}
//                                 onChange={handleCategoryFilter}
//                             />{" "}
//                             Electronics
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className={homeStyle.searchBox}>
//                 <input
//                     placeholder="Search Product"
//                     type="search"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//             </div>

//             <div className={homeStyle.productContainer}>
//                 {loadingStatus ? (
//                     <div className={homeStyle.spinner}>
//                         <GridLoader loading={loadingStatus} color="#0b2b40" />
//                     </div>
//                 ) : (
//                     filteredProducts.map((product) => (
//                         <div key={product.id} className={homeStyle.Card}>
//                             <img src={product.image} alt="product" />
//                             <div className={homeStyle.productName}>{strimTitle(product.title)}</div>
//                             <div className={homeStyle.productPrice}>&#8377;{product.price}</div>
//                             <div className={homeStyle.submitBtnDiv}>
//                                 <button type="submit" onClick={() => addtoCart(product)}>
//                                     Add To Cart
//                                 </button>
//                             </div>
//                         </div>
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// };
