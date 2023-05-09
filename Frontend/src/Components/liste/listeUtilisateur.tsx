/* import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
//import './liste_Employes.json'
import './listeUtilisateur.css';

function ListeUtilisateur() {

    const { register, handleSubmit, formState: { errors } } = useForm({mode: "onChange"});
    const onSubmit = (data:any) => console.log(data);
    const [modalShow, setModalShow] = React.useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [users, setUsers] = useState<any>([]);
    

    useEffect(() => {
        fetch('http://localhost:5173/liste_Employes.json'
        
        )
        .then((res) => res.json())
        .then((res) => {
            
            console.log(res);
            
          setUsers(res);
        });
      },[]);
      
     

  return (
    <div className="flex justify-center w-4/5 mt-48 px-5 py-1 flex-col bg-white drop-shadow-lg text-center border" style={{marginLeft:'10%'}}>
      <div className='flex justify-start text-xl font-medium mt-4 space-x-2' style={{color:'#81CCB7'}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
            </svg>
                <p>Active</p>
                <p>Archive</p>
            </div>
            <div className="flex justify-end">
                <div className='border py-2 px-1 text-white rounded-l-md' style={{backgroundColor:'#81CCB7'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </div>
                <input type="text" placeholder='Rechercher un nom' className="border-2 border-gray-300 rounded-r-md p-2 w-56" />
            </div>
            <Table striped className='mt-3'>
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-2 border-gray-300">Date</th>
                        <th className="px-4 py-2 border-2 border-gray-300">Heure</th>
                        <th className="px-4 py-2 border-2 border-gray-300">Prenom</th>
                        <th className="px-4 py-2 border-2 border-gray-300">Nom</th>
                        <th className="px-4 py-2 border-2 border-gray-300">Email</th>
                        <th className="px-4 py-2 border-2 border-gray-300">Actions</th>
                        <th className="px-4 py-2 border-2 border-gray-300">Rôles</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user: any) => 
                        <tr>
                            <td className="border-2 border-gray-300 px-4 py-2">
                            <div className="flex justify-center items-center gap-2">
                                <span>{user.date}</span>
                            </div>
                            </td>
                            <td className="border-2 border-gray-300 px-4 py-2">
                            <div className="flex justify-center items-center gap-2">
                                <span>{user.heure}</span>
                            </div>
                            </td>
                            <td className="border-2 border-gray-300 px-4 py-2">
                            <div className="flex justify-center items-center gap-2">
                                <span>{user.prenom}</span>
                            </div>
                            </td>
                            <td className="border-2 border-gray-300 px-4 py-2">
                            <div className="flex justify-center items-center gap-2">
                                <span>{user.nom}</span>
                            </div>
                            </td>
                            <td className="border-2 border-gray-300 px-4 py-2">
                            <div className="flex justify-center items-center gap-2">
                                <span>{user.email}</span>
                            </div>
                            </td>
                            <td className="border-2 border-gray-300 px-4 py-2">
                            <div className="flex justify-center items-center gap-2">
                                <span className="border-2 border-gray-300 px-1 py-1">
                                    <svg onClick={handleShow}
                                        width="20"
                                        height="20"
                                        viewBox="0 0 53 55"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        >
                                        <path
                                            d="M8.94215 46.2643C7.2842 46.2643 5.73497 45.7271 4.62061 44.7299C3.20727 43.4771 2.52779 41.5849 2.7724 39.5394L3.77804 31.255C3.9683 29.6953 4.97394 27.6242 6.14266 26.4992L28.457 4.27971C34.0288 -1.26879 39.8452 -1.42221 45.7432 3.81947C51.6411 9.06114 51.8042 14.5329 46.2324 20.0814L23.9181 42.3009C22.7765 43.4515 20.6565 44.5254 18.9986 44.7813L10.2468 46.1874C9.78471 46.2129 9.37702 46.2643 8.94215 46.2643ZM37.1817 3.7939C35.0888 3.7939 33.2678 5.02122 31.4196 6.86219L9.10522 29.1075C8.56163 29.6444 7.93651 30.9229 7.82779 31.6644L6.82215 39.9485C6.71343 40.7923 6.93086 41.4827 7.42009 41.9173C7.90933 42.352 8.64317 42.5054 9.5401 42.3776L18.2919 40.9715C19.0801 40.8437 20.3847 40.1786 20.9283 39.6417L43.2427 17.4222C46.6129 14.0471 47.836 10.9277 42.9165 6.58093C40.7422 4.61211 38.8668 3.7939 37.1817 3.7939Z"
                                            fill="#306887"
                                        />
                                        <path
                                            d="M41.015 24.3508C40.9606 24.3508 40.8791 24.3508 40.8247 24.3508C32.3447 23.5581 25.5227 17.4984 24.218 9.57193C24.055 8.52359 24.816 7.55197 25.9303 7.37298C27.0447 7.21957 28.0775 7.9355 28.2678 8.98384C29.3006 15.1716 34.6278 19.9274 41.2596 20.5411C42.3739 20.6434 43.1893 21.5894 43.0806 22.6376C42.9447 23.6093 42.0478 24.3508 41.015 24.3508Z"
                                            fill="#306887"
                                        />
                                        <path
                                            d="M50.9615 54.5229H2.03846C0.924103 54.5229 0 53.6535 0 52.6052C0 51.5569 0.924103 50.6875 2.03846 50.6875H50.9615C52.0759 50.6875 53 51.5569 53 52.6052C53 53.6535 52.0759 54.5229 50.9615 54.5229Z"
                                            fill="#306887"
                                        />
                                    </svg>
                                </span>
                                <span className="border-2 border-gray-300 px-1 py-1">
                                    <svg onClick={() => setModalShow(true)} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#BD2121" className="bi bi-archive" viewBox="0 0 16 16">
                                        <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                                    </svg>
                                </span>
                            </div>
                            </td>
                            <td className="border-2 border-gray-300 px-4 py-2">
                            <div className="flex justify-center items-center gap-2">
                                <span>{user.role}</span>
                            </div>
                            </td>
                        </tr>
                        )}
                    
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
            <div className="d-flex justify-content-between p-3">
                <Modal.Title className="h4 text-color">
                    Modification
                </Modal.Title>
                <svg
                    style={{ cursor: "pointer" }}
                    onClick={handleClose}
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                    d="M27.3266 12.9283C27.4815 13.0831 27.6045 13.2669 27.6883 13.4693C27.7722 13.6716 27.8154 13.8885 27.8154 14.1075C27.8154 14.3265 27.7722 14.5434 27.6883 14.7457C27.6045 14.9481 27.4815 15.1319 27.3266 15.2867L22.3566 20.255L26.8166 24.7133C27.1293 25.0261 27.305 25.4502 27.305 25.8925C27.305 26.3348 27.1293 26.7589 26.8166 27.0717C26.5038 27.3844 26.0797 27.5601 25.6374 27.5601C25.1951 27.5601 24.771 27.3844 24.4582 27.0717L19.9999 22.6117L15.5416 27.0717C15.2288 27.3844 14.8047 27.5601 14.3624 27.5601C13.9201 27.5601 13.496 27.3844 13.1832 27.0717C12.8705 26.7589 12.6948 26.3348 12.6948 25.8925C12.6948 25.4502 12.8705 25.0261 13.1832 24.7133L17.6432 20.255L12.6732 15.2867C12.5184 15.1317 12.3956 14.9478 12.3118 14.7454C12.2281 14.5429 12.185 14.326 12.1851 14.1069C12.1851 13.8879 12.2284 13.6709 12.3123 13.4686C12.3962 13.2662 12.5191 13.0824 12.6741 12.9275C12.829 12.7727 13.013 12.6499 13.2154 12.5661C13.4178 12.4823 13.6348 12.4393 13.8538 12.4393C14.0729 12.4394 14.2898 12.4826 14.4922 12.5665C14.6945 12.6504 14.8784 12.7734 15.0332 12.9283L19.9999 17.9L24.9682 12.93C25.123 12.7751 25.3068 12.6521 25.5092 12.5682C25.7115 12.4844 25.9284 12.4412 26.1474 12.4412C26.3664 12.4412 26.5833 12.4844 26.7856 12.5682C26.988 12.6521 27.1718 12.7734 27.3266 12.9283Z"
                    fill="#797777"
                    />
                    <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.66663 1.66663C5.34054 1.66663 4.06877 2.19341 3.13109 3.13109C2.19341 4.06877 1.66663 5.34054 1.66663 6.66663V33.3333C1.66663 34.6594 2.19341 35.9311 3.13109 36.8688C4.06877 37.8065 5.34054 38.3333 6.66663 38.3333H33.3333C34.6594 38.3333 35.9311 37.8065 36.8688 36.8688C37.8065 35.9311 38.3333 34.6594 38.3333 33.3333V6.66663C38.3333 5.34054 37.8065 4.06877 36.8688 3.13109C35.9311 2.19341 34.6594 1.66663 33.3333 1.66663H6.66663ZM33.3333 4.99996H6.66663C6.2246 4.99996 5.80067 5.17555 5.48811 5.48811C5.17555 5.80068 4.99996 6.2246 4.99996 6.66663V33.3333C4.99996 33.7753 5.17555 34.1992 5.48811 34.5118C5.80067 34.8244 6.2246 35 6.66663 35H33.3333C33.7753 35 34.1992 34.8244 34.5118 34.5118C34.8244 34.1992 35 33.7753 35 33.3333V6.66663C35 6.2246 34.8244 5.80068 34.5118 5.48811C34.1992 5.17555 33.7753 4.99996 33.3333 4.99996Z"
                    fill="#797777"
                    />
                </svg>
            </div>
                <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                    <Form.Label>Prénom<span className='text-danger'>*</span></Form.Label>
                    <Form.Control type="text" placeholder="Entrer votre prénom"
                    {...register("prenom", {
                        required:true
                        })
                      }
                    />
                    {errors.prenom?.type === "required" && <p className='text-red-500'>Ce champ est requis</p>}
                    </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Label>Nom<span className='text-danger'>*</span></Form.Label>
                    <Form.Control type="text" placeholder="Entrer votre nom"
                    {...register("nom", {
                        required:true
                        })
                      }
                    />
                    {errors.nom?.type === "required" && <p className='text-red-500'>Ce champ est requis</p>}
                    </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Label>Email<span className='text-danger'>*</span></Form.Label>
                    <Form.Control type="text" placeholder="Entrer votre mail"
                    {...register("email", {
                        required:true, 
                        pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i
                        })
                      }
                    />
                    {errors.email?.type === "required" && <p className='text-red-500'>Ce champ est requis</p>}
                    {errors.email?.type === "pattern" && <p className='text-red-500'>Entrer un email correct</p>}
                    </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Label>Rôle<span className='text-danger'>*</span></Form.Label>
                    <Form.Select placeholder="Choisir un rôle"  
                        {...register("role", {
                            required:true
                            })
                        }
                      >
                        <option className=" text-black"></option>
                        <option value="Admin" className=" text-black">Admin</option>
                        <option value="Surveillant" className=" text-black">Surveillant</option>
                        <option value="Professeur" className=" text-black">Professeur</option>
                        <option value="Vigile" className=" text-black">Vigile</option>
                    </Form.Select>
                    {errors.role?.type === "required" && <p className='text-red-500'>Ce champ est requis</p>}
                    </Form.Group>
                    <input className='bouton' type='submit' value={'MODIFIER'} />
                </Form>
                </Modal.Body>
            </Modal>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
    </div>
  )
}

function MyVerticallyCenteredModal(props:any) {
    return (
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className='d-flex flex-column justify-content-center'>
            <div className='d-flex justify-content-center mb-3'>
                <h1>Voulez- vous vraiment archiver ?</h1>
            </div>
          <div className='d-flex justify-content-center gap-5'>
            <button className='bg-danger p-2 rounded-3 text-light' onClick={props.onHide}>NON</button>
            <button className='bg-success p-2 rounded-3 text-light' onClick={props.onHide}>OUI</button>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

export default <ListeUtilisateur/> */