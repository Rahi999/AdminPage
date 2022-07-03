import React, { useEffect, useState } from 'react'

const Cart = () => {
     // http://localhost:8000/posts
     const [data,setData] = useState([])
     const [cart,setCart] = useState(0)
     const [page,setPage] = useState(1)
     const [limit,setLimit] = useState(3)
     const [image,setImage] = useState("");
     const [title,setTitle] = useState("");
     const [price,setPrice] = useState("")
     const [error,setError] = useState(false)
     const[loading,setLoading] = useState(false);

     const handleImageChange = (e)=> {
        setImage(e.target.value)
     }
     const handleTitleChange = (e)=> {
        setTitle(e.target.value)
     }

     const handlePriceChange = (e)=> {
        setPrice(e.target.value)
     }


    

     const handleLimitChange = (e)=> {
        setLimit(e.target.value)
     }


     useEffect(()=> {
        getData()
     },[page,limit])

     const getData = () => {
        setLoading(true)
        return fetch(`http://localhost:8000/posts?_page=${page}&_limit=${limit}`)
        .then((res)=> res.json())
        .then((res)=> setData(res))
        .catch(()=> setError(true))
        .finally(()=> setLoading(false))
     }



     const addProduct = (image,title,price) => {
        const payload = {
            image,
            title,
            price,
            status:false
        }
       
        setLoading(true)
        return fetch(`http://localhost:8000/posts?_page=${page}&_limit=${limit}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }
        )
        .then((res)=> res.json())
        .then((res)=> {
            return getData()
        })
        .catch(()=> setError(true))
        .finally(()=> setLoading(false))


     }
    
  return loading ? (<h1>...Loading</h1>) : error ? (<h1>...Please Start Json Server to watch data </h1>) : (
    <div>
<div>
       <h1>Cart: {cart}</h1>
        <input type="url"
         placeholder='Enter Image Url'
         name="image"
         onChange={handleImageChange}

          />{" "}
          <input type="text"
          placeholder='Enter Title '
          name="title"
          onChange={handleTitleChange}

          /> {" "}
          <input type="number"
          placeholder='Enter Price'
          name="price"
          onChange={handlePriceChange}

          />{" "}
          <button onClick={()=> addProduct(image,title,price)} >Add</button>
          
</div>

        <button disabled={page===1} onClick={()=> setPage(page-1)}>Prev</button>
        <span>Page : {page} and {" "}</span>
        <span>Limit : {limit}</span> {" "}
        <span>{data.length}</span>
        <select name="select" onChange={handleLimitChange}  >
            <option >Select Limit</option>
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
        </select>
        <button disabled={data.length < limit} onClick={()=> setPage(page+1)} >Next</button>
     <div style={{
        display:"flex",
        gap: "20px",
        marginTop:"30px"
     }}> {data.map((d)=> (
        <div key={d.id}  >
            <img src={d.image} alt="" width="100px" />
            <p>{d.title}</p>
            <h3>{d.price}</h3>
            <button onClick={()=> setCart(cart+1)}>Add to Cart</button>
        </div>
      ))}
</div>
    </div>
  )
}

export default Cart