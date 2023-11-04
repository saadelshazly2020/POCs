import React, { useState, useEffect } from "react";

function Products( props) {
    

    const [data, setData] = useState([]);


    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(data => setData(data));
    }, []);
   
    return (
        <div >
            
            <h1 className="text-center">List of products </h1>
            <p className="underline">{props.hello}</p>
           

          

            <table className="table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Id</th>
                        <th className="px-4 py-2">User Id</th>
                        <th className="px-4 py-2">title</th>
                        <th className="px-4 py-2">completed</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (

                        <tr key={item.id}>
                            <td className="border px-4 py-2">{item.id}</td>
                            <td className="border px-4 py-2">{item.userId}</td>
                            <td className="border px-4 py-2">{item.title}</td>
                            <td className="border px-4 py-2">
                                {item.completed ? (
                                    <i className="fas fa-smile"></i>

                                ) : (

                                    <i className="fas fa-frown"></i>
                                )

                                }
                            </td>

                        </tr>


                    ))}
                </tbody>
            </table>

        </div>

    );
}

export default Products;