import React from 'react';
import { Box, CircularProgress, IconButton, Typography } from '@mui/material';
import { Document, Page } from 'react-pdf';
 
interface PDFViewerProps {
  file: File | string;
  pageNumber: number;
  setPageNumber: (n: number) => void;
  numPages: number | null;
  scale: number;
  onDocumentLoadSuccess: (args: { numPages: number }) => void;
  onPageRenderSuccess: (page: any) => void;
  loading?: boolean;
}
 
const PDFViewer: React.FC<PDFViewerProps> = ({ file, pageNumber, setPageNumber, numPages, scale, onDocumentLoadSuccess, onPageRenderSuccess, loading }) => {
  return (
    <>
      <Box className="pdf-content" sx={{
        flex: 1,
        overflow: 'auto',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        p: 2,
        bgcolor: '#f5f5f5',
        minWidth: 0,
        '& .react-pdf__Document': {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          maxWidth: '100%'
        },
        '& .react-pdf__Page': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          borderRadius: '4px',
          backgroundColor: 'white',
          maxWidth: 'calc(100% - 32px)',
          maxHeight: '100%',
          margin: '0 auto'
        },
        '& .highlighted-text': {
          backgroundColor: 'rgba(255, 235, 59, 0.3)',
          borderRadius: '4px',
          transition: 'background-color 0.3s ease',
          '&:hover': {
            backgroundColor: 'rgba(255, 235, 59, 0.5)',
          }
        },
        '&::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: '#f1f1f1',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#c1c1c1',
          borderRadius: '4px',
          '&:hover': {
            background: '#a8a8a8',
          },
        },
      }}>
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <CircularProgress />
            </Box>
          }
        >
          <Page
            pageNumber={pageNumber}
            renderTextLayer={true}
            renderAnnotationLayer={true}
            scale={scale}
            onRenderSuccess={onPageRenderSuccess}
            loading={
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%'
              }}>
                <CircularProgress />
              </Box>
            }
          />
        </Document>
      </Box>
      {numPages && (
        <Box sx={{
          p: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          borderTop: '1px solid #ddd',
          bgcolor: '#ffffff',
          boxShadow: '0 -1px 4px rgba(0,0,0,0.1)',
          minHeight: '50px'
        }}>
          <IconButton
            size="small"
            onClick={() => setPageNumber(pageNumber - 1)}
            disabled={pageNumber <= 1}
            sx={{
              bgcolor: pageNumber <= 1 ? '#f5f5f5' : '#2196F3',
              color: pageNumber <= 1 ? '#999' : 'white',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              fontSize: '16px',
              fontWeight: 'bold',
              boxShadow: pageNumber <= 1 ? 'none' : '0 2px 6px rgba(33, 150, 243, 0.3)',
              '&:hover': {
                bgcolor: pageNumber <= 1 ? '#f5f5f5' : '#1976D2',
                transform: pageNumber <= 1 ? 'none' : 'translateY(-1px)',
                boxShadow: pageNumber <= 1 ? 'none' : '0 3px 8px rgba(33, 150, 243, 0.4)',
              },
              '&:disabled': {
                bgcolor: '#f5f5f5',
                color: '#ccc',
              },
              transition: 'all 0.2s ease'
            }}
          >
            ←
          </IconButton>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: '#2196F3',
              bgcolor: '#f8f9fa',
              px: 2,
              py: 0.5,
              borderRadius: '16px',
              border: '1px solid #2196F3',
              boxShadow: '0 1px 3px rgba(33, 150, 243, 0.2)',
              minWidth: '100px',
              textAlign: 'center',
              fontSize: '0.875rem'
            }}
          >
            Page {pageNumber} of {numPages}
          </Typography>
          <IconButton
            size="small"
            onClick={() => setPageNumber(pageNumber + 1)}
            disabled={pageNumber >= numPages}
            sx={{
              bgcolor: pageNumber >= numPages ? '#f5f5f5' : '#2196F3',
              color: pageNumber >= numPages ? '#999' : 'white',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              fontSize: '16px',
              fontWeight: 'bold',
              boxShadow: pageNumber >= numPages ? 'none' : '0 2px 6px rgba(33, 150, 243, 0.3)',
              '&:hover': {
                bgcolor: pageNumber >= numPages ? '#f5f5f5' : '#1976D2',
                transform: pageNumber >= numPages ? 'none' : 'translateY(-1px)',
                boxShadow: pageNumber >= numPages ? 'none' : '0 3px 8px rgba(33, 150, 243, 0.4)',
              },
              '&:disabled': {
                bgcolor: '#f5f5f5',
                color: '#ccc',
              },
              transition: 'all 0.2s ease'
            }}
          >
            →
          </IconButton>
        </Box>
      )}
    </>
  );
};
 
export default PDFViewer;
 
 