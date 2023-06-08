import axios from 'axios';
import React, { useEffect, useState } from 'react'

const LimitAndSkip = () => {
	const [todos , setQuote] = useState([]);

	useEffect(()=> {
		fetch();
	}, [])

	function fetch(){

		let limit = document.getElementById('limit');
		let skip = document.getElementById('skip');

		axios.get(`https://dummyjson.com/todos?limit=${limit.value}&skip=${skip.value}`)
		.then(response=>{
				setQuote(response.data.todos)
				console.log(response.data)
			}
		)		
		.catch((error)=>{
			console.log(error);
		})
	}

	// $('myForm').addEventListener('submit', (e)=>{
	// 	e.preventDefault();
	// })



	return (
		<section className='row my-5'>
			<div className="card my-3">
				<div className="card-body">
						<div className="form-outline mb-4">
							<input type="text" id="limit" className="form-control" />
						</div>
						<div className="form-outline mb-4">
							<input type="text" id="skip" className="form-control" />
						</div>
						<button onClick={fetch} className="btn btn-primary btn-block">Get</button>
					
				</div>
			</div>
			<table className="table align-middle mb-0 bg-white">
				<thead className="bg-light">
				<tr>
					<th>Id</th>
					<th>todo</th>
					<th>Completed</th>
					<th>UserId</th>
				</tr>
				</thead>
				<tbody>
				{todos.map((t)=>(
					<tr key={t.id}>
						<td>{t.id}</td>
						<td>{t.todo}</td>
						<td>{t.completed.toString()}</td>
						<td>{t.userId}</td>
					</tr>
					))
				}
				</tbody>
			</table>
		</section>
	)
}

export default LimitAndSkip