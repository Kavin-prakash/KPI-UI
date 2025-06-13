// import React, { useState, useCallback, useEffect, useRef } from 'react';
// import { Box, TextField, IconButton, Paper, Typography, CircularProgress, Alert, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions, Button, Chip, Stack } from '@mui/material';
// import { Mic, AttachFile, Close, Send, MicOff, Visibility } from '@mui/icons-material';
// import { Document, Page, pdfjs } from 'react-pdf';
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
// import 'react-pdf/dist/esm/Page/TextLayer.css';
// import './App.css';
// import PDFViewer from './Views/PDFViewer';
// import KPIPanel from './Views/KPIPanel';
// import PromptPanel from './Views/PromptPanel';
// import axios from 'axios';

// // Set up the worker for PDF.js
// pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

// interface Message {
//   text: string;
//   isUser: boolean;
//   timestamp: Date;
// }

// interface PDFPreviewProps {
//   file: File;
//   onClose: () => void;
// }

// interface KPI {
//   id: string;
//   label: string;
//   value: string;
//   pageNumber: number;
//   position: {
//     x: number;
//     y: number;
//   };
//   box: {
//     x: number;
//     y: number;
//     width: number;
//     height: number;
//   };
// }

// // Color utility functions (moved to top level)
// const getKPIColor = (kpiText: string): string => {
//   if (kpiText.includes('LP Name')) return '#F3E5F5'; // Light Purple
//   if (kpiText.includes('Fund Name')) return '#FFF3E0'; // Light Orange
//   if (kpiText.includes('Capital Call Date')) return '#E3F2FD'; // Light Blue
//   if (kpiText.includes('Due Date')) return '#E0F2F1'; // Light Teal
//   if (kpiText.includes('Called Amount')) return '#E8F5E8'; // Light Green
//   if (kpiText.includes('Committed Capital')) return '#FCE4EC'; // Light Pink
//   return '#F5F5F5'; // Light Gray for unknown types
// };

// const getKPIBorderColor = (kpiText: string): string => {
//   if (kpiText.includes('LP Name')) return '#9C27B0'; // Purple
//   if (kpiText.includes('Fund Name')) return '#FF9800'; // Orange
//   if (kpiText.includes('Capital Call Date')) return '#2196F3'; // Blue
//   if (kpiText.includes('Due Date')) return '#009688'; // Teal
//   if (kpiText.includes('Called Amount')) return '#4CAF50'; // Green
//   if (kpiText.includes('Committed Capital')) return '#E91E63'; // Pink
//   return '#757575'; // Gray for unknown types
// };

// const PDFPreview: React.FC<PDFPreviewProps> = ({ file, onClose }) => {
//   const [numPages, setNumPages] = useState<number | null>(null);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [scale, setScale] = useState(1.5);
//   const [extractedKPIs, setExtractedKPIs] = useState<KPI[]>([]);
//   const [selectedKPI, setSelectedKPI] = useState<KPI | null>(null);
//   const [highlightedText, setHighlightedText] = useState<string | null>(null);
//   const recognitionRef = useRef<any>(null);

//   function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
//     setNumPages(numPages);
//   }

//   const handlePageRenderSuccess = (page: any) => {
//     const existingHighlights = document.querySelectorAll('.highlighted-text');
//     existingHighlights.forEach(highlight => highlight.remove());

//     if (selectedKPI) {
//       const highlightBox = document.createElement('div');
//       highlightBox.className = 'highlighted-text';
//       highlightBox.style.position = 'absolute';
//       highlightBox.style.left = `${selectedKPI.box.x}px`;
//       highlightBox.style.top = `${selectedKPI.box.y}px`;
//       highlightBox.style.width = `${selectedKPI.box.width}px`;
//       highlightBox.style.height = `${selectedKPI.box.height}px`;
//       highlightBox.style.backgroundColor = 'rgba(255, 235, 59, 0.3)';
//       highlightBox.style.borderRadius = '4px';
//       highlightBox.style.pointerEvents = 'none';
//       highlightBox.style.zIndex = '1';
//       highlightBox.style.border = `2px solid ${getKPIBorderColor(`${selectedKPI.label}: ${selectedKPI.value}`)}`;

//       const pageElement = document.querySelector('.react-pdf__Page');
//       if (pageElement) {
//         pageElement.appendChild(highlightBox);
//         highlightBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
//       }
//     }
//   };

//   useEffect(() => {
//     const styleElement = document.createElement('style');
//     styleElement.textContent = `
//       .highlighted-text {
//         position: absolute;
//         background-color: rgba(255, 235, 59, 0.3);
//         border-radius: 4px;
//         pointer-events: none;
//         z-index: 1;
//         transition: all 0.3s ease;
//       }
//       .highlighted-text:hover {
//         background-color: rgba(255, 235, 59, 0.5);
//       }
//     `;
//     document.head.appendChild(styleElement);

