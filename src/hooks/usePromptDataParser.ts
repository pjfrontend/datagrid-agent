import { useState } from 'react';
import type { GridColDef } from '@mui/x-data-grid';
import { formatFieldToHeader } from '../utils/formatFieldToHeader';
import type { FinancialAccount } from '../utils/types';
import { AIProvider } from '../components/AIProviderDropdown';
import { queryOpenAI } from '../clients/openAIClient';
import { queryGoogleAI } from '../clients/googleAIClient';

export type PromptParseResult = {
  headers: string[];
  columns: GridColDef[];
  data: Array<{ id: number | string; name: string; [key: string]: any }>;
  error: string;
};

export function usePromptDataParser(myData: FinancialAccount[], selectedProvider: AIProvider) {
  const dataForPrompt = JSON.stringify(myData, null, 2);

  const systemPrompt = `
  You are a helpful assistant. Use only the following dataset to answer the user's questions.

  DATASET:
  ${dataForPrompt}

  The user may ask for a table of certain fields. Respond with a JSON object like:
  {
    "headers": [...],
    "data": [...]
  }
  Only return valid JSON. Include at least "id" and "name" in each row.

  If you are unsure of what the user means, ask for clarification. Do not to return empty lists or strings.

  Be accurate. Do not randomly leave out the requested data.

  If the user asks for specific data, like all accounts with an ISA product, 
  make sure to return the contact holding the ISA, the ISA product itself and the amount (formatted in £)
  in a legible manner. Return strings instead of objects.
  `;

  const [result, setResult] = useState<PromptParseResult>({
    headers: [],
    columns: [],
    data: [],
    error: '',
  });
  const [loading, setLoading] = useState(false);

  const runPrompt = async (prompt: string) => {
    if (!prompt.trim()) {
      setResult({ headers: [], columns: [], data: [], error: 'Prompt is empty.' });
      return;
    }

    setLoading(true);
    try {
      let response = ''

      switch (selectedProvider) {
        case AIProvider.OpenAI:
          response = await queryOpenAI(systemPrompt, prompt)
          break;
        case AIProvider.GoogleAI:
          response = await queryGoogleAI(systemPrompt, prompt)
          break;
        default:
          break;
      }

      const clean = response
        .replace(/```json\s*/i, "")
        .replace(/```$/, "")
        .trim();

      let parsed:PromptParseResult;
      try{
        parsed = JSON.parse(clean) as PromptParseResult;
      } catch(err:any){
        throw new Error(clean);
      }

      const headers: string[] = parsed.headers ?? [];
      const data: any[] = parsed.data ?? [];

      const columns: GridColDef[] = headers.map((header) => ({
        field: header,
        headerName: formatFieldToHeader(header),
        width: 150,
      }));

      if (!data.every((d) => d.id && d.name)) {
        throw new Error("Each row must include at least 'id' and 'name'");
      }

      setResult({ headers, columns, data, error: '' });
    } catch (err: any) {
      setResult({
        headers: [],
        columns: [],
        data: [],
        error: err.message || 'Failed to parse OpenAI response.',
      });
    } finally {
      setLoading(false);
    }
  };

  return { result, runPrompt, loading };
}
