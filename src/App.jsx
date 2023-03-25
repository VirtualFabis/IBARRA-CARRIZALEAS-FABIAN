import React, { Fragment, useState } from "react";
import reactLogo from './assets/react.svg'
import './App.css'
import Apis from './services/services';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import useForm from "./hooks/useForm";

function App() {
  //? Que son los Hooks? 
  //* Los Hooks son funciones que te permiten manipular el estado de React y el ciclo de vida desde componentes.
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    error,
    data: request,
  } = useQuery({
    queryKey: ["GetProducts"],
    queryFn: Apis.GetProducts,
  });
  const mutation = useMutation(Apis.Insert, {
    onSuccess() {
      location.reload()
    },
  });
  const { values, onChange, onClearValues } = useForm();
  const [open, setOpen] = useState(false);
  const [openUp, setOpenUp] = useState(false);
  const [id, setId] = useState();
  const onSummit = (e) => {
    e.preventDefault();
    mutation.mutate(values);

  };
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleOpenUp = () => {
    setOpenUp(!openUp);
  };
  const del = useMutation(Apis.Delete, {
    onSuccess() {
      location.reload()
    },
  });
  const up = useMutation(Apis.Update, {
    onSuccess() {
      location.reload()
    },
  });
  const ondelet = (id) => {
    del.mutate(id)
  }
  const onUpdate = () => {
    up.mutate({ ...values, id: id })
  }
  const handleOpenUp2 = (id) => {
    setOpenUp(!openUp);
    setId(id)
  };
  if (isLoading) return (<>No data</>);
  else if (isError) return <>No data</>;
  const columns = [
    { name: "name", defaultFlex: 1, },
    { name: "description", defaultFlex: 1, },
    {
      name: "condition", defaultFlex: 1,
    },
    {
      name: "price", defaultFlex: 1,
    },

    {
      name: "link_rewrite", defaultFlex: 1,
    },
    {
      name: "id",
      defaultFlex: 1,
      header: "Update",
      render: ({ value }) => (<button onClick={() => handleOpenUp2(value)}>Update</button>)
    },
    {
      name: "id",
      defaultFlex: 1,
      header: "Delete",
      render: ({ value }) => (<button onClick={() => ondelet(value)}>Delete</button>)
    },
  ];
  console.log(JSON.parse(request?.data?.xd).products)


  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React PWA</h1>
      <Fragment>
        <Button onClick={handleOpen} color="cyan" variant="gradient">
          Agregar Producto
        </Button>
        <Dialog open={open} handler={handleOpen} size="xs">
          <form onSubmit={onSummit}>
            <DialogHeader>Agregar Producto.</DialogHeader>

            <DialogBody divider className="flex justify-center">
              <div className="mb-3 xl:w-80 space-y-4">
                <input type="text" name="name" placeholder="name" onChange={onChange} />
                <br />
                <input type="text" name="desc" placeholder="Desc" onChange={onChange} />
                <br />
                <input type="text" name="price" placeholder="price" onChange={onChange} />
              </div>
            </DialogBody>
            <DialogFooter>
              <Button
                variant="text"
                color="red"
                onClick={handleOpen}
                className="mr-1"
              >
                <span>Cancelar</span>
              </Button>
              <Button variant="gradient" color="green" type="submit">
                <span>Agregar</span>
              </Button>
            </DialogFooter>
          </form>
        </Dialog>
      </Fragment>
      <Fragment>
        <Dialog open={openUp} handler={handleOpenUp} size="xs">
          <form onSubmit={onUpdate}>
            <DialogHeader>Actualizar Producto.</DialogHeader>

            <DialogBody divider className="flex justify-center">
              <div className="mb-3 xl:w-80 space-y-4">
                <input type="text" name="name" placeholder="name" onChange={onChange} />
                <br />
                <input type="text" name="desc" placeholder="Desc" onChange={onChange} />
                <br />
                <input type="text" name="price" placeholder="price" onChange={onChange} />
              </div>
            </DialogBody>
            <DialogFooter>
              <Button
                variant="text"
                color="red"
                onClick={handleOpenUp}
                className="mr-1"
              >
                <span>Cancelar</span>
              </Button>
              <Button variant="gradient" color="green" type="submit">
                <span>Actualizar</span>
              </Button>
            </DialogFooter>
          </form>
        </Dialog>
      </Fragment>
      <br /> <br /> <br /> <br />
      <ReactDataGrid
        idProperty="WIW"
        className="datatable"
        columns={columns}
        dataSource={JSON.parse(request?.data?.xd).products}
        rowHeight={28}
        defaultLimit={11}
        pagination
      />
    </div>
  )
}


export default App