//     return () => {
//       document.head.removeChild(styleElement);
//     };
//   }, []);

//   return (
//     <Paper
//       elevation={3}
//       sx={{
//         position: 'fixed',
//         top: '60px',
//         bottom: '80px',
//         left: 0,
//         right: 0,
//         backgroundColor: 'white',
//         padding: '16px',
//         display: 'flex',
//         flexDirection: 'column',
//         zIndex: 900,
//         borderTop: '1px solid #e0e0e0',
//         borderBottom: '1px solid #e0e0e0'
//       }
//       }
//     >
//       <Box sx={
//         {
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           mb: 2,
//           flexShrink: 0
//         }
//       }>
//         <Typography variant="subtitle1" >
//           PDF Preview: {file.name}
//         </Typography>
//         < IconButton
//           size="small"
//           onClick={onClose}
//         >
//           <Close />
//         </IconButton>
//       </Box>

//       < Box sx={{
//         flex: 1,
//         overflow: 'auto',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'flex-start',
//         '&::-webkit-scrollbar': {
//           width: '8px',
//           height: '8px',
//         },
//         '&::-webkit-scrollbar-track': {
//           background: '#f1f1f1',
//           borderRadius: '4px',
//         },
//         '&::-webkit-scrollbar-thumb': {
//           background: '#888',
//           borderRadius: '4px',
//           '&:hover': {
//             background: '#555',
//           },
//         },
//       }}>
//         <Document
//           file={file}
//           onLoadSuccess={onDocumentLoadSuccess}
//           loading={
//             < Box sx={{
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               height: '100%',
//               width: '100%'
//             }}>
//               <CircularProgress />
//             </Box>
//           }
//         >
//           <Page
//             pageNumber={pageNumber}
//             renderTextLayer={true}
//             renderAnnotationLayer={true}
//             scale={scale}
//             onRenderSuccess={handlePageRenderSuccess}
//             loading={
//               < Box sx={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 height: '100%',
//                 width: '100%'
//               }}>
//                 <CircularProgress />
//               </Box>
//             }
//           />
//         </Document>
//       </Box>

//       {
//         numPages && (
//           <Box sx={
//             {
//               display: 'flex',
//               justifyContent: 'center',
//               gap: 2,
//               mt: 2,
//               pt: 2,
//               borderTop: '1px solid #e0e0e0',
//               flexShrink: 0
//             }
//           }>
//             <Button
//               disabled={pageNumber <= 1}
//               onClick={() => setPageNumber(pageNumber - 1)
//               }
//               variant="contained"
//               size="small"
//             >
//               Previous
//             </Button>
//             < Typography sx={{
//               display: 'flex',
//               alignItems: 'center',
//               px: 2
//             }}>
//               Page {pageNumber} of {numPages}
//             </Typography>
//             < Button
//               disabled={pageNumber >= numPages}
//               onClick={() => setPageNumber(pageNumber + 1)}
//               variant="contained"
//               size="small"
//             >
//               Next
//             </Button>
//           </Box>
//         )}
//     </Paper>
//   );
// };

// function App() {
//   const [prompt, setPrompt] = useState('');
//   // console.log("Check the user Prompt", prompt)
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [file, setFile] = useState<File | null>(null);
//   console.log("Check the user file", file);
//   const [numPages, setNumPages] = useState<number | null>(null);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [scale, setScale] = useState(1.5);
//   const [extractedKPIs, setExtractedKPIs] = useState<KPI[]>([]);
//   const [selectedKPI, setSelectedKPI] = useState<KPI | null>(null);
//   const [highlightedText, setHighlightedText] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   //handling submit - API Call
//   const handlePromptSubmit = async () => {
//     console.log("Handle submit is clicked")
//     // if (!prompt.trim()) return;
//     setIsLoading(true);
//     setError(null);
//     setExtractedKPIs([]); // Clear previous KPIs

//     //API Call
//     try {
//       const formdata = new FormData();
//       formdata.append('userinput', prompt)
//       if (file) {
//         formdata.append('file', file)
//       }
//       const apiResponse = await axios.post('http://127.0.0.1:5000/upload', formdata);

