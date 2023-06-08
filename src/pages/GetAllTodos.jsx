import axios from 'axios'
import React, { useEffect, useState } from 'react'

const GetAllTodos = () => {

  const [todos , setQuote] = useState([]);


	useEffect(()=> {
		fetch();
	}, [])

  function fetch(limit , skip){

    if(limit == undefined || limit == ''){
      limit = 10;
    }

    if(skip == undefined || skip == ''){
      skip = 0;
    }

    let collection;
    let newcollection;

		axios.get(`https://dummyjson.com/todos?limit=${limit}&skip=${skip}`)
    .then(response => {
      const todos = response.data.todos;
      const requests = todos.map(todo =>
        axios.get(`https://dummyjson.com/users/${todo.userId}`)
      );

      Promise.all(requests)
        .then(responses => {
          const updatedTodos = todos.map((todo, index) => {
            const user = responses[index].data;
            return {
              ...todo,
              firstname: user.firstName,
              maidenname: user.maidenName,
              lastname: user.lastName,
            };
          });
          setQuote(updatedTodos);
        })
        .catch(error => {
          console.log(error);
        });
    })
    .catch(error => {
      console.log(error);
    });

	}

  function deleteTodo(id) {
    axios.delete(`https://dummyjson.com/todos/${id}`)
		.then(response=>{

        let updatedtodos = todos.filter(todo => todo.id !== id);
				setQuote(updatedtodos)

        Swal.fire({
          icon: 'success',
          title: `Record with id ${response.data.id} successfully deleted.`,
        })

			}
		)
		.catch((error)=>{
			console.log(error);
		})
  }

  function updateTodo(id) {
    Swal.fire({
      title: 'Update a To-Do',
      html:
        '<input id="toDoInput" class="form-control" placeholder="Enter" autocomplete="off">',
      showCancelButton: true,
      confirmButtonText: 'Update',
      showLoaderOnConfirm: true,
      preConfirm: (toDoItem) => {

        let newTodo = document.getElementById('toDoInput').value;

        if (!newTodo) {
          Swal.showValidationMessage('To-Do is required');
          return false;
        }

        return axios
          .put(`https://dummyjson.com/todos/${id}`, { todo:newTodo }) // Adjust the endpoint URL according to your API
          .then((response) => {
            console.log(response.data);
            Swal.fire({
              title: 'To-Do Updated',
              text: `Your to-do item "${newTodo}" has been update successfully!`,
              icon: 'success'
            });

            let newTodos = todos.map((t) => {
              if (t.id === id) {
                return { ...t, todo: newTodo };
              }
              return t;
            });

            setQuote(newTodos);


          })
          .catch((error) => {
            Swal.fire({
              title: 'Error',
              text: `Failed to add to-do item: ${error.message}`,
              icon: 'error'
            });
          });
      },
      allowOutsideClick: () => !Swal.isLoading()
    });
  }

  let [addnewtodoId, setaddnewtodoId] = useState(151);


  function addTodo() {


    Swal.fire({
      title: 'Add a To-Do',
      html:
        '<input id="addNewTodo" class="form-control" placeholder="Enter your to-do item" autocomplete="off">',
      showCancelButton: true,
      confirmButtonText: 'Add',
      showLoaderOnConfirm: true,
      preConfirm: (toDoItem) => {

        let newTodo = document.getElementById('addNewTodo').value;

        if (!newTodo) {
          Swal.showValidationMessage('To-Do is required');
          return false;
        }

        // let newRandomUserId = Math.floor(Math.random() * (150 - 0 + 1)) + 0;
        let newRandomUserId = 88;
        let newCompletedVar = true;
        // let newCompletedVar = false;


        return axios
          .post('https://dummyjson.com/todos/add', { todo:newTodo, completed:newCompletedVar, userId:newRandomUserId }) // Adjust the endpoint URL according to your API
          .then((response) => {
            Swal.fire({
              title: 'To-Do Added',
              text: `Your to-do item "${toDoItem}" has been added successfully!`,
              icon: 'success'
            });
            let newId = addnewtodoId + 1;

            setaddnewtodoId(newId)
            console.log(todos);
            let ewan = {
              id: addnewtodoId,
              todo: newTodo,
              completed: newCompletedVar,
              userId: newRandomUserId,
              firstname: 'Sandy Luis',
              maidenname: 'Basan',
              lastname: 'Balbuena',
            };
            let updatedTodos = [...todos, ewan];
            addnewtodoId = updatedTodos.length;
            console.log(addnewtodoId);

            setQuote(updatedTodos);
          })
          .catch((error) => {
            Swal.fire({
              title: 'Error',
              text: `Failed to add to-do item: ${error.message}`,
              icon: 'error'
            });
          });
      },
      allowOutsideClick: () => !Swal.isLoading()
    });
    
  }

  function newlyaddedrecord(){
    Swal.fire({
      title: 'New Record Detected',
      text: 'This record is under process',
      icon: 'info'
    });
  }

  function getRandom(){
    axios.get(`https://dummyjson.com/todos/random`)
		.then(response=>{
				// setQuote(response.data.todos)
				console.log(response.data)

        Swal.fire({
          title: 'Random',
          text: response.data.todo
        });

			}
		)		
		.catch((error)=>{
			console.log(error);
		})
  }

  function getOne(id){
    axios.get(`https://dummyjson.com/todos/${id}`)
		.then(response=>{
				// setQuote(response.data.todos)
				console.log(response.data)

        Swal.fire({
          title: 'Random',
          text: response.data.todo
        });

			}
		)		
		.catch((error)=>{
			console.log(error);
		})
  }

  function getAllToDosByUser(userId,limit,skip) {

    if(limit == undefined || limit == ''){
      limit = 150;
    }

    if(skip == undefined || skip == ''){
      skip = 0;
    }


    axios.get(`https://dummyjson.com/todos/user/${userId}`)
		.then(response => {
      const todos = response.data.todos;
      const requests = todos.map(todo =>
        axios.get(`https://dummyjson.com/users/${todo.userId}`)
      );

      Promise.all(requests)
        .then(responses => {
          const updatedTodos = todos.map((todo, index) => {
            const user = responses[index].data;
            return {
              ...todo,
              firstname: user.firstName,
              maidenname: user.maidenName,
              lastname: user.lastName,
            };
          });
          setQuote(updatedTodos);
        })
        .catch(error => {
          console.log(error);
        });
    })
    .catch(error => {
      console.log(error);
    });
  }

  return (
    <section className='row my-5 border'>
      <table className="table align-middle mb-0 bg-white table-hover">
        <thead className="bg-light">
          <tr>
            <td colSpan="5"><button className='btn btn-secondary' style={{width:"100%"}} onClick={()=>addTodo()}>Add new to do&nbsp;&nbsp;<i className="fas fa-plus"></i></button></td>
            <td colSpan="1"><button className='btn btn-secondary' style={{width:"100%"}} onClick={()=>getRandom()}>Random&nbsp;&nbsp;<i className="fas fa-question"></i></button></td>
          </tr>
          <tr>
            <td colSpan="2"><label htmlFor="limit">Limit:</label><input id='limit' className='form-control'></input></td>
            <td colSpan="3"><label htmlFor="skip">Skip:</label><input id='skip' className='form-control'></input></td>
            <td colSpan="1"><button className='btn btn-secondary' style={{width:"100%"}} onClick={() => fetch(document.getElementById('limit').value, document.getElementById('skip').value)}>Get</button></td>
          </tr>
          <tr>
            <td colSpan="5"><label htmlFor="byUser">User Id Search:</label><input id='byUser' className='form-control'></input></td>
            <td colSpan="1"><button className='btn btn-secondary' style={{width:"100%"}} onClick={()=>getAllToDosByUser(document.getElementById('byUser',document.getElementById('limit').value, document.getElementById('skip').value).value)}><i className="fas fa-search"></i></button></td>
          </tr>
          <tr>
            <th>Id</th>
            <th>todo</th>
            <th>Completed</th>
            <th>UserId</th>
            <th>Full Name</th>
            <th>Action</th>
          </tr>
         
        </thead>
        <tbody className='tableBody'>
          {todos.map((t)=>(

              (<tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.todo}</td>
                <td>{t.completed.toString()}</td>
                <td>{t.userId}</td>
                <td>{t.firstname+'  '+t.maidenname+'  '+t.lastname}</td>
                {(t.userId != 88)?(<td><button className='btn btn-danger btn-sm mx-1' onClick={()=>deleteTodo(t.id)} style={{width:"20%"}}><i className="fas fa-trash"></i></button><button style={{width:"20%"}} className='btn btn-success btn-sm mx-1' onClick={()=>updateTodo(t.id)}><i className="fas fa-edit"></i></button><button style={{width:"20%"}} className='btn btn-primary btn-sm mx-1' onClick={()=>getOne(t.id)}><i className="fas fa-eye"></i></button></td>):(<td><button className='btn btn-danger btn-sm mx-1' onClick={()=>newlyaddedrecord()} style={{width:"20%"}}><i className="fas fa-trash"></i></button><button style={{width:"20%"}} className='btn btn-success btn-sm mx-1' onClick={()=>newlyaddedrecord()}><i className="fas fa-edit"></i></button><button style={{width:"20%"}} className='btn btn-primary btn-sm mx-1' onClick={()=>newlyaddedrecord()}><i className="fas fa-eye"></i></button></td>)}
              </tr>)
            ))
          }
        </tbody>
      </table>
    </section>
  )
}

export default GetAllTodos