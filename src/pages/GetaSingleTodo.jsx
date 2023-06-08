import axios from 'axios';
import React, { useEffect, useState } from 'react'

const GetaSingleTodo = () => {
	const [todos , setQuote] = useState([]);

	useEffect(()=> {
		fetch();
	}, [])

  function fetch(){
		axios.get('https://dummyjson.com/todos/1')
		.then(response=>{
				setQuote(response.data)
				console.log(response.data)
			}
		)		
		.catch((error)=>{
			console.log(error);
		})
	}


	return (
		<section className='row my-5'>
			<div className="card">
				<div className="card-body">
					<h5 className="card-title">{todos.id}</h5>
					<p className="card-text">{todos.todo}</p>
				</div>
			</div>
		</section>
	)
}

export default GetaSingleTodo