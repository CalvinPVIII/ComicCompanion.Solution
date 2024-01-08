import { CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
      <CircularProgress size="100px" />
    </div>
  );
}
