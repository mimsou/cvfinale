import React ,{useState,useEffect} from "react";
import {HighlightOff, Edit, Remove} from "@mui/icons-material";
import L from "../../locale";
import userService from "../../services/user.service";
import {Button, Input, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {Trash} from "react-bootstrap-icons";
 
const CvsThumbnail = (props) => {

    const [hoverState , setoverState] = useState(false)
    const [confirmDelete , seConfirmDelete] = useState(false)
    const [Libelle, setLibelle] = useState("");
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    useEffect(()=>{
        if(props?.dataModel?.libelle)
        setLibelle(props.dataModel.libelle)
    },[]);

     const prepareDeleteCv = (e) =>{
         e.stopPropagation();
         seConfirmDelete(true)
     }

     const deleteCv = (e) => {
         e.stopPropagation()
         userService.deleteUserCv(props.dataModel.id).then(
             (responce)=>{
                 if(responce.data.status){
                     seConfirmDelete(false)
                     props.refrech()
                 }
             }
         )
    }

    const editLibelle = (e) =>{
        e.stopPropagation();
        toggle()
    }

    const changeLibelle = () => {
        userService.eidtLibelleCv(props.dataModel.id ,Libelle ).then(
            (responce)=>{
                if(responce.data.status){
                    props.refrech()
                    toggle()
                }
            }
        )
    }

    const handelChange = (e) => {
        e.stopPropagation();
        setLibelle(e.target.value)
    }


    if( !props.dataModel && !props.dataModel.preference ) return <div>Loading</div>
    return (
        <div onClick={props.onClick} className="Thumnailcontainer" >
            {confirmDelete &&
                <div className={"conifirmDelete"}>
                <L>Supprimer le CV</L>  ?
                <br />
                <button  onClick={(e)=>deleteCv(e)} className={"btn btn-sm btn-danger"}><L>Oui</L></button>
                <button onClick={(e)=>{e.stopPropagation();seConfirmDelete(false)}} className={"btn btn-sm btn-success"}><L>Non</L></button>
            </div>
            }
             <img onMouseOver={()=>setoverState(true)} onMouseLeave={()=>setoverState(false)} width="198" height="280"   style={{borderRadius:"10px"}} src={props.dataModel.preference?.thumb} />
             <div className="thumbnail-title" >
                 {props.dataModel.libelle}
                 <Edit onClick={(e)=>editLibelle(e)} style={{fontSize:"20px",color:"#969090",marginLeft:"10px"}} />
                 <Trash className={"trash_mobile"} onClick={(e)=>prepareDeleteCv(e)}  style={{fontSize:"20px",color:"#969090",marginLeft:"10px"}} />
             </div>
             <HighlightOff
                 onClick={(e)=>prepareDeleteCv(e)}
                 onMouseOver={() =>
                 setoverState(true)
             } className={"operIcone " +  (hoverState && !confirmDelete ? " mouse-over-thumb "  : "")  } />

            <Modal id={"changeTitle"} style={{top: "70px"}} isOpen={modal} toggle={toggle} className={"changeTitle"}>
                <ModalHeader  ><L>Modification du titre</L></ModalHeader>
                <ModalBody>
                    <Input onSelect={(e)=>e.preventDefault()}  value={Libelle} onChange={(e) =>handelChange(e)}/>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => {
                        changeLibelle()
                        toggle()
                    }}>
                        <L>Sauvegarder</L>
                    </Button>{" "}
                    <Button color="secondary" onClick={toggle}>
                        <L>Fermer</L>
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
 
export default CvsThumbnail;