//       console.log("API Response", apiResponse.data.result);
//     } catch (error) {
//       console.log("Error in while API Call", error)
//     }
//     // Simulate API call with a delay
//     setTimeout(() => {
//       // Mock KPI extraction response (dynamic)
//       const mockKPIs: KPI[] = [
//         { id: '1', label: 'LP Name', value: 'ABC pital', pageNumber: 1, position: { x: 100, y: 200 }, box: { x: 100, y: 200, width: 200, height: 30 } },
//         { id: '2', label: 'Fund Name', value: 'Growth Fund III', pageNumber: 1, position: { x: 150, y: 300 }, box: { x: 150, y: 300, width: 250, height: 30 } },
//         { id: '3', label: 'Capital Call Date', value: 'July 2024', pageNumber: 1, position: { x: 200, y: 150 }, box: { x: 200, y: 150, width: 220, height: 30 } },
//         { id: '4', label: 'Due Date', value: 'August 15, 2024', pageNumber: 1, position: { x: 250, y: 400 }, box: { x: 250, y: 400, width: 240, height: 30 } },
//         { id: '5', label: 'Called Amount', value: '$5,000,000', pageNumber: 2, position: { x: 300, y: 250 }, box: { x: 300, y: 250, width: 230, height: 30 } },
//         { id: '6', label: 'Committed Capital', value: '$25,000,000', pageNumber: 2, position: { x: 350, y: 300 }, box: { x: 350, y: 300, width: 260, height: 30 } },
//         { id: '7', label: 'Custom Metric', value: '123', pageNumber: 2, position: { x: 400, y: 350 }, box: { x: 400, y: 350, width: 180, height: 30 } }
//       ];
//       setExtractedKPIs(mockKPIs);
//       setIsLoading(false);
//     }, 2000); // 2 seconds fake loading
//   };

//   const handleKpiClick = (kpi: KPI) => {
//     setSelectedKPI(kpi);
//     setPageNumber(kpi.pageNumber);
//     setHighlightedText(`${kpi.label}: ${kpi.value}`);

//     // Scroll to the PDF viewer
//     const pdfViewer = document.querySelector('.pdf-content');
//     if (pdfViewer) {
//       pdfViewer.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
//     setNumPages(numPages);
//   };

//   const handlePageRenderSuccess = (page: any) => {
//     const existingHighlights = document.querySelectorAll('.highlighted-text');
//     existingHighlights.forEach(highlight => highlight.remove());

//     if (selectedKPI) {
//       const highlightBox = document.createElement('div');
//       highlightBox.className = 'highlighted-text';
//       highlightBox.style.position = 'absolute';
//       highlightBox.style.left = `${selectedKPI.box.x}px`;
//       highlightBox.style.top = `${selectedKPI.box.y}px`;
//       highlightBox.style.width = `${selectedKPI.box.width}px`;
//       highlightBox.style.height = `${selectedKPI.box.height}px`;
//       highlightBox.style.backgroundColor = 'rgba(255, 235, 59, 0.3)';
//       highlightBox.style.borderRadius = '4px';
//       highlightBox.style.pointerEvents = 'none';
//       highlightBox.style.zIndex = '1';
//       highlightBox.style.border = `2px solid ${getKPIBorderColor(`${selectedKPI.label}: ${selectedKPI.value}`)}`;

//       const pageElement = document.querySelector('.react-pdf__Page');
//       if (pageElement) {
//         pageElement.appendChild(highlightBox);
//         highlightBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
//       }
//     }
//   };

//   // Add cleanup function to remove highlights when changing pages
//   useEffect(() => {
//     return () => {
//       const highlights = document.querySelectorAll('.highlighted-text');
//       highlights.forEach(highlight => highlight.remove());
//     };
//   }, [pageNumber]);

//   return (
//     <Box sx={{
//       height: '100vh',
//       display: 'flex',
//       flexDirection: 'column',
//       bgcolor: '#f5f5f5',
//       position: 'relative'
//     }
//     }>
//       {/* Header */}
//       < Box sx={{
//         p: 2,
//         bgcolor: 'white',
//         borderBottom: '1px solid #e0e0e0',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between'
//       }}>
//         <Typography variant="h6" component="h1" >
//           Financial Doc Analyzer
//         </Typography>
//       </Box>

//       {/* Main Content */}
//       <Box sx={
//         {
//           flex: 1,
//           display: 'flex',
//           flexDirection: 'row',
//           overflow: 'hidden',
//           position: 'relative'
//         }
//       }>
//         {/* Left Side - PDF and other content */}
//         < Box sx={{
//           flex: 1,
//           display: 'flex',
//           flexDirection: 'column',
//           overflow: 'hidden',
//           minWidth: 0 // Prevent flex item from overflowing
//         }}>
//           {/* PDF Preview */}
//           {
//             file && (
//               <PDFViewer
//                 file={file}
//                 pageNumber={pageNumber}
//                 setPageNumber={setPageNumber}
//                 numPages={numPages}
//                 scale={scale}
//                 onDocumentLoadSuccess={handleDocumentLoadSuccess}
//                 onPageRenderSuccess={handlePageRenderSuccess}
//               />
//             )
//           }
//           {/* Centered loading spinner when waiting for KPI response */}
//           {
//             isLoading && extractedKPIs.length === 0 && (
//               <Box sx={
//                 {
//                   position: 'absolute',
//                   top: 0,
//                   left: 0,
//                   width: '100%',
//                   height: '100%',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   zIndex: 2000,
//                   background: 'rgba(255,255,255,0.7)'
//                 }
//               }>
//                 <CircularProgress size={64} />
//               </Box>
//             )
//           }
//         </Box>

