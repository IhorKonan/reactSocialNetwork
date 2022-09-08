import { InjectedFormProps, reduxForm } from 'redux-form';
// @ts-ignore
import { maxLengthCreator, required } from '../../../utilits/validators/validators.ts';
// @ts-ignore
import { createField, Textarea} from '../../common/FormsControls/FormsControls.tsx';
// @ts-ignore
import NemMessageFormValuesType from '../Dialogs.tsx'


const maxLenght100 = maxLengthCreator(100);
type NewMessageFormValuesKeysType = Extract<keyof NemMessageFormValuesType, string>
type PropsType = {}
const AddMessageForm: React.FC<InjectedFormProps<NemMessageFormValuesType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}> 
            <div>
                {createField<NewMessageFormValuesKeysType>("Enter your message", "newMessageBody", [required, maxLenght100], Textarea)}
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}
export default reduxForm<NemMessageFormValuesType>({form: 'dialog-add-message-form'})(AddMessageForm);