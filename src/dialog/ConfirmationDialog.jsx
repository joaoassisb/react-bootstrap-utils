import React from 'react';
import PropTypes from 'prop-types';
import { Dialog } from './Dialog';
import { awaitForAsyncTask } from '../utils/event-handlers';

export function ConfirmationDialog({ title, message, children, onProceed, onCancel, cancelLabel, proceedLabel }) {
  return (
    <Dialog
      title={title}
      body={message}
      footer={({ close }) => (
        <>
          <button type="button" className="btn btn-secondary" onClick={awaitForAsyncTask(onCancel, close)}>
            {cancelLabel}
          </button>
          <button type="button" className="btn btn-primary" onClick={awaitForAsyncTask(onProceed, close)}>
            {proceedLabel}
          </button>
        </>
      )}
    >
      {children}
    </Dialog>
  );
}

ConfirmationDialog.defaultProps = {
  onProceed: () => {},
  onCancel: () => {},
  title: 'Atention required',
  cancelLabel: 'Cancel',
  proceedLabel: 'Proceed',
};

ConfirmationDialog.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onCancel: PropTypes.func,
  onProceed: PropTypes.func,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  cancelLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  proceedLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};