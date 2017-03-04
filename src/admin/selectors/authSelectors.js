/* eslint-disable import/prefer-default-export */
import { isModeratorSelector } from '../../selectors/userSelectors';

// TODO replace with check for the `motd.set` role.
export const canChangeMotdSelector = isModeratorSelector;
