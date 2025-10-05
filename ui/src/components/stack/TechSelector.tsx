import { Box, FormControl, MenuItem, Select, Stack } from "@mui/material"
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import { useState } from "react";

export type TechOption = {
  name: string
  logo?: string
  link: string
  spin?: boolean
}

type Props = {
  label: string
  options: Record<string, TechOption>
  defaultKey: string              // <- controlled from parent
  onChange?: (key: string) => void  // <- notify parent
}

const TechSelector = ({ label, options, defaultKey, onChange }: Props) => {
  const [selected, setSelected] = useState<string>(defaultKey)
  return (
    <Box
      sx={{
        flexWrap: "wrap",
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        mb: 2,
      }}
    >
      <Box
        sx={{
          backgroundColor: "#1976d2",
          color: "white",
          px: 2,
          py: 1,
          fontWeight: "bold",
          fontSize: "1.2rem",
        }}
      >
        {label}
      </Box>

      <Stack spacing={2} sx={{ p: 2 }}>
        <FormControl fullWidth>
          <Select
            value={selected}
            onChange={(e) => onChange && setSelected(e.target.value) && onChange(e.target.value)}
          >
            {Object.keys(options).map((key) => (
              <MenuItem key={key} value={key}>
                {options[key].name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div style={{ textAlign: "center" }}>
          <div className={`logo ${options[selected].spin ? 'spin' : ''}`}>
            <a
              href={options[selected].link}
              target="_blank"
              rel="noreferrer"
            >
              {options[selected].logo ? (<img
                src={options[selected].logo}
                className={`logo ${selected}`}
                alt={`${options[selected].name} logo`}
              />) : (
                <IntegrationInstructionsIcon className={`logo ${selected}`}/>
              )}
            </a>
          </div>
          <h3>{options[selected].name}</h3>
        </div>
      </Stack>
    </Box>
  )
}

export default TechSelector
