import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
// @ts-ignore
import { withAuthRedirect } from '../../hoc/withAuthRedirect.tsx';
// @ts-ignore
import { actions } from '../../redux/dialogs-reducer.ts';
// @ts-ignore
import { AppStateType } from '../../redux/redux-store.ts';
// @ts-ignore
import Dialogs from './Dialogs.tsx';


let mapStateToProps = (state: AppStateType) => {
    return {
      dialogsPage: state.dialogsPage,
    }
  }

export default compose<React.ComponentType>(
  connect(mapStateToProps, { ...actions }),
  withAuthRedirect
)(Dialogs);