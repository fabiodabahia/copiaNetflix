import React, { useEffect, useState } from 'react';
import Tmdb from './Tmdb';
import FeatureMovie from './componets/FeatureMovie';
import Header from './componets/Header';
import MovieRow from './componets/MovieRow';
import './App.css';

export default () => {

const [movieList, setMovieList] = useState([]);//criar lista pra ser exibida
const [featuredData, setFeaturedData] = useState(null);//inverter por filme em destaque por filme selecionado(Atenção)
const [blackHeader, setblackHeader]= useState(false);


useEffect(()=>{
  const loadAll = async () => {
    let list = await Tmdb.getHomeList();
    setMovieList(list);

    let originals = list.filter(i=> i.slug === 'originals');
    let randonChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
    let chosen = originals[0].items.results[randonChosen]
    let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
    setFeaturedData(chosenInfo);
  }

  loadAll();
}, []);

  
  useEffect(()=>{
    const scrollListener = () =>{
        if(window.scrollY > 10){
          setblackHeader(true);
        }else{
          setblackHeader(false);
        }
    }

    window.addEventListener('scroll', scrollListener);

    return () =>{
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return (
    <div className="page">
      <Header black={blackHeader}/>
      {featuredData &&  
    <FeatureMovie item={featuredData}/>  
      }
      <section className= "lists">     
        {movieList.map((item, key)=>( //faz a busca por array
       <MovieRow key={key} title= {item.title} items={item.items}/>//faz a chamada da lista para exibir na tela
        ))}
      </section>
      
      <footer>
        Feito por Fabio Luis para estudo de react, todos os direitos das imagens são da Netflix.
        Dados Extraidos de https://www.themoviedb.org/
      </footer>


    {movieList.length <= 0 &&
      <div className="loading">
        <img src="https://cdn.lowgif.com/small/0534e2a412eeb281-the-counterintuitive-tech-behind-netflix-s-worldwide.gif" alt="loading"></img>
      </div>
    }
    </div>
  )
}
