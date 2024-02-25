import { List, ListSubheader } from "@mui/material";
import EndpointExample from "./EndpointExample";
import { EndpointInfo } from "../types";

interface EndpointProps {
  name: string;
  endpoints: EndpointInfo[];
}

export default function Endpoint(props: EndpointProps) {
  return (
    <>
      <h2>{props.name}</h2>
      <List subheader={<ListSubheader component="div">Docs for the {props.name} endpoint</ListSubheader>}>
        {props.endpoints.map((info, index) => (
          <EndpointExample info={info} key={info.urlEndpoint + index} />
        ))}
      </List>
    </>
  );
}
