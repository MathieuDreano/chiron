import "./stack.css";
import reactLogo from "@/assets/react.svg";
import fastApiLogo from "@/assets/fastapi.svg";
import pythonLogo from "@/assets/python.svg";
import postgreSQLLogo from "@/assets/postgresql.svg";
import viteLogo from "/vite.svg";
import { Box, Card, Stack } from "@mui/material";

const TechStack = () => (
  <div className="stack">
    <Card
      sx={{
        flexWrap: "wrap",
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#1976d2", // same as border
          color: "white",
          px: 2,
          py: 1,
          fontWeight: "bold",
          fontSize: "1.2rem",
        }}
      >
        Frontend
      </Box>

      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        sx={{ flexWrap: "wrap", p: 2 }}
      >
        <div>
          <div className="logo spin">
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h3>React</h3>
        </div>

        <div>
          <div className="logo">
            <a href="https://vite.dev" target="_blank">
              <img src={viteLogo} className="logo vite" alt="Vite logo" />
            </a>
          </div>
          <h3>Vite</h3>
        </div>
      </Stack>
    </Card>

    <Card
      sx={{
        flexWrap: "wrap",
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#1976d2", // same as border
          color: "white",
          px: 2,
          py: 1,
          fontWeight: "bold",
          fontSize: "1.2rem",
        }}
      >
        Backend
      </Box>

      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        sx={{ flexWrap: "wrap", p: 2 }}
      >
        <div>
          <div className="logo">
            <a href="https://www.python.org/" target="_blank">
              <img src={pythonLogo} className="logo python" alt="Python logo" />
            </a>
          </div>
          <h3>Python</h3>
        </div>

        <div>
          <div className="logo">
            <a href="https://fastapi.tiangolo.com/" target="_blank">
              <img
                src={fastApiLogo}
                className="logo fastapi"
                alt="FastAPI logo"
              />
            </a>
          </div>
          <h3>FastAPI</h3>
        </div>

        <div>
          <div className="logo">
            <a href="https://www.postgresql.org/" target="_blank">
              <img
                src={postgreSQLLogo}
                className="logo postgresql"
                alt="PostgreSQL logo"
              />
            </a>
          </div>
          <h3>PostgreSQL</h3>
        </div>
      </Stack>
    </Card>
  </div>
);

export default TechStack;
