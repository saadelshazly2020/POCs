import React, { useState, useEffect } from "react";

function RenderList(props) {

    const [products, setProducts] = useState([
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
    ]);
    const [newItemName, setNewProductName] = useState('');
    const handleAddProduct = event => {
        event.preventDefault();
        const newItem = {
            id: products.length + 1,
            name: newItemName
        };
        setProducts([...products, newItem]);
        setNewProductName('');


    };
// const handleRemove= index=>{
//     setProducts(prevState=>{
//         const newList=[...prevState];
//         console.log(newList);
//         newList.slice(index,1);
//         return newList;
//     })
// }


const handleRemove = index => {
    // setProducts(prevState => {
    //   const newList = [...prevState];
    //   newList.splice(index, 1);
    //   console.log(newList);
    //   return newList;
    // });

     setProducts(prevState =>prevState.filter((item,i)=>i!=index) );
  }
    return (
        <div >
            <p className="underline">List With input</p>
            <ul >
                {products.map((item, index) => (
                    <div>
                          <li key={item.id}>{index + 1}-{item.name}
                          <a href="#" key={index} className="fa fa-remove mx-5" 
                          onClick={() => handleRemove(index)}></a>
                          </li>

                    </div>
                ))}

            </ul>
            <div className="mt-6 flex items-center justify-start gap-x-6">
                <form onSubmit={handleAddProduct}>
                    <input className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={newItemName}
                        onChange={e => setNewProductName(e.target.value)}
                        type="text"></input>

                    <button className="rounded-md bg-indigo-600 px-3 py-2 
                text-sm font-semibold text-white 
                shadow-sm 
                hover:bg-indigo-500 focus-visible:outline
                 focus-visible:outline-2 
                 focus-visible:outline-offset-2 
                 focus-visible:outline-indigo-600" type="submit">add</button>
                </form>
            </div>
        </div>

    )


}
export default RenderList;