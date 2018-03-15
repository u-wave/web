import { expect } from 'chai';
import {
  OPEN_EDIT_MEDIA_DIALOG, CLOSE_EDIT_MEDIA_DIALOG,
  OPEN_LOGIN_DIALOG, CLOSE_LOGIN_DIALOG,
} from '../../src/constants/actionTypes/dialogs';
import dialogs from '../../src/reducers/dialogs';

const closedDialog = {
  open: false,
  payload: {},
};

const initialState = () => dialogs(undefined, { type: '@@redux/INIT' });

const testDialogOpen = (type, prop, text) => {
  it(text, () => {
    let state = initialState();
    const testPayload = { test: 'payload' };
    state = dialogs(state, { type, payload: testPayload });
    expect(state[prop]).to.eql({
      open: true,
      payload: testPayload,
    });
  });
};

const testDialogClose = (type, prop, text) => {
  it(text, () => {
    let state = initialState();
    state = dialogs(state, { type });
    expect(state[prop]).to.eql({
      open: false,
      payload: {},
    });
  });
};

describe('reducers/dialogs', () => {
  it('should default to a closed media edit dialog', () => {
    const state = dialogs(undefined, { type: '@@redux/INIT' });
    expect(state.editMedia).to.eql(closedDialog);
  });
  it('should default to a closed login dialog', () => {
    const state = dialogs(undefined, { type: '@@redux/INIT' });
    expect(state.login).to.eql(closedDialog);
  });

  describe('action: OPEN_EDIT_MEDIA_DIALOG', () => {
    testDialogOpen(
      OPEN_EDIT_MEDIA_DIALOG, 'editMedia',
      'should open the media edit dialog w/ the given payload',
    );
  });
  describe('action: CLOSE_EDIT_MEDIA_DIALOG', () => {
    testDialogClose(
      CLOSE_EDIT_MEDIA_DIALOG, 'editMedia',
      'should close the media edit dialog w/ the given payload',
    );
  });

  describe('action: OPEN_LOGIN_DIALOG', () => {
    testDialogOpen(
      OPEN_LOGIN_DIALOG, 'login',
      'should open the login dialog w/ the given payload',
    );
  });
  describe('action: CLOSE_LOGIN_DIALOG', () => {
    testDialogClose(
      CLOSE_LOGIN_DIALOG, 'login',
      'should close the login dialog w/ the given payload',
    );
  });
});
