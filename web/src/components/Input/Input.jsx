import { Form } from "react-bootstrap";
import style from './styles.module.css'


export function Input(props) {
    return(
        <Form.Group className='mb-4'>
            <Form.Label className="text-dark">{props.label}</Form.Label>
            <div className="d-flex">
                <input className={style.input} type={props.type} placeholder={props.placeholder}
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
