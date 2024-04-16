import { React,useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import {object, string, date} from 'yup'
import todosStore, { addTodo, deleteTodo } from './app/redux/todoReducer'


function pad(d){
    return d < 10 ? `0${d}`: d
}


function App() {

  const [refresh, setRefresh] = useState(false)
  
  let todoSchema = object({
    title: string()
    .min(2, "To Short!")
    .max(20, "Too Long!")
    .required("Required"),
    work: string()
    .min(5, "Too Short")
    .max(50, "Too Long")
    .required("Required"),
    date: date().default()
  })

  function del(todo){
    todosStore.dispatch(deleteTodo(todo))
    setRefresh(!refresh)
  }

  let count = 0
  const dat = new Date()

  return (
    <>
      <div>
        <h3>ADD New Todo</h3>
        <Formik
        initialValues={{title: '', work: '', date: `${dat.getFullYear()}-${pad(dat.getMonth() + 1)}-${pad(dat.getDate())}`}}
        validationSchema={todoSchema}
        onSubmit={(values, {resetForm}) => {
          todosStore.dispatch(addTodo(values))
          resetForm()
          setRefresh(!refresh)
        }}
        >
          {({errors, touched})=> (
            <Form>
              <Field name='title' />
              <ErrorMessage name='title' />
              <Field name="work" />
              <ErrorMessage name='work' />
              <Field type="date" name="date" />
              <ErrorMessage name='submit' />
              <button type='submit'>Submit</button>
            </Form>
          )}
        </Formik>
        <h3>Works Todo</h3>
        {todosStore.getState().todos.map(todo => (
          <div key={++count}>
            <h4>{todo.payload.title}</h4>
            <h5>{todo.payload.work}</h5>
            <h5>{todo.payload.date}</h5>
            <button onClick={()=> del(todo.payload)}>Delete</button>
            </div>
        ))}
      </div>
    </>
  )
}

export default App