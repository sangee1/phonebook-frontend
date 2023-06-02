import { useState ,useEffect} from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber,setNewNumber] = useState('');
  const [search,setSearch] = useState('');
  const [notif,setNotif] =useState("");

  useEffect(()=>{
    console.log('effect');
    personService.getAll().then(
      initialPersons=>{
        console.log('promise fulfilled');
        setPersons(initialPersons)
      }
    )
  },[])

  console.log('search',search)
  //console.log("filtered list",persons.filter(person=> person.name.startsWith(search)))
  const filterList = search !== "" ? persons.filter(person=> person.name.toLowerCase().startsWith(search)) : persons

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value);
  }

  const handleNumberChange = (event)=>{
    setNewNumber(event.target.value)
  }

  const handleSearch = (event)=>{
    setSearch(event.target.value.toLowerCase());

  }

  const handleDelete = (id)=>{
     personService.deletePerson(id).then(
      setPersons(persons.filter(p=> p.id !== id)));
     
    
  }

  const handleClick = (event) => {
    event.preventDefault()
    const newPerson = {
      name:newName,
      number:newNumber
    };
    if (!persons.map(p => p.name).includes(newName)) {
      
      personService.createPerson(newPerson).then(
        responseData=>{
          setPersons(persons.concat(responseData));
          setNotif(`Added ${newName}`)
        }
      )
         
    }else{
      //alert(`${newName} is already added to phonebook`)
      //update phone book
      const temp = persons.find(p=> p.name === newName);
      console.log(temp.id)
      personService.updatePerson(temp.id,newPerson).then(
        responseData=>{
          setPersons(persons.map(p=> p.id !== temp.id ? p : newPerson));
        }
      )
    }
    console.log(persons)
    setNewName('')
    setNewNumber("")
  }
  return (
    <div>
      <h2>PhoneBook</h2>
      <Notification message={notif}/>
      <Filter search={search} handleSearch={handleSearch}/>
      <br/>
      <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} handleClick={handleClick}/>
      <h2>Numbers</h2>
      <Persons filterList={filterList} handleDelete={handleDelete}/>
    </div>
  )
}

export default App;
