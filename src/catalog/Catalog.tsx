import React, { useState } from "react";
import  { characters }  from "../movies"
import './catalog.css'
import { useQuery, gql } from '@apollo/client';



const Card = (props:any) => {
    const character = props.character;
    const url = `center / contain no-repeat url(${character.image})`;
    return(
        <div className="characters-card">
            <div className="characters-image" style={{background: url}}></div>
            <div className="characters-name">{character.name}</div>
        </div>
    )
}

export default function Catalog(){

    let filterName="";
    const GET_ALL_CHARACTERS = gql`
    query Character($page: Int) {
      characters(page: $page) {
        results {
          id
          name
          image
          status
          species
          location {
            name
          }
        }
      }
    }`
    const [query, setQuery] = useState(GET_ALL_CHARACTERS); 
    const [currPage, setPage] = useState(1);
  
    const { loading, error, data } = useQuery(query, {
      variables: { page: currPage }
    })
  
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error {error.message}</p>
  
    function updateText(){
      return (event:any) => {
        filterName = event.target.value
        console.log(filterName);
      }
    }
    function updateQuery(page:number){
      setPage((page==0)? 1 : currPage + page );
      if(currPage<1) setPage(1);
      console.log(currPage);
      let newQuery=  gql`
      query Character($page: Int) {
        characters(page: $page, filter:{name:"${filterName}"}) {
          results {
            id
            name
            image
            status
            species
            location {
              name
            }
          }
        }
      }`;
      setQuery(newQuery);
    
    }

    return(
        <div>
           {/* <Header /> */} 
            <div className="contianer">
                <div className="btn btn-continue" onClick={() => updateQuery(1)}> {">"} </div>
                <div className="catalogue">
                    {data?.characters?.results.map((character:any) => {
                        return(
                            <div>
                                <Card character={character}/>
                            </div>
                        )
                    })}
                </div>
                <div className="btn btn-previous" onClick={() => updateQuery(-1)}> {"<"} </div>
            </div>
        </div>
    )
}