//         {/* Right Sidebar - KPI Section */}
//         {
//           extractedKPIs.length > 0 && !isLoading && (
//             <KPIPanel
//               extractedKPIs={extractedKPIs}
//               selectedKPI={selectedKPI}
//               handleKpiClick={handleKpiClick}
//               getKPIColor={getKPIColor}
//               getKPIBorderColor={getKPIBorderColor}
//             />
//           )
//         }
//       </Box>

//       {/* Prompt Input */}
//       <PromptPanel
//         prompt={prompt}
//         setPrompt={setPrompt}
//         handlePromptSubmit={handlePromptSubmit}
//         isLoading={isLoading}
//         fileInputRef={fileInputRef}
//         setFile={setFile}
//       />

//       {/* Error Snackbar */}
//       < Snackbar
//         open={!!error}
//         autoHideDuration={6000}
//         onClose={() => setError(null)}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
//           {error}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// }

// export default App;

// import React, { useState, useCallback, useEffect, useRef } from 'react';
// import { Box, TextField, IconButton, Paper, Typography, CircularProgress, Alert, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions, Button, Chip, Stack } from '@mui/material';
// import { Mic, AttachFile, Close, Send, MicOff, Visibility } from '@mui/icons-material';
// import { Document, Page, pdfjs } from 'react-pdf';
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
// import 'react-pdf/dist/esm/Page/TextLayer.css';
// import './App.css';
// import PDFViewer from './Views/PDFViewer';
// import KPIPanel from './Views/KPIPanel';
// import PromptPanel from './Views/PromptPanel';
// import axios from 'axios';

// // Set up the worker for PDF.js
// pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

// interface Message {
//   text: string;
//   isUser: boolean;
//   timestamp: Date;
// }

// interface PDFPreviewProps {
//   file: File;
//   onClose: () => void;
// }

// interface KPI {
//   id: string;
//   label: string;
//   value: string;
//   pageNumber: number;
//   position: {
//     x: number;
//     y: number;
//   };
//   box: {
//     x: number;
//     y: number;
//     width: number;
//     height: number;
//   };
// }

// const PDFPreview: React.FC<PDFPreviewProps> = ({ file, onClose }) => {
//   const [numPages, setNumPages] = useState<number | null>(null);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [scale, setScale] = useState(1.5);
//   const [extractedKPIs, setExtractedKPIs] = useState<KPI[]>([]);
//   const [selectedKPI, setSelectedKPI] = useState<KPI | null>(null);
//   const [highlightedText, setHighlightedText] = useState<string | null>(null);
//   const recognitionRef = useRef<any>(null);

//   function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
//     setNumPages(numPages);
//   }

//   const handlePageRenderSuccess = (page: any) => {
//     const existingHighlights = document.querySelectorAll('.highlighted-text');
//     existingHighlights.forEach(highlight => highlight.remove());

//     if (selectedKPI) {
//       const highlightBox = document.createElement('div');
//       highlightBox.className = 'highlighted-text';
//       highlightBox.style.position = 'absolute';
//       highlightBox.style.left = `${selectedKPI.box.x}px`;
//       highlightBox.style.top = `${selectedKPI.box.y}px`;
//       highlightBox.style.width = `${selectedKPI.box.width}px`;
//       highlightBox.style.height = `${selectedKPI.box.height}px`;
//       highlightBox.style.backgroundColor = 'rgba(255, 235, 59, 0.3)';
//       highlightBox.style.borderRadius = '4px';
//       highlightBox.style.pointerEvents = 'none';
//       highlightBox.style.zIndex = '1';
//       highlightBox.style.border = `2px solid #2196F3`;

//       const pageElement = document.querySelector('.react-pdf__Page');
//       if (pageElement) {
//         pageElement.appendChild(highlightBox);
//         highlightBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
//       }
//     }
//   };

//   useEffect(() => {
//     const styleElement = document.createElement('style');
//     styleElement.textContent = `
//       .highlighted-text {
//         position: absolute;
//         background-color: rgba(255, 235, 59, 0.3);
//         border-radius: 4px;
//         pointer-events: none;
//         z-index: 1;
//         transition: all 0.3s ease;
//       }
//       .highlighted-text:hover {
//         background-color: rgba(255, 235, 59, 0.5);
//       }
//     `;
//     document.head.appendChild(styleElement);

