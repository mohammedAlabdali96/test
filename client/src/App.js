import React, {useState} from "react"



export default function App() {
  const [data, setData] = useState([])
  const [formData, setFormData] = useState('')
  const [loading, setLoading] = useState(false)



  const save = () => {
      setLoading(true)
    fetch('http://localhost:3001/api/sort', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
          body: JSON.stringify(formData.replace( /\n/g, " " ).split( " " )),
    })
        .then((response) => response.json()) // parses response to JSON
        .then((result) => {
            setData(result)
            setLoading(false)
        })
        .catch((err) => console.log(err))
  }

  console.log(formData)

  const handleSubmit = (event) => {
    event.preventDefault()
    save()
    setLoading(true)
  }

  const handleChange = (event) => {
    setFormData(event.target.value)
  }


  return (
      <div className="App">
        <form onSubmit={handleSubmit}>
          <textarea name="name" value={formData} onChange={handleChange} />
          <button disabled={loading} type="submit">click</button>
        </form>
          {loading &&  <div> Loading ...</div>}
        {data &&
        data.map((element, index) => (
            <div  key={index}>
             {element}
            </div>
        ))}
      </div>
  )
}