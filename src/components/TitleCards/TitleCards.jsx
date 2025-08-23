import { useEffect, useRef, useState} from 'react'
import './TitleCards.css'
import { Link } from 'react-router-dom';
import cards_data from '../../assets/cards/Cards_data'
// import { Link } from 'react-router-dom'


const TitleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([]) 
const cardsRef = useRef();

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YzIxNDUwZjY4NzAyMzgyMmM3MTRlN2YyZDI5MGY4ZiIsIm5iZiI6MTczNDcxOTY3NC42OTEsInN1YiI6IjY3NjViOGJhYWZmNWE3ZDY0MTc0YjAwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iF5fr7zlYJAAX5Q13O3Wq8QYE8vMgspUfa8quc-LU50'
  }
};


  
const handleWheel = (event)=>{
  event.preventDefault();
  cardsRef.current.scrollLeft += event.deltaY;
}

useEffect(()=>{

  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));

  cardsRef.current.addEventListener('wheel', handleWheel);
},[])
   return (
    <div className='title-cards'>
     <h2>{title?title:"Popular on Netflix"}</h2>
     <div className="card-list" ref={cardsRef}>
      {apiData.map((card, index)=>{
        return <Link to={`/player/${card.id}`} className="card" key={index}>
          <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
          <p>{card.original_title}</p>
          </Link>
      })}
     </div>
    </div>
  )
}

export default TitleCards