//     return () => {
//       document.head.removeChild(styleElement);
//     };
//   }, []);

//   return (
//     <Paper
//       elevation={3}
//       sx={{
//         position: 'fixed',
//         top: '60px',
//         bottom: '80px',
//         left: 0,
//         right: 0,
//         backgroundColor: 'white',
//         padding: '16px',
//         display: 'flex',
//         flexDirection: 'column',
//         zIndex: 900,
//         borderTop: '1px solid #e0e0e0',
//         borderBottom: '1px solid #e0e0e0'
//       }}
//     >
//       <Box sx={{
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         mb: 2,
//         flexShrink: 0
//       }}>
//         <Typography variant="subtitle1">
//           PDF Preview: {file.name}
//         </Typography>
//         <IconButton
//           size="small"
//           onClick={onClose}
//         >
//           <Close />
//         </IconButton>
//       </Box>

//       <Box sx={{
//         flex: 1,
//         overflow: 'auto',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'flex-start',
//         '&::-webkit-scrollbar': {
//           width: '8px',
//           height: '8px',
//         },
//         '&::-webkit-scrollbar-track': {
//           background: '#f1f1f1',
//           borderRadius: '4px',
//         },
//         '&::-webkit-scrollbar-thumb': {
//           background: '#888',
//           borderRadius: '4px',
//           '&:hover': {
//             background: '#555',
//           },
//         },
//       }}>
//         <Document
//           file={file}
//           onLoadSuccess={onDocumentLoadSuccess}
//           loading={
//             <Box sx={{
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               height: '100%',
//               width: '100%'
//             }}>
//               <CircularProgress />
//             </Box>
//           }
//         >
//           <Page
//             pageNumber={pageNumber}
//             renderTextLayer={true}
//             renderAnnotationLayer={true}
//             scale={scale}
//             onRenderSuccess={handlePageRenderSuccess}
//             loading={
//               <Box sx={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 height: '100%',
//                 width: '100%'
//               }}>
//                 <CircularProgress />
//               </Box>
//             }
//           />
//         </Document>
//       </Box>

//       {numPages && (
//         <Box sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           gap: 2,
//           mt: 2,
//           pt: 2,
//           borderTop: '1px solid #e0e0e0',
//           flexShrink: 0
//         }}>
//           <Button
//             disabled={pageNumber <= 1}
//             onClick={() => setPageNumber(pageNumber - 1)}
//             variant="contained"
//             size="small"
//           >
//             Previous
//           </Button>
//           <Typography sx={{
//             display: 'flex',
//             alignItems: 'center',
//             px: 2
//           }}>
//             Page {pageNumber} of {numPages}
//           </Typography>
//           <Button
//             disabled={pageNumber >= numPages}
//             onClick={() => setPageNumber(pageNumber + 1)}
//             variant="contained"
//             size="small"
//           >
//             Next
//           </Button>
//         </Box>
//       )}
//     </Paper>
//   );
// };

// function App() {
//   const [prompt, setPrompt] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [file, setFile] = useState<File | null>(null);
//   const [numPages, setNumPages] = useState<number | null>(null);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [scale, setScale] = useState(1.5);
//   const [extractedKPIs, setExtractedKPIs] = useState<KPI[]>([]);
//   const [selectedKPI, setSelectedKPI] = useState<KPI | null>(null);
//   const [highlightedText, setHighlightedText] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handlePromptSubmit = async () => {
//     // if (!prompt.trim()) return;
//     setIsLoading(true);
//     setError(null);
//     setExtractedKPIs([]); // Clear previous KPIs

//     //API Call
//     try {
//       const formdata = new FormData();
//       formdata.append('userinput', prompt)
//       if (file) {
//         formdata.append('file', file)
//       }
//       setFile(null);
//       setPrompt('');
//       const apiResponse = await axios.post('http://127.0.0.1:5000/upload_ollama', formdata);
//       console.log("API Response", apiResponse.data);


//     } catch (error) {
//       console.log("Error in while API Call", error)
//     }

