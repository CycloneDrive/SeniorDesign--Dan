
import './thumbnail.css';

function Thumbnail(props){
  return (
    <div >

    <div>

      <img  src={props.image} /> 

    </div>

    <div className = 'texts'>
      <h5><b>Name </b> {props.name}</h5>
      <h5><b>ID </b>{props.cardID}</h5>
      <h5><b>Price </b>{props.price} </h5>
      <h5><b>Projection </b>{props.projection}</h5>
    </div>
  
    </div>
  );
}



export default Thumbnail;