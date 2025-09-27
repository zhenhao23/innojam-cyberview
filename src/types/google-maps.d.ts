declare global {
  namespace JSX {
    interface IntrinsicElements {
      "gmpx-api-loader": {
        key?: string;
        "solution-channel"?: string;
      };
      "gmp-map": {
        center?: string;
        zoom?: number;
        "map-id"?: string;
        children?: React.ReactNode;
      };
      "gmpx-place-picker": {
        placeholder?: string;
      };
      "gmp-advanced-marker": {
        position?: any;
      };
    }
  }
}

export {};