//     // Simulate API call with a delay
//     setTimeout(() => {
//       // Dynamic KPI pool
//       const possibleKPIs = [
//         'LP Name',
//         'Fund Name',
//         'Capital Call Date',
//         'Due Date',
//         'Called Amount',
//         'Committed Capital',
//         'Custom Metric',
//         'IRR',
//         'NAV',
//         'Distribution Amount',
//         'Preferred Return',
//         'Other Metric'
//       ];
//       // Generate a random number of KPIs (4-8)
//       const kpiCount = Math.floor(Math.random() * 5) + 4;
//       // Shuffle and pick
//       const shuffled = possibleKPIs.sort(() => 0.5 - Math.random());
//       const selected = shuffled.slice(0, kpiCount);
//       // Generate random KPIs
//       const mockKPIs = selected.map((label, idx) => ({
//         id: (idx + 1).toString(),
//         label,
//         value: label === 'LP Name' ? 'ABC Capital'
//           : label === 'Fund Name' ? 'Growth Fund III'
//             : label === 'Capital Call Date' ? 'July ' + (2020 + Math.floor(Math.random() * 5))
//               : label === 'Due Date' ? 'August ' + (10 + Math.floor(Math.random() * 20)) + ', 2024'
//                 : label === 'Called Amount' ? `$${(Math.floor(Math.random() * 10) + 1) * 1_000_000}`
//                   : label === 'Committed Capital' ? `$${(Math.floor(Math.random() * 30) + 1) * 1_000_000}`
//                     : label === 'IRR' ? (Math.random() * 20).toFixed(2) + '%'
//                       : label === 'NAV' ? `$${(Math.floor(Math.random() * 50) + 1) * 1_000_000}`
//                         : label === 'Distribution Amount' ? `$${(Math.floor(Math.random() * 5) + 1) * 500_000}`
//                           : label === 'Preferred Return' ? (Math.random() * 10 + 5).toFixed(2) + '%'
//                             : label === 'Custom Metric' ? Math.floor(Math.random() * 1000).toString()
//                               : label === 'Other Metric' ? (Math.random() * 100).toFixed(2)
//                                 : 'N/A',
//         pageNumber: Math.floor(Math.random() * 2) + 1,
//         position: { x: 100 + idx * 50, y: 200 + idx * 30 },
//         box: { x: 100 + idx * 50, y: 200 + idx * 30, width: 200, height: 30 }
//       }));
//       setExtractedKPIs(mockKPIs);
//       setIsLoading(false);
//     }, 2000); // 2 seconds fake loading
//   };

//   const handleKpiClick = (kpi: KPI) => {
//     setSelectedKPI(kpi);
//     setPageNumber(kpi.pageNumber);
//     setHighlightedText(`${kpi.label}: ${kpi.value}`);

//     // Scroll to the PDF viewer
//     const pdfViewer = document.querySelector('.pdf-content');
//     if (pdfViewer) {
//       pdfViewer.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
//     setNumPages(numPages);
//   };

//   const handlePageRenderSuccess = (page: any) => {
//     const existingHighlights = document.querySelectorAll('.highlighted-text');
//     existingHighlights.forEach(highlight => highlight.remove());

//     if (selectedKPI) {
//       const highlightBox = document.createElement('div');
//       highlightBox.className = 'highlighted-text';
//       highlightBox.style.position = 'absolute';
//       highlightBox.style.left = `${selectedKPI.box.x}px`;
//       highlightBox.style.top = `${selectedKPI.box.y}px`;
//       highlightBox.style.width = `${selectedKPI.box.width}px`;
//       highlightBox.style.height = `${selectedKPI.box.height}px`;
//       highlightBox.style.backgroundColor = 'rgba(255, 235, 59, 0.3)';
//       highlightBox.style.borderRadius = '4px';
//       highlightBox.style.pointerEvents = 'none';
//       highlightBox.style.zIndex = '1';
//       highlightBox.style.border = `2px solid #2196F3`;

//       const pageElement = document.querySelector('.react-pdf__Page');
//       if (pageElement) {
//         pageElement.appendChild(highlightBox);
//         highlightBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
//       }
//     }
//   };

//   // Add cleanup function to remove highlights when changing pages
//   useEffect(() => {
//     return () => {
//       const highlights = document.querySelectorAll('.highlighted-text');
//       highlights.forEach(highlight => highlight.remove());
//     };
//   }, [pageNumber]);

//   return (
//     <Box sx={{
//       height: '100vh',
//       display: 'flex',
//       flexDirection: 'column',
//       bgcolor: '#f5f5f5',
//       position: 'relative'
//     }}>
//       {/* Header */}
//       <Box sx={{
//         p: 2,
//         bgcolor: 'white',
//         borderBottom: '1px solid #e0e0e0',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between'
//       }}>
//         <Typography variant="h6" component="h1">
//           Financial Doc Analyzer
//         </Typography>
//       </Box>

