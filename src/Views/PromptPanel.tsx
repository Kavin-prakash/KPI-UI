// import React from 'react';
// import { Box, Paper, IconButton, TextField, CircularProgress } from '@mui/material';
// import { AttachFile, Mic, Send } from '@mui/icons-material';

// interface PromptPanelProps {
//   prompt: string;
//   setPrompt: (val: string) => void;
//   handlePromptSubmit: () => void;
//   isLoading: boolean;
//   fileInputRef: React.RefObject<HTMLInputElement | null>;
//   handleFileUpload: (file: File) => void; // Updated prop
// }

// const PromptPanel: React.FC<PromptPanelProps> = ({ prompt, setPrompt, handlePromptSubmit, isLoading, fileInputRef, handleFileUpload }) => (
//   <Box sx={{ p: 2, bgcolor: 'white', borderTop: '1px solid #e0e0e0' }}>
//     <Paper
//       elevation={0}
//       sx={{
//         p: '2px 4px',
//         display: 'flex',
//         alignItems: 'center',
//         border: '1px solid #e0e0e0',
//         borderRadius: 2,
//         bgcolor: 'white'
//       }}
//     >
//       <input
//         type="file"
//         ref={fileInputRef}
//         style={{ display: 'none' }}
//         onChange={(e) => {
//           if (e.target.files && e.target.files[0]) {
//             handleFileUpload(e.target.files[0]); // Call the centralized function
//           }
//           // Clear the input value so selecting the same file again triggers onChange
//           e.target.value = ''; 
//         }}
//         accept=".pdf"
//       />
//       <IconButton sx={{ p: '10px' }} onClick={() => fileInputRef.current?.click()}>
//         <AttachFile />
//       </IconButton>
//       <IconButton sx={{ p: '10px' }} color="primary">
//         {/* <Mic /> */}
//       </IconButton>
//       <TextField
//         fullWidth
//         variant="standard"
//         placeholder="Type your prompt here..."
//         value={prompt}
//         onChange={(e) => setPrompt(e.target.value)}
//         onKeyPress={(e) => e.key === 'Enter' && handlePromptSubmit()}
//         sx={{ mx: 1 }}
//         InputProps={{ disableUnderline: true }}
//       />
//       <IconButton sx={{ p: '10px' }} color="primary" onClick={handlePromptSubmit} disabled={isLoading}>
//         {isLoading ? <CircularProgress size={24} /> : <Send />}
//       </IconButton>
//     </Paper>
//   </Box>
// );

// export default PromptPanel;


import React, { useEffect } from 'react';
import { Box, Paper, IconButton, TextField, CircularProgress, Tooltip } from '@mui/material';
import { AttachFile, Mic, Send, Clear } from '@mui/icons-material'; // Import Clear icon
import useSpeechToText from 'react-hook-speech-to-text';

interface PromptPanelProps {
  prompt: string;
  setPrompt: (val: string | ((prev: string) => string)) => void;
  handlePromptSubmit: () => void;
  isLoading: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleFileUpload: (file: File) => void; // Updated prop
}

const PromptPanel: React.FC<PromptPanelProps> = ({ prompt, setPrompt, handlePromptSubmit, isLoading, fileInputRef, handleFileUpload }) => {
  const {
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  // Effect to update the prompt when speech-to-text results change
  useEffect(() => {
    if (results.length > 0) {
      const latest = results[results.length - 1];
      const latestResult = typeof latest === 'string' ? latest : latest.transcript;
      setPrompt((prevPrompt: string) => prevPrompt + latestResult);
      console.log('Speech-to-text result:', latestResult);
    }
  }, [results, setPrompt]);

  const handlevoice = () => {
    if (isRecording) {
      stopSpeechToText();
      console.log('Speech-to-text stopped.');
    } else {
      startSpeechToText();
      console.log('Speech-to-text started.');
    }
  };

  const handleClearPrompt = () => {
    setPrompt('');
    console.log('Prompt cleared.');
  };

  return (
    <Box sx={{
      p: 1.5, bgcolor: 'white', borderTop: '10px solid #e0e0e0',
      borderBottom: '10px solid #e0e0e0',
      borderRight: '8px solid #e0e0e0',
      borderLeft: '8px solid #e0e0e0'
    }}>
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
              console.log('File selected:', e.target.files[0].name);
            }
            // Clear the input value so selecting the same file again triggers onChange
            e.target.value = '';
          }}
          accept=".pdf"
        />
        <Tooltip title='File Upload' placement='top'>
          <IconButton sx={{ p: '10px' }} onClick={() => fileInputRef.current?.click()}>
            <AttachFile />
          </IconButton>
        </Tooltip>
        <Tooltip title={isRecording ? 'Stop Voice Chat' : 'Start Voice Chat'} placement='top'>
          <IconButton onClick={handlevoice} sx={{ p: '10px' }} color={isRecording ? 'secondary' : 'primary'}>
            <Mic />
          </IconButton>
        </Tooltip>
        <TextField
          fullWidth
          variant="standard"
          placeholder="Type your prompt here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handlePromptSubmit()}
          sx={{ mx: 1 }}
          InputProps={{
            disableUnderline: true,
            // Add the clear input icon here
            endAdornment: prompt ? ( // Only show if prompt is not empty
              <Tooltip title="Clear" placement="top">
                <IconButton
                  aria-label="clear input"
                  onClick={handleClearPrompt}
                  edge="end"
                  size="small"
                >
                  <Clear />
                </IconButton>
              </Tooltip>
            ) : null,
          }}
        />
        <Tooltip title='Send' placement='top'>
          <IconButton sx={{ p: '10px' }} color="primary" onClick={handlePromptSubmit} disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : <Send />}
          </IconButton>
        </Tooltip>
      </Paper>
    </Box>
  );
};

export default PromptPanel;