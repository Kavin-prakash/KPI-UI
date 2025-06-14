import React from 'react';
import { Box, Paper, IconButton, TextField, CircularProgress } from '@mui/material';
import { AttachFile, Mic, Send } from '@mui/icons-material';

interface PromptPanelProps {
  prompt: string;
  setPrompt: (val: string) => void;
  handlePromptSubmit: () => void;
  isLoading: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleFileUpload: (file: File) => void; // Updated prop
}

const PromptPanel: React.FC<PromptPanelProps> = ({ prompt, setPrompt, handlePromptSubmit, isLoading, fileInputRef, handleFileUpload }) => (
  <Box sx={{ p: 2, bgcolor: 'white', borderTop: '1px solid #e0e0e0' }}>
    <Paper
      elevation={0}
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        bgcolor: 'white'
      }}
    >
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileUpload(e.target.files[0]); // Call the centralized function
          }
          // Clear the input value so selecting the same file again triggers onChange
          e.target.value = ''; 
        }}
        accept=".pdf"
      />
      <IconButton sx={{ p: '10px' }} onClick={() => fileInputRef.current?.click()}>
        <AttachFile />
      </IconButton>
      <IconButton sx={{ p: '10px' }} color="primary">
        {/* <Mic /> */}
      </IconButton>
      <TextField
        fullWidth
        variant="standard"
        placeholder="Type your prompt here..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handlePromptSubmit()}
        sx={{ mx: 1 }}
        InputProps={{ disableUnderline: true }}
      />
      <IconButton sx={{ p: '10px' }} color="primary" onClick={handlePromptSubmit} disabled={isLoading}>
        {isLoading ? <CircularProgress size={24} /> : <Send />}
      </IconButton>
    </Paper>
  </Box>
);

export default PromptPanel;