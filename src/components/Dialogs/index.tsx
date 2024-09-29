import EditMediaDialog from '../../containers/EditMediaDialog';
import LoginDialog from '../../containers/LoginDialog';
import PreviewMediaDialog from '../../containers/PreviewMediaDialog';

function Dialogs() {
  return (
    <div className="Dialogs">
      <EditMediaDialog />
      <LoginDialog />
      <PreviewMediaDialog />
    </div>
  );
}

export default Dialogs;
