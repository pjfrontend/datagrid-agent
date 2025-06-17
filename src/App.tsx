import React, { useMemo, useState } from 'react';
import { usePromptDataParser } from './hooks/usePromptDataParser';
import { Container, TextField, Typography, Button, CircularProgress, Stack, Box, Tabs, Tab } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { createFinancialAccounts } from './utils/mockAccountFactory';
import { deduplicateIds } from './utils/deduplicateIds';
import MarkdownComponent from './components/MarkdownComponent';
import { TabPanel } from './components/TabPanel';
import { AIProvider, AIProviderDropdown } from './components/AIProviderDropdown';

const myData = createFinancialAccounts(3);


function App() {
  const [prompt, setPrompt] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<AIProvider>(AIProvider.OpenAI);
  const { result, runPrompt, loading } = usePromptDataParser(myData, selectedProvider);

  const handleSend = () => {
    runPrompt(prompt);
  };

  const cleanData = useMemo(()=>{
    return deduplicateIds(result.data)
  },[result.data])

  // tabs
  const [tabIndex, setTabIndex] = useState(0);
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box display="flex">
        <Typography variant="h5" sx={{
          marginRight: '2rem',
        }}>AI Table Generator</Typography>
        <AIProviderDropdown selectedProvider={selectedProvider} setSelectedProvider={setSelectedProvider}/>
      </Box>
      <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabIndex} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Overview" />
          <Tab label="Original Data" />
        </Tabs>
      </Box>
      <TabPanel value={tabIndex} index={0}>
        <TextField
          label="Enter prompt"
          multiline
          fullWidth
          minRows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={`Example: List everyone who lives in London`}
          sx={{ my: 2 }}
        />

        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Button variant="contained" onClick={handleSend} disabled={loading}>
            Send
          </Button>
          {loading && <CircularProgress size={24} />}
        </Stack>

        {result.error && <MarkdownComponent markdown={result.error} />}

        {!result.error && cleanData.length > 0 && (
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={cleanData} columns={result.columns} />
          </div>
        )} 
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <pre>{JSON.stringify(myData, null, 2)}</pre>
      </TabPanel>
    </Box>



    </Container>
  );
}

export default App;
