export interface QueryParameters {
  displayName: string;
  urlParam: string;
  queryType: "text" | "number";
}

export interface EndpointInfo {
  urlEndpoint: string;
  description: string;
  requestType: string;
  queryParams?: QueryParameters[];
  pagination: boolean;
  responseExample: string;
  responseType?: string;
}