//       {/* Main Content */}
//       <Box sx={{
//         flex: 1,
//         display: 'flex',
//         flexDirection: 'row',
//         overflow: 'hidden',
//         position: 'relative'
//       }}>
//         {/* Left Side - PDF and other content */}
//         <Box sx={{
//           flex: 1,
//           display: 'flex',
//           flexDirection: 'column',
//           overflow: 'hidden',
//           minWidth: 0 // Prevent flex item from overflowing
//         }}>
//           {/* PDF Preview */}
//           {file && (
//             <PDFViewer
//               file={file}
//               pageNumber={pageNumber}
//               setPageNumber={setPageNumber}
//               numPages={numPages}
//               scale={scale}
//               onDocumentLoadSuccess={handleDocumentLoadSuccess}
//               onPageRenderSuccess={handlePageRenderSuccess}
//             />
//           )}
//           {/* Centered loading spinner when waiting for KPI response */}
//           {isLoading && extractedKPIs.length === 0 && (
//             <Box sx={{
//               position: 'absolute',
//               top: 0,
//               left: 0,
//               width: '100%',
//               height: '100%',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               zIndex: 2000,
//               background: 'rgba(255,255,255,0.7)'
//             }}>
//               <CircularProgress size={64} />
//             </Box>
//           )}
//         </Box>

//         {/* Right Sidebar - KPI Section */}
//         {extractedKPIs.length > 0 && !isLoading && (
//           <KPIPanel
//             extractedKPIs={extractedKPIs}
//             selectedKPI={selectedKPI}
//             handleKpiClick={handleKpiClick}
//           />
//         )}
//       </Box>

//       {/* Prompt Input */}
//       <PromptPanel
//         prompt={prompt}
//         setPrompt={setPrompt}
//         handlePromptSubmit={handlePromptSubmit}
//         isLoading={isLoading}
//         fileInputRef={fileInputRef}
//         setFile={setFile}
//       />

//       {/* Error Snackbar */}
//       <Snackbar
//         open={!!error}
//         autoHideDuration={6000}
//         onClose={() => setError(null)}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
//           {error}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// }

// export default App;

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Box, TextField, IconButton, Paper, Typography, CircularProgress, Alert, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions, Button, Chip, Stack } from '@mui/material';
import { Mic, AttachFile, Close, Send, MicOff, Visibility } from '@mui/icons-material';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import './App.css';
import PDFViewer from './Views/PDFViewer'; // Assuming PDFViewer can handle a URL
import KPIPanel from './Views/KPIPanel';
import PromptPanel from './Views/PromptPanel';
import axios from 'axios';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import orglogo from '../src/Asserts/Relevantz_Logo.png'
// Set up the worker for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface PDFPreviewProps {
  file: File;
  onClose: () => void;
}

