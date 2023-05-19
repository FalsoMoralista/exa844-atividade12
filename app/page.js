"use client"; 

import Image from 'next/image'
import styles from './page.module.css'
import React from 'react';
import { useState } from 'react';

function SearchBar({onFilterTextChange}){
  return (<form><input type="text" name="buscador" placeholder="Search..." onChange={(e) => onFilterTextChange(e.target.value)}/></form>);
}

function MessageTable({messages, filterText} ){
  console.log(messages);
  const rows = [];

  if (filterText.length === 0) {
    for(const message of messages){
      rows.push(
        <tr>
          <td>{message[0]}</td>
          <td>{message[1]}</td>
          <td>{message[2]}</td>
        </tr>
      );
    }
  }
  else{
    for(const message of messages){
      if (!(message[0].toString().toLowerCase().indexOf(filterText.toLowerCase()) === -1) || !(message[1].toString().toLowerCase().indexOf(filterText.toLowerCase()) === -1)) {
        rows.push(
          <tr>
            <td>{message[0]}</td>
            <td>{message[1]}</td>
            <td>{message[2]}</td>
          </tr>
        );        
      }    
    }
  }

  return (
    <table id="dados">
      <thead>
        <tr>
        <th>Autor</th>
        <th>Mensagem</th>
        <th>Data</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function FilterableMessageTable({messages}){
  const [filterText, setFilterText] = useState('');
  return (
      <div>
        <SearchBar filterText={filterText} onFilterTextChange={setFilterText} />
        <MessageTable messages={messages} filterText={filterText}/>
      </div>
    );
}


export default function Home() {
    
  const [blogMessages, setBlogMessages] = useState([]);


  fetch('https://script.google.com/macros/s/AKfycbzBn3sALe1rYjz7Ze-Ik7q9TEVP0I2V3XX7GNcecWP8NvCzGt4yO_RT1OlQp09TE9cU/exec')
    .then(response => response.json())
    .then(data => {
        setBlogMessages(data);
    });

    return (
      <main className={styles.main}>
        <FilterableMessageTable messages={blogMessages}/>
      </main>
    );

}

