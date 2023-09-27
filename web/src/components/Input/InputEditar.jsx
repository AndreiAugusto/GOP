import { Form } from "react-bootstrap";
import style from './styles.module.css'


export function InputEditar(props) {
    return(
        <Form.Group className="d-flex" >
            <Form.Label className="text-dark">{props.label}</Form.Label>
            <div className="d-flex">
                <input className={style.inputEditar} type={props.type} placeholder={props.placeholder}
                    name={props.name}
                    {...props.validations}
                />
                {props.error &&
                    <span className='ps-2 pt-2 mt-5 position-absolute text-danger'>
                        {props.error.message}
                    </span>
                }
            </div>
        </Form.Group>
    );
}
