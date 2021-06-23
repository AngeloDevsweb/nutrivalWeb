import React, { useState, useEffect } from 'react'
import {db} from '../firebase'

const Proteinas = () => {

    const valoresIniciales = {
        title:'',
        subtitle:'',
        avatar:''
    }

    const [estado, setEstado] = useState([])
    const [item, setItem] = useState(valoresIniciales)
    const [fakeId, setFakeId] = useState('')
    

    const inputChange = (e)=>{
        const { name, value } = e.target
        setItem({...item, [name]: value})
    }

    const onSave = (e)=>{
        e.preventDefault()
        saveItem(item)
        setItem({...valoresIniciales})
    }

    const saveItem = async (valor)=>{
        if(fakeId=== ''){
            await db.collection('proteina').doc().set(valor)
        }
        else{
            await db.collection('proteina').doc(fakeId).update(valor)
        }
        setFakeId('')
    }

    const deleteItem = async (valor)=>{
        await db.collection('proteina').doc(valor).delete()
    }

    const getItems = ()=>{
        db.collection('proteina').onSnapshot((querySnapshot)=>{
            const docs = []
            querySnapshot.forEach((doc)=>{
                docs.push({...doc.data(), id: doc.id})
            })
            setEstado(docs)
        })
    }

    const getOne = async (id)=>{
       const doc =  await db.collection('proteina').doc(id).get()
        setItem({...doc.data()})
    }

    useEffect(() => {
        getItems()
    }, [])

    useEffect(()=>{
        if(fakeId=== '')
        {
            setItem({...valoresIniciales})
        }
        else{
            getOne(fakeId)
        }
    },[fakeId])

    return (
      <div>
        <h1 className="text-center mt-5 mb-5">Alimentos ricos en proteinas</h1>
        {/* formulario */}
        <div className="container">
          <form className="card card-body formulario" onSubmit={onSave} >
            <div className="form-group mb-4">
              <input
                type="text"
                placeholder="ingresa el nombre del alimento"
                className="form-control"
                onChange={inputChange}
                name='title'
                value={item.title}
                required
              />
            </div>

            <div className="form-group mb-4">
              <input
                type="text"
                placeholder="ingresa el valor del alimento"
                className="form-control"
                onChange={inputChange}
                name='subtitle'
                value={item.subtitle}
              />
            </div>

            <div className="form-group mb-4">
              <input
                type="text"
                placeholder="ingresa el link de la imagen del alimento"
                className="form-control"
                onChange={inputChange}
                name='avatar'
                value={item.avatar}
              />
            </div>

            <button className="btn btn-primary" >{ fakeId === '' ? 'GUARDAR':'ACTUALIZAR' }</button>
          </form>

          {/* lista de alimentos */}

          <h2 className="text-center mt-5 mb-5">Lista de alimentos actuales</h2>
          {/* agregando una tabla */}
          <div>
            <table class="table table-striped">
              <thead class="table-dark">
                <tr>
                  {/* <th scope="col">#</th> */}
                  <th scope="col">Nombre</th>
                  <th scope="col">Valor</th>
                  <th scope="col">Imagen</th>
                  <th scope="col">Eliminar</th>
                  <th scope="col">Actualizar</th>
                </tr>
              </thead>
              <tbody>
                  {estado.map((estate)=>(
                      <tr key={estate.id}>
                        {/* <th scope="row">1</th> */}
                        <td>{estate.title}</td>
                        <td>{estate.subtitle}</td>
                        <td>{estate.avatar}</td>
                        <td><button className="btn btn-danger" onClick={()=>deleteItem(estate.id)} ><i class="fas fa-trash-alt"></i></button></td>
                        <td><button className="btn btn-success" onClick={()=>setFakeId(estate.id)} ><i class="fas fa-pencil-alt"></i></button></td>
                    </tr>
                  ))}
                            
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
}

export default Proteinas
