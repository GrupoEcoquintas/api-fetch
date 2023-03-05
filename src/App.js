import React, { useState } from "react";

function App() {
  // Definimos los estados que vamos a utilizar en nuestra aplicación con useState
  const [cliente, setCliente] = useState(null);
  const [error, setError] = useState(null);
  const [cedula, setCedula] = useState("");
  const [fecha, setFecha] = useState("");

  // Esta función se ejecuta cuando el usuario hace click en el botón 'Buscar'.
  const handleSubmit = async (e) => {
    e.preventDefault(); //Evita que el formulario se envíe por defecto.

    try {
      // Hacemos una petición a nuestra API para buscar el cliente correspondiente a la cédula ingresada.
      const response = await fetch(
        `http://100.24.114.174:3080/api/consulta-cliente/${cedula}`
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
        setCliente(data.cliente);
        setFecha(data.fecha);
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
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor="cedula">Cédula:</label>
        <input
          type="text"
          id="cedula"
          name="cedula"
          required
          value={cedula}
          onChange={handleCedulaChange}
        />
        <button type="submit">Buscar</button>
      </form>
      {cliente && (
        <div>
          <h2>Información del cliente</h2>
          <p>
            Nombre: {cliente.nombre} {cliente.apellidos}
          </p>
          <p>Cédula: {cliente.cedula}</p>
          <p>Tipo de cliente: {cliente.tipo_cliente}</p>
          <p>Proyecto: {cliente.proyecto}</p>
        </div>
      )}
      {fecha && <p>Fecha de consulta: {fecha}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default App;
