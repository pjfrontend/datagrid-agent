import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from '@mui/material';

export enum AIProvider {
    OpenAI = 'OpenAI',
    GoogleAI = 'Google AI',
}

export const AI_PROVIDERS: AIProvider[] = Object.values(AIProvider);

interface AIDropdownProps {
    selectedProvider: AIProvider;
    setSelectedProvider: React.Dispatch<React.SetStateAction<AIProvider>>
}

export function AIProviderDropdown({ selectedProvider, setSelectedProvider }: AIDropdownProps) {

  const handleChange = (event: SelectChangeEvent<AIProvider>) => {
    const newProvider = event.target.value as AIProvider;
    setSelectedProvider(newProvider);
  };

  return (
    <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id="ai-provider-select-label">AI Provider</InputLabel>
        <Select
            labelId="ai-provider-select-label"
            id="ai-provider-select"
            value={selectedProvider}
            label="AI Provider"
            onChange={handleChange}
            sx={{ borderRadius: 1.5 }} // Apply rounded corners to the select
        >
            {AI_PROVIDERS.map((provider) => (
            <MenuItem key={provider} value={provider} sx={{ borderRadius: 1 }}>
                {provider}
            </MenuItem>
            ))}
        </Select>
    </FormControl>
  );
}
