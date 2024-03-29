import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Thumbnail from "./thumbnail";
const Record = ((props) => {
 
  return(
    
  <div>
    
    <Thumbnail image = {props.record.image}
    name = {props.record.name}
    cardID = {props.record._id}
    price = 'price'
    projection = 'projection'/>
  </div>
  )
});

export default function RecordList() {
  const [records, setRecords] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:4000/record/`);

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records);
    }

    getRecords();

    return; 
  }, [records.length]);

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`http://localhost:4000/${id}`, {
      method: "DELETE"
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // This method will map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
          
        />
        
      );
    });
  }

  function cardDisplay(cardName,cardID,cardPrice,cardProjection,cardUrl){

    let card = new Thumbnail(cardName,cardID,cardPrice,cardProjection,cardUrl)
    return card.display();
  }
  
  

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <h3>Trending Cards</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rarity</th>
            <th>Text</th>
          </tr>
          <div>{recordList()}</div>
        </thead>
        
      </table>
    </div>
  );
}
