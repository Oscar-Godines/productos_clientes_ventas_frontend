import axios from "axios";
import { RESET_CLIENTE_LISTA } from "../constantes/clienteConstantes";
import {
  REQUEST_PRODUCTO_LISTA,
  SUCCESS_PRODUCTO_LISTA,
  FAIL_PRODUCTO_LISTA,
  REQUEST_PRODUCTO_DETALLES,
  FAIL_PRODUCTO_DETALLES,
  SUCCESS_PRODUCTO_DETALLES,
  REQUEST_PRODUCTO_ACTUALIZAR,
  FAIL_PRODUCTO_ACTUALIZAR,
  SUCCESS_PRODUCTO_ACTUALIZAR,
  RESET_PRODUCTO_LISTA,
  RESET_PRODUCTO_DETALLES,
  REQUEST_PRODUCTO_REGISTRAR,
  SUCCESS_PRODUCTO_REGISTRAR,
  FAIL_PRODUCTO_REGISTRAR,
  REQUEST_PRODUCTO_BORRAR,
  SUCCESS_PRODUCTO_BORRAR,
  FAIL_PRODUCTO_BORRAR,
  RESET_PRODUCTO_BORRAR,
} from "../constantes/productoConstantes";
import { RESET_VENTA_LISTA } from "../constantes/ventaConstantes";

// Creador de acciones para pedir los productos del backend
export const pedirProductosLista = () => async (dispatch, getState) => {
  dispatch({ type: REQUEST_PRODUCTO_LISTA });

  try {
    const {
      usuarioInfo: { tokens },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${tokens.access}`,
      },
    };

    const { data } = await axios.get(
      "http://212.1.214.18:8000/api/productos/",
      config
    );

    dispatch({ type: SUCCESS_PRODUCTO_LISTA, payload: data });
    // Guardar los productos en el localStorage
    localStorage.setItem("productos", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: FAIL_PRODUCTO_LISTA, payload: error.message });
  }
};

// Creador de acciones para pedir el producto con el id del backend
export const obtenerProductoDetalles = (id) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_PRODUCTO_DETALLES });

  try {
    const {
      usuarioInfo: { tokens },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${tokens.access}`,
      },
    };
    const { data } = await axios.get(
      `http://212.1.214.18:8000/api/productos/${id}/`,
      config
    );

    dispatch({ type: SUCCESS_PRODUCTO_DETALLES, payload: data });
  } catch (error) {
    dispatch({ type: FAIL_PRODUCTO_DETALLES, payload: error.message });
  }
};

// Creador de acciones para actualizar producto del backend
export const actualizarProducto = (producto) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_PRODUCTO_ACTUALIZAR });

  try {
    const {
      usuarioInfo: { tokens },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${tokens.access}`,
      },
    };

    const { data } = await axios.put(
      `http://212.1.214.18:8000/api/modificar-producto/${producto.id}/`,
      producto,
      config
    );

    dispatch({ type: SUCCESS_PRODUCTO_ACTUALIZAR });
    dispatch({ type: RESET_PRODUCTO_LISTA });
    // Debo volver a pedir la lista de clientes del bakcend
    dispatch({ type: RESET_CLIENTE_LISTA });
    // Debo volver a pedir la lista de ventas del backend
    dispatch({ type: RESET_VENTA_LISTA });
  } catch (error) {
    dispatch({ type: FAIL_PRODUCTO_ACTUALIZAR, payload: error.message });
  }
};

// Creador de acciones para registrar un nuevo producto en el backend
export const registrarProducto = (producto) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_PRODUCTO_REGISTRAR });

  try {
    const {
      usuarioInfo: { tokens },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${tokens.access}`,
      },
    };

    const { data } = await axios.post(
      "http://212.1.214.18:8000/api/crear-producto/",
      producto,
      config
    );

    dispatch({ type: SUCCESS_PRODUCTO_REGISTRAR });
    dispatch({ type: RESET_PRODUCTO_LISTA });
    // Debo volver a pedir la lista de clientes del bakcend
    dispatch({ type: RESET_CLIENTE_LISTA });
    // Debo volver a pedir la lista de ventas del backend
    dispatch({ type: RESET_VENTA_LISTA });
  } catch (error) {
    dispatch({ type: FAIL_PRODUCTO_REGISTRAR, payload: error.message });
  }
};

// Creador de acciones para borrar un producto en el backend
export const borrarProducto = (id) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_PRODUCTO_BORRAR });

  try {
    const {
      usuarioInfo: { tokens },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${tokens.access}`,
      },
    };

    const { data } = await axios.delete(
      `http://212.1.214.18:8000/api/modificar-producto/${id}/`,
      config
    );

    dispatch({ type: SUCCESS_PRODUCTO_BORRAR });
    dispatch({ type: RESET_PRODUCTO_LISTA });
    // Debo volver a pedir la lista de clientes del bakcend
    dispatch({ type: RESET_CLIENTE_LISTA });
    // Debo volver a pedir la lista de ventas del backend
    dispatch({ type: RESET_VENTA_LISTA });
  } catch (error) {
    dispatch({ type: FAIL_PRODUCTO_BORRAR, payload: error.message });
  }
};
