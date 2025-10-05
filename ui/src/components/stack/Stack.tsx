import "./stack.css";
import reactLogo from "@/assets/react.svg";
import fastApiLogo from "@/assets/fastapi.svg";
import pythonLogo from "@/assets/python.svg";
import postgreSQLLogo from "@/assets/postgresql.svg";
import viteLogo from "/vite.svg";
import { Box, Card, Stack } from "@mui/material";
import TechSelector, { type TechOption } from "./TechSelector";
import { useState } from "react";

const frontendFrameworks: Record<string, TechOption> = {
  react: { name: "React", logo: reactLogo, link: "https://react.dev", spin: true },
  vue: { name: "Vue", logo: reactLogo, link: "https://vuejs.org", spin: true },
  angular: { name: "Angular", logo: reactLogo, link: "https://angular.dev" },
  vite: { name: "Vite", logo: viteLogo, link: "https://vite.dev" },
}

const frontendBuildTools: Record<string, TechOption> = {
  vite: { name: "Vite", logo: viteLogo, link: "https://vite.dev" },
  webpack: { name: "Webpack", logo: viteLogo, link: "https://webpack.js.org" },
  parcel: { name: "Parcel", logo: viteLogo, link: "https://parceljs.org" },
}

const apiLanguages: Record<string, TechOption> = {
  python: { name: "Python", logo: pythonLogo, link: "https://www.python.org/" },
  java: { name: "Java", logo: pythonLogo, link: "https://www.java.com/" },
  nodejs: { name: "Node.js", logo: pythonLogo, link: "https://nodejs.org/" },
  go: { name: "Go", logo: pythonLogo, link: "https://golang.org/" },
}

const databases: Record<string, TechOption> = {
  postgresql: { name: "PostgreSQL", logo: postgreSQLLogo, link: "https://www.postgresql.org/" },
  // java: { name: "Java", logo: pythonLogo, link: "https://www.java.com/" },
  // nodejs: { name: "Node.js", logo: pythonLogo, link: "https://nodejs.org/" },
  // go: { name: "Go", logo: pythonLogo, link: "https://golang.org/" },
}

const apiFrameworks: Record<string, Record<string, TechOption>> = {
  python: {
    fastapi: { name: "FastAPI", logo: fastApiLogo, link: "https://fastapi.tiangolo.com/" },
    django: { name: "Django", logo: undefined, link: "https://www.djangoproject.com/" },
  },
  java: {
    spring: { name: "Spring", logo: undefined, link: "https://spring.io/" },
    micronaut: { name: "Micronaut", logo: undefined, link: "https://micronaut.io/" },
  },
  nodejs: {
    express: { name: "Express", logo: undefined, link: "https://expressjs.com/" },
    nestjs: { name: "NestJS", logo: undefined, link: "https://nestjs.com/" },
  },
  go: {
    gin: { name: "Gin", logo: undefined, link: "https://gin-gonic.com/" },
    echo: { name: "Echo", logo: undefined, link: "https://echo.labstack.com/" },
  },
}

const TechStack = () => {
  const [selectedApiLanguage, setSelectedApiLanguage] = useState("python")
  const [selectedApiFramework, setSelectedApiFramework] = useState("fastapi")
  return (
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
        <TechSelector label="Language/Framework" options={frontendFrameworks} defaultKey="react" />
        <TechSelector label="Build tool" options={frontendBuildTools} defaultKey="vite" />
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
        <TechSelector label="Language" options={apiLanguages} defaultKey="python"
          onChange={(key) => {
            setSelectedApiLanguage(key)
            // reset framework when language changes
            setSelectedApiFramework(Object.keys(apiFrameworks[key])[0])
          }}
        />
        {/* For framework, filter options based on selected language */}
        <TechSelector label="Framework" options={apiFrameworks[selectedApiLanguage]} defaultKey={selectedApiFramework} />
      </Stack>
    </Card>
    <TechSelector label="Database" options={databases} defaultKey="postgresql" />

  </div>
  );
}


export default TechStack;
