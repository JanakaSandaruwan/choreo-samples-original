import React, { useState } from "react";
import { Box, Button, TextField } from "@material-ui/core";

const Component: React.FC = () => {
  const [value, setValue] = useState<string | undefined>("");
  const [map, setMap] = useState<Map<string, string>>(new Map());

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const toggleValue = () => {
    setValue(value ? undefined : "test string");
  };

  return (
    <Box mt={2} ml={5}>
      {/* {value === undefined ? "Value is undefined" : "Value is not undefined"}
      <br></br>
      {map.get("key") === undefined ? "Map value is undefined" : "Map value is not undefined"}
      <br></br> */}
      <TextField value={value} onChange={handleChange} label={value} />
      <Button
        variant="contained"
        color="primary"
        onClick={toggleValue}
        style={{ marginLeft: "10px" }}
      >
        Toggle Value
      </Button>
    </Box>
  );
};

export default Component;
