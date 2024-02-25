import { Button, FormControlLabel, Checkbox, Input } from "@mui/material";
import { QueryParameters } from "../types";
import { useState } from "react";
import { QueryParamOptions } from "./EndpointExample";

interface QueryOptionsProps {
  handleCheckingQuery: (e: React.ChangeEvent<HTMLInputElement>, inputValue: string) => void;
  query: QueryParameters;
  handleQueryInput: (query: QueryParamOptions) => void;
}

export default function QueryOption(props: QueryOptionsProps) {
  const [queryValue, setQueryValue] = useState("");
  const [checked, setChecked] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryValue(e.target.value);
    props.handleQueryInput({ param: props.query.urlParam, checked: checked, value: e.target.value });
  };

  const onCheckClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    props.handleCheckingQuery(e, queryValue);
  };

  return (
    <>
      <Button color="secondary">
        <FormControlLabel
          control={<Checkbox value={props.query.urlParam} onChange={onCheckClick} checked={checked} />}
          label={props.query.displayName}
        />

        <Input value={queryValue} onChange={handleInput} type={props.query.queryType} />
      </Button>
    </>
  );
}
