import { TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from "react";
import { makeStyles } from '@mui/styles';


const URL = 'http://api-rest.ecoquintas.net:3080/api/consulta-cliente/';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f3f3f3',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.2)',
  },
  button: {
    marginTop: '20px',
    backgroundColor: '#0077cc',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#0061a8',
    },
  },
  error: {
    color: 'red',
    marginTop: '20px',
    textAlign: 'center',
  },
});

const CustomTextField = styled(TextField) ({
  margin: '10px',
  '& .MuiInputBase-input': {
    color: 'green',
    fontWeight: 'bold',
  },
  '& .MuiInputLabel-root': {
    color: 'red',
    fontWeight: 'bold',
  },
});


function App() {
  // Definimos los estados que vamos a utilizar en nuestra aplicación con useState
  const [cliente, setCliente] = useState(null);
  const [error, setError] = useState(null);
  const [cedula, setCedula] = useState("");
  const [fecha, setFecha] = useState("");

  const classes = useStyles();
  
  // Esta función se ejecuta cuando el usuario hace click en el botón 'Buscar'.
  const handleSubmit = async (e) => {
    e.preventDefault(); //Evita que el formulario se envíe por defecto.

    try {
      // Hacemos una petición a nuestra API para buscar el cliente correspondiente a la cédula ingresada.
      const response = await fetch(
        URL + cedula
      );
      const data = await response.json();
      // Si no encontramos el cliente, seteamos el error y vaciamos la información del cliente y la fecha de la consulta.
      if (!data.cliente) {
        setError(`No se encontró el cliente ${cedula}.`);
        setCliente(null);
        setFecha(null);
      } else {
        // Si encontramos el cliente, seteamos la información del cliente y la fecha de la consulta y vaciamos el error.
        setCliente(data.cliente);
        setFecha(data.date);
        setError(null);
      }
    } catch (err) {
      // Si hubo un error en la petición, seteamos el error y vaciamos la información del cliente y la fecha de la consulta.
      setError(
        `Ocurrió un error al buscar el cliente ${cedula}. Por favor, inténtelo de nuevo más tarde.`
      );
      setCliente(null);
      setFecha(null);
    }
  };
  // Esta función se ejecuta cuando el usuario cambia el valor del input de la cédula.
  const handleCedulaChange = (e) => {
    setCedula(e.target.value);
  };

  // Renderizamos nuestra aplicación.
  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <CustomTextField
          required
          id="cedula"
          name="cedula"
          value={cedula}
          onChange={handleCedulaChange}
          variant="outlined"
          label = "Cédula"
          placeholder="Ingrese su cédula"
        />
        <Button className={classes.button} variant="contained" type="submit">Buscar</Button>
        {error && <p className={classes.error}>{error}</p>}
      </form>
      {cliente && (
        <div className='cliente-info' style={{ 
          backgroundColor: '#f3f3f3',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0px 0px 10px rgba(0,0,0,0.2)',
          marginTop: '20px',
          textAlign: 'center',
        }}>
          <h2>Información del cliente</h2>
          <p>
            Nombre: {cliente.nombre} {cliente.apellidos}
          </p>
          <p>Cédula: {cliente.cedula}</p>
          <p>Tipo de cliente: {cliente.tipo_cliente}</p>
          <p>Proyecto: {cliente.proyecto}</p>
          {fecha && <p>Fecha de consulta: {fecha}</p>}
          {error && <p>{error}</p>}
        </div>
      )}
    </div>
  );
}

export default App;
