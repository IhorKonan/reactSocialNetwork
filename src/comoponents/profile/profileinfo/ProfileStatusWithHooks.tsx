import React, { ChangeEvent, useEffect, useState } from 'react';


type PropsType = {
  status: string
  upDateStatus: (status: string) => void
}
const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
      setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () => {
      setEditMode(true);
    }
    const deactivateEditMode = () => {
      setEditMode(false);
      props.upDateStatus(status);
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
      setStatus(e.currentTarget.value);
    }

    return (
      <div>
        {!editMode &&
          <div>
            <b>Status:</b><span onDoubleClick={activateEditMode}>{props.status || '----'}</span>
          </div>
        }
        {editMode &&
          <div>
            <input autoFocus={true} onBlur={deactivateEditMode} onChange={onStatusChange} value={status}></input>
          </div>
        } 
      </div>
    );
  }

export default ProfileStatusWithHooks;