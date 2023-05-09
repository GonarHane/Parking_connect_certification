import { useState } from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { Button, InputGroup } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import Swal from "sweetalert2";

/* import Swal from "sweetalert2"; */

function AjoutUtilisateur() {

    const [eye, seteye] = useState<boolean>(true);
    const [password, setpassword] = useState<string>("password");
    const [eye1, seteye1] = useState<boolean>(true);
    const [passwordConfirm, setPasswordConfirm] = useState<string>("password");
    const [prenom, setPrenom] = useState<string>("");
    const [nom, setNom] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [mdp, setMdp] = useState<string>("");
    const [matricule, setMatricule] = useState<string>("");
    const [role, setRole] = useState<string>("");
    const [errorBack, setErrorBack] = useState("");
    const [etat, setEtat] = useState<boolean>(false);

    function showSuccessAlert() {
        Swal.fire({
          title: "Modification réussie!",
          icon: "success",
          timer: 2000, // Affiche la boîte de dialogue pendant 2 secondes
          showConfirmButton: false, // Supprime le bouton "OK"
        });
      }
    const Eye = () => {
        if (password == "password") {
            setpassword("text");
            seteye(false);
        } else {
            setpassword("password");
            seteye(true);
        }
    };

    const Eye1 = () => {
        if (passwordConfirm == "password") {
            setPasswordConfirm("text");
            seteye1(false);
        } else {
            setPasswordConfirm("password");
            seteye1(true);
        }
    };

    

    function showSuccessAlert() {
        Swal.fire({
            title: "Inscription réussie!",
            icon: "success",
            timer: 2000, // Affiche la boîte de dialogue pendant 3 secondes
            showConfirmButton: false, // Supprime le bouton "OK"
        });
    }

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: "onChange" });

    const onSubmit = async () => {
      let headersList = {
 "Accept": "*/*",
 "User-Agent": "Thunder Client (https://www.thunderclient.com)",
 "Content-Type": "application/json"
}

let bodyContent = JSON.stringify({
     "nom":nom,
   "prenom":prenom,
    "email":email,
    "password":password,
    "role":role

    

});

let response = await fetch("http://localhost:3001/users", { 
  method: "POST",
  body: bodyContent,
  headers: headersList
});

let data = await response.json();
console.log(data.message);
if (data.message) {
    setErrorBack(data.message)
    setEtat(true)
}
else{
    setErrorBack("")
    setEtat(false)
    reset()
    showSuccessAlert();
}

    };

    return (
        <>
            <div>
                <div className="d-flex justify-content-between p-3">
                    <h1 className="h4 text-color" >Inscrire un utilisateur</h1>
                </div>
                <div
                    className={`alert alert-danger text-center ${!etat ? "d-none" : ""}`}>
                    {errorBack}
                </div> 
                <div className="-mt-8">
                    <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="m-3 space-y-3">
                        <Row>
                        <Form.Group as={Col}>
                            <Form.Label>Prénom</Form.Label>
                            <Form.Control
                                id="prenom"
                                value={prenom}
                                type="text"
                                placeholder="asfv"
                                autoFocus
                                {...register("prenom", {
                                    required: true,
                                })}
                                onChange={(e) => setPrenom(e.target.value)}
                            />
                            {errors.prenom?.type === "required" && (
                                <p className="text-red-500">Ce champ est obligatoire</p>
                            )}
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control
                                id="nom"
                                value={nom}
                                type="text"
                                placeholder="asdf"
                                {...register("nom", {
                                    required: true,
                                })}
                                onChange={(e) => setNom(e.target.value)}
                            />
                            {errors.nom?.type === "required" && (
                                <p className="text-red-500">Ce champ est obligatoire</p>
                            )}
                            
                        </Form.Group>
                        </Row>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                id="email"
                                value={email}
                                type="email"
                                placeholder="gogo@gmail.com"
                                {...register("email", {
                                    required: true,
                                    pattern:
                                        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
                                })}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div>
                                {errors.email?.type === "required" && (
                                    <p className="text-red-600">Ce champ est Obligatoire</p>
                                )}
                                {errors.email?.type === "pattern" && (
                                    <span className="text-red-600">Entrer un email valide</span>
                                )}
                            </div>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Matricule</Form.Label>
                            <Form.Control
                                id="matricule"
                                value={matricule}
                                type="text"
                                placeholder="347768900987"
                                {...register("matricule", {
                                    required: true,
                                })}
                                onChange={(e) => setMatricule(e.target.value)}
                            />
                            {errors.matricule?.type === "required" && (
                                <p className="text-red-500">Ce champ est obligatoire</p>
                            )}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Rôle<span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Select
                                id="role"
                                value={role}
                                placeholder="Choisir un rôle"
                                {...register("role", {
                                    required: true,
                                })}
                                onChange={(e) => setRole(e.target.value)}>
                                <option placeholder="Choisir un rôle"></option>
                                <option value="administrateur" className=" text-black">Admin</option>
                                <option value="surveillant" className=" text-black"> Utilisateur</option>
                                
                            </Form.Select>
                            {errors.role?.type === "required" && (
                                <p className="text-red-500">Ce champ est requis</p>
                            )}
                        </Form.Group>
                        <Row>
                            <Form.Group as={Col}>
                                <Form.Label>Mot de passe</Form.Label>
                                <InputGroup>
                                    <Form.Control style={{ borderRight: 'none' }}
                                        id="mot_de_passe"
                                        value={mdp}
                                        type={password}
                                        placeholder="*****"
                                        {...register("password", { required: true, minLength: 6 })}
                                        onChange={(e) => setMdp(e.target.value)} />
                                    <InputGroup.Text className="bg-white">
                                        <i onClick={() => { Eye(); }} className={`bi ${eye ? "bi bi-eye-slash" : "bi-eye"}`}></i>
                                    </InputGroup.Text>
                                </InputGroup>
                                {errors.password?.type === "minLength" && (
                                    <p className="text-red-600">Minimum 6 caractère</p>
                                )}
                                {errors.password?.type === "required" && (
                                    <p className="text-red-600">Ce champ est obligatoire</p>
                                )}
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Confirmer mot de passe</Form.Label>
                                <InputGroup>
                                    <Form.Control style={{ borderRight: 'none' }}
                                        type={passwordConfirm}
                                        placeholder="*****"
                                       /*  {...register("passwordConfirm", { required: true, minLength: 6 })} */ />
                                    <InputGroup.Text className="bg-white">
                                        <i onClick={() => { Eye1(); }} className={`bi ${eye1 ? "bi bi-eye-slash" : "bi-eye"}`}></i>
                                    </InputGroup.Text>
                                </InputGroup>
                                {/* {errors.passwordConfirm?.type === "minLength" && (
                                    <p className="text-red-600">Minimum 6 caractère</p>
                                )}
                                {errors.passwordConfirm?.type === "required" && (
                                    <p className="text-red-600">Ce champ est obligatoire</p>
                                )} */}
                            </Form.Group>
                        </Row>
                        <Button
                            variant="outline-success"
                            type="submit"
                            className="d-flex justify-content-center align-items-center">
                            Ajouter
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default AjoutUtilisateur;