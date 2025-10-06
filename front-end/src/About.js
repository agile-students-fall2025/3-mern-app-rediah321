import { useEffect, useState } from 'react'
import axios from 'axios'
import load from './loading.gif'

const About = () => {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get(`http://localhost:5002/about`)
      .then(response => {
        setData(response.data)
      })
      .catch(err => {
        const errMsg = err?.response?.data?.status 
        setError(errMsg)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

if (loading) {
    return (
      <div className="Loading">
        <img src={load} alt="Loading animation" />
        <h3>Loading page...</h3>
      </div>
    )
  }

  if (error) {
    return (
      <div className="Error">
        <h2>Something went wrong</h2>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <main className="About">
      <header className="About-header">
        <h1>{data.name}</h1>
      </header>

      <section className="About-body">
        <div className="About-photo">
          <img src={data.imageurl} />
        </div>

        <article className="About-text">
            <p> {data.paragraph}</p>
        </article>
      </section>
    </main>
  )
}

export default About
