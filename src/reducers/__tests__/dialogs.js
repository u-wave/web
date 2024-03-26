import dialogs, {
  openEditMediaDialog,
  openLoginDialog,
  closeEditMediaDialog,
  closeLoginDialog,
} from '../dialogs';

const closedDialog = {
  open: false,
  payload: null,
};

const initialState = () => dialogs(undefined, { type: '@@redux/INIT' });

const testDialogOpen = (actionCreator, prop, text) => {
  it(`${text}`, () => {
    let state = initialState();
    const testPayload = { test: 'payload' };
    state = dialogs(state, actionCreator(testPayload));
    expect(state[prop]).toEqual({
      open: true,
      payload: testPayload,
    });
  });
};

const testDialogClose = (actionCreator, prop, text) => {
  it(`${text}`, () => {
    let state = initialState();
    state = dialogs(state, actionCreator());
    expect(state[prop]).toEqual({
      open: false,
      payload: null,
    });
  });
};

describe('reducers/dialogs', () => {
  it('should default to a closed media edit dialog', () => {
    const state = dialogs(undefined, { type: '@@redux/INIT' });
    expect(state.editMedia).toEqual(closedDialog);
  });
  it('should default to a closed login dialog', () => {
    const state = dialogs(undefined, { type: '@@redux/INIT' });
    expect(state.login).toEqual(closedDialog);
  });

  describe('action: openEditMediaDialog', () => {
    testDialogOpen(
      openEditMediaDialog,
      'editMedia',
      'should open the media edit dialog w/ the given payload',
    );
  });
  describe('action: closeEditMediaDialog', () => {
    testDialogClose(
      closeEditMediaDialog,
      'editMedia',
      'should close the media edit dialog w/ the given payload',
    );
  });

  describe('action: openLoginDialog', () => {
    testDialogOpen(
      openLoginDialog,
      'login',
      'should open the login dialog w/ the given payload',
    );
  });
  describe('action: closeLoginDialog', () => {
    testDialogClose(
      closeLoginDialog,
      'login',
      'should close the login dialog w/ the given payload',
    );
  });
});
