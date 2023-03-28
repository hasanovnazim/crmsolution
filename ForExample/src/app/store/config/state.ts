export interface ConfigState {
  appName: string;
  error?: any;
}

export const initialState: ConfigState = {
  appName: 'Debitor app',
};
