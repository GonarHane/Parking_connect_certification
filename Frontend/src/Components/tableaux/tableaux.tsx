import "./tableaux.css";
import Header from "../header/header";
import Table from "react-bootstrap/Table";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import React from "react";
import Swal from "sweetalert2";


function Tableaux  (){

    const [users, setUsers] = useState<any>([]);
    const [id, setId] = useState<string>("");
    const [defaultnom, setDefaultnom] = useState<string>("");
    const [defaultprenom, setDefaultprenom] = useState<string>("");
    const [defaultemail, setDefaultemail] = useState<string>("");
    const [defaultrole, setDefaultrole] = useState<string>("");
    const [recherche, setRecherche] = useState<string>("");
    const [introuvable, setIntrouvable] = useState<boolean>(false);
    const [errormessage, setErrormessage] = useState<string>("");
    const [etat, setEtat] = useState<boolean>(true);
    const [ajour, setAjour] = useState<boolean>(true);
    {
      /*  FOR PAGINATION */
    }
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
  
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm({ mode: "onChange" });
  
    const [modalShow, setModalShow] = React.useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => {
      setShow(false);
    };
    const handleShow = (
      id: any,
      prenom: any,
      nom: any,
      email: any
      
    ) => {
      getOnUser(id);
      setDefaultnom(nom);
      setDefaultprenom(prenom);
      setDefaultemail(email);
  
      setShow(true);
  
      /*  ajour ? setAjour(false) : setAjour(true); */
      reset();
    };
    //************** */
    //avant archivage getOnUser_ affiche le modale et en meme teps appelle la fonction getOnUser qui recupere l'ID
    //************** */
    const getOnUser_ = (id: any) => {
      getOnUser(id);
      setModalShow(true);
      console.log(id);
    };
  
    /*****************************************************************************************
     ******************************SWEET ALERT*********************************************
     ****************************************************************************************/
    function showSuccessAlert() {
      Swal.fire({
        title: "Modification réussie !",
        icon: "success",
        timer: 2000, // Affiche la boîte de dialogue pendant 2 secondes
        showConfirmButton: false, // Supprime le bouton "OK"
      });
    }
    /* *******************************************************************************
     **********************************RECUPERATION PAR ID****************************
     *********************************************************************************/
  
    const getOnUser = (id: any) => {
      setId(id);
       fetch(`http://localhost:3001/users${id}`)
        .then((res) => res.json())
        .then((res) => {
           console.log(res); 
             setDefaultnom(res.nom1);
          setDefaultprenom(res.prenom1);
          setDefaultemail(res.email1);
          setDefaultrole(res.role); 
        }); 
    };


    const [user, setUser] = useState([])
    useEffect(() => {
        fetch(
          `http://localhost:3001/users/?_page=${currentPage}&_limit=${itemsPerPage}`, {
            headers: {
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
          }
        )
          .then((res) => res.json())
          .then((res) => {
            //console.log(res);
            //Je vai stocker les données dans ma variable users
            setUsers(
              //avant le stockage je vai filtrer les données, ça prends deux paramètres les données et le nombre
              res.filter((data: any) => {
                //je vérifie si le recherche est vide sinon
                if (recherche != "") {
                  handleChangePage({ currentTarget: { value: 1 } }); //clicler sur la page une recherche globale
                  const value = data.email
                    .toLowerCase()
                    .includes(recherche.toLowerCase().trim());
                  return (
                    value &&
                    data.etat == etat &&
                    data.id != localStorage.getItem("id")
                  );
                } else {
                  return data.etat == etat && data.id != localStorage.getItem("id");
                }
              })
            );
            if (users.length == 0) {
              setIntrouvable(true);
            } else {
              setIntrouvable(false);
            }
          });
      }, [users.length, recherche, etat, modalShow, ajour]);


    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
      ) => {
        setCurrentPage(Number(event.currentTarget.value));
      };
    
      const pageNumbers = Math.ceil(users.length / itemsPerPage);
      const pageButtons = [];
      // Bouton flèche gauche
      pageButtons.push(
        <button
          key="prev"
          onClick={() =>
            handleChangePage({ currentTarget: { value: currentPage - 1 } })
          }
          disabled={currentPage === 1}
          className={`text-gray-700 px-3 py-2 rounded-full border-2 ${recherche != "" && "d-none"} `}
        >
          {"<"}
        </button>
      );
      //bouttons du milieu
      for (let i = 1; i <= pageNumbers; i++) {
        pageButtons.push(
          <button
            key={i}
            value={i}
            onClick={handleChangePage}
            className={
              currentPage === i
                ? "text-white px-3 py-2 rounded-full backgroundColor"
                : "text-gray-700 px-3 py-2 rounded-full border-2"
            }
          >
            {i}
          </button>
        );
      }
      // Bouton flèche droite
      pageButtons.push(
        <button
          key="next"
          onClick={() =>
            handleChangePage({ currentTarget: { value: currentPage + 1 } })
          }
          disabled={currentPage === pageNumbers}
          className={`text-gray-700 px-3 py-2 rounded-full border-2 ${recherche != "" && "d-none"}`}
        >
          {">"}
        </button>
      );
    
      /* *********************************************************************************************************
       **************************************LES LIENS ARCHIVÉ ET DESARCHIVE********************************
       ***************************************************************************************************** */
      const optionActive = () => {
        setEtat(true);
      };
      const optionArchive = () => {
        setEtat(false);
      };
    
      /* *********************************************************************************************************
       *****************************************************RECHERCHE*******************************************
       ***************************************************************************************************** */
    
      /* Fonction de recherche par email */
      const search = (e: any) => {
        const value = e.target.value;
        setRecherche(value);
      };
      /* *********************************************************************************************************
       **********************************ENVOI DES DONNEES Archiver / dearchivé****************************
       ***************************************************************************************************** */
      const archiver = async (etat: any, x: any) => {
        const y = x;
       // console.log(y)
       // console.log(etat)
        const headersList = {
          Accept: "*/*",
          //Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",//
        };
    
        const bodyContent = JSON.stringify({
          etat: etat,
        });
    
        const response = await fetch(`http://localhost:3001/users/${y}`, {
          method: "DELETE",
          body: bodyContent,
          headers: headersList,
        });
    
        const data = await response.json();
        //console.log(data);
        setEtat(true);
        setModalShow(false);
      };
      /* *********************************************************************************************************
       **********************************ENVOI DES DONNEES DU FORMULAIRE MODIFIER****************************
       ***************************************************************************************************** */
      const onSubmit = async (data: any) => {
        console.log(data);
        const headersList = {
          Accept: "*/*",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        };
        let prenom, nom, email;
        data.prenom == "" ? (prenom = defaultprenom) : (prenom = data.prenom);
        data.nom == "" ? (nom = defaultnom) : (nom = data.nom);
        data.email == "" || data.email == defaultemail
          ? (email = undefined)
          : (email = data.email);
      
        console.log(email);
    
        const bodyContent = JSON.stringify({
          prenom: prenom,
          nom: nom,
          email: email,
        
        });
    
        const response = await fetch(`http://localhost:3001/users/${id}`, {
          method: "PATCH",
          body: bodyContent,
          headers: headersList,
        });
    
        const donnee = await response.json();
    
        if (donnee.message) {
          setErrormessage(donnee.message);
          setTimeout(() => {
            setErrormessage("");
          }, 2000);
        } else {
          setErrormessage("");
          reset();
          setEtat(true);
          showSuccessAlert();
          ajour ? setAjour(false) : setAjour(true);
        }
      };

       
return (
    <>
    
   {/* 

    

    /* <table className="table table-striped ttt_">
   <thead>
          <tr>
            <th className="px-4 py-2 border-2 border-gray-300">Date</th>
            <th className="px-4 py-2 border-2 border-gray-300">Prenom</th>
            <th className="px-4 py-2 border-2 border-gray-300">Nom</th>
            <th className="px-4 py-2 border-2 border-gray-300">Email</th>
            <th className="px-4 py-2 border-2 border-gray-300">Roles</th>
            <th className="px-4 py-2 border-2 border-gray-300">Actions</th>
          </tr>
        </thead>
</table> */}
 <div><Header></Header></div>
  <div
      className="flex w-4/5 mt-48 px-5 py-1 flex-col bg-white drop-shadow-lg text-center border"
      style={{ marginLeft: "10%", minHeight: "550px" }}
    >
      <div
        className="flex justify-start text-xl font-medium mt-4 space-x-2"
        style={{ color: "#81CCB7" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          className="bi bi-list"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          />
        </svg>
        {/* NAVIGATION ACTIVE ET ARCHIVE */}
        <a
          href="#"
          className={`${etat ? "underline" : ""}`}
          onClick={() => {
            optionActive();
          }}
          data-toggle="tooltip"
          data-placement="top"
          title="liste des actives"
        >
          Active
        </a>
        <a
          href="#"
          className={`${!etat ? "underline" : ""}`}
          onClick={() => {
            optionArchive();
          }}
          data-toggle="tooltip"
          data-placement="top"
          title="liste des archives"
        >
          Archive
        </a>
      </div>
      <div className="flex justify-end">
        <div
          className="border py-2 px-1 text-white rounded-l-md"
          style={{ backgroundColor: "#81CCB7" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
        <input
          onChange={(e) => search(e)}
          type="text"
          placeholder="Rechercher un email"
          className="border-2 border-gray-300 rounded-r-md p-2 w-56"
        />
      </div>
      <Table striped className="mt-3">
        <thead>
          <tr>
            <th className="px-4 py-2 border-2 border-gray-300">Matricule</th>
            <th className="px-4 py-2 border-2 border-gray-300">Prenom</th>
            <th className="px-4 py-2 border-2 border-gray-300">Nom</th>
            <th className="px-4 py-2 border-2 border-gray-300">Email</th>
            <th className="px-4 py-2 border-2 border-gray-300">Actions</th>
            <th className="px-4 py-2 border-2 border-gray-300">Rôles</th>
          </tr>
        </thead>
        <tbody>
          {users
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((user: any) => (
              <tr>
                <td className="border-2 border-gray-300 px-4 py-2">
                  <div className="flex justify-center items-center gap-2">
                    <span>{user.rfid}</span>
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
                    <span>{user._id}</span>
                  </div>
                </td>
                <td
                  className={`border-1  border-gray-300 px-4 py-2  d-flex justify-content-center`}
                >
                  {/**********************************************************
                   ********************** Pour déarchivé ***********************
                   **********************************************************/}
                  <div
                    className="mb-2"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="déarchiver"
                  >
                    <span className={` ${!etat ? "" : "cacher"}`}>
                      <svg
                        onClick={() => {
                          archiver(true, user._id);
                        }}
                        style={{ cursor: "pointer" }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="#BD2121"
                        className="bi bi-archive"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                      </svg>
                    </span>
                  </div>
                  {/**********************************************************
                   ********************** Pour modifier et archivé ************
                   **********************************************************/}
                  <div
                    className={`flex justify-center items-center gap-2 ${
                      etat ? "" : "cacher"
                    }`}
                  >
                    <span
                      className={`border-2 border-gray-300 px-1 py-1 `}
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Modifier"
                    >
                      <svg
                        onClick={() => {
                          handleShow(
                            user.id,
                            user.prenom,
                            user.nom,
                            user.email
                           
                          );
                        }}
                        style={{ cursor: "pointer" }}
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
                    <span
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Archiver"
                      className={`border-2 border-gray-300 px-1 py-1 `}
                    >
                      <svg
                        onClick={() => getOnUser_(user._id)}
                        style={{ cursor: "pointer" }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="#BD2121"
                        className="bi bi-archive"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
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
            ))}
        </tbody>
      </Table>
      {/*  FOR PAGINATION */}
      <div className="flex justify-end my-4 fixed-bottom pr-10 gap-2">
        {pageButtons}
      </div>

      <div className={` ${!introuvable ? "cacher" : ""}`}>
        <div
          aria-colspan={6}
          className={`px-4 py-2 flex flex-col items-center justify-center`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0 0 80 80"
          >
            <path d="M 50 7 C 37.309295 7 27 17.309295 27 30 C 27 35.09327 28.66406 39.799667 31.472656 43.613281 L 27.226562 47.859375 C 26.886955 47.732969 26.530523 47.662109 26.171875 47.662109 C 25.40209 47.662109 24.632318 47.95362 24.050781 48.535156 L 7.8789062 64.707031 C 6.7158333 65.870104 6.7158333 67.786146 7.8789062 68.949219 L 11.050781 72.121094 C 12.213854 73.284167 14.129896 73.284167 15.292969 72.121094 L 31.464844 55.949219 C 32.31717 55.096893 32.537784 53.842043 32.140625 52.773438 L 36.386719 48.527344 C 40.200333 51.33594 44.90673 53 50 53 C 62.690705 53 73 42.690705 73 30 C 73 17.309295 62.690705 7 50 7 z M 50 9 C 61.609824 9 71 18.390176 71 30 C 71 41.609824 61.609824 51 50 51 C 38.390176 51 29 41.609824 29 30 C 29 18.390176 38.390176 9 50 9 z M 50 11 A 1 1 0 0 0 49 12 A 1 1 0 0 0 50 13 A 1 1 0 0 0 51 12 A 1 1 0 0 0 50 11 z M 45.339844 11.613281 A 1 1 0 0 0 44.339844 12.613281 A 1 1 0 0 0 45.339844 13.613281 A 1 1 0 0 0 46.339844 12.613281 A 1 1 0 0 0 45.339844 11.613281 z M 54.65625 11.613281 A 1 1 0 0 0 53.65625 12.613281 A 1 1 0 0 0 54.65625 13.613281 A 1 1 0 0 0 55.65625 12.613281 A 1 1 0 0 0 54.65625 11.613281 z M 40.998047 13.412109 A 1 1 0 0 0 39.998047 14.412109 A 1 1 0 0 0 40.998047 15.412109 A 1 1 0 0 0 41.998047 14.412109 A 1 1 0 0 0 40.998047 13.412109 z M 59 13.412109 A 1 1 0 0 0 58 14.412109 A 1 1 0 0 0 59 15.412109 A 1 1 0 0 0 60 14.412109 A 1 1 0 0 0 59 13.412109 z M 37.271484 16.271484 A 1 1 0 0 0 36.271484 17.271484 A 1 1 0 0 0 37.271484 18.271484 A 1 1 0 0 0 38.271484 17.271484 A 1 1 0 0 0 37.271484 16.271484 z M 62.726562 16.271484 A 1 1 0 0 0 61.726562 17.271484 A 1 1 0 0 0 62.726562 18.271484 A 1 1 0 0 0 63.726562 17.271484 A 1 1 0 0 0 62.726562 16.271484 z M 65.585938 20 A 1 1 0 0 0 64.585938 21 A 1 1 0 0 0 65.585938 22 A 1 1 0 0 0 66.585938 21 A 1 1 0 0 0 65.585938 20 z M 34.410156 20.001953 A 1 1 0 0 0 33.410156 21.001953 A 1 1 0 0 0 34.410156 22.001953 A 1 1 0 0 0 35.410156 21.001953 A 1 1 0 0 0 34.410156 20.001953 z M 43 23 C 41.35499 23 40 24.35499 40 26 C 40 27.64501 41.35499 29 43 29 C 44.64501 29 46 27.64501 46 26 C 46 24.35499 44.64501 23 43 23 z M 57 23 C 55.35499 23 54 24.35499 54 26 C 54 27.64501 55.35499 29 57 29 C 58.64501 29 60 27.64501 60 26 C 60 24.35499 58.64501 23 57 23 z M 32.611328 24.341797 A 1 1 0 0 0 31.611328 25.341797 A 1 1 0 0 0 32.611328 26.341797 A 1 1 0 0 0 33.611328 25.341797 A 1 1 0 0 0 32.611328 24.341797 z M 67.384766 24.341797 A 1 1 0 0 0 66.384766 25.341797 A 1 1 0 0 0 67.384766 26.341797 A 1 1 0 0 0 68.384766 25.341797 A 1 1 0 0 0 67.384766 24.341797 z M 43 25 C 43.564129 25 44 25.435871 44 26 C 44 26.564129 43.564129 27 43 27 C 42.435871 27 42 26.564129 42 26 C 42 25.435871 42.435871 25 43 25 z M 57 25 C 57.564129 25 58 25.435871 58 26 C 58 26.564129 57.564129 27 57 27 C 56.435871 27 56 26.564129 56 26 C 56 25.435871 56.435871 25 57 25 z M 32 29 A 1 1 0 0 0 31 30 A 1 1 0 0 0 32 31 A 1 1 0 0 0 33 30 A 1 1 0 0 0 32 29 z M 68 29 A 1 1 0 0 0 67 30 A 1 1 0 0 0 68 31 A 1 1 0 0 0 69 30 A 1 1 0 0 0 68 29 z M 32.611328 33.658203 A 1 1 0 0 0 31.611328 34.658203 A 1 1 0 0 0 32.611328 35.658203 A 1 1 0 0 0 33.611328 34.658203 A 1 1 0 0 0 32.611328 33.658203 z M 67.384766 33.660156 A 1 1 0 0 0 66.384766 34.660156 A 1 1 0 0 0 67.384766 35.660156 A 1 1 0 0 0 68.384766 34.660156 A 1 1 0 0 0 67.384766 33.660156 z M 50 34 C 46.337246 34 43.080194 35.76886 40.925781 38.359375 L 42.462891 39.638672 C 44.270478 37.465187 46.982754 36 50 36 C 53.017246 36 55.729522 37.465187 57.537109 39.638672 L 59.074219 38.359375 C 56.919806 35.76886 53.662754 34 50 34 z M 34.410156 37.998047 A 1 1 0 0 0 33.410156 38.998047 A 1 1 0 0 0 34.410156 39.998047 A 1 1 0 0 0 35.410156 38.998047 A 1 1 0 0 0 34.410156 37.998047 z M 65.587891 38.001953 A 1 1 0 0 0 64.587891 39.001953 A 1 1 0 0 0 65.587891 40.001953 A 1 1 0 0 0 66.587891 39.001953 A 1 1 0 0 0 65.587891 38.001953 z M 37.271484 41.728516 A 1 1 0 0 0 36.271484 42.728516 A 1 1 0 0 0 37.271484 43.728516 A 1 1 0 0 0 38.271484 42.728516 A 1 1 0 0 0 37.271484 41.728516 z M 62.726562 41.728516 A 1 1 0 0 0 61.726562 42.728516 A 1 1 0 0 0 62.726562 43.728516 A 1 1 0 0 0 63.726562 42.728516 A 1 1 0 0 0 62.726562 41.728516 z M 58.998047 44.587891 A 1 1 0 0 0 57.998047 45.587891 A 1 1 0 0 0 58.998047 46.587891 A 1 1 0 0 0 59.998047 45.587891 A 1 1 0 0 0 58.998047 44.587891 z M 40.998047 44.589844 A 1 1 0 0 0 39.998047 45.589844 A 1 1 0 0 0 40.998047 46.589844 A 1 1 0 0 0 41.998047 45.589844 A 1 1 0 0 0 40.998047 44.589844 z M 32.734375 45.179688 C 33.384782 45.918716 34.081284 46.615218 34.820312 47.265625 L 30.921875 51.164062 L 28.835938 49.078125 L 32.734375 45.179688 z M 45.339844 46.386719 A 1 1 0 0 0 44.339844 47.386719 A 1 1 0 0 0 45.339844 48.386719 A 1 1 0 0 0 46.339844 47.386719 A 1 1 0 0 0 45.339844 46.386719 z M 54.65625 46.386719 A 1 1 0 0 0 53.65625 47.386719 A 1 1 0 0 0 54.65625 48.386719 A 1 1 0 0 0 55.65625 47.386719 A 1 1 0 0 0 54.65625 46.386719 z M 50 47 A 1 1 0 0 0 49 48 A 1 1 0 0 0 50 49 A 1 1 0 0 0 51 48 A 1 1 0 0 0 50 47 z M 26.171875 49.650391 C 26.42559 49.650391 26.67749 49.749751 26.876953 49.949219 L 30.050781 53.121094 C 30.449406 53.519719 30.447916 54.138021 30.050781 54.535156 L 13.878906 70.707031 C 13.479979 71.105958 12.863771 71.105958 12.464844 70.707031 L 9.2929688 67.535156 C 8.8940417 67.136229 8.8940417 66.520021 9.2929688 66.121094 L 11 64.414062 L 13.292969 66.707031 L 14.707031 65.292969 L 12.414062 63 L 14 61.414062 L 16.292969 63.707031 L 17.707031 62.292969 L 15.414062 60 L 17 58.414062 L 19.292969 60.707031 L 20.707031 59.292969 L 18.414062 57 L 20 55.414062 L 22.292969 57.707031 L 23.707031 56.292969 L 21.414062 54 L 23 52.414062 L 25.292969 54.707031 L 26.707031 53.292969 L 24.414062 51 L 25.464844 49.949219 C 25.664307 49.749755 25.91816 49.650391 26.171875 49.650391 z"></path>
          </svg>
          <span className="text-4xl text-red-500">Aucun résultat</span>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <div className="d-flex justify-content-between p-3">
          <Modal.Title className="h4 text-color">Modification</Modal.Title>
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
              <p
                className={`alert alert-danger ${
                  errormessage == "" ? "cacher" : ""
                }`}
              >
                {" "}
                {errormessage}{" "}
              </p>
              <Form.Label>
                Prénom<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                defaultValue={defaultprenom}
                placeholder="Entrer votre prénom"
                {...register("prenom", {
                  required: false,
                })}
              />
              {errors.prenom?.type === "required" && (
                <p className="text-red-500">Ce champ est requis</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Nom<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                defaultValue={defaultnom}
                type="text"
                placeholder="Entrer votre nom"
                {...register("nom", {
                  required: false,
                })}
              />
              {errors.nom?.type === "required" && (
                <p className="text-red-500">Ce champ est requis</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Email<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                defaultValue={defaultemail}
                type="text"
                placeholder="Entrer votre mail"
                {...register("email", {
                  required: false,
                  pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
                })}
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">Ce champ est requis</p>
              )}
              {errors.email?.type === "pattern" && (
                <p className="text-red-500">Entrer un email correct</p>
              )}
            </Form.Group>
           
            <input className="bouton" type="submit" value={"MODIFIER"} />
          </Form>
        </Modal.Body>
      </Modal>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>


    </> 

    
);
function MyVerticallyCenteredModal(props: any) {
    return (
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="d-flex flex-column justify-content-center">
          <div className="d-flex justify-content-center mb-3">
            <h1>Voulez- vous vraiment archiver ?</h1>
          </div>
          <div className="d-flex justify-content-center gap-5">
            <button
              className="bg-danger p-2 rounded-3 text-light"
              onClick={props.onHide}
            >
              NON
            </button>
            <button
              className={`bg-success p-2 rounded-3 text-light `}
              onClick={() => {
                archiver(false, id);
              }}
            >
              OUI
            </button>
          </div>
        </Modal.Body>
      </Modal>
    );
}
}
export default Tableaux;