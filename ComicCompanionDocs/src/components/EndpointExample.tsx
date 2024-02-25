import { ExpandLess, ExpandMore, ContentCopy } from "@mui/icons-material";
import { Collapse, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from "react";
import "../styles/EndpointExample.css";
import { EndpointInfo } from "../types";
import QueryOption from "./QueryOption";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const deleteParamRegex = (queryParam: string) => new RegExp(`&${queryParam}=([^&]*)|&${queryParam}=([^&]*)$`);
const replaceParamValueRegex = (queryParam: string) => new RegExp(`${queryParam}=([^&]*)`);

interface EndpointExampleProps {
  info: EndpointInfo;
}

export interface QueryParamOptions {
  param: string;
  checked: boolean;
  value: string;
}

export default function EndpointExample(props: EndpointExampleProps) {
  const [open, setOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(import.meta.env.VITE_API_URL + props.info.urlEndpoint);
  const [queryOpen, setQueryOpen] = useState(false);
  const [queryParams, setQueryParams] = useState<string[]>([]);

  const [exampleOpen, setExampleOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const handleExampleClick = () => setExampleOpen(!exampleOpen);

  const handleQueryClick = () => setQueryOpen(!queryOpen);
  const handleTypeClick = () => setTypeOpen(!typeOpen);

  const handleCheckingQuery = (e: React.ChangeEvent<HTMLInputElement>, inputValue: string) => {
    let newUrl = currentUrl;
    if (e.target.checked) {
      if (queryParams.length === 0) {
        newUrl = newUrl + "?";
      } else {
        newUrl = newUrl + "&";
      }
      queryParams.push(e.target.value);
      newUrl = newUrl + `${e.target.value}=${inputValue}`;
      setCurrentUrl(newUrl);
    } else if (!e.target.checked) {
      const newQueryParams = queryParams.filter((q) => q !== e.target.value);
      if (newQueryParams.length === 0) {
        setCurrentUrl(import.meta.env.VITE_API_URL + props.info.urlEndpoint);
      } else {
        let newUrl = currentUrl;
        if ((queryParams[0] = e.target.value)) {
          newUrl = newUrl.replace("?", "&");
        }
        newUrl = newUrl.replace(deleteParamRegex(e.target.value), "");
        newUrl = newUrl.replace(/&/, "?");
        setCurrentUrl(newUrl);
      }
      setQueryParams(newQueryParams);
    }
  };

  const handleQueryInput = (query: QueryParamOptions) => {
    if (query.checked) {
      const newUrl = currentUrl.replace(replaceParamValueRegex(query.param), `${query.param}=${query.value}`);
      setCurrentUrl(newUrl);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
  };

  return (
    <div className="endpoint-example-wrapper">
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <span className={`${props.info.requestType}-text`}>{props.info.requestType}</span>
        </ListItemIcon>
        <ListItemText primary={props.info.urlEndpoint} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <div className="endpoint-items">
          <div className="endpoint-url">
            <p>{currentUrl}</p>
            <ContentCopy onClick={handleCopy} style={{ cursor: "pointer" }} />
          </div>
          <p className="endpoint-description">{props.info.description}</p>
          {props.info.queryParams ? (
            <>
              <ListItemButton onClick={handleQueryClick}>
                <ListItemText primary={"Query Options"} />
                {queryOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={queryOpen}>
                <div className="query-params">
                  {props.info.queryParams.map((query, index) => (
                    <QueryOption
                      key={query.urlParam + index}
                      handleCheckingQuery={handleCheckingQuery}
                      query={query}
                      handleQueryInput={handleQueryInput}
                    />
                  ))}
                </div>
              </Collapse>
            </>
          ) : null}
          <div className="query-response-example">
            <ListItemButton onClick={handleExampleClick}>
              <ListItemText primary={"Example Response"} />
              {exampleOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={exampleOpen}>
              <SyntaxHighlighter style={dark}>{props.info.responseExample}</SyntaxHighlighter>
            </Collapse>
          </div>
          {props.info.responseType ? (
            <div className="query-type-example">
              <ListItemButton onClick={handleTypeClick}>
                <ListItemText primary={"TypeScript Type"} />
                {exampleOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={typeOpen}>
                <SyntaxHighlighter style={dark}>{props.info.responseType}</SyntaxHighlighter>
              </Collapse>
            </div>
          ) : null}
        </div>
      </Collapse>
    </div>
  );
}
