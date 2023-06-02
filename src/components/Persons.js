const Persons = ({filterList,handleDelete})=>{
    return(
        <ul>
        {filterList.map((person) => <li key={person.name}>{person.name} {person.number} <button onClick={()=>handleDelete(person.id)}>delete</button></li>)}
      </ul>
    )
}

export default Persons;