interface KPI {
  id: string;
  label: string;
  value: string;
  pageNumber: number;
  position: {
    x: number;
    y: number;
  };
  box: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

// Your PDFPreview component remains the same if it's only for initial file preview

function App() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null); // For initial file upload
  const [highlightedPdfUrl, setHighlightedPdfUrl] = useState<string | null>(null); // New state for highlighted PDF URL
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.5);
  const [extractedKPIs, setExtractedKPIs] = useState<KPI[]>([]);
  const [selectedKPI, setSelectedKPI] = useState<KPI | null>(null);
  const [highlightedText, setHighlightedText] = useState<string | null>(null); // This might be redundant if you're highlighting based on KPI position
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePromptSubmit = async () => {
    if (!prompt.trim() && !file) { // Ensure either prompt or file is present
      setError("Please enter a prompt or upload a file.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setExtractedKPIs([]); // Clear previous KPIs
    setHighlightedPdfUrl(null); // Clear previous highlighted PDF

    try {
      const formdata = new FormData();
      formdata.append('userinput', prompt);
      if (file) {
        formdata.append('file', file);
      }
      setFile(null); // Clear the selected file after sending
      setPrompt(''); // Clear the prompt after sending

      const apiResponse = await axios.post('http://127.0.0.1:5000/upload_ollama', formdata);
      console.log("API Response", apiResponse.data);

      const { highlighted_pdf_url, result } = apiResponse.data;

      // Set the highlighted PDF URL
      if (highlighted_pdf_url) {
        setHighlightedPdfUrl(`http://127.0.0.1:5000${highlighted_pdf_url}`); // Prepend your backend URL if necessary
      }

      // Process and set extracted KPIs from `result` if available
      if (result) {
        const mockKPIs: KPI[] = Object.entries(result).map(([label, value], idx) => ({
          id: (idx + 1).toString(),
          label: label.replace(/([A-Z])/g, ' $1').trim(), // Format label for display (e.g., "LP Name" from "LPName")
          value: String(value), // Ensure value is a string
          pageNumber: 1, // You'll need to get actual page numbers from your backend for highlighting if available
          position: { x: 0, y: 0 }, // Placeholder, actual position depends on backend
          box: { x: 0, y: 0, width: 0, height: 0 } // Placeholder, actual box depends on backend
        }));
        setExtractedKPIs(mockKPIs);
      }


    } catch (error: any) {
      console.error("Error during API Call:", error);
      setError(error.response?.data?.message || "An error occurred while processing your request.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKpiClick = (kpi: KPI) => {
    setSelectedKPI(kpi);
    setPageNumber(kpi.pageNumber); // This assumes your backend provides pageNumber for KPIs
    setHighlightedText(`${kpi.label}: ${kpi.value}`);

    // Scroll to the PDF viewer
    const pdfViewer = document.querySelector('.pdf-content'); // Ensure this selector matches your PDFViewer's root element
    if (pdfViewer) {
      pdfViewer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handlePageRenderSuccess = (page: any) => {
    // This part should be handled within your PDFViewer component or
    // carefully integrated here. If KPI positions are in PDF coordinates,
    // you'll need to scale them correctly.
    const existingHighlights = document.querySelectorAll('.highlighted-text');
    existingHighlights.forEach(highlight => highlight.remove());

    if (selectedKPI && selectedKPI.pageNumber === pageNumber) {
      const highlightBox = document.createElement('div');
      highlightBox.className = 'highlighted-text';
      // These coordinates (selectedKPI.box.x, y, width, height) must be
      // relative to the PDF page and scaled appropriately by react-pdf.
      // You might need to adjust them based on the 'scale' prop of <Page>.
      highlightBox.style.position = 'absolute';
      highlightBox.style.left = `${selectedKPI.box.x * scale}px`; // Apply scale
      highlightBox.style.top = `${selectedKPI.box.y * scale}px`; // Apply scale
      highlightBox.style.width = `${selectedKPI.box.width * scale}px`; // Apply scale
      highlightBox.style.height = `${selectedKPI.box.height * scale}px`; // Apply scale
      highlightBox.style.backgroundColor = 'rgba(255, 235, 59, 0.3)';
      highlightBox.style.borderRadius = '4px';
      highlightBox.style.pointerEvents = 'none';
      highlightBox.style.zIndex = '1';
      highlightBox.style.border = `2px solid #2196F3`;

      const pageElement = document.querySelector('.react-pdf__Page'); // This selects the current page
      if (pageElement) {
        pageElement.appendChild(highlightBox);
        highlightBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  // Add cleanup function to remove highlights when changing pages or unmounting
  useEffect(() => {
    return () => {
      const highlights = document.querySelectorAll('.highlighted-text');
      highlights.forEach(highlight => highlight.remove());
    };
  }, [pageNumber, highlightedPdfUrl]); // Also clean up when a new PDF is loaded

  return (
    <Box sx={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: '#f5f5f5',
      position: 'relative'
    }}>
      {/* Header */}
      <Box sx={{
        p: 2,
        bgcolor: 'white',
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'space-between'
      }}>
        <img style={{height:'100px',width:'200px'}} src={orglogo}></img>
        <Typography variant="h5" component="h1">
          {/* Financial Doc Analyzer */}
          AI-Powered KPI Extraction for Financial Document
        </Typography>
      </Box>

      {/* Main Content */}
      <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Left Side - PDF and other content */}
        <Box sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          minWidth: 0 // Prevent flex item from overflowing
        }}>
          {/* Conditional rendering for PDF Viewer */}
          {highlightedPdfUrl ? (
            <PDFViewer
              file={highlightedPdfUrl} // Pass the URL here
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              numPages={numPages}
              scale={scale}
              onDocumentLoadSuccess={handleDocumentLoadSuccess}
              onPageRenderSuccess={handlePageRenderSuccess}
            />
          ) : file ? ( // Show original uploaded file if no highlighted PDF yet
            <PDFViewer
              file={file}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              numPages={numPages}
              scale={scale}
              onDocumentLoadSuccess={handleDocumentLoadSuccess}
              onPageRenderSuccess={handlePageRenderSuccess}
            />
          ) : (
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              <Typography variant="h5" color="text.secondary">Upload a PDF or enter a prompt to get started!</Typography>
              <Typography variant="subtitle1" color="text.secondary" mt={1}>
                You can ask questions like: "What is the capital call amount?" or "Summarize this document."
              </Typography>
            </Box>
          )}

          {/* Centered loading spinner when waiting for KPI response */}
          {isLoading && (
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2000,
              background: 'rgba(255,255,255,0.7)'
            }}>
              <CircularProgress size={64} />
            </Box>
          )}
        </Box>

        {/* Right Sidebar - KPI Section */}
        {extractedKPIs.length > 0 && !isLoading && (
          <KPIPanel
            extractedKPIs={extractedKPIs}
            selectedKPI={selectedKPI}
            handleKpiClick={handleKpiClick}
          />
        )}
      </Box>

      {/* Prompt Input */}
      <PromptPanel
        prompt={prompt}
        setPrompt={setPrompt}
        handlePromptSubmit={handlePromptSubmit}
        isLoading={isLoading}
        fileInputRef={fileInputRef}
        setFile={setFile}
      />

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default App;