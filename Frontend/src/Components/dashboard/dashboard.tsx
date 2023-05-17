import { useState } from "react";
import "./dashboard.css";
import Modal from "react-bootstrap/Modal";
import AjoutUtilisateur from "../ajout/ajoutUtilisateur";
import Header from "../header/header";
import { Link } from "react-router-dom";
import pas_dispo from "../../assets/pas_dispo.svg.png";

function Dashboard  () {
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
  
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
   // const [show, setShow] = useState(false);
   // const handleClose = () => setShow(false);//
   /*  const handleShow = () => setShow(true); */

    return(
        <>
        <div>
        <Header></Header>
        </div>
        
        <div className="container  contenu_" >
            <div className="row card_">
            <div className="titlee">
                  <h3 className="titl">Places du parking</h3>
                </div>
                <div className="col-lg-3 border border-dark ">
                    <div className="card">
                        <p>ddjdjdjjdjdjd</p>
                        <div className="icon">
                  <img className="imga" src={pas_dispo} alt="" />
                </div>
                    </div>
                </div>

                <div className="col-lg-3 border border-dark">
                    <div className="card">
                    <p>ddjdjdjjdjdjd</p>
                    <div className="icon">
                  <img className="imga" src={pas_dispo} alt="" />
                </div>
                    </div>
                </div>

                <div className="col-lg-3  border border-dark">
                    <div className="card">
                    <p>ddjdjdjjdjdjdklk  </p>
                    <div className="icon">
                  <img className="imga" src={pas_dispo} alt="" />
                </div>
                    </div>
                </div>
            
            </div>
            <div className="row card_2 local">
            <div className="titlee">
                  <h3 className="titl">Places du parking</h3>
                </div>
                <div className="col-lg-2 border  border-dark">
                    <div className="card">
                        <p>ddjdjdjjdjdjd</p>
                    </div>
                </div>

                <div className="col-lg-6   border border-dark">
                    <div className="card">
                    <p>ddjdjdjjdjdjd</p>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.0507557503092!2d-17.439213485713548!3d14.671081789733042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec173b9452a5ad5%3A0xb798e476c4492163!2sFabrique%20Simplon%20S%C3%A9n%C3%A9gal!5e0!3m2!1sfr!2ssn!4v1679420405682!5m2!1sfr!2ssn" 
                    width="100%" height="400"   loading="lazy" ></iframe>
                    </div>
                </div>

                <div className="col-lg-2  border border-dark ">
                    <div className="card cursor-pointer text-white  liens_" style={{backgroundColor:'#f2a007'}}>
                    <div className="d-flex justify-content-center add_" style={{backgroundColor:'#f2a007'}}>
                    <p className="fw-bold" onClick={handleShow1}>Ajouter un utilisateur</p>     
                        
                    { show1 && <Modal show={show1} onHide={handleClose1}> <AjoutUtilisateur/>     </Modal>}
                    </div>
                    </div>
                    <Link to={"/Tableaux"}>
                    <div className="card cursor-pointer text-white liens_" style={{backgroundColor:'#f2a007'}}>
                    <div className="d-flex justify-content-center add_">
                        <p className="fw-bold" onClick={handleShow2}>Utilisateurs actifs</p>
                    </div>
                    </div>
                    </Link>
                    <div className="card cursor-pointer text-white liens_" style={{backgroundColor:'#f2a007'}}>
                    <div className="d-flex justify-content-center add_">
                        <p className="fw-bold">Utilisateurs archivés</p>
                        <Link
              to="tableaux"
              className="d-flex flex-column justify-content-center align-items-center gap-2 rounded-top nav-blanc"
            >
             
            </Link>
                    </div>
                    </div>
                    <div className="card cursor-pointer text-white liens_" style={{backgroundColor:'#f2a007'}}>
                    <div className="d-flex justify-content-center add_">
                        <p className="fw-bold">Facturation</p>
                    </div>
                    </div>
                </div>
            
            </div>
        </div>
        </>
    );

};
export default Dashboard;
