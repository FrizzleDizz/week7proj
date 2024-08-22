import {useEffect, useState} from "react";

export default function App() {

  //fetch data sat in server from external database
  const [samples, setSamples] = useState([]); // [variable name, fetched data placeholder] = state variable

  //post data from client to server which is congruent to external database
  const [form, setForm] = useState({
    column1: "",
    column2: "",
    column3: 0
  })

  useEffect(() => {getSamples()},[]);


  async function getSamples() {
    const response = await fetch("http://localhost:8080/sampletable"); //calls api
    const data = await response.json(); //data variable is filled by fetch for response
    setSamples(data); //update state variable with data variable
  }

  function handleChange(event){  //function called in form element
    console.log("user is typing");
    const name = event.target.name;
    const value = event.target.value;
    setForm({...form, [name]: value});

  }

  async function handleSubmit(event){ //function called in form element
    event.preventDefault();
    console.log("Form submitted");
    console.log(form);
    //make a post fetch request to server
    await fetch("http://localhost:8080/sampletable", {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
      },
      body: JSON.stringify(form),
    });
    getSamples();
  }

  return (
    <div>
      <h1>Sample Database Driven React App</h1>
      <p>Add to the database below</p>

      {/* Form return */}
      <form onSubmit = {handleSubmit}>
        <input name = "column1" placeholder = "column1 input" onChange = {handleChange} value = {form.column1}/>
        <input name = "column2" placeholder = "column2 input" onChange = {handleChange} value = {form.column2}/>
        <input name = "column3" placeholder = "column3 input" type = "number" onChange = {handleChange} value = {form.column3}/>
        <button>Submit</button>
      </form>

      {/* Data return as specified */}
      <h2>Returned Data:</h2>
      {samples.map(function(sample) { 
        return (
          <h3> {sample.column1} - {sample.column2} - {sample.column3} </h3>
        )
      })}
    </div>
  )
